# Ergenekon — Google Play çıkışı (Trusted Web Activity)

Oyun bir PWA (manifest.webmanifest + sw.js hazır). Android uygulaması, oyunun web adresini tam ekran açan ince bir kabuktur (TWA).

## Senin yapacakların
1. **Google Play Console** hesabı aç (tek seferlik 25 $).
2. Uygulamayı oluştur: ad "Ergenekon: Demir Dağ", varsayılan dil Türkçe, oyun · ücretsiz.
3. **Uygulama imzalama** sayfasındaki *SHA-256 sertifika parmak izini* bana gönder; `public/.well-known/assetlinks.json` içine ben koyarım.
4. Mağaza kaydı için aşağıdaki görselleri onayla (ben üretebilirim).

## Benim yapacaklarım
- Bubblewrap (`@bubblewrap/cli`) ile Android projesi: paket adı `com.ergenekon.demirdag`, başlangıç adresi oyunun Pages adresi, tema rengi `#1a130d`, arka plan `#120d09`, yön "any", bildirim izni açık.
- `.aab` paketini üretip sana vermek (Play Console → Üretim → Yeni sürüm → yükle).
- Not: GitHub Pages alt klasörde (`/ergenekon/`) çalıştığı için `assetlinks.json` alan adının kökünde (`born35.github.io/.well-known/`) olmalı; bunun için ya `born35.github.io` deposu ya da kendi alan adı gerekir. Kendi alan adı (ör. ergenekon.com.tr) önerilir.

## Mağaza görsel ölçüleri
| Görsel | Ölçü | Not |
|---|---|---|
| Uygulama simgesi | 512×512 PNG, 32 bit | `public/assets/app/icon-512.png` hazır |
| Öne çıkan görsel | 1024×500 JPG/PNG | metinsiz, oba + Demir Dağ |
| Telefon ekran görüntüleri | en az 2, 1080×1920 (9:16) | oba, harita, kahramanlar, Demirci |
| 7" tablet | 1200×1920 | isteğe bağlı |
| 10" tablet | 1600×2560 | iPad'den alınabilir |
| Tanıtım videosu | YouTube bağlantısı | yönetici 🎬 sinematik kamerayla |

## Mağaza metni (taslak)
- **Kısa açıklama (80):** Bozkırda obanı büyüt, tarihî kahramanlarla Demir Dağ’ı erit.
- **Uzun açıklama:** Pazar yok, oyunculara saldırı yok, asker ölmez: Ergenekon emekle büyüyen bir strateji oyunudur. Mete Han’dan Tomris Hatun’a tarihî kahramanlar, Kutsal Ocak boyu, Akıncı dalgaları, Nevruz Simurg akını ve Sihirli Örs seni bekliyor.
- **İçerik derecelendirmesi:** şiddet (fantastik, kan yok) · sohbet (kullanıcılar arası, filtreli).
- **Veri güvenliği:** hesap e-postası, oyun ilerlemesi; satış yok, reklam yok.
- **Ödeme:** aylık premium yalnız Google Play Faturalandırma ile (Play kuralı).
