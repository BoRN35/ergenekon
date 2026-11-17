# Ergenekon — sonraki çalışmalar için proje notları

Son kullanıcı kararı: 17 Kasım2026 (Türkiye).

## Ertelenen Tripo Studio harita paketi

Kullanıcı hazır harita modellerini indirme işini **şimdilik erteledi**. Sonra sorduğunda bu listeyi hatırlat. Bu iş tamamlanmış/indirilmiş sayılmıyor; yeni model üretilmedi, yükleme veya ücretli Tripo işlemi yapılmadı.

**Oba ve binalar özel tasarlatılacak. Hazır ürün taramasına dahil etme.** Hazır varlıklar asker, at/binici, yük arabası, canavar, ağaç, çalı, kaya ve cevher gibi bağımsız nesneler olabilir.

İlk harita paketi önceliği: çam → demir cevheri → doğal kaya → geyik → kurt → ayı → çalı → uzak dağ.

Doğrulanan katalog adayları:
- Çam: https://studio.tripo3d.ai/3d-model/Create-a-game-ready-pine-tree-for-a-PC-woodcutting-simulation-game-T-c9dd64d2-2b45-439e-8a81-adfa61462ce4
- Demir cevheri: https://studio.tripo3d.ai/3d-model/2a48442b-559c-4c34-8db7-9132d434d135
- Kaya: https://studio.tripo3d.ai/3d-model/low-poly-rock-with-angular-facets-gray-stone-texture-and-geometric-su-5cae547d-b9f9-4e53-beec-cc4b9e2a480d
- Geyik: https://studio.tripo3d.ai/3d-model/low-poly-3d-deer-model-simple-geometric-style-smooth-shading-styliz-104e3df6-0d5d-48df-aee7-5260b9771fab
- Kurt: https://studio.tripo3d.ai/3d-model/create-a-full-body-3d-model-of-a-fearsome-wolf-enemy-for-a-dark-fantas-45664bee-04c3-41e6-a297-50836e38a208
- Ayı: https://studio.tripo3d.ai/3d-model/low-poly-bear-85bf3a89-6f96-478f-a269-f165a41b0a54
- Çalı: https://studio.tripo3d.ai/3d-model/low-poly-forest-bush-game-asset-only-no-character-no-humanoid-no-ha-ca61cd4b-d371-47e6-8c8f-c75e422c1b41
- Dağ: https://studio.tripo3d.ai/3d-model/Create-a-massive-realistic-3D-mountain-model-inspired-by-Mount-Kailash-7098c70a-9e0f-491e-ace9-44ff7aab2a77

Teknik hedef: Three.js için gömülü PBR dokulu GLB, genelde1K doku; statik küçük nesneler300–3000üçgen, hayvanlar3000–6000üçgen hedeflenir. Bunlar indirilmiş dosyaların ölçümü değildir. Mevcut oyunda özel Draco/Meshopt/KTX2 decoder bağlantısı ve rig/AnimationMixer hattı yok. Animasyon ücretini modeli kontrol etmeden harcama. Lisans/indirme bedeli model hesabında doğrulanmalı. Sitedeki Oluştur düğmesini hazır model indirmek için kullanma.

16 Kasım ekranında Studio bakiyesi1655 görünüyordu; bu güncel bakiye garantisi değildir. Önceden doğrulanan API bakiyesi10 idi. Studio ve API fiyatlarını birbirine uygulama.

## Kullanıcının oyun tercihleri

- Otomatik kayıt açık; kayıt seçimi/onayı sorma. Alternatif kayıtları koruyarak eşitle.
- Son açık erişim kararı: yalnız sahibi erişsin. Haritada yalnız gerçek hesap kayıtlarını gerçek oyuncu olarak göster; botları gerçekmiş gibi tanıtma.
- Whiteout Survival Wiki bağımsız bir wiki sitesi/raporu olarak hazırlanmayacak; uygun mekanikler Ergenekon hikâyesine uyarlanarak mevcut oyuna entegre edilecek.
- Yapı görünümleri oyun içindeki Kurultay yönetiminde bulunacak.

## Doğrulanmış içerik kapsamı

17 Kasım 2026 güncellemesi doğrudan oyun kurallarındadır: 40 ayrı araştırma türü (mevcut15 anahtar korunarak25 yeni tür), üç dal, tür başına10 seviye. Araştırma bedeli/süresi, Ocak ve ana araştırma koşulları aynı işlem denetimlerine bağlıdır. Yeni araştırmalar kafile, üretim/toplama, eğitim, tedavi, yapı kaynak indirimi, sınıf saldırı/savunma/canı ve yaralı oranını gerçekten etkiler; arena kayıt anındaki özelliklere de aktarılır.

11 yapı için0→1’den39→40’a kadar açık bedel/süre verileri `public/upgrade-balance.js` içindedir. İlk beş teklif eski ekonomiyle aynı tutulur; sonraki seviyeler wiki yapı ilerlemesinin Ergenekon’un üç kaynağı ve40seviyesine ölçeklenmiş uyarlamasıdır. Kaynaklar dosya yorumlarındadır; wiki bedellerinin birebir aktarıldığı iddia edilmez. İleri Ocak yükseltmelerinde Oba ve askeri yapı koşulları gerçekten denetlenir. Oba kaynak/süre farkı her seviyedeOcak×1.4 (kaynak indirimi sonrası da) korunur. Eski devam eden işler yeniden ücretlendirilmez; kalan süreleri korunur.

Kullanıcı oyuncuya uyarlama planı/seviye maliyeti tabloları gösterilmesini istemiyor. Kurultay’daki Yükseltme planı sekmesi, Seviye maliyetleri düğmeleri ve tüm-seviye tabloları kaldırılmıştır. Normal inşa/araştırma işleminin kendi bedel ve süresi eylemin yanında görünür. Gelecekte yeniden ayrı plan/wiki ekranı ekleme. Whiteout Wiki’deki tüm kahraman, etkinlik, ittifak ve diğer içerikler bütünüyle aktarılmış değildir; bütün site tamamlandı gibi sunma.


## 17 Kasım: Kaynak araştırmalarının doğrudan aktarımı

Kullanıcı bütün mekanikleri birebir istiyor; Ergenekon hikâyesi/yapı/kahraman adları korunacak. Bu istek yalnız40araştırma ile karşılanmış sayılmıyor. Şu güncelleme araştırma, ilgili yeni kaynaklar/yapılar ve kristal arıtma üzerindedir; tüm Whiteout kahraman/ittifak/etkinlik/ada/pet/ekipman sistemleri tamamlandı diye sunma.

Resmî /research/ kataloğundan287gerçekaraştırma,2643seviye alındı; /research/2/ ilave düğüm getirmiyor. `data/whiteout-research-source.json` ham sayısal kayıtlardır. `scripts/collect-whiteout-research.py` toplar, `scripts/normalize-whiteout-research.py` normalize eder; `public/whiteout-research-data.js` kaynakURL/bedel/süre/önkoşul/bonus/güç verilerini, `public/whiteout-research.js` oyun bağlantılarını içerir. Eski40araştırma tanımları eski kayıtların ve devam eden işlerin korunması için tutulur; normal araştırma arayüzü287kaynakdüğümünü gösterir.

77seviye kaydında süre eksik/bozuk; bir kaynakönkoşulu ResearchCenter seviyesi belirsiz. Bu seviyeler başlatılamaz, süre uydurulmaz. Normal araştırmaların azami seviyeleri kaynağa göre değişir (3,6,10,50vb), hepsine10uygulanmaz. Bonuslar kaynaktaki yüzdepuan/düzsayı ayrımıyla uygulanır. Exalted, Molten, Solar Supremacy ve üç özel beceri düğümünün artan toplam bonusları cumulative olarak ayrıdır. Özel3becerinin9seviyesinde etkinin sayısal davranışı yayımlanmadığından o seviyeler de başlatılamaz; toplam86zaman/etki eksik seviye ve1seviyesi belirsiz önkoşul vardır. Kömür,çelik,kristal,kristalparçası,arıtılmışkristal eklenmiştir; normal hammadde ödülü/yağma/depo sınırı bu özel para birimlerini etkilemez.

BilgelikOcağı30, HarpOcağı46FCaltadımı, Kömürlük31kaynak yükseltmesi (30normal+FC1) gerçek bedel/süre/önkoşulla eklenir; kaynakta Kömürlük saatlik üretim oranı yayımlanmadığından üretim eğrisi mevcut Ergenekon demir üretimine benzetilmiştir, birebir sayısal üretim iddiası yapılmaz. İlk108maden kaydı korunur,6kömürmadeni eklenir; toplam114maden/180canavar. Çelik, mevcut Ergenekon zindan/sefer ganimetine eklenir (kat başına200, bu ödül sayısı WOS’tan doğrulanmış değildir). KorXI araştırmaları gerçek birlik türüne özelT11açar; kayıttakiT11yüklemede9’a düşmez.

Kristal arıtma resmî /buildings/crystal-laboratory/ ve /refinement-in-crystal-laboratory/ kaynaklarındaki fiyat/olasılık/kota sistemini kullanır: normal5–8/gün, süper100/hafta,20işlemlik5fiyatkademesi ve gününilk süperişlemine%50indirim. Tek oyunculu dünyada açılış Ocak31–40’ınKor1–10eşlemesiyle belirlenir; sunucuyaşına göre dünya açılış takvimi henüz uygulanmaz. Çelik→kristalparçası5000:1,20/gün. Diğer11eski yapının40seviyelik önceki uyarlama eğrileri bütünüyleWOSfiyatlarına çevrilmiş değildir. Diğerbütünmekaniklerinbirebiruygulanmasıistemi hâlâ genişkapsamlı açıktır; bunlar tamamlandı gibi sunulmaz.


## Araştırma ekranı / kuyruk düzeltmesi

Kullanıcı araştırmaya girdiğinde Kuyruk panelinin üstüne geldiğini bildirdi ve daha düzenli bir oyun arayüzü için tasarım örneği istedi. Sabit #qp paneli yalnız şehir ve haritada görünür; araştırma ve diğer yönetim ekranlarında gizlenir. Açık/kapalı kuyruk tercihi ve devam eden işler korunur. Tam arayüz dönüşümünden önce bronz/taş temalı, bağlantılı araştırma düğümleri olan bir görsel örnek sunulur.


## Onaylanan bütün oyun arayüzü — 17 Kasım 2026

Kullanıcı bronz/ahşap/koyu taş araştırma görselini onayladı ve aynı sanat dilinin bütün sayfalara, web ve mobile uygulanmasını açıkça istedi. Bu tasarım artık yalnız örnek olarak tutulmaz; canlı arayüze uygulanır. Yeni dosyalar: `public/imperial-theme.css`, `public/research-view.css`, `public/research-view.js`, `public/page-presentation.js`, `public/theme-icons.js`. Araştırma gerçek 287 kaynak düğümünü medalyonlu, ön koşullarla bağlantılı ağaçta gösterir. Masaüstünde dal menüsü/ağaç/sağ detay, mobilde yatay dal menüsü/kaydırılabilir ağaç/alt detay ve Ayrıntı kısayolu vardır. İnce araştırma kuyruk şeridi ekranın parçasıdır; sabit genel Kuyruk paneli araştırmaya gelmez.

Diğer yönetim sayfaları kendi başlık/gerçek durum ölçümleri ve bölüm düzenleriyle Boylar Meclisi, Sefer Otağı, Bahadır Meydanı, Ulak Otağı, Oba Düzeni, Alpler Meclisi, Toy Meydanı ve Kam Meclisi olarak sunulur; oyun/hikâye/yapı/kahraman isimleri ve işlemler korunur. HUD, şehir/harita araçları, profil/ekipman/pet/enerji/yapı pencereleri, Kurultay, galeriler ve arena aynı bronz/taş temayı kullanır. Oyuncuya geliştirici denge tabloları normal Ayarlar’da gösterilmez; yalnız #test altında kalır.

16 mevcut oyun görseli piksel değişimi yapılmadan `public/assets/interface/icons/` içine çözüldü (toplam yaklaşık375KB), böylece ağaçta büyük base64 dizileri tekrar edilmez. Yeni Tripo üretimi/kredi harcaması yapılmadı. Düzenleme yeni sanat veya mekanik bonus üretmez. Periyodik yenilemelerde sayfa/ağaç/posta kaydırması ve aktif metin alanının metni/imleci korunur.

Kurulum sırası: installWhiteoutResearch(), installResearchView(), installPagePresentation(). rRes() DOM’u yenilemeden researchView.capture(host), yeniledikten sonra researchView.afterRender(host) çağırır. Tema CSS’i head’in sonunda yüklenir. Görsel tarayıcı/cihaz QA aracı yoktur; bunun yerine gerçek DOM üzerinde 11 sayfa,4 profil penceresi,7 yapı penceresi; bütün oyun regresyonları, araştırma geometrisi/eylemleri, odak/kaydırma ve CSS sözdizimi doğrulanır. Gerçek cihaz görsel kontrolü yapılmış gibi sunma.


## Ana şehir ve kaplama düzeltmesi — 17 Kasım 2026

Kullanıcı önceki değişiklikte ana3Dsahnenin hâlâ eski görünümde kaldığını doğru biçimde belirtti. Önceki değişiklik menü/arayüzdü; bütün3Dgörseller yenilenmiş gibi sunma. Kullanıcının son tercihi: **yeni görselleri konuşmaya atma, doğrudan siteye entegre et.**

Gerçek3Dşehir artık `src/city-landscape.js` içindeki deterministikvadiye bağlanır: yeşil arazi, düz şehirtemelleri, iki katmanlı dağsilsilesi, surdışında dere/köprü,291doğalağaç,2107çimkümesi,taşyollar,pazarpropsları,sancaklar. Eski düz kumzemin/gömülü parketaşları/tekdüze koniağaçlar kaldırıldı. Çevre20çizimçağrısı/145491üçgen ile gruplandı. Dağ yüzlerinin yukarı dönük olduğu, dereşehirtemellerininyanından geçmediği, binaavlularının açık kaldığı sınanır. Sis uzaklaştırıldı, sıcak güneş ve gradyan gökyüzü/kamera düzeni eklendi; mobil gölgeharitası/pikseloranı sınırlandı.

Tüm11şehirslotu inşaedilmemişken tıklanabilir alçak arsa işareti, inşalıyken opak yedek yapı gösterir. Yüklenmiş gerçekGLBmodel slotun yerini alır; mevcutassetler/seviyeler değişmedi. ThreeRaycaster görünmeznesneleri kendiliğinden elemediği için tıklama listesinden nesnesi veya üstnesnesi görünmez olanlar filtrelenir. Sur modelinin görünmesi yalnız kapıdaki çakışan yedekparçaları gizler; uzaktaki kuleler korunur.

`public/assets/interface/carved-header.webp` 242KB gerçekoymaahşap/kurtkabartma başlık dokusudur; arayüz başlıkları ve pencerelere doğrudan uygulanır. Menü emojileri bildirimleri/eylemleri koruyan bronzSVGsimgelere dönüştürüldü. Buart ChatGPTgörsel üretimiyle hazırlanmıştır; Tripo üretimi/kredisi harcanmadı. Tamörnekresim oyunarka planı veya sahte3Dsahne olarak kullanılmaz. Gerçekcihaz/tarayıcıpikselkontrolü hâlâ yoktur; geometri, ışınla tıklama,arazi,UIgerçekDOM,kayıtveoyunregresyonları ile doğrulanır.


## Sekmelere özgü işlevsel tasarım — 17 Kasım 2026

Kullanıcı yalnız genel tema/renk değişiminden memnun değil. Onayladığı araştırma referansının **düzen mantığını** her sekmeye özgü gerçek kontrollerle istiyor: oyma ahşap/altın çerçeve, turkuaz seçim, görselli merkez, seçime bağlı canlı ayrıntı/eylem. Yeni örnek resimleri konuşmaya gönderme, doğrudan mevcut özel siteye uygula.

`city-workspace.js/css`: şehir 3D sahnesi ve gerçek seçili yapının sağ gelişim paneli; orijinal `.pb` cache nedeniyle render/rPop öncesi #pop içine geri döndürülür. Görevler/kuyruk/halk orijinal düğümleri Oba işleri çekmecesinde korunur. Mobilde sahne üstte ve detay altta.
`roster-workspace.js/css`: kahraman madalyonları/büyük portre/gerçek yükseltme ve sefer kartı; Sefer Otağı bölüm seçimi/gerçek görsel/seçili kale, zindan, bilge, atölye veya destan ayrıntıları.
`management-workspace.js/css`: posta liste+okuma, boy merkezi+dayanışma+sohbet, seçili etkinlik+takvim, kategorili ayarlar, arena rakip listesi+gerçek meydan okuma kartı. Kaynak düğümler her render öncesinde geri yerleştirilir; seçim, metin ve kaydırma görünüm durumu olarak korunur.
`map-workspace.js/css`: canlı harita ve Sefer Defteri; gerçek gidiş/dönüş/toplama sayıları, hedef ve kafile panelleri. Yeni harita seçimi hedef panelini açar.

Kurulum sırası araştırma/veri → araştırma görünümü → sayfa sunumu → kahraman/sefer → yönetim → harita → şehir (en dış sarmalayıcı). Yeni modüller save veya oyun state’ini değiştirmez; özgün data-* işlemlerini taşır. Araştırmanın287düğümü ve bütün oyun kuralları korunur.


## İlk referansın görsel kalitesi — 17 Kasım 2026

Kullanıcı açıkça ilk referanstaki zengin boyalı görsel/işlemeli çerçeve kalitesini istiyor; önceki canlı ekranın küçük simgeli/sönük çizgili görünümünü reddetti. Yerleşim tek başına yeterli değil. Yeni somut varlıklar: `assets/interface/painted/strategy-atlas.png`16boyalı araştırma/hammadde resmi ve `steppe-menu-backdrop.png`yalnız yönetim menülerinde dekoratif gerçekçi boy yerleşimi. Asıl şehir/harita gerçek3D olarak devam eder. Atlasüretimi ChatGPTimagegentool ile yapıldı, Tripo kredisi kullanılmadı.

`painted-art.js` tek atlası CSSsprite konumlarıyla sunar; `paintedGameArt()` ve `paintedGameIconHtml()` kaynaklara/araştırmanın gerçek konusuna göre doğru görseli seçer. Araştırma130pxmasaüstü madalyonları ve büyütülmüş koordinatları, parlak kıvrımlı altın çizgileri,173pxayrıntı madalyonu ve okunaklıserif yazıları kullanır. Mobilde grafik koordinatları ayrı hesaplanır.

`reference-shell.css/js` oyma kenarlar, altın motifler, deri dokusu, kaynakHUD’u, kabartma menü simgeleri ve yönetim menülerinin sahne arka planını uygular. `reference-rooms.css/js` kahraman/sefer/yönetim/şehir panellerine aynı boyalı simgeleri ve büyük ayrıntı ölçeğini taşır. Kurulum mevcutworkspacekurulumlarından sonra ReferenceRooms, ReferenceShell; painted-art araştırma görünümünden önce yüklenir. Kayda veya oyun kurallarına yazım yoktur. Yeni resimleri konuşmada örnek olarak paylaşma; siteye entegre et. Gerçek browsercapability yokken görüntü kontrolü yapılmış gibi sunma.


## 17 Kasım 2026 — Claude ek paketi (`public/ergenekon-ek.js` + `public/ergenekon-ek.css`)

Ana oyun koduna dokunmadan, `index.html` sonunda tek `<script>` ve `<head>` sonunda tek `<link>` ile yüklenir. `render`, `fight` ve `tick` küresel fonksiyonlarını sarar; `city3d.bundle.js` yeniden derlenmedi (Three.js nesnelerine `window.city3d` üzerinden erişilir). Kalıcı veriler `s.ek` altında, oyunun kendi kaydıyla saklanır. Aynı işleri ikinci kez yazmamak için:

- **Üst bar:** Odun/Et/Demir’in yanına Kömür (`s.r.komur`) ve Çelik (`s.r.celik`) eklendi; her kaynakta küçük oyma etiket var. Sağda Çanta ve Ayarlar yuvarlak düğmeleri.
- **Sol menü 7 simge:** Harita (`m`), Arena (`y`), Ayarlar (`g`) ve açıklama (`data-ex`) düğmeleri CSS ile gizlenir (silinmez). Harita için şehir/haritada yuvarlak **DÜNYA / OBA** düğmesi; Bahadır Meydanı Sefer Otağı’nın “Yolunu seç” listesinde sekme; Açıklamalar Oba Düzeni listesinde; Ayarlar üst barda.
- **Canavar ganimet paketleri:** Kazanılan her canavar dövüşünde yeşil %6 (1000), mavi %2 Sv6+ (5000), mor %0,5 Sv15+ (10000); Çelik paketleri 100/500/1000 ve diğer kaynakların yarı ağırlığında. Paketler `s.ek.pk` içinde; Çanta penceresinden tek tek ya da toplu açılır, depo sınırına uyar (Çelik sınırsız).
- **Orman → kütük → tarla:** Şehir sahnesindeki 291 ağaç açı/halka dilimlerine göre parsellere ayrılır (en az 4 ağaç). Açık parsel sayısı `2 + floor(Ocak/2)`; aynı anda 1 iş (Odunluk Sv10’da 2). Kesim 20 dk × 1,25^n, sürme 15 dk × 1,25^n. Kesim `ağaç × nrate(Ocak) × 0,4` Odun verir; her tarla saatte `nrate(Ocak) × 1,5` Et üretir (çevrim dışı en fazla 8 sa). Durumlar `s.ek.ps[parselId]` = cut/stump/plow/field. Ağaçlar instanced matrislerle kütüğe döner, tarla toprak + ekin örnekleriyle çizilir.
