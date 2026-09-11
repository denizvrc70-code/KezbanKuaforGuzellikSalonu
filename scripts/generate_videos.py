#!/usr/bin/env python3
import os
import subprocess
import urllib.request

os.makedirs('public/videos', exist_ok=True)

videos_info = [
    {
        'id': 'ref_esra_gelin',
        'title': 'Esra Hanım - Gelin Başı & Makyaj',
        'subtitle': 'Düğün Günü Gelinimiz',
        'quote': 'Bugün düğünüm var, Kezban ablam her konuda yanımdaydı. Asla gözünüz arkada kalmasın!',
        'image_url': 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=720&q=80',
        'duration': 12,
        'freq': 440
    },
    {
        'id': 'ref_elif_hanim',
        'title': 'Elif Hanım - 10 Yıllık Misafirimiz',
        'subtitle': 'Saç Kesimi, Boya & Fön',
        'quote': '10 yıldır geliyorum. Saçlarım gürleşti ve uzadı. Kendimi evimde gibi hissettim!',
        'image_url': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=720&q=80',
        'duration': 14,
        'freq': 493
    },
    {
        'id': 'ref_sunnet_annesi',
        'title': 'Sünnet Annesi Misafirimiz',
        'subtitle': 'Özel Davet Saçı & Taç Tasarımı',
        'quote': 'Bugün oğlumun sünnet düğünü var. Çok memnun kaldım, ellerinize sağlık!',
        'image_url': 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=720&q=80',
        'duration': 10,
        'freq': 523
    },
    {
        'id': 'ref_sari_balyaj',
        'title': 'Işıltılı Saç Dönüşümü',
        'subtitle': 'Yıpratmayan Sarı Açma & Balyaj',
        'quote': 'Saçlar yıpranmadan açıldı, dinamik katlı kesim ve dalgalı fön harika oldu!',
        'image_url': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=720&q=80',
        'duration': 12,
        'freq': 587
    },
    {
        'id': 'ref_usta_fon',
        'title': 'Kezban Hanım Usta Dokunuşu',
        'subtitle': '28 Yıllık Deneyim • İpeksi Fön',
        'quote': '28 yıllık tecrübeyle saç tellerine zarar vermeyen ayna parlaklığında fön.',
        'image_url': 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=720&q=80',
        'duration': 10,
        'freq': 659
    }
]

for item in videos_info:
    img_path = f"/tmp/{item['id']}.jpg"
    out_video = f"public/videos/{item['id']}.mp4"
    
    print(f"Downloading image for {item['id']}...")
    req = urllib.request.Request(item['image_url'], headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp, open(img_path, 'wb') as f:
            f.write(resp.read())
    except Exception as e:
        print(f"Error downloading {item['id']}: {e}")
        # fallback to existing image
        img_path = 'public/tesettur_gelin_basi.jpg'

    d = item['duration']
    freq = item['freq']
    
    # Generate MP4 with Ken Burns zoom effect, clean subtitles, brand banner and soft ambient audio
    # 540x960 9:16 vertical video
    cmd = [
        'ffmpeg', '-y',
        '-loop', '1', '-i', img_path,
        '-f', 'lavfi', '-i', f'sine=frequency={freq}:duration={d}',
        '-filter_complex',
        f"[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,"
        f"zoompan=z='min(zoom+0.0012,1.2)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d={d*25}:s=540x960:fps=25[bg];"
        f"[bg]drawbox=y=0:color=black@0.4:width=iw:height=120:t=fill,"
        f"drawbox=y=ih-200:color=black@0.65:width=iw:height=200:t=fill,"
        f"drawtext=text='KEZBAN KUAFOR GAZİEMİR':fontsize=20:fontcolor=white:x=(w-text_w)/2:y=30,"
        f"drawtext=text='@kezban_kuafor_guzellik':fontsize=14:fontcolor=0xA68966:x=(w-text_w)/2:y=65,"
        f"drawtext=text='{item['title']}':fontsize=18:fontcolor=0xFFB800:x=20:y=h-165,"
        f"drawtext=text='{item['subtitle']}':fontsize=14:fontcolor=white:x=20:y=h-135,"
        f"drawtext=text='\\\"{item['quote'][:40]}...\\\"':fontsize=13:fontcolor=0xFAF9F6:x=20:y=h-95[v];"
        f"[1:a]volume=0.08,afade=t=in:ss=0:d=1,afade=t=out:st={d-1}:d=1[a]",
        '-map', '[v]',
        '-map', '[a]',
        '-c:v', 'libx264',
        '-pix_fmt', 'yuv420p',
        '-c:a', 'aac',
        '-t', str(d),
        out_video
    ]
    
    print(f"Encoding {out_video}...")
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        print(f"FFmpeg error for {item['id']}:", res.stderr[-300:])
    else:
        print(f"Successfully generated {out_video}")

print("All video reels generated!")
