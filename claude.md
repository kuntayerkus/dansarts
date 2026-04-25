# Proje: İzmir DANS ARTS - Premium Web Platformu (Nisan 2026)
# Hedef: Exclusive Lead Generation & Prestij Markalaması
# Teknik Çekirdek: Next.js + Lenis + Canvas Video Scrubbing

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

## 3. Asset Yapısı ve Canvas Scrubbing Mimarisi
Projede video oynatılmayacak; bunun yerine performans (60fps pürüzsüzlük) için önceden WebP formatına çevrilmiş kare dizileri (image sequences) Lenis scroll progress'i ile Canvas'a çizdirilecektir.

**Kare Dizisi Yolları (Next.js `/public` dizini referans alınarak):**
Geliştirici, `window.innerWidth` değerine göre (Masaüstü vs Mobil) doğru klasörü seçmelidir.
- **Hero Sahnesi (Girl):**
  - Masaüstü: `/assets/frames/desktop/girl/`
  - Mobil: `/assets/frames/mobile/girl/`
- **Detay Sahnesi (Shoe):**
  - Masaüstü: `/assets/frames/desktop/shoe/`
  - Mobil: `/assets/frames/mobile/shoe/`

## 4. Sayfa Mimarisi ve Akış
1. **Hero Section (The Hook):** - `girl` sekansı Canvas üzerinde çalışır. Sayfa kaydıkça video pürüzsüzce ilerler. 
   - Başlangıçta karanlık bir overlay vardır. Scroll ettikçe overlay hafifler ve "Reyhan Şafak - Hareketin En Asil Hali" metni zarifçe belirir.
   - Alt kısımda `framer-motion` ile animasyonlu, minimalist bir "Sanatı Keşfetmek İçin Kaydırın" (Scroll Indicator) çizgisi bulunur.
2. **Detay / Atmosfer Section:** - `shoe` sekansı devreye girer. Ayak hareketlerine odaklanan bu kısımda, karanlık ve prestijli bir atmosfer yaratılır. Üzerine "Adımlarınızla İzi Bırakın" gibi premium metinler biner.
3. **The Pioneer (Reyhan Şafak):** - Vogue dergisi kalitesinde bir düzen (Asimetrik grid veya bol whitespace). Reyhan Şafak'ın sektördeki öncü konumu anlatan elit metinler.
4. **Boutique Experiences (Eğitimler):** - Özel Dersler ve Masterclass eğitimlerinin zarif bir listelemesi.
5. **The Application (Lead Form):** - Altı çizgili, minimalist inputlar. "Bize Ulaşın" değil, "Özel Deneyime Başvur". Bu form ileride bir webhook (n8n) ile bağlanacak şekilde modüler tasarlanmalıdır.

## 5. AI Developer (Claude Code) İçin Kesin Talimatlar
1. **Teknoloji Yığını:** Sadece `next`, `tailwindcss`, `framer-motion`, `lenis` (`@studio-freight/react-lenis`), ve ikonlar için `lucide-react` kullan. Gereksiz paket kurma.
2. **Performans (LCP & Pre-load):** Canvas scrubbing işleminde ilk 10-20 karenin (frame) öncelikli yüklenmesini (priority pre-load) sağla ki açılışta siyah ekran kalmasın. Kalan kareleri arkaplanda yükle.
3. **Hooks:** Scroll değerini Lenis'ten alıp Canvas rendering işlemini yürüten yeniden kullanılabilir bir `useVideoScrub(framePath, frameCount)` hook'u yaz.
4. **Copywriting:** Uygulama içinde ASLA *Lorem Ipsum* veya "Dummy Text" kullanma. Markanın "Eksklüzif" ve "Lüks" vizyonuna uygun, yaratıcı Türkçe metinler (copywriting) yazarak komponentleri doldur.