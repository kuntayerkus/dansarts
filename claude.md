# Proje: İzmir DANS ARTS - Premium Web Platformu (Nisan 2026)
# Hedef: Exclusive Lead Generation & Prestij Markalaması
# Teknik Çekirdek: Next.js + Lenis + HTMLVideoElement Scrubbing (hardware-decoded)

## 1. Marka Vizyonu ve Konumlandırma (Brand Strategy v2 — 2026)
Dans Arts, İzmir'in Latin danslarındaki öncü ismi **Reyhan Şafak** (TDSF 2. Kademe Antrenör · 32 yıllık tecrübe · 10.000+ öğrenci) etrafında şekillenen premium bir dijital markadır.

**Yeni konumlandırma:** *"Sahnemiz Her Yer. Her Akşam Yeniden."* — sabit stüdyo modeli yerine İzmir'in en seçkin sahneleriyle (lüks oteller, butik şarap evleri, lobi barlar, roof-top'lar) kurulan davete açık deneyim modeli. Site **bireysel öğrenci/çift lead'i** ve **etkinlik brief'i** topluyor; "mekanlara teklif sunan" değil, "mekanların başvurduğu" konumdayız — bu nedenle Partnership pitch bölümü kasıtlı olarak yok.

Sıradan bir dans kursu değil; "her sınıf yalnızca bir kez yaşanır" felsefesinin dijital vitrini.

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

## 4. Sayfa Mimarisi ve Akış (7 bölüm — Brand Strategy v2)
1. **Bölüm 01 · Hero / Manifesto (`#hero`):** `girl` videosu üzerinde "Sahnemiz Her Yer. Her Akşam Yeniden." manifesto başlığı. Heritage stat row (10.000+ öğrenci · 32 yıl · TDSF 2. Kademe).
2. **Bölüm 02 · Atmosfer (`#manifesto`):** `shoes` videosu. "Adres değil, bir Deneyim" — venue rotation copy (Karşıyaka terası, Alsancak butik şarap evi, Çeşme lobi bar). Sahne adı: İzmir.
3. **Bölüm 03 · Öncü (`#oncu`):** Reyhan Şafak portresi (`/assets/REYHANHERO.webp`, lossless 1600w) + tam biyografi. 6 timeline kartı 1995'ten başlar: Crawley, İzmir Dönüş, Ege Konservatuarı, Dans Arts Ortaklık, Türkiye 1.liği, TDSF 2. Kademe.
4. **Bölüm 04 · Uluslararası Vizyon (`#vizyon`):** Festivaller (Buenos Aires, Sofya, Yunta Brava, Ankara), birlikte çalışılan tango efsaneleri & latin ustaları, öne çıkan sahneler (Hilton Viyana, AKM vs.). Tüm isimler YouTube arama sonucuna açılır.
5. **PressMarquee:** Sahnedeki imzalar — gerçek venue/festival listesi, sonsuz horizontal strip.
6. **Bölüm 05 · Sahne · Repertuvar (`#sahne`):** Üç sütun (Sportif Latin / Ballroom / Sosyal Danslar) + destekleyici repertuvar (Club Cha Cha, La Rueda, Two Step, Line Dance, Oryantal, Modern altyapı).
7. **Bölüm 06 · Boutique Experiences (`#deneyim`):** 5 hizmet paketi — VIP Düğün (feature), Wine Night (feature), Özel Ders, Butik Grup, Masterclass.
8. **Bölüm 07 · Başvuru (`#basvuru`):** 2-mode form (Özel Ders / Etkinlik Brief). mailto-relay (alıcı: dansartsreyhan@gmail.com); ileride webhook'a bağlanacak.
9. **Footer:** Kapanış manifesto ("Sahnemiz her yer. Her akşam yeniden. Ve adı İzmir."), 12-kol grid (brand 5 / nav 3 / heritage 3), Instagram + e-posta, miras stat trio.

## 5. AI Developer (Claude Code) İçin Kesin Talimatlar
1. **Teknoloji Yığını:** Sadece `next`, `tailwindcss`, `framer-motion`, `lenis`, ve ikonlar için `lucide-react` kullan. Gereksiz paket kurma.
2. **Performans (LCP):** Hero sahnesi `eager` ile preload edilir; Atmosfer (ve sonraki video sahneler) `IntersectionObserver` ile viewport'a 1vh kala lazy yüklenir. Poster image'lar açılışta siyah ekran riskini sıfırlar.
3. **Hook (`useVideoScrub`):** `HTMLVideoElement` + Lenis scroll progress + scroll-velocity döndürür. `velocity` çıktısı `ScrubScene`'de cinematic motion blur'a beslenir (max 2.4px). Yarı-frame'den küçük `currentTime` yazımları Safari jitter için elenir.
4. **Copywriting:** Uygulama içinde ASLA *Lorem Ipsum* veya "Dummy Text" kullanma. Markanın "Eksklüzif" ve "Lüks" vizyonuna uygun, yaratıcı Türkçe metinler (copywriting) yazarak komponentleri doldur.
5. **Sağ kenar PageProgress:** 1px altın hat + 7 bölüm tick'i (Manifesto, Atmosfer, Öncü, Vizyon, Sahne, Deneyim, Başvuru); aktif bölüm IntersectionObserver ile belirlenir. Sadece desktop. MobileNav ve Footer nav aynı 6 link'i taşır (Atmosfer ile başlar, Hero kendisi varsayılan landing'dir).
6. **Brand strategy kaynağı:** `C:\Users\kunta\Masaüstü\DANS-ARTS\DansArts_Marka_Strateji_Raporu.pdf` — 9 sayfalık partnership & venue program belgesi (2026). Yeni copy/section eklerken bu kaynaktaki kelime, fakta ve istatistiklere sadık kal: 1995 başlangıç, 32 yıl tecrübe, 10.000+ öğrenci, TDSF 2. Kademe, 2008 Türkiye 1.liği, Hilton Viyana Balosu vb.