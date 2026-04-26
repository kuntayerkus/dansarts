# Proje: İzmir DANS ARTS - Premium Web Platformu (Nisan 2026)
# Hedef: Exclusive Lead Generation & Prestij Markalaması
# Teknik Çekirdek: Next.js + Lenis + HTMLVideoElement Scrubbing (hardware-decoded)

## 1. Marka Vizyonu ve Konumlandırma
Dans Arts, İzmir'in Latin danslarındaki öncü ismi **Reyhan Şafak**'ın "Eksklüzif" (Exclusive) eğitmenliği etrafında şekillenen premium bir dijital markadır. Sıradan bir dans kursu değil, elit bir yaşam tarzı sunar. Sitenin amacı doğrudan satış yapmak değil, yüksek kaliteli görsel bir deneyim sunarak prestijli başvurular (lead) toplamaktır.

## 2. Tasarım Sistemi (Premium UI/UX)
- **Tema:** Ultra-minimalist, karanlık mod (dark mode). "Az ama öz" felsefesi.
- **Renk Paleti (Tailwind):**
  - `background`: Derin, mat siyah (`#0A0A0A` veya `#111111`)
  - `primary`: Zarif şarap/bordo (Burgundy - `#6B1123`)
  - `accent`: Şampanya / Mat Altın (Champagne Gold - `#D4AF37`)
  - `text`: Kırık beyaz / Açık Gri
- **Tipografi:** Başlıklar (Headings) için ince, zarif Serif (örn. `Cinzel` veya `Playfair Display`). Gövde metinleri için modern Sans-Serif (örn. `Inter` veya `Montserrat`).
- **Hareket (Framer Motion & Lenis):** Animasyonlar asla hızlı ve keskin olmamalı. Çok yavaş (0.8s - 1.5s), yağ gibi akan (smooth) fade-in-up ve opacity geçişleri kullanılmalıdır.

## 3. Asset Yapısı ve Video Scrubbing Mimarisi (v2 — Nisan 2026)

**Önemli mimari değişiklik:** WebP frame sequence'leri (~40 MB / 1800+ HTTP isteği) yerini, tek bir hardware-decoded MP4 dosyasına bıraktı (~6–7 MB / 1 istek). Scrubbing artık `HTMLVideoElement.currentTime` üzerinden yürür; canvas pipeline'ı tamamen kaldırıldı.

**Video Yolları (Next.js `/public` dizini referans alınarak):**
- **Hero:** `/assets/videos/slow-latin-girl.mp4` + poster: `/assets/videos/poster-girl.webp`
- **Atmosfer:** `/assets/videos/slow-latin-shoes.mp4` + poster: `/assets/videos/poster-shoes.webp`

Tek video tüm viewport'lara (object-fit: cover ile mobil'de yan crop). İleride dikey mobil varyant istenirse `ScrubScene`'e ikinci `src` prop'u eklenebilir.

**Encoding kuralı (KRİTİK):** Frame-accurate seek için video **all-keyframe GOP** ile encode edilmeli. Aksi halde Safari her seek'te en yakın keyframe'e atlar, scrub kekik olur.

```bash
# Yeni bir video eklerken — H.264 / MP4 / 720p / -g 1
ffmpeg -i kaynak.mp4 \
  -c:v libx264 -crf 20 -preset slower \
  -g 1 -keyint_min 1 -sc_threshold 0 \
  -pix_fmt yuv420p -movflags +faststart -an \
  public/assets/videos/yeni-video.mp4

# Poster image (ilk frame, ~10 KB)
ffmpeg -i public/assets/videos/yeni-video.mp4 \
  -vframes 1 -q:v 78 \
  public/assets/videos/poster-yeni.webp
```

**Doğrulama:** Re-encode sonrası `ffprobe` ile keyframe sayısı toplam frame sayısına eşit olmalı:
```bash
ffprobe -v error -select_streams v:0 -show_entries packet=flags -of csv video.mp4 | findstr /c:"K_" | find /c "K_"
```

## 4. Sayfa Mimarisi ve Akış
1. **Hero Section (The Hook):** - `girl` sekansı Canvas üzerinde çalışır. Sayfa kaydıkça video pürüzsüzce ilerler. 
   - Başlangıçta karanlık bir overlay vardır. Scroll ettikçe overlay hafifler ve "Reyhan Şafak - Hareketin En Asil Hali" metni zarifçe belirir.
   - Alt kısımda `framer-motion` ile animasyonlu, minimalist bir "Sanatı Keşfetmek İçin Kaydırın" (Scroll Indicator) çizgisi bulunur.
2. **Detay / Atmosfer Section:** - `shoe` sekansı devreye girer. Ayak hareketlerine odaklanan bu kısımda, karanlık ve prestijli bir atmosfer yaratılır. Üzerine "Adımlarınızla İzi Bırakın" gibi premium metinler biner.
3. **The Pioneer (Reyhan Şafak):** - Vogue dergisi kalitesinde bir düzen (Asimetrik grid veya bol whitespace). Reyhan Şafak'ın sektördeki öncü konumu anlatan elit metinler.
4. **Boutique Experiences (Eğitimler):** - Özel Dersler ve Masterclass eğitimlerinin zarif bir listelemesi.
5. **The Application (Lead Form):** - Altı çizgili, minimalist inputlar. "Bize Ulaşın" değil, "Özel Deneyime Başvur". Bu form ileride bir webhook (n8n) ile bağlanacak şekilde modüler tasarlanmalıdır.

## 5. AI Developer (Claude Code) İçin Kesin Talimatlar
1. **Teknoloji Yığını:** Sadece `next`, `tailwindcss`, `framer-motion`, `lenis`, ve ikonlar için `lucide-react` kullan. Gereksiz paket kurma.
2. **Performans (LCP):** Hero sahnesi `eager` ile preload edilir; Atmosfer (ve sonraki video sahneler) `IntersectionObserver` ile viewport'a 1vh kala lazy yüklenir. Poster image'lar açılışta siyah ekran riskini sıfırlar.
3. **Hook (`useVideoScrub`):** `HTMLVideoElement` + Lenis scroll progress + scroll-velocity döndürür. `velocity` çıktısı `ScrubScene`'de cinematic motion blur'a beslenir (max 2.4px). Yarı-frame'den küçük `currentTime` yazımları Safari jitter için elenir.
4. **Copywriting:** Uygulama içinde ASLA *Lorem Ipsum* veya "Dummy Text" kullanma. Markanın "Eksklüzif" ve "Lüks" vizyonuna uygun, yaratıcı Türkçe metinler (copywriting) yazarak komponentleri doldur.
5. **Sağ kenar PageProgress:** 1px altın hat + 5 bölüm tick'i; aktif bölüm IntersectionObserver ile belirlenir. Sadece desktop.