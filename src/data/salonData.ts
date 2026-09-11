import { ServiceItem, ReviewItem, BusinessHours, GalleryItem, VideoReference } from '../types';

export const SALON_INFO = {
  name: 'Kezban Güzellik Salonu & Kuaför',
  shortName: 'Kezban Kuaför',
  tagline: 'Güzelliğinize Güven ve Zarafet Katıyoruz',
  owner: 'Kezban Hanım',
  address: 'Dokuz Eylül, Havacılar Cd. Baş Bey Sitesi no 7S, 35410 Gaziemir/İzmir',
  complexName: 'Baş Bey Sitesi',
  plusCode: '84FQ+XG Gaziemir, İzmir',
  phone: '0536 355 47 75',
  phoneFormatted: '0536 355 47 75',
  phoneRaw: '+905363554775',
  landlinePhone: '0232 252 49 01',
  landlinePhoneFormatted: '0232 252 49 01',
  landlinePhoneRaw: '+902322524901',
  whatsappUrl: 'https://wa.me/905363554775',
  instagramUrl: 'https://www.instagram.com/kezban_kuafor_guzellik/',
  instagramHandle: '@kezban_kuafor_guzellik',
  rating: 5.0,
  reviewCount: 72,
  closingTime: '20:30',
  openingTime: '08:30',
  coordinates: {
    lat: 38.3249,
    lng: 27.1387,
  },
  mapUrls: {
    googleMaps: 'https://www.google.com/maps/search/?api=1&query=Dokuz+Eylül,+Havacılar+Cd.+Baş+Bey+Sitesi+no+7S,+35410+Gaziemir/İzmir',
    googleMapsDirections: 'https://www.google.com/maps/dir/?api=1&destination=Dokuz+Eylül,+Havacılar+Cd.+Baş+Bey+Sitesi+no+7S,+35410+Gaziemir/İzmir',
    appleMaps: 'https://maps.apple.com/?address=Dokuz+Eylül,+Havacılar+Cd.+Baş+Bey+Sitesi+no+7S,+35410+Gaziemir/İzmir&daddr=Dokuz+Eylül,+Havacılar+Cd.+Baş+Bey+Sitesi+no+7S,+35410+Gaziemir/İzmir&q=Dokuz+Eylül,+Havacılar+Cd.+Baş+Bey+Sitesi+no+7S,+35410+Gaziemir/İzmir',
    yandexMaps: 'https://yandex.com.tr/maps/?text=Dokuz+Eylül,+Havacılar+Cd.+Baş+Bey+Sitesi+no+7S,+35410+Gaziemir/İzmir&rtext=~Dokuz+Eylül,+Havacılar+Cd.+Baş+Bey+Sitesi+no+7S,+35410+Gaziemir/İzmir&rtt=auto',
    yandexNavi: 'yandexnavi://build_route_on_map?lat_to=38.3249&lon_to=27.1387&desc=Dokuz+Eylül,+Havacılar+Cd.+Baş+Bey+Sitesi+no+7S,+35410+Gaziemir/İzmir',
  }
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'gelin-nisan-paketi',
    name: 'İnci Detaylı Gelin & Nişan Saçı Tasarımı',
    category: 'makyaj',
    description: 'Özel tasarım el işçiliği incili saç tokaları, taç sabitleme, prova ve tüm gün bozulmayan hacimli gelin topuzları ve bukleleri.',
    duration: '120-180 dk',
    popular: true,
    highlight: 'Kezban Hanım İmzası 👑',
    iconName: 'Crown',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'sac-orgu',
    name: 'El İşçiliği Özel Örgüler & Bohem Topuz',
    category: 'orgu',
    description: 'Müşterilerimizin övgüyle bahsettiği el örgülü düşük topuzlar, taç örgüler, balıksırtı ve modern bohem saç tasarımları.',
    duration: '40-60 dk',
    popular: true,
    highlight: 'Müşteri Favorisi ⭐',
    iconName: 'Sparkle',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'canli-renklendirme',
    name: 'Canlı Renklendirme & Peekaboo (Gizli Pembe / Kızıl)',
    category: 'renk',
    description: 'Ateş kızılı, mercan, bordo ışıltılar ve saçın alt katmanına uygulanan neon pembe / mor gizli peekaboo renklendirmeler.',
    duration: '90-150 dk',
    popular: true,
    highlight: 'Trend Renkler 🎨',
    iconName: 'Palette',
    image: '/images.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'sac-renklendirme',
    name: 'Bebek Sarısı Balyaj, Platin & Mikro Röfle',
    category: 'renk',
    description: 'Saç dokusunu yıpratmadan koruyan formüllerle doğal güneş ışıltısı, bebek sarısı balyaj, dip gölge ve platin röfle uygulamaları.',
    duration: '120-180 dk',
    popular: true,
    highlight: 'Uzmanlık Alanı ✨',
    iconName: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'sac-kesim-fon',
    name: 'Hassas Islak Saç Kesimi, Küt Bob & Fön',
    category: 'sac',
    description: 'Tarak ve makasla hassas katlı kesimler, modern küt bob, fön fırçasıyla hacimli şekillendirme ve canlı saç bitişleri.',
    duration: '45-60 dk',
    popular: false,
    iconName: 'Scissors',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'profesyonel-makyaj',
    name: 'Taşlı & Işıltılı Gece / Özel Gün Makyajı',
    category: 'makyaj',
    description: 'Yüz taşları ve kristal parıltılarla zenginleştirilmiş davet ve kına makyajı, kalıcı porselen ten ve göz makyajı.',
    duration: '60-80 dk',
    popular: true,
    highlight: 'Özel Günler İçin 💎',
    iconName: 'Smile',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'kas-tasarimi',
    name: 'Efsane Kaş Tasarımı & Altın Oran Alım',
    category: 'kas',
    description: 'Kezban Hanım\'ın Gaziemir\'de meşhur altın oran kaş alımı; yüz simetrinize özel ip ve cımbızla kusursuz hatlar.',
    duration: '25-35 dk',
    popular: true,
    highlight: 'Kezban Kuaför Klasiği ⭐',
    iconName: 'Sparkles',
    image: '/kas_tasarimi.jpg',
    fallbackImage: 'https://img.freepik.com/premium-photo/procedure-laminating-eyebrows-master-distributes-special-eyebrow-brush-correct-laying-out-hairs_320071-2555.jpg?w=1200',
  },
  {
    id: 'fransiz-topuz',
    name: 'Klasik Fransız Muz Topuz & Davet Saçı',
    category: 'orgu',
    description: 'Resmi davetler, mezuniyet ve özel geceler için pürüzsüz taranmış, heykelsi kıvrımlara sahip zamansız Fransız topuzu.',
    duration: '45-60 dk',
    popular: false,
    iconName: 'Sparkle',
    image: '/fransiz_topuz.jpg',
    fallbackImage: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Chignon.JPG',
  },
  {
    id: 'keratin-bakim',
    name: 'Yoğun Keratin & Saç Botoksu Onarım Kürü',
    category: 'bakim',
    description: 'Açma ve boya işlemlerinden sonra saç tellerini derinlemesine besleyen, elektriklenmeyi önleyen onarıcı keratin bakımı.',
    duration: '75-90 dk',
    popular: false,
    iconName: 'HeartHandshake',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'tesettur-gelin-basi-makyaj',
    name: 'Tesettür Gelin Başı & Profesyonel Porselen Makyaj',
    category: 'tesettur',
    description: 'Gelinlik modelinize uygun duvak sabitleme, taç ve inci aksesuar yerleşimi, gün boyu kaymayan özel türban drape sanatı ile suya ve tere dayanıklı porselen gelin makyajı.',
    duration: '150-180 dk',
    popular: true,
    highlight: 'Gelin Özel Paketi 👑',
    iconName: 'Crown',
    image: '/tesettur_gelin_basi.jpg',
    fallbackImage: '/tesettur_model_alt.jpg',
  },
  {
    id: 'tesettur-sac-tasarimi',
    name: 'Tesettür Saç Tasarımı & Özel Şal / Türban Tasarımı',
    category: 'tesettur',
    description: 'Özel davetler, nişan, söz ve kına merasimleri için yüz şekline uygun şal ve türban bağlama modelleri, modern aksesuarlı drape ve saçın ferah şekilde toplanıp sabitlenmesi.',
    duration: '45-60 dk',
    popular: true,
    highlight: 'Özel Gün & Davet ✨',
    iconName: 'Sparkles',
    image: '/tesettur_sal_turban.jpg',
    fallbackImage: '/tesettur_hijab_style.jpg',
  },
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'review-1',
    author: 'Hacer ÖZEN',
    avatarText: 'HÖ',
    role: 'Sadık Müşteri (6 Yıldır)',
    rating: 5,
    timeAgo: '3 ay önce',
    text: '6 yıldır güvenle gittiğim tek adres. İlk günden beri samimiyeti, ilgisi ve profesyonelliği hiç değişmedi. Özellikle saç rengi, kesim ve bakım konusunda gerçekten işini severek yapan bir ekip var.',
    ownerReply: {
      date: '3 ay önce',
      text: 'Çok teşekkür ederim Hacer Hanım, her zaman bekleriz ❤️'
    },
    highlightTags: ['Saç Rengi', 'Kesim & Bakım', '6 Yıllık Güven']
  },
  {
    id: 'review-2',
    author: 'Özlem Çiğdem',
    avatarText: 'ÖÇ',
    role: 'Yerel Rehber (17 yorum · 124 fotoğraf)',
    rating: 5,
    timeAgo: '3 ay önce (düzenlendi)',
    text: 'Güler yüzlü tatlı dilli Kezban kuaförüm; kaş alımı efsanedir.👌 Siz ne isterseniz onu yapar kendi kafasına göre iş yapmaz yani. 😉 Müşteri memnuniyeti önceliklidir.🌺 hele ki saç örgülerini mutlaka deneyin derim.',
    ownerReply: {
      date: '3 ay önce',
      text: 'Çok teşekkür ederim hocam, güzel sözleriniz bizi çok mutlu etti 🌺'
    },
    highlightTags: ['Efsane Kaş Alımı', 'Saç Örgüleri', 'Müşteri Memnuniyeti']
  },
  {
    id: 'review-3',
    author: 'Ebru Kiriş',
    avatarText: 'EK',
    role: 'Google Doğrulanmış Kullanıcı',
    rating: 5,
    timeAgo: '3 ay önce',
    text: 'Kezban abla ilgisi ve güler yüzüyle her zaman beni karşıladı. Yaptığı saç modelleri ve makyaj ile istediğinize yakın çok güzel sonuçlar ortaya çıkıyor. Pratik olarak yapıyor ve kesinlikle çok profesyonel kendisini çok seviyorum. Tavsiye ederim..🌻🎀',
    ownerReply: {
      date: '3 ay önce',
      text: 'Çok teşekkür ederim Ebru hocam, sevginiz ve güveniniz için minnettarım 🌸'
    },
    highlightTags: ['Saç Modelleri', 'Profesyonel Makyaj', 'Güler Yüz']
  },
  {
    id: 'review-4',
    author: 'Selin Yılmaz',
    avatarText: 'SY',
    role: 'Yerel Ziyaretçi · Gaziemir',
    rating: 5,
    timeAgo: '1 ay önce',
    text: 'Gaziemir\'de Baş Bey Sitesi\'nde kuaför ararken tavsiye üzerine geldim. Ombre yaptırdım, tam istediğim soğuk sarı tonunu yakaladı ve saçlarım hiç yıpranmadı. Temiz, ferah bir salon.',
    ownerReply: {
      date: '1 ay önce',
      text: 'Güle güle kullanın Selin Hanım, beğendiğinize çok sevindik!'
    },
    highlightTags: ['Ombre', 'Temiz & Ferah Salon']
  },
  {
    id: 'review-5',
    author: 'Büşra Demir',
    avatarText: 'BD',
    role: 'Google Doğrulanmış Kullanıcı',
    rating: 5,
    timeAgo: '2 ay önce',
    text: 'Kına ve düğün saç-makyajım için Kezban Hanım ile çalıştık. Gece boyu ne makyajım aktı ne de saçım bozuldu. Enerjisi o kadar rahatlatıcı ki en stresli günümde ilaç gibi geldi.',
    ownerReply: {
      date: '2 ay önce',
      text: 'Ömür boyu mutluluklar dileriz Büşra Hanım, bizi tercih ettiğiniz için teşekkürler 👰'
    },
    highlightTags: ['Gelin Başı', 'Kalıcı Makyaj']
  }
];

export const BUSINESS_HOURS: BusinessHours[] = [
  { day: 'Pazartesi', hours: '08:30 - 20:30' },
  { day: 'Salı', hours: '08:30 - 20:30' },
  { day: 'Çarşamba', hours: '08:30 - 20:30' },
  { day: 'Perşembe', hours: '08:30 - 20:30' },
  { day: 'Cuma', hours: '08:30 - 20:30' },
  { day: 'Cumartesi', hours: '08:30 - 20:30' },
  { day: 'Pazar', hours: 'Randevulu / Özel Gün' },
];

export const POPULAR_HOURS = [
  { time: '08:30', percent: 20, label: 'Sakin' },
  { time: '10:30', percent: 45, label: 'Normal' },
  { time: '13:00', percent: 70, label: 'Hareketli' },
  { time: '15:00', percent: 95, label: 'En Yoğun' },
  { time: '17:30', percent: 85, label: 'Yoğun' },
  { time: '19:30', percent: 55, label: 'Normal' },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  // 1. Islak Saç Kesimi (Screenshot 1)
  {
    id: 'gal-1',
    category: 'kesim',
    title: 'Tarak & Makasla Hassas Islak Kesim',
    desc: 'Kezban Kuaför uzmanlığıyla ıslak saçta simetrik katlandırma ve modern bob kesim tekniği.',
    img: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80',
    tag: 'Islak Saç Kesimi',
    originalScreenshot: 'Screenshot - 2026-09-03T115253.488.png'
  },
  // 2. İncili Gelin Topuzu (Screenshot 2)
  {
    id: 'gal-2',
    category: 'gelin',
    title: 'İnci Aksesuarlı Özel Gelin Topuzu',
    desc: 'Gelinlerimize özel hazırlanan el işçiliği inci dalları, zarif topuz kıvrımları ve tüm gün bozulmayan kalıcılık.',
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    tag: 'İncili Gelin Başı',
    originalScreenshot: 'Screenshot - 2026-09-03T115321.329.png'
  },
  // 3. Hacimli Fön & Şekillendirme (Screenshot 3)
  {
    id: 'gal-3',
    category: 'kesim',
    title: 'Hacimli Fön & Profesyonel Fırça Şekillendirme',
    desc: 'Seramik fön fırçasıyla saça ipeksi pürüzsüzlük, doğal parlaklık ve hacim kazandıran profesyonel fön işlemi.',
    img: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80',
    tag: 'Hacimli Fön',
    originalScreenshot: 'Screenshot - 2026-09-03T115406.133.png'
  },
  // 4. Bebek Sarısı Röfleli Bob (Screenshot 4)
  {
    id: 'gal-4',
    category: 'renk',
    title: 'Küt Kesim & Kumral Üzeri Bebek Sarısı Röfle',
    desc: 'Kumral zemin üzerine incecik işlenmiş bebek sarısı mikro röfleler ve net hatlı küt kesim.',
    img: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80',
    tag: 'Bebek Sarısı Röfle',
    originalScreenshot: 'Screenshot - 2026-09-03T115426.794.png'
  },
  // 5. El Örgüsü Düşük Topuz (Screenshot 5)
  {
    id: 'gal-5',
    category: 'orgu',
    title: 'El İşçiliği Örgülü Düşük Topuz',
    desc: 'Müşterilerimizin övgüyle bahsettiği el örgüsüyle taçlandırılmış, romantik bakır kumral düşük topuz.',
    img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    tag: 'Özel El Örgüsü',
    originalScreenshot: 'Screenshot - 2026-09-03T115436.253.png'
  },
  // 6. Ateş Kızılı Saç Boyama (Screenshot 6)
  {
    id: 'gal-6',
    category: 'renk',
    title: 'Canlı Ateş Kızılı Saç Boyama',
    desc: 'Göz alıcı mercan ve ateş kızılı tonlarında, saç dokusunu kurutmayan kalıcı yoğun renk uygulaması.',
    img: 'https://images.unsplash.com/photo-1584297091622-af8e5fdcf9e2?auto=format&fit=crop&w=800&q=80',
    tag: 'Ateş Kızılı',
    originalScreenshot: 'Screenshot - 2026-09-03T115445.331.png'
  },
  // 7. Taşlı Gece Makyajı (Screenshot 7)
  {
    id: 'gal-7',
    category: 'makyaj',
    title: 'Taşlı & Kristal Parıltılı Gece Makyajı',
    desc: 'Göz çevresine yerleştirilen ışıltılı yüz taşları, bukleli özel gün topuzu ve porselen ten makyajı.',
    img: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    tag: 'Taşlı Gece Makyajı',
    originalScreenshot: 'Screenshot - 2026-09-03T115454.639.png'
  },
  // 8. İncili Dalgalı Nişan Saçı (Screenshot 8)
  {
    id: 'gal-8',
    category: 'gelin',
    title: 'İnci Tokalı Dalgalı Nişan & Nikah Saçı',
    desc: 'Gelin ve nişan davetleri için sarkan bukleler, taç örgüsü ve zarif inci sprig tokası ile yarım toplama.',
    img: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80',
    tag: 'İncili Nişan Saçı',
    originalScreenshot: 'Screenshot - 2026-09-03T115503.107.png'
  },
  // 9. Taç Örgülü Dalgalı Balyaj (Screenshot 9)
  {
    id: 'gal-9',
    category: 'orgu',
    title: 'Taç Örgülü Dalgalı Balyaj',
    desc: 'Sarı ışıltılı dalgalar üzerinde saç örgüsüyle oluşturulmuş modern ve dinamik taç tasarımı.',
    img: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80',
    tag: 'Taç Örgü Balyaj',
    originalScreenshot: 'Screenshot - 2026-09-03T115511.271.png'
  },
  // 10. Salon Vitrini & Gün Işığı Balyajı (Screenshot 10)
  {
    id: 'gal-10',
    category: 'distan',
    title: 'Salon Vitrini Önünde Gün Işığı Balyajı',
    desc: 'Gaziemir Baş Bey Sitesi salon vitrinimiz önünde doğal gün ışığıyla parıldayan bebek kumral balyaj.',
    img: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=800&q=80',
    tag: 'Salon Vitrini',
    originalScreenshot: 'Screenshot - 2026-09-03T115521.126.png'
  },
  // 11. Bordo & Kırmızı Işıltılı Bob (Screenshot 11)
  {
    id: 'gal-11',
    category: 'renk',
    title: 'Siyah Saçta Bordo & Şarap Kızılı Işıltılar',
    desc: 'Dalgalı küt saç modeline derinlik ve hareket katan zengin bordo tutamlar ve dalgalar.',
    img: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&w=800&q=80',
    tag: 'Bordo Balyaj',
    originalScreenshot: 'Screenshot - 2026-09-03T115549.502.png'
  },
  // 12. Klasik Fransız Muz Topuz (Screenshot 12)
  {
    id: 'gal-12',
    category: 'orgu',
    title: 'Salon Aynasında Klasik Fransız Muz Topuz',
    desc: 'Özel geceler ve davetler için kusursuz taranmış, heykelsi kıvrımlara sahip zamansız Fransız topuzu.',
    img: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=800&q=80',
    tag: 'Fransız Topuz',
    originalScreenshot: 'Screenshot - 2026-09-03T115556.808.png'
  },
  // 13. Gizli Pembe Peekaboo (Screenshot 13)
  {
    id: 'gal-13',
    category: 'renk',
    title: 'Gizli Pembe Balyaj (Peekaboo Underlights)',
    desc: 'Saç hareket ettirildiğinde beliren eğlenceli ve cesur fuşya / neon pembe gizli alt katman renklendirme.',
    img: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=800&q=80',
    tag: 'Peekaboo Pembe',
    originalScreenshot: 'Screenshot - 2026-09-03T115604.628.png'
  },
  // 14. Platin & Bebek Sarısı Mikro Röfle (Screenshot 14)
  {
    id: 'gal-14',
    category: 'renk',
    title: 'Platin & Bebek Sarısı İpeksi Balyaj',
    desc: 'Düz fön eşliğinde saç uçlarına kadar eşit dağılan platin sarı ve küllü mikro röfle geçişleri.',
    img: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80',
    tag: 'Platin Balyaj',
    originalScreenshot: 'Screenshot - 2026-09-03T115614.597.png'
  },
  // 15. Küt Bob & Canlı Kızıl Tutamlar (Screenshot 15)
  {
    id: 'gal-15',
    category: 'renk',
    title: 'Küt Bob & Canlı Kırmızı Balyaj Tutamları',
    desc: 'Modern asimetrik küt saç kesiminde göz alıcı parlak kırmızı tutamların dinamik uyumu.',
    img: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=800&q=80',
    tag: 'Kızıl Küt Bob',
    originalScreenshot: 'Screenshot - 2026-09-03T115624.854.png'
  },
  // 16. Katlı Kesim & Müşteri Portresi (Screenshot 16)
  {
    id: 'gal-16',
    category: 'sahibi',
    title: 'Katlı Kesim & Işıltılı Müşteri Portresi',
    desc: 'Kezban Güzellik Salonu\'nda işlem sonrası memnuniyet: katlı omuz boyu kesim ve doğal yüz makyajı.',
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    tag: 'Mutlu Müşteri',
    originalScreenshot: 'Screenshot - 2026-09-03T115652.760.png'
  },
  // 17. Tesettür Gelin Başı & Duvak Tasarımı
  {
    id: 'gal-tesettur-1',
    category: 'gelin',
    title: 'Tesettür Gelin Başı & Porselen Makyaj',
    desc: 'Özel gelin başı türban drape sanatı, duvak sabitleme, taç ve suya dayanıklı porselen gelin makyajı.',
    img: '/tesettur_gelin_basi.jpg',
    tag: 'Tesettür Gelin Başı'
  },
  // 18. Tesettür Şal & Türban Tasarımı
  {
    id: 'gal-tesettur-2',
    category: 'gelin',
    title: 'Özel Davet Şal & Türban Tasarımı',
    desc: 'Nişan, kına ve davetler için yüze uygun özel saten şal ve türban bağlama tasarımı.',
    img: '/tesettur_sal_turban.jpg',
    tag: 'Türban Tasarımı'
  },
  // 19. Salon Videosu (0:21)
  {
    id: 'gal-video',
    category: 'videolar',
    title: 'Salon Ambiyansı & Saç Şekillendirme Videosu',
    desc: 'Kezban Güzellik Salonu atmosferi, yıkama ünitesi ve fön/şekillendirme aşamaları (0:21).',
    img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
    duration: '0:21',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hairdresser-washing-a-clients-hair-in-a-salon-42844-large.mp4',
    tag: 'Video • 0:21'
  }
];

export const VIDEO_REFERENCES: VideoReference[] = [
  {
    id: 'ref-ig-renk-degisim',
    title: 'Renk Sadece Saçta Değil, Histe De Değişim Demek',
    clientName: 'Işıltılı Saç & Renk Dönüşümü',
    clientRole: 'Kezban Kuaför Misafirimiz',
    serviceTag: 'Özel Renklendirme, Işıltı & Dalgalı Fön',
    category: 'renk',
    duration: '0:21',
    quote: 'Renk sadece saçta değil… histe de değişim demek ✨ Kezban Kuaför’de kendini yeniden hisset!',
    fullTranscript: '🧿 "Renk sadece saçta değil… histe de değişim demek ✨😊😍 Kezban Kuaför’de kendini yeniden hisset 🤍🤩🌼"\n\nKezban Hanım’ın usta ellerinden çıkan özel renklendirme ve fön dokunuşuyla saçlara derinlik, ayna parlaklığı ve canlı hacim kazandırıldı.',
    image: '/videos/instagram_renk_degisim.jpg',
    videoUrl: '/videos/instagram_renk_degisim.mp4',
    instagramUrl: 'https://www.instagram.com/p/DXgo66-iTFT/',
    tags: ['Saç Bakımı', 'Fön', 'Özel Renk', 'İzmir Kuaför'],
    serviceId: 'ombre-balyaj',
    instagramHandle: '@kezban_kuafor_guzellik',
    highlightBadge: 'Renk Dönüşümü'
  },
  {
    id: 'ref-ig-emek-dokunus',
    title: 'Emek, Özen ve Sevgiyle Kusursuz Dokunuş',
    clientName: 'Kezban Hanım Usta Dokunuşu',
    clientRole: 'Saç Bakımı & Fön Sanatı',
    serviceTag: 'Profesyonel Fön, Bakım & Şekillendirme',
    category: 'fon',
    duration: '0:17',
    quote: 'Her saç; biraz emek, biraz özen, fazlasıyla da sevgi ister 🤍 Kezban Kuaför ile küçük bir dokunuş yapmaya ne dersin?',
    fullTranscript: '🌸 "Her saç, biraz emek, biraz özen, fazlasıyla da sevgi ister 🤍🧿 Kendine Kezban Kuaför’le küçük bir dokunuş yapmaya ne dersin? 😊😍"\n\n28 yıllık deneyimle saç tellerine zarar vermeden sağlanan ipeksi pürüzsüzlük ve günlerce bozulmayan hacim.',
    image: '/videos/instagram_emek_dokunus.jpg',
    videoUrl: '/videos/instagram_emek_dokunus.mp4',
    instagramUrl: 'https://www.instagram.com/p/DXXMQ3DiUot/',
    tags: ['Emek ve Özen', 'Saç Bakımı', 'İpeksi Fön', 'Güzellik'],
    serviceId: 'sac-kesim',
    instagramHandle: '@kezban_kuafor_guzellik',
    highlightBadge: 'Usta Dokunuş'
  },
  {
    id: 'ref-ig-sac-bakimi',
    title: 'Canlı Saç Bakımı & Modern Kesim Uygulaması',
    clientName: 'Daimi Misafirimiz',
    clientRole: 'Saç Bakımı & Kesim',
    serviceTag: 'Saç Kesimi, Yoğun Bakım & Fön',
    category: 'musteri',
    duration: '0:26',
    quote: 'Saçların doğal sağlığını ve ışıltısını geri kazandıran profesyonel bakım ve kesim ritüeli.',
    fullTranscript: 'Kezban Kuaför salonumuzda uygulanan saç bakımı, katlı modern kesim ve şekillendirme işlemi. Saç uçlarının canlandırılması, kırıkların temizlenmesi ve hacimli fön ile tamamlanan göz alıcı sonuç.',
    image: '/videos/instagram_sac_bakimi.jpg',
    videoUrl: '/videos/instagram_sac_bakimi.mp4',
    instagramUrl: 'https://www.instagram.com/p/DcoNIGOJy6U/',
    tags: ['Saç Bakımı', 'Kesim', 'Parlaklık', 'Keşfet'],
    serviceId: 'sac-kesim',
    instagramHandle: '@kezban_kuafor_guzellik',
    highlightBadge: 'Canlı Bakım'
  },
  {
    id: 'ref-ig-sac-degisim',
    title: 'Büyük Saç Değişimi & Dinamik Şekillendirme',
    clientName: 'Stil Yenileme & Dönüşüm',
    clientRole: 'Özel Değişim Müşterimiz',
    serviceTag: 'Dönüşüm Kesimi, Renk & Şekillendirme',
    category: 'renk',
    duration: '0:13',
    quote: 'Kişiye özel yüz hatlarına uygun kesim ve stil değişimi ile yenilenmiş bir görünüm!',
    fullTranscript: 'Kezban Kuaför & Güzellik Salonu’nda gerçekleştirilen stil değişimi: Müşterimizin saç yapısına uygun modern kesim, renk canlandırma ve profesyonel fön ile tamamlanan etkileyici değişim.',
    image: '/videos/instagram_sac_degisim.jpg',
    videoUrl: '/videos/instagram_sac_degisim.mp4',
    instagramUrl: 'https://www.instagram.com/p/DcoKG4uJVQ_/',
    tags: ['Değişim', 'Stil Yenileme', 'Fön', 'Kuaför'],
    serviceId: 'ombre-balyaj',
    instagramHandle: '@kezban_kuafor_guzellik',
    highlightBadge: 'Büyük Değişim'
  },
  {
    id: 'ref-ig-gelin-mutluluk',
    title: 'Gelin Başı, Duvak & Porselen Makyaj Zarafeti',
    clientName: 'Düğün Günü Gelinimiz',
    clientRole: 'En Özel Gün Tasarımı',
    serviceTag: 'Gelin Başı, Duvak Sabitleme & Makyaj',
    category: 'gelin',
    duration: '0:15',
    quote: 'Rabbim bir ömür boyu mutlu etsin 👰✨ En özel gününüzde hayallerinizdeki gelin başı tasarımı.',
    fullTranscript: '👰 "Rabbim bir ömür boyu mutlu etsin ✨"\n\nKezban Kuaför & Güzellik’te hazırlanan güzel gelinimiz: Saç sabitleme, duvak yerleşimi, taç tasarımı ve akmayan porselen makyajla düğün gününe hazırlandı.',
    image: '/videos/instagram_gelin_mutluluk.jpg',
    videoUrl: '/videos/instagram_gelin_mutluluk.mp4',
    instagramUrl: 'https://www.instagram.com/p/Dcf6_7YuPjo/',
    tags: ['Gelin Başı', 'Porselen Makyaj', 'Duvak', 'Mutluluk'],
    serviceId: 'gelin-basi',
    instagramHandle: '@kezban_kuafor_guzellik',
    highlightBadge: 'Gelin Özel'
  }
];
