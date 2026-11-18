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

## 17 Kasım 2026 (2) — Toplama, araştırma, mobil
- Haritada kafile toplama hızı 3x (index.html tick: `*3*dt/3600`).
- Yeni araştırma `wos_bozkir-toplayicilari` (Ekonomi, 5 sv × %10 = +%50 tüm toplama hızı, efekt etiketi `Gathering Speed`), public/ergenekon-research-ek.js; tick formülüne `+wosBonus('Gathering Speed')` eklendi.
- Çevrim dışı kazanç üst sınırı 8 sa → 12 sa (WOS gibi); tarla üretimi de 12 sa.
- Haritada "ARA" düğmesi: WOS kaynak arama (tür, seviye kaydırıcı, sadece dolu, en yakın düğüm, Kafile gönder).
- Mobil: alt menü çubuğu, tam ekran oba/harita, pencere (.ovp) açıkken `body.ek-win` ile üst bar gizli + pencere tam ekran.
- Harita (17 Kasım, 3): /api/world yoksa (GitHub Pages) ergenekon-ek.js fetch'i yerel tek oyunculu dünya döndürür → oba, kaynak, canavar, kafile çizilir. Kamera: döndürme/yatırma kapalı (sabit açı 0.95), zoom 0.3–3, kaydırma obadan 260 birim ile sınırlı, mobilde pixelRatio ≤1.25. Mobilde hedef bilgisi alttan açılan panel (#tm.world-detail-open). Hedef panelindeki verim artık gerçek toplama hızını (3x + araştırmalar) gösterir.
- Fauna (17 Kasım, 4): public/ergenekon-fauna.js — M[13+] haritadaki canavarlar seviyeye göre 19 türden birine atanır (Çayır Kurdu, Ala Geyik, Kızıl Tilki, Yaban Domuzu, Bozkır Kurdu, Kara Ayı, Börü Kartalı, Yılan Ruhu, Yaban Öküzü, Albastı, Kar Parsı, Kızıl Boğa, Buz Devi, Bozkır Mamutu, Tepegöz, Karakoncolos, Evren Ejderi, Demir Dev, Erlik’in Gölgesi); yeni base no 13,14,15,17,18,19,20. 3D modeller window.ekMonsterModel ile; city3d.bundle.js içinde iki elle yama var: ft() başında ekMonsterModel kancası, Gt() içinde cooldown'daki canavar/tükenen kaynak gizlenir. src/world3d.js ile bundle artık birebir değil — yeniden derlenirse bu iki yama src'ye de eklenmeli.
- Haritada seviye rozetleri (#ek-lvl, DOM katmanı); öldürünce hedef paneli kapanır.
- iPad (18 Kasım): render zinciri bir adımda çökerse ergenekon-ek.js dış sarmalayıcısı hatayı yakalar, gamePagePresentation.refresh + referenceShell.refresh + body[data-game-page] onarımı yapar (yoksa sağ panel boş, sekme simgeleri emoji kalıyordu). Hatalar ekranda #ek-err notu ve localStorage 'ek_errs' (window.ergenekonErrors()).
- Ekonomi (18 Kasım): window.ECO()=0.35 (index.html head) tick'teki şehir üretimi + tüketimini ölçekler. Ocak 7 kayıtta saatlik: odun ~2.6B, et ~2.9B (Av Şöleni ×1.5 ile), demir ~0.8B (önceden ~7.4B/8.2B/2.3B). Tarla eti nrate(ocak)×0.25/saat/tarla (önce ×1.5), ağaç kesimi odunu ×0.2 (önce ×0.4). Harita toplama 3x aynı kaldı.
- Ekonomi düzeltme (18 Kasım, 2): ECO 0.35 → 0.2275 (%35 daha düşük). Doğru ölçüm saniyelik tick ile: Ocak 7 kayıtta saatte odun ~3.7B, et ~4.2B (Av Şöleni ×1.5), demir ~1.05B. (Önceki notta tek tick(3600) ölçümü et=0 yüzünden yarı çıkmıştı.) Tarla ×0.16, kesim ×0.13. Çevrim dışı birikim en fazla 12 sa; girişte alınır, s.t sıfırlanır; hoş geldin penceresinde 12 sa çubuğu.
- Ekonomi (18 Kasım, 3): ECO 0.11375 (%50 daha düşük). Ocak 7 kayıtta saatte odun ~1.84B, et ~2.1B (Av Şöleni ile), demir ~525. Tarla ×0.08, kesim ×0.065.
- Ekonomi (18 Kasım, 4): ECO 0.056875 (%50 daha düşük). Ocak 7 kayıtta saatte odun ~920, et ~1.060 (Av Şöleni ile), demir ~260. Tarla ×0.04, kesim ×0.0325. Yeni oyuncu (Ocak 1, bina yok) saatte ~23 odun / 26 et; ilk Oduncu (240 odun) ~2 saat bekletir — erken seviye desteği önerildi.
- Ekonomi (18 Kasım, 5): ECO Ocak seviyesine bağlı: max(0.056875, 0.30·0.85^(ocak−1)) → Ocak1 0.30, 4 0.18, 7 0.11, 10 0.07, 11 0.059, 12+ 0.057. Yeni oyuncu saatte ~122 odun/139 et (ilk Oduncu ~20 dk). Ocak 7 kayıtta ~1.8B odun/saat.
- Demirci (18 Kasım): public/ergenekon-demirci.js. s.ek.dm={lv,t1,mat:{kagit,safir,opal}}. Eşya basma yalnızca Demirci penceresinde (window.openDemirci); profildeki [data-u] tıklamaları Demirci'ye yönlenir. Basma = oyunun upg(k) + malzeme: kağıt p+1, safir p≥4 → p−3, opal p≥8 → p−7; UPM 12 aynı. Malzeme düşüşü (öldürünce): kağıt %30 (1–3), safir %7 (Sv4+), opal %2.5 (Sv8+). Demirci yapısı: Ocak 3'te açılır, max min(15, ocak); maliyet 600/350/180 × 1.55^lv, süre 10dk × 1.45^lv (kendi zamanlayıcısı, usta kuyruğunu kullanmaz). Bonus: +%3/sv harita toplama (wosBonus('Gathering Speed') sarılır), basma şansı ×(1+0.03·lv) (upch sarılır), Sv5 %50 / Sv10 tam düşüş koruması. 3D: city3d.scene'e prosedürel demirhane (konum 11,22, rot 0.66, ölçek 1.15), örste çekiç sallayan usta, kıvılcım, ışık; üstünde #ek-dmk işareti. Kullanıcı Tripo3D modeli getirecek (çekiç + sağ kol ayrı mesh).
- Çanta (18 Kasım, 2): public/ergenekon-canta.js — tüm eşyalar tek yerde (ekipman kuşanılmış+çanta, Demirci malzemeleri, kaynak paketleri, kitaplar, kahraman kartları, Ustalık Tozu), her birine SVG ikon (silah türü addan: Kılıç/Yay/Gürz/Balta/Mızrak; renk kademesi addaki malzemeden). Kadim tarzı: üstte karakter paneli (küpe-kafa-küpe / yüzük-göğüs-kol / silah-alt-yüzük / ayak), altta koyu kare ızgara (+N sol üstte, adet sağ altta), nadirlik ve + seviyesine göre parıltı (gl1/gl2/gl3 + parlama süpürmesi). W.ekIcon, W.ekTileHtml, W.ekItems, W.openCanta, W.ekPickItem.
- Demirci (18 Kasım, 2): malzeme düşüşü kağıt %5, safir %2.5 (Sv4+), opal %2.5 (Sv8+). Basma artık çantadaki eşyalarda da çalışır (kendi enhance(), oyunun ucost/upch'ini kullanır). Yükseltme ekranı: SVG rünlü Sihirli Örs sahnesi + malzeme sütunu + ücret + YÜKSELT/BOŞALT + sağda ekipman ızgarası; başarıda nadirlik renginde patlama, başarısızlıkta kırmızı sarsıntı. 3D: sekizgen taş platform, rün çemberi, kristalli 4 dikme (dönüp süzülür), büyük rünlü örs, yanında usta; başarıda rün ışığı parlar.
- Demirci 3D (18 Kasım, 3): kullanıcı isteğiyle usta kaldırıldı (smith.visible=false); kıvılcımlar yalnızca basma anında çıkar.
- Kurultay Meydanı (18 Kasım, deneme): public/ergenekon-meydan.js — sur içinde elips taş meydan (RX44,RZ39) canvas dokulu: halka döşeme, 16 güneş ışını, rün damgaları; 6 balbal, 7 tuğ sancağı (dalgalanır), fenerler, batı yakasında 3 renkli pazar tezgâhı; meydandaki çim örnekleri gizlenir. Demir Dağ (damarları parlayan) eklendi ama mevcut kamera açısında kadraj dışında. Ayarlar'da 'Kurultay Meydanı' aç/kapat (s.ek.meydanOff); window.ergenekonMeydan.toggle(). Sonraki adımlar: taş sur/kuleler + dağ görünür konum, yurt/süs.
- Harita kaynak rezervleri 10x (18 Kasım): mkNodes nrate×80 (önce ×8), kömür düğümleri de ×80; eski kayıtlar s.ek.res10 ile bir kez ×10 taşınır (yalnızca max < nrate×40 olanlar).
- Meydan 2. adım (18 Kasım): ergenekon-meydan.js'e taş sur (elips 46×41, 150 parça InstancedMesh + mazgal), güneyde hilalli kapı kulesi, Sur seviyesine göre 4/6/8/10 kırmızı külahlı kule ve sancak; meydan açıkken city3d.castle gizlenir (tıklanınca yine Sur açılır). Demir Dağ (-70,-6,-118) ölçek .62 artık kadrajda; ince parlayan damarlar.
- 18 Kasım: kullanıcı taş meydan/surları istemedi, eski otağ görünümüne dönüldü; ergenekon-meydan.js index.html'den çıkarıldı (dosya depoda duruyor).
- 18 Kasım: hoş geldin penceresine kömür eklendi. Harita: üstte koordinat çubuğu (X/Y mantıksal 0–100, oba 50/50, km = mesafe×2), ☆ yer imi (s.ek.bm, en fazla 20), dokununca 'Konuma Git' (X/Y gir, Obama dön, yer imleri listesi).
- 18 Kasım: Bahadır Meydanı > 1v1 Arena bölmesinin başına WOS tarzı sıralama (#ek-arena): sezon sayacı, ilk 3 kürsü, 4–30 liste, kendi satırın altta sabit, Geçmiş (log'dan arena satırları), Savunma Düzeni (Sefer Otağı'na gider), Mücadele Et (gün hakkı, rakip listesine kaydırır). Rakipler yapay, sezon tohumlu; puanlar oyuncunun puanı etrafında. DİKKAT: tema innerHTML setter'ı element.__h önbelleğini kullanır — kendi önbelleklerimiz __ekh adında olmalı ('card' sınıfı mgmt-workspace tarafından taşınabilir).
