/**
 * Video Storage and Persistence utility
 * Stores user-uploaded original videos into IndexedDB for 100% persistent local client playback,
 * and uploads them to the server /api/upload-video endpoint to persist on the server file system.
 */

const DB_NAME = 'KezbanSalonVideosDB';
const DB_VERSION = 1;
const STORE_NAME = 'videos';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Memory cache for created ObjectURLs
const objectUrlCache: Record<string, string> = {};

/**
 * Ensures a reliable in-memory Blob URL for video playback.
 * Highly compatible with iOS Safari (which requires byte ranges if served via HTTP,
 * but natively plays Blob URLs in memory without range limitations).
 */
export async function ensureVideoBlob(refId: string, fallbackUrl: string): Promise<string> {
  if (objectUrlCache[refId]) {
    return objectUrlCache[refId];
  }

  // 1. Try reading existing blob from IndexedDB
  try {
    const db = await openDB();
    const existingBlob = await new Promise<Blob | null>((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(refId);
      req.onsuccess = () => {
        const record = req.result;
        if (record && record.blob instanceof Blob && record.blob.size > 20000) {
          resolve(record.blob);
        } else {
          resolve(null);
        }
      };
      req.onerror = () => resolve(null);
    });

    if (existingBlob) {
      const url = URL.createObjectURL(existingBlob);
      objectUrlCache[refId] = url;
      return url;
    }
  } catch (err) {
    console.warn('IndexedDB read failed:', err);
  }

  // 2. Fetch the video file as Blob (HTTP 200 works on any CDN/proxy)
  try {
    const res = await fetch(fallbackUrl);
    if (!res.ok) {
      return fallbackUrl;
    }
    const blob = await res.blob();
    if (blob.size > 20000) {
      // Store in IndexedDB for instant zero-latency future playback
      try {
        const db = await openDB();
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.put({ blob, name: refId, type: 'video/mp4', date: Date.now() }, refId);
      } catch (dbErr) {
        console.warn('Could not cache blob in IndexedDB:', dbErr);
      }

      const url = URL.createObjectURL(blob);
      objectUrlCache[refId] = url;
      return url;
    }
  } catch (fetchErr) {
    console.warn('Fetch video blob failed, falling back to direct URL:', fetchErr);
  }

  return fallbackUrl;
}

/**
 * Get video URL for a given reference ID.
 * Returns in-memory Blob URL if available, otherwise initiates preload and returns fallback.
 */
export async function getVideoUrl(refId: string, fallbackUrl: string): Promise<string> {
  if (objectUrlCache[refId]) {
    return objectUrlCache[refId];
  }

  try {
    const db = await openDB();
    return new Promise<string>((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(refId);

      req.onsuccess = () => {
        const record = req.result;
        if (record && record.blob && record.blob instanceof Blob && record.blob.size > 20000) {
          const url = URL.createObjectURL(record.blob);
          objectUrlCache[refId] = url;
          resolve(url);
        } else {
          // Trigger background fetch and resolve fallback
          ensureVideoBlob(refId, fallbackUrl).catch(() => {});
          resolve(fallbackUrl);
        }
      };

      req.onerror = () => {
        ensureVideoBlob(refId, fallbackUrl).catch(() => {});
        resolve(fallbackUrl);
      };
    });
  } catch (e) {
    return fallbackUrl;
  }
}

/**
 * Save user uploaded file for a reference ID.
 * Saves to IndexedDB and syncs to /api/upload-video
 */
export async function saveVideoFile(refId: string, file: File, serverFilename?: string): Promise<string> {
  // Revoke old cache if any
  if (objectUrlCache[refId]) {
    try {
      URL.revokeObjectURL(objectUrlCache[refId]);
    } catch (e) {}
  }

  // 1. Save to IndexedDB
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put({ blob: file, name: file.name, type: file.type, date: Date.now() }, refId);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.warn('Could not save to IndexedDB:', err);
  }

  const objectUrl = URL.createObjectURL(file);
  objectUrlCache[refId] = objectUrl;

  // 2. Upload to server in background
  if (serverFilename) {
    try {
      fetch('/api/upload-video', {
        method: 'POST',
        headers: {
          'x-filename': serverFilename,
          'Content-Type': file.type || 'video/mp4'
        },
        body: file
      }).catch(err => console.log('Server upload notice:', err));
    } catch (e) {}
  }

  return objectUrl;
}

/**
 * Check if a reference has a custom stored video in IndexedDB
 */
export async function hasCustomVideo(refId: string): Promise<boolean> {
  try {
    const db = await openDB();
    return new Promise<boolean>((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(refId);
      req.onsuccess = () => resolve(!!req.result);
      req.onerror = () => resolve(false);
    });
  } catch (e) {
    return false;
  }
}

/**
 * Clear custom video from storage and revert to default
 */
export async function removeCustomVideo(refId: string): Promise<void> {
  if (objectUrlCache[refId]) {
    try {
      URL.revokeObjectURL(objectUrlCache[refId]);
    } catch (e) {}
    delete objectUrlCache[refId];
  }

  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.delete(refId);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (e) {}
}
