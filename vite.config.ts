import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, Plugin} from 'vite';

function videoUploadPlugin(): Plugin {
  return {
    name: 'video-upload-plugin',
    configureServer(server) {
      // iOS Safari-compliant HTTP 206 Partial Content video streaming middleware
      server.middlewares.use((req, res, next) => {
        const rawUrl = req.url?.split('?')[0] || '';
        if (rawUrl.startsWith('/videos/') && rawUrl.endsWith('.mp4')) {
          const filename = path.basename(rawUrl);
          let filePath = path.resolve(__dirname, 'public/videos', filename);
          if (!fs.existsSync(filePath)) {
            filePath = path.resolve(__dirname, 'dist/videos', filename);
          }
          if (!fs.existsSync(filePath)) {
            return next();
          }

          const stat = fs.statSync(filePath);
          const fileSize = stat.size;
          const range = req.headers.range;

          res.setHeader('Accept-Ranges', 'bytes');
          res.setHeader('Content-Type', 'video/mp4');
          // Strong ETag and public cache control required by Apple AVFoundation
          res.setHeader('ETag', `"${stat.size}-${stat.mtime.getTime()}"`);
          res.setHeader('Cache-Control', 'public, max-age=86400');

          if (range) {
            const parts = range.replace(/bytes=/, '').split('-');
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

            if (start >= fileSize || end >= fileSize || start > end) {
              res.statusCode = 416;
              res.setHeader('Content-Range', `bytes */${fileSize}`);
              return res.end();
            }

            const chunksize = end - start + 1;
            res.statusCode = 206;
            res.setHeader('Content-Range', `bytes ${start}-${end}/${fileSize}`);
            res.setHeader('Content-Length', chunksize);

            const fileStream = fs.createReadStream(filePath, { start, end });
            fileStream.pipe(res);
          } else {
            res.statusCode = 200;
            res.setHeader('Content-Length', fileSize);
            fs.createReadStream(filePath).pipe(res);
          }
          return;
        }
        next();
      });

      server.middlewares.use('/api/upload-video', (req, res) => {
        if (req.method === 'POST') {
          const rawFilename = (req.headers['x-filename'] as string) || 'video.mp4';
          const safeName = path.basename(rawFilename).replace(/[^a-zA-Z0-9._-]/g, '_');
          const targetDir = path.resolve(__dirname, 'public/videos');
          if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
          }
          const targetPath = path.join(targetDir, safeName);
          const fileStream = fs.createWriteStream(targetPath);
          req.pipe(fileStream);

          fileStream.on('finish', () => {
            const distDir = path.resolve(__dirname, 'dist/videos');
            if (fs.existsSync(distDir)) {
              try {
                fs.copyFileSync(targetPath, path.join(distDir, safeName));
              } catch (e) {}
            }
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, url: `/videos/${safeName}` }));
          });

          fileStream.on('error', (err) => {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message }));
          });
        } else {
          res.statusCode = 405;
          res.end('Method Not Allowed');
        }
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), videoUploadPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
