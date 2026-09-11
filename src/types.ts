export interface ServiceItem {
  id: string;
  name: string;
  category: 'sac' | 'renk' | 'kas' | 'makyaj' | 'orgu' | 'bakim' | 'tesettur';
  description: string;
  duration: string;
  popular?: boolean;
  highlight?: string;
  iconName: string;
  image?: string;
  fallbackImage?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  avatarText: string;
  role?: string;
  rating: number;
  timeAgo: string;
  text: string;
  ownerReply?: {
    date: string;
    text: string;
  };
  highlightTags?: string[];
}

export interface Appointment {
  id: string;
  fullName: string;
  phone: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  notes?: string;
  createdAt: string;
  status: 'beklemede' | 'onaylandi' | 'tamamlandi';
}

export interface BusinessHours {
  day: string;
  hours: string;
  isToday?: boolean;
  isOpen?: boolean;
}

export interface GalleryItem {
  id: string;
  category: 'sahibi' | 'distan' | 'videolar' | 'gelin' | 'renk' | 'kesim' | 'orgu' | 'makyaj' | 'tesettur';
  title: string;
  desc: string;
  img: string;
  videoUrl?: string;
  duration?: string; // e.g. "0:21"
  tag?: string;
  originalScreenshot?: string;
}

export interface VideoReference {
  id: string;
  title: string;
  clientName: string;
  clientRole: string;
  serviceTag: string;
  category: 'gelin' | 'musteri' | 'fon' | 'renk';
  duration: string;
  quote: string;
  fullTranscript: string;
  image: string;
  videoUrl: string;
  tags: string[];
  serviceId?: string;
  instagramHandle?: string;
  instagramUrl?: string;
  highlightBadge?: string;
}
