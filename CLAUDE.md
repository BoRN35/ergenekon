# Ergenekon: Claude için çalışma kuralları

Türk mitolojisi (Ergenekon destanı) temalı, Whiteout Survival / King of Altay tarzı mobil strateji oyunu.
Yayın: GitHub Pages → https://born35.github.io/ergenekon/ (`.github/workflows/pages.yml`, `main`'e push = yayın).
Ayrıntılı teknik geçmiş: `PROJECT_MEMORY.md` (her işten sonra sonuna tarihli kısa not ekle). Oyun kuralları: `OYUN-KITABI.md`.
Geçerli ChatGPT görsel istemleri: `GORSEL-ISTEMLERI.md` (`GORSEL-LISTESI.md` eski, kullanılmıyor).

## Kullanıcıyla çalışma
- Her zaman **Türkçe** yaz. Kullanıcı telefondan (ve iPad Pro 11") çalışıyor; terminal/kurulum adımı yapamaz. Her şeyi sen yap, sonucu kısa anlat.
- **Sormadan ilerle.** Yalnız bir oyun kuralı/ekonomi değişecekse sor. Komutları ve önerileri tek tek değil, toplu ver; öneriler uzun tablo hâlinde.
- Yazı kalabalığı istemiyor: kısa yanıtlar, ekran görüntüsüyle göster.
- İş bitince: commit + `main`'e push (yayın otomatik), `PROJECT_MEMORY.md`'ye not.

## Asla bozulmayacaklar
- **Oyuncu ilerlemesi asla kaybolmaz.** Kayıt `localStorage` anahtarı `ergenekon_v2`; bilinmeyen alanları koru, alan silme. Eski ve yeni kod aynı kaydı okuyabilmeli.
- Giriş şifresi kodda yalnız SHA-256 özeti olarak durur (`eg_gate`).
- Sıfır serbest ticaret/pazar, sıfır doğrudan PvP, tüm eşyalar ruha bağlı. Oyun paraya değil emeğe dayalı; tek satış ileride aylık premium (yalnız konfor). VIP, altınla anında bitirme, mağaza yok.
- Piramit kuralı: hiçbir şey (karakter, pet, yetenek, işçi, saldırılabilir canavar seviyesi) Ocak (kale) seviyesini aşamaz. Ocak en fazla 40.
- Asker ölmez, yaralanır. Çevrim dışı gelir en fazla 12 saat; haklar birikmez.

## Görünüm ve arayüz (Kasım 2026 sonu)
- **Telefon (dikey) öncelikli**; PC'ye özel düzen için emek harcama. Oba **2.5D**, 3D oba kaldırıldı (tekrar ekleme).
- Oba düzeni King of Altay şehri gibi: `public/ergenekon-altay-oba.js` (dünya 1700x5250, basamaklı yaylalar `CLIFF`, kıvrımlı yol `roadX`, binalar sabit yuvalarda `SL`, NPC'ler `NP`). Binalar izometrik değil, **karşıdan düz** duruşta.
- Alt menü `public/ergenekon-altay-hud.js` (Kahramanlar, Çanta, Posta, Boy, Dünya). Sol dikey menü yok.
- Yanıp sönen/sonsuz animasyon istemiyor. Az yazı, büyük simgeler, en fazla 3 vurgu rengi (altın, turkuaz, kehribar). Uyarılar ünlem değil tamga/altın hilal.
- Görsel tarz: yarı gerçekçi, elle boyanmış; karikatür değil.

## Görseller ve modeller
- Görseller `public/assets/img/*.webp` (küçük tut: dekor ~10 KB, büyük parçalar <100 KB).
- Kullanıcı Tripo'dan **.glb** getirirse oyuna 3D olarak koyma; `scripts/glb-sprite.py` ile önden (yaw 0/90/180/270 dene, eğim 25°) resme çevir, kırp, WebP yap. Renkleri mevcut görsellerle uyumlu hâle getir (örn. turuncu kaya → gri).
- ChatGPT görselleri zip/PNG gelebilir; yeşil (#00FF00) zemin varsa temizle.
- JS/CSS değişince `public/index.html` içindeki `?v=` sürümünü artır (service worker önbelleği için).

## Test
- `npm test` (tests/*.mjs). Görsel kontrol: `public/` klasörünü yerel sunucuyla aç, Playwright ile 430x900 ekran görüntüsü al; şifre kapısı için `localStorage.eg_gate` özetini önceden yaz.

## Bekleyen (kullanıcı müdahalesi gerekli; sorduğunda hatırlat)
- Supabase proje adresi + anon anahtarı (bulut kayıt, giriş, hile koruması, klan).
- Ödeme (iyzico/Stripe), Google Play hesabı, premium fiyatı, topluluk kanal linki.
- **Bekleyen görseller** (istemler `GORSEL-ISTEMLERI.md` sonunda; kullanıcı müsait olunca ChatGPT'den getirecek, gelince yeşil zemini temizle, WebP yap, yerine koy):
  1. `zemin_cimen.webp` (seamless çimen dokusu) — oba zemininde kodla çizilen çimenin yerine (en büyük etki)
  2. `zemin_toprak.webp` (seamless toprak yol) — yollar ve yapı zeminleri
  3. `dekor_cam_1/2.webp`, `dekor_kayin_1.webp`, `dekor_cali_1.webp` — ağaç/çalı çeşitleri (şu an dekor_agac_1/2/3 renk varyasyonu)
  4. Alt menü simgeleri: `ikon_miğfer`, `ikon_canta`, `ikon_mektup`, `ikon_kalkan`, `ikon_harita` (şu an düz SVG)
  5. `alp_boy.webp` — Alp profili büyük boydan resmi (kod hazır: varsa onu, yoksa alp.webp gösterir)
