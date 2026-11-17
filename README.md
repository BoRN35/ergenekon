# Ergenekon

Three.js şehir ve ortak dünya haritası; Sites Worker + D1 hesap kaydı.

```sh
npm ci
npm test
npm run build
```

Node22.13 veya üzeri gerekir. `public/index.html` mevcut oyunun arayüzü ve kurallarıdır; `src/city3d.js` şehir, `src/world3d.js` dünya, `src/oba.js` geçici Oba görselleridir. Derleme `dist/client` ve `dist/server` üretir. Tripo GLB dosyaları `public/assets` altında korunur.

Hesap kaydı `oai-authenticated-user-id` başlığını kullanır. Yerel kayıt `ergenekon_v2` anahtarıyla korunur ve ilk başarılı hesap bağlantısında taşınır. Yazmalar revision karşılaştırır. Çakışmalar onay sorulmadan son oyun işleminin işaretine göre çözülür; kaynaklar veya seviyeler maksimum değerleriyle birleştirilmez. Alternatif kayıt cihazda ve hesaba özel kurtarma arşivinde korunur. Cihaz kaydı her işlemden sonra, hesap kaydı yaklaşık bir saniyede bir yapılır; bağlantı gelince otomatik yeniden denenir. Kayıtlar ve yedekler kullanıcıya özeldir. Dünya uç noktası yalnız ad, görsel seviyeleri, genel kimlik ve sabit konum yayınlar.

D1 şeması `db/schema.ts`, artan göçler `drizzle/` altındadır. Şema değişince `npm run db:generate`; yayın mevcut Site kimliği ve izinleri korunarak Sites üzerinden yapılır. Çalışan isteklerde şema oluşturulmaz. Yerel SQLite test verileri üretimden ayrıdır; üretimde test kimliği yoktur.

Oba görünümü 0/5/10/15/20/25/30/35/40 seviyelerinde değişir. Aynı seviyedeki Ocak maliyet ve süresinin %140’ını kullanır. İkinci usta Oba5’te açılır. Her yapı en fazla40; Ocak40 sonrasında diğer yapılar da geliştirilebilir. Normal canavar yenilenmesi60 saniyedir. Gerçek oyuncu haritası15 saniyede yenilenir; mevcut Site yalnız sahibine açıktır.

`npm test` kayıt, kimlik ayrımı, çakışma koruması, yerel kayıttan geçiş, ortak konumlar, iki usta, gereksinim bağlantıları, maliyetler, yenilenme ve Oba sahne geometrisini doğrular. Tarayıcı/GPU görsel kontrolünün yerine geçmez.

Ertelenen Tripo planı ve kullanıcı tercihleri: [PROJECT_MEMORY.md](PROJECT_MEMORY.md).

Kurultay mevcut oyuna bağlı yapı, birlik, diziliş ve görünüm yönetimidir; bağımsız wiki oluşturulmaz. Birlik talimleri T1–T9 arasında ücretli ve zamanlıdır. Sargı Ustalığı araştırması iyileşme süresini azaltır. Kafileler yeni topladıkları yükü dönüşte teslim eder. Haritada108kaynak ve180bağımsızcanavar vardır; yarık seçimi1000tabanlıkimlik kullanır. Yeni3Darena aynı maçın yenidenyüklenmesinde hakkı/ödülü tekrarlamaz; günde3tamamlanan düello bir sandık açar.


Görsel arayüz araştırma ekranındaki boyalı madalyonlar, altın çerçeveler ve dokulu paneller üzerine kuruludur. `public/painted-art.js`16özgün simgeyi tek şeffaf atlas üzerinden sunar; `reference-shell` ve `reference-rooms` dosyaları genel görünümü tamamlar. Yönetim menülerinin dekoratif boy yerleşimi arka planı, etkileşimli Three.js şehir/harita sahnelerinden ayrıdır. Araştırma sayfasında287gerçek araştırma ve kaynak kuralları korunur.

İsteğe bağlı gerçek DOM tasarım testleri için `linkedom` kurulmalı veya `LINKEDOM_PATH` modülün mutlak yolunu göstermelidir; `node tests/reference-design.mjs` ve `node tests/workspace-design.mjs` bu koşulla çalışır. Varsayılan `npm test` bu ek bağımlılığı istemez.

Proje ZIP’i kodları, kaynak görselleri,3Dmodelleri ve derlenmiş çıktıyı içerir. Hesabın bulut ilerlemesi canlı sitenin D1 veritabanında kalır; ZIP’e oturum anahtarı veya özel veritabanı kaydı eklenmez.


## Tarayıcıdan ZIP indirme

Canlı sitede `/indir` sayfası proje ZIP’ini indirir. Hesaplı indirme aynı tarayıcı oturumuyla `/api/save` üzerinden güncel kaydı okur; `hesap-yedegi/oyun-kaydi.json`, taşınabilir `kayit-kodu.txt` ve geri yükleme yönergesini ZIP’e yalnız tarayıcıda ekler. Kaydın veya oturum anahtarlarının statik indirme dosyalarına kopyası konmaz. Kaydı olmayan proje paketi de ayrı düğmeyle indirilebilir.

İndirme parçalarını yenilemek için `python scripts/prepare-download.py`, ardından `npm run build` çalıştırılır. Hazırlama betiği indirme parçalarını kendi ZIP’ine yeniden eklemez.
