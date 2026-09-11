import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  MessageCircle, 
  Calendar, 
  Award, 
  Instagram,
  Heart,
  Volume2,
  VolumeX,
  RotateCcw,
  FileVideo,
  Maximize2,
  Check,
  Film
} from 'lucide-react';
import { VIDEO_REFERENCES, SALON_INFO } from '../data/salonData';
import { VideoReference } from '../types';
import { getVideoUrl, saveVideoFile, hasCustomVideo, ensureVideoBlob } from '../utils/videoStorage';

interface ReferencesSectionProps {
  onSelectServiceForBooking: (serviceId?: string) => void;
}

export const ReferencesSection: React.FC<ReferencesSectionProps> = ({ 
  onSelectServiceForBooking 
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'gelin' | 'musteri' | 'fon' | 'renk'>('all');
  const [activeVideo, setActiveVideo] = useState<VideoReference | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [isLoadingBlob, setIsLoadingBlob] = useState<boolean>(false);
  
  // Real dynamic URLs loaded from IndexedDB / Server
  const [videoUrls, setVideoUrls] = useState<Record<string, string>>({});
  const [customStatus, setCustomStatus] = useState<Record<string, boolean>>({});
  const [uploadToast, setUploadToast] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Load stored videos on mount and prefetch Blobs for iOS Safari instant playback
  useEffect(() => {
    let isMounted = true;
    const loadUrls = async () => {
      const urls: Record<string, string> = {};
      const status: Record<string, boolean> = {};

      for (const ref of VIDEO_REFERENCES) {
        const url = await getVideoUrl(ref.id, ref.videoUrl);
        const isCustom = await hasCustomVideo(ref.id);
        urls[ref.id] = url;
        status[ref.id] = isCustom;
      }

      if (isMounted) {
        setVideoUrls(urls);
        setCustomStatus(status);
      }

      // Prefetch remaining videos into Blobs in background
      for (const ref of VIDEO_REFERENCES) {
        if (!isMounted) break;
        ensureVideoBlob(ref.id, ref.videoUrl).then((blobUrl) => {
          if (isMounted) {
            setVideoUrls(prev => ({ ...prev, [ref.id]: blobUrl }));
          }
        }).catch(() => {});
      }
    };

    loadUrls();
    return () => {
      isMounted = false;
    };
  }, []);

  const filterTabs = [
    { id: 'all', label: 'Tüm Instagram Videoları (5)' },
    { id: 'renk', label: 'Renk & Dönüşüm (2)' },
    { id: 'fon', label: 'Usta Fön & Emek (1)' },
    { id: 'gelin', label: 'Gelin & Özel Gün (1)' },
    { id: 'musteri', label: 'Saç Bakımı & Kesim (1)' },
  ];

  const filteredReferences = activeFilter === 'all' 
    ? VIDEO_REFERENCES 
    : VIDEO_REFERENCES.filter(item => item.category === activeFilter);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // When active video changes, reset play state and ensure blob is loaded
  useEffect(() => {
    if (!activeVideo) return;
    setIsPlaying(false);
    setCurrentTime(0);
    setIsMuted(true);

    const currentUrl = videoUrls[activeVideo.id];
    if (!currentUrl || !currentUrl.startsWith('blob:')) {
      setIsLoadingBlob(true);
      ensureVideoBlob(activeVideo.id, activeVideo.videoUrl)
        .then((blobUrl) => {
          setVideoUrls((prev) => ({ ...prev, [activeVideo.id]: blobUrl }));
          setIsLoadingBlob(false);
          const v = videoRef.current;
          if (v) {
            v.src = blobUrl;
            v.muted = true;
            v.play().then(() => setIsPlaying(true)).catch(() => {});
          }
        })
        .catch(() => {
          setIsLoadingBlob(false);
        });
    } else {
      setIsLoadingBlob(false);
      const v = videoRef.current;
      if (v) {
        v.src = currentUrl;
        v.muted = true;
        v.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  }, [activeVideo]);

  const handleOpenVideo = (video: VideoReference) => {
    setActiveVideo(video);
  };

  const handleCloseModal = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setActiveVideo(null);
    setIsPlaying(false);
    setIsLoadingBlob(false);
  };

  const handleNextVideo = () => {
    if (!activeVideo) return;
    const currentIndex = VIDEO_REFERENCES.findIndex(v => v.id === activeVideo.id);
    const nextIndex = (currentIndex + 1) % VIDEO_REFERENCES.length;
    setActiveVideo(VIDEO_REFERENCES[nextIndex]);
  };

  const handlePrevVideo = () => {
    if (!activeVideo) return;
    const currentIndex = VIDEO_REFERENCES.findIndex(v => v.id === activeVideo.id);
    const prevIndex = (currentIndex - 1 + VIDEO_REFERENCES.length) % VIDEO_REFERENCES.length;
    setActiveVideo(VIDEO_REFERENCES[prevIndex]);
  };

  // Direct user gesture play/pause toggle for iOS Safari & Android & desktop
  const handlePlayFromUserGesture = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.stopPropagation();
    }
    if (!videoRef.current) return;
    const v = videoRef.current;

    if (v.paused) {
      // First attempt unmuted play
      v.muted = false;
      setIsMuted(false);
      const playPromise = v.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.warn('Unmuted play blocked by iOS, trying muted play:', err);
            // In iOS Safari, if audio interaction is restricted, fall back to muted play smoothly
            v.muted = true;
            setIsMuted(true);
            v.play()
              .then(() => {
                setIsPlaying(true);
              })
              .catch((e2) => {
                console.warn('Muted play also blocked:', e2);
                setIsPlaying(false);
              });
          });
      }
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const handleVideoTap = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Don't toggle if user clicked a button, slider or link
    if (target.closest('a') || target.closest('button') || target.closest('input')) {
      return;
    }
    handlePlayFromUserGesture();
  };

  const handleEnableSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const v = videoRef.current;
    v.muted = false;
    setIsMuted(false);
    if (v.paused) {
      v.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const v = videoRef.current as any;
    if (v.webkitEnterFullscreen) {
      // Native iOS Safari fullscreen QuickTime player
      v.webkitEnterFullscreen();
    } else if (v.requestFullscreen) {
      v.requestFullscreen();
    } else if (v.webkitRequestFullscreen) {
      v.webkitRequestFullscreen();
    }
  };

  const togglePlayPause = () => {
    handlePlayFromUserGesture();
  };

  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    const v = videoRef.current;
    const nextMuted = !v.muted;
    v.muted = nextMuted;
    setIsMuted(nextMuted);
    if (v.paused) {
      v.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleLike = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLikedMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Helper to map files to references smartly by name or sequence
  const handleFilesSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const fileList: File[] = Array.from(files);

    const mapping: Record<string, { refId: string; serverFilename: string }> = {
      'renk': { refId: 'ref-ig-renk-degisim', serverFilename: 'instagram_renk_degisim.mp4' },
      'balyaj': { refId: 'ref-ig-renk-degisim', serverFilename: 'instagram_renk_degisim.mp4' },
      'emek': { refId: 'ref-ig-emek-dokunus', serverFilename: 'instagram_emek_dokunus.mp4' },
      'usta': { refId: 'ref-ig-emek-dokunus', serverFilename: 'instagram_emek_dokunus.mp4' },
      'fon': { refId: 'ref-ig-emek-dokunus', serverFilename: 'instagram_emek_dokunus.mp4' },
      'bakim': { refId: 'ref-ig-sac-bakimi', serverFilename: 'instagram_sac_bakimi.mp4' },
      'kesim': { refId: 'ref-ig-sac-bakimi', serverFilename: 'instagram_sac_bakimi.mp4' },
      'degisim': { refId: 'ref-ig-sac-degisim', serverFilename: 'instagram_sac_degisim.mp4' },
      'gelin': { refId: 'ref-ig-gelin-mutluluk', serverFilename: 'instagram_gelin_mutluluk.mp4' },
      'mutlu': { refId: 'ref-ig-gelin-mutluluk', serverFilename: 'instagram_gelin_mutluluk.mp4' },
    };

    const newUrls = { ...videoUrls };
    const newStatus = { ...customStatus };
    let savedCount = 0;

    // Map each file
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const lowerName = file.name.toLowerCase();

      let matchedRefId: string | null = null;
      let serverFilename: string = `ref_video_${i + 1}.mp4`;

      // Check keywords
      for (const [key, target] of Object.entries(mapping)) {
        if (lowerName.includes(key)) {
          matchedRefId = target.refId;
          serverFilename = target.serverFilename;
          break;
        }
      }

      // Fallback by order if no keyword
      if (!matchedRefId && i < VIDEO_REFERENCES.length) {
        matchedRefId = VIDEO_REFERENCES[i].id;
        const defaultFilename = VIDEO_REFERENCES[i].videoUrl.split('/').pop() || `ref_${i}.mp4`;
        serverFilename = defaultFilename;
      }

      if (matchedRefId) {
        try {
          const url = await saveVideoFile(matchedRefId, file, serverFilename);
          newUrls[matchedRefId] = url;
          newStatus[matchedRefId] = true;
          savedCount++;
        } catch (err) {
          console.error('Error saving video file:', err);
        }
      }
    }

    setVideoUrls(newUrls);
    setCustomStatus(newStatus);
    setIsUploading(false);

    setUploadToast(`${savedCount} adet orijinal video dosyası başarıyla referanslarınıza kaydedildi.`);
    setTimeout(() => setUploadToast(null), 5000);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <section id="referanslar" className="py-16 sm:py-20 bg-[#FAF9F6] border-b border-[#E8E6E1] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0EFEA] border border-[#E8E6E1] text-[#A68966] text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Gerçek Müşteri Videoları & Referanslar</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#2D2D2D] tracking-tight">
              Müşteri Referanslarımız & Canlı Videolar
            </h2>
            <p className="mt-2 text-sm sm:text-base text-stone-600 max-w-2xl">
              Kezban Kuaför & Güzellik resmi Instagram hesabımızda paylaştığımız saç değişimi, usta fön, renk açma ve gelin başı orijinal video kayıtları.
            </p>
          </div>

          {/* Instagram Trust Badge */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={SALON_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 p-2 px-3 rounded-sm bg-white border border-[#E8E6E1] shadow-2xs hover:border-[#A68966] transition-colors"
            >
              <div className="w-8 h-8 rounded-sm bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-xs">
                <Instagram className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="block font-bold text-[#2D2D2D] leading-none">@kezban_kuafor_guzellik</span>
                <span className="text-[10px] text-stone-500">Instagram Video Hikayeleri</span>
              </div>
            </a>
          </div>
        </div>

        {/* Upload Success Banner */}
        {uploadToast && (
          <div className="mb-6 p-4 rounded-sm bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center justify-between shadow-2xs animate-in fade-in duration-300">
            <div className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium">{uploadToast}</span>
            </div>
            <button onClick={() => setUploadToast(null)} className="text-emerald-700 hover:text-emerald-900 p-1">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 no-scrollbar">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-4 py-2 rounded-sm text-xs font-medium tracking-wider whitespace-nowrap transition-all ${
                activeFilter === tab.id
                  ? 'bg-[#2D2D2D] text-white shadow-xs'
                  : 'bg-white text-stone-600 border border-[#E8E6E1] hover:bg-[#F0EFEA] hover:text-[#2D2D2D]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Reference Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReferences.map((ref) => {
            const isLiked = likedMap[ref.id];
            const currentVideoUrl = videoUrls[ref.id] || ref.videoUrl;
            const isCustom = customStatus[ref.id];

            return (
              <div
                key={ref.id}
                onClick={() => handleOpenVideo(ref)}
                className="group relative bg-white rounded-sm border border-[#E8E6E1] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer"
              >
                {/* Visual Video Container */}
                <div className="relative aspect-[4/5] overflow-hidden bg-stone-900">
                  {/* High Resolution Video Poster on Card */}
                  <img
                    src={ref.image}
                    alt={ref.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F1F1F] via-[#1F1F1F]/30 to-transparent pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                    <a
                      href={ref.instagramUrl || SALON_INFO.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-2.5 py-1 rounded-sm bg-black/75 hover:bg-black backdrop-blur-xs text-white text-[11px] font-semibold border border-white/20 flex items-center gap-1.5 transition-colors z-10"
                      title="Instagram'daki Orijinal Gönderiyi Aç"
                    >
                      <Instagram className="w-3 h-3 text-pink-400" />
                      <span>{ref.instagramHandle}</span>
                    </a>

                    <div className="flex items-center gap-1.5">
                      {isCustom && (
                        <span className="px-2 py-0.5 rounded-sm bg-emerald-600 text-white text-[10px] font-bold shadow-xs">
                          Orijinal Kayıt
                        </span>
                      )}
                      <span className="px-2.5 py-1 rounded-sm bg-[#A68966] text-white text-[11px] font-bold shadow-xs pointer-events-none">
                        {ref.highlightBadge}
                      </span>
                    </div>
                  </div>

                  {/* Center Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-14 h-14 rounded-full bg-white/90 text-[#2D2D2D] flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#A68966] group-hover:text-white transition-all duration-300">
                      <Play className="w-6 h-6 fill-current ml-1" />
                    </div>
                  </div>

                  {/* Bottom Video Duration & Client Overlay */}
                  <div className="absolute bottom-3 inset-x-3 pointer-events-none">
                    <div className="flex items-center justify-between text-white/90 text-xs mb-1.5">
                      <span className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-sm backdrop-blur-xs font-mono">
                        <Clock className="w-3 h-3 text-[#A68966]" />
                        <span>{ref.duration}</span>
                      </span>
                      <span className="text-[11px] text-white/90 font-medium flex items-center gap-1">
                        <FileVideo className="w-3 h-3 text-[#A68966]" />
                        <span>Canlı Video</span>
                      </span>
                    </div>
                    <div className="text-white font-serif text-lg leading-tight group-hover:text-[#FAF9F6] transition-colors">
                      {ref.clientName}
                    </div>
                    <div className="text-white/80 text-xs mt-0.5 font-medium">
                      {ref.clientRole}
                    </div>
                  </div>
                </div>

                {/* Card Content & Transcript Quote */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#A68966] line-clamp-1">
                        {ref.serviceTag}
                      </span>
                      <button
                        onClick={(e) => toggleLike(ref.id, e)}
                        className="text-stone-400 hover:text-rose-500 transition-colors p-1 cursor-pointer"
                        title="Beğen"
                      >
                        <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                      </button>
                    </div>

                    <h3 className="text-base font-semibold text-[#2D2D2D] leading-snug group-hover:text-[#A68966] transition-colors mb-2.5">
                      {ref.title}
                    </h3>

                    {/* Direct Quote Bubble */}
                    <div className="p-3 rounded-sm bg-[#F0EFEA]/80 border border-[#E8E6E1] text-stone-700 text-xs italic leading-relaxed mb-3">
                      “{ref.quote}”
                    </div>
                  </div>

                  {/* Bottom Actions & Tags */}
                  <div className="pt-2 border-t border-[#E8E6E1]">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {ref.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-sm">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenVideo(ref);
                        }}
                        className="flex-1 py-2 px-3 rounded-sm bg-[#2D2D2D] text-white hover:bg-[#3D3D3D] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Videoyu İzle</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectServiceForBooking(ref.serviceId);
                        }}
                        className="py-2 px-4 rounded-sm border border-[#A68966] text-[#A68966] hover:bg-[#A68966] hover:text-white text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer"
                        title="Bu işlem için randevu oluştur"
                      >
                        Randevu Al
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Trust Banner */}
        <div className="mt-12 p-6 rounded-sm bg-white border border-[#E8E6E1] shadow-2xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-sm bg-[#2D2D2D] text-[#A68966] flex items-center justify-center shrink-0 border border-[#E8E6E1]">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg text-[#2D2D2D] font-medium">
                28 Yıllık Güven ve Orijinal Müşteri Kayıtları
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
                Tüm videolar salonumuzda ağırladığımız gerçek gelinlerimiz, daimi misafirlerimiz ve Kezban Hanım'ın bizzat yaptığı uygulamalara aittir.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <a
              href={SALON_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-initial py-2.5 px-4 rounded-sm bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Danışma</span>
            </a>
            <button
              onClick={() => onSelectServiceForBooking()}
              className="flex-1 md:flex-initial py-2.5 px-4 rounded-sm bg-[#2D2D2D] hover:bg-[#3D3D3D] text-[#FAF9F6] text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#A68966]" />
              <span>Online Randevu Al</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Video Reference Modal / Real HTML5 Video Player */}
      {activeVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={handleCloseModal}
        >
          <div 
            className="relative w-full max-w-4xl bg-[#141414] text-white rounded-sm border border-stone-800 shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-black/70 hover:bg-black text-white/90 hover:text-white flex items-center justify-center transition-colors shadow-md cursor-pointer"
              title="Kapat"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Left Column: Real HTML5 Video Player with Native & Custom Mobile Controls */}
            <div 
              className="relative w-full md:w-1/2 aspect-[9/16] md:aspect-auto min-h-[380px] md:min-h-[520px] bg-black flex flex-col justify-between overflow-hidden cursor-pointer select-none group/player"
              onClick={handleVideoTap}
            >
              {/* Actual Video Tag with iOS WebKit inline & autoplay attributes */}
              <video
                key={activeVideo.id}
                ref={(el) => {
                  videoRef.current = el;
                  if (el) {
                    el.playsInline = true;
                    el.setAttribute('playsinline', 'true');
                    el.setAttribute('webkit-playsinline', 'true');
                    el.setAttribute('x5-playsinline', 'true');
                    el.defaultMuted = true;
                  }
                }}
                src={videoUrls[activeVideo.id] || activeVideo.videoUrl}
                poster={activeVideo.image}
                playsInline
                muted={isMuted}
                autoPlay
                preload="auto"
                onLoadedMetadata={(e) => {
                  const v = e.currentTarget;
                  setDuration(v.duration || 0);
                  v.muted = true;
                  const p = v.play();
                  if (p !== undefined) {
                    p.then(() => setIsPlaying(true)).catch(() => {});
                  }
                }}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                className="w-full h-full object-contain md:object-cover object-center bg-black"
              />

              {/* Seamless Loading Spinner while Blob is being downloaded into memory/IndexedDB */}
              {isLoadingBlob && (
                <div 
                  className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/85 backdrop-blur-xs text-white p-6"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="w-10 h-10 rounded-full border-2 border-[#A68966] border-t-transparent animate-spin mb-3" />
                  <p className="text-sm font-serif font-medium text-[#E8DCC4] mb-1">Video Yükleniyor</p>
                  <p className="text-xs text-stone-400">iOS ve mobil cihazlar için optimize ediliyor...</p>
                </div>
              )}

              {/* Central Tap-to-Play Indicator for Mobile / Desktop */}
              {!isPlaying && !isLoadingBlob && (
                <div 
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/50 backdrop-blur-[2px] transition-all cursor-pointer"
                  onClick={handlePlayFromUserGesture}
                >
                  <button 
                    type="button"
                    onClick={handlePlayFromUserGesture}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#A68966] hover:bg-[#8F7454] text-white flex items-center justify-center shadow-2xl transform active:scale-95 transition-transform cursor-pointer"
                    aria-label="Videoyu Başlat"
                  >
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1" />
                  </button>
                  <span className="mt-3 text-xs sm:text-sm text-white font-medium px-4 py-1.5 rounded-full bg-black/80 border border-white/20 shadow-md">
                    Oynatmak için dokunun
                  </span>
                </div>
              )}

              {/* Floating "Unmute Sound" badge when playing muted on phone */}
              {isPlaying && isMuted && (
                <div className="absolute bottom-16 inset-x-0 z-20 flex justify-center pointer-events-none">
                  <button
                    type="button"
                    onClick={handleEnableSound}
                    className="pointer-events-auto px-4 py-2 rounded-full bg-black/85 hover:bg-black text-white text-xs font-semibold border border-[#A68966] shadow-xl flex items-center gap-2 animate-bounce cursor-pointer"
                  >
                    <VolumeX className="w-4 h-4 text-[#A68966]" />
                    <span>Sesi Açmak İçin Dokunun</span>
                  </button>
                </div>
              )}

              {/* Bottom Video Controls Bar */}
              <div 
                className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/95 via-black/70 to-transparent z-20 flex flex-col gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Progress Bar (Scrubber) */}
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    step={0.1}
                    value={currentTime}
                    onChange={(e) => {
                      const newTime = parseFloat(e.target.value);
                      setCurrentTime(newTime);
                      if (videoRef.current) {
                        videoRef.current.currentTime = newTime;
                      }
                    }}
                    className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#A68966]"
                  />
                </div>

                {/* Controls row */}
                <div className="flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handlePlayFromUserGesture}
                      className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
                      title={isPlaying ? 'Durdur' : 'Oynat'}
                    >
                      {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>

                    <button
                      type="button"
                      onClick={toggleMute}
                      className="p-1.5 rounded-full hover:bg-white/20 text-white flex items-center gap-1 transition-colors cursor-pointer"
                      title={isMuted ? 'Sesi Aç' : 'Sesi Kapat'}
                    >
                      {isMuted ? (
                        <>
                          <VolumeX className="w-4 h-4 text-amber-400" />
                          <span className="text-[11px] text-amber-400 font-medium">Sesi Aç</span>
                        </>
                      ) : (
                        <Volume2 className="w-4 h-4 text-[#A68966]" />
                      )}
                    </button>

                    <span className="text-[11px] font-mono text-stone-300">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleFullscreen}
                      className="p-1.5 rounded-full hover:bg-white/20 text-white/90 hover:text-white transition-colors cursor-pointer"
                      title="Tam Ekran"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Instagram Story Top Header Overlay */}
              <div className="absolute top-0 inset-x-0 p-4 bg-gradient-to-b from-black/80 to-transparent z-20 flex items-center justify-between text-xs pointer-events-none">
                <a
                  href={activeVideo.instagramUrl || SALON_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 pointer-events-auto group/insta"
                  title="Instagram'daki Orijinal Gönderiyi Aç"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-xs group-hover/insta:scale-105 transition-transform">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold block text-white leading-none group-hover/insta:text-pink-300 transition-colors">{activeVideo.instagramHandle}</span>
                    <span className="text-[10px] text-stone-300">Instagram Gönderisini Aç ↗</span>
                  </div>
                </a>
                <div className="flex items-center gap-2 pr-8 pointer-events-auto">
                  <button
                    type="button"
                    onClick={handleFullscreen}
                    className="p-1.5 rounded-sm bg-black/60 hover:bg-black text-white/90 hover:text-white border border-white/20 transition-colors"
                    title="Tam Ekran"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                  <span className="bg-black/60 border border-white/20 px-2 py-0.5 rounded-sm text-[11px] font-mono text-[#A68966]">
                    {activeVideo.duration}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Full Details & Verbatim Transcript */}
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto max-h-[480px] md:max-h-[560px] bg-[#1a1a1a]">
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-sm bg-[#A68966]/20 border border-[#A68966]/40 text-[#A68966] text-[11px] font-semibold">
                      {activeVideo.highlightBadge}
                    </span>
                    <span className="text-stone-400 text-xs flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Doğrulanmış Müşteri</span>
                    </span>
                  </div>

                  <span className="text-[10px] text-stone-400 font-mono flex items-center gap-1">
                    <Film className="w-3 h-3 text-[#A68966]" />
                    <span>Canlı MP4</span>
                  </span>
                </div>

                {/* Client Info */}
                <h3 className="font-serif text-xl sm:text-2xl text-white font-medium mb-1">
                  {activeVideo.clientName}
                </h3>
                <p className="text-xs text-[#A68966] font-medium mb-4">
                  {activeVideo.clientRole} • {activeVideo.serviceTag}
                </p>

                {/* Spoken Words / Transcript Box */}
                <div className="mb-4">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-2 flex items-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5 text-[#A68966]" />
                    <span>Birebir Video Konuşma Dökümü:</span>
                  </div>
                  <div className="p-4 rounded-sm bg-stone-900 border border-stone-800 text-stone-200 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-light shadow-inner">
                    {activeVideo.fullTranscript}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {activeVideo.tags.map((tag, idx) => (
                    <span key={idx} className="text-[10px] bg-stone-800 text-stone-400 px-2 py-0.5 rounded-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Footer Controls */}
              <div className="pt-4 border-t border-stone-800">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <button
                    onClick={() => {
                      handleCloseModal();
                      onSelectServiceForBooking(activeVideo.serviceId);
                    }}
                    className="flex-1 min-w-[140px] py-2.5 px-3 rounded-sm bg-[#A68966] hover:bg-[#8F7454] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Randevu Al</span>
                  </button>

                  <a
                    href={SALON_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-sm bg-stone-800 hover:bg-stone-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp</span>
                  </a>

                  {activeVideo.instagramUrl && (
                    <a
                      href={activeVideo.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-sm bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs"
                      title="Orijinal Instagram Gönderisini Aç"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                      <span>Instagram'da Gör</span>
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={handleFullscreen}
                    className="py-2.5 px-3 rounded-sm bg-[#A68966]/20 border border-[#A68966]/40 hover:bg-[#A68966]/30 text-[#A68966] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    title="iPhone Safari QuickTime Tam Ekran Oynatıcıyı Başlat"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>iPhone Tam Ekran</span>
                  </button>

                  <a
                    href={videoUrls[activeVideo.id] || activeVideo.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-sm bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                    title="Doğrudan MP4 Video Dosyasını Yeni Sekmede Aç"
                  >
                    <Film className="w-3.5 h-3.5 text-[#A68966]" />
                    <span>Videoyu Aç</span>
                  </a>
                </div>

                {/* Prev / Next Video Switcher */}
                <div className="flex items-center justify-between text-xs text-stone-400 pt-2">
                  <button
                    onClick={handlePrevVideo}
                    className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Önceki Referans</span>
                  </button>
                  <span className="text-[11px] font-mono text-stone-500">
                    {VIDEO_REFERENCES.findIndex(v => v.id === activeVideo.id) + 1} / {VIDEO_REFERENCES.length}
                  </span>
                  <button
                    onClick={handleNextVideo}
                    className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                  >
                    <span>Sonraki Referans</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
