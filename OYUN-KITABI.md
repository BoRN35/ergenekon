# Ergenekon: Demir Dağ — Oyun Kitabı

Bu kitap 22 Kasım 2026'da mevcut koddan (`public/index.html` + `public/ergenekon-*.js` + veri dosyaları) çıkarıldı. Yeni oyun (`public/yeni/`) bu kurallara uyar. Bir kural burada yazılıysa ve yeni oyun farklı davranıyorsa hata yeni oyundadır. Kural değişikliği yalnızca kullanıcı onayıyla yapılır ve buraya işlenir.

Kısaltmalar: `s` = oyun kaydı (tek nesne), `Ocak` = Kutsal Ocak seviyesi (`s.l.ocak`), `nf` = sayı biçimi, süreler saniye.

---

## 1. Felsefe (değişmez kurallar)

| Kural | Kodda karşılığı |
|---|---|
| Oyuncular arası pazar/takas yok | Eski `trade()` (Pazar sekmesi, kaynak→kaynak %20 komisyon) koddadır ama felsefeye aykırıdır; yeni oyunda **yok**. |
| Oyuncuya doğrudan saldırı (PvP) yok | Arena rakipleri yapay; harita yalnız PvE. |
| Asker ölmez, yaralanır | `woundArmy(oran)` → `s.wd[3]`; Şifahane'de iyileşir. |
| Eşyalar ruha bağlı | Eşya devredilemez; postada eşya ticareti yok. |
| Haklar birikmez | Enerji 200'de durur; ziyafet/pet süresi dolu iken bekler; tek birikim: **12 saat çevrim dışı gelir**. |
| Tek satış: aylık premium | +%35 toplama, süre ÷1,35, çevrim dışı +%35 (ödeme altyapısı henüz yok; 3 gün deneme var). |
| VIP, altınla anında bitirme, mağaza yok | Altın oyunda yoktur, eklenmez. Hızlandırma yalnız emekle kazanılan Kum Saati ve ≤5 dk ücretsiz bitirme. |
| Uyarı dili | Ünlem yok: bilgi = **tamga/mühür**, uyarı = **altın hilal**. |

---

## 2. Kayıt yapısı (`localStorage['ergenekon_v2']`)

- Anahtar: `ergenekon_v2`; yedek: `ergenekon_v2_backup` (en sık dakikada bir).
- Kayıt tek JSON nesnesidir. **Bilinmeyen alanlar asla silinmez**; yeni oyun okuduğu nesneyi olduğu gibi tutar, yalnız bildiği alanları değiştirir ve tüm nesneyi geri yazar.
- `s.t` = son kayıt zamanı (ms). Açılışta `min((now - s.t)/1000, 43200)` saniye kadar `tick(1)` tekrarlanır (en fazla 12 saat), sonra `s.t = now`.
- Hesap/bulut eşitleme `account-save.js` ile `_autosave: {actionAt, actionId}` işaretine bakar (çakışmada son işlem kazanır). Yeni oyun her işlemde `_autosave`'ı günceller.
- Giriş şifresi: `localStorage['eg_gate']` = şifrenin SHA-256 özeti (`0567…04ab`). Kodda yalnız özet bulunur.

### Ana alanlar

| Alan | Anlam |
|---|---|
| `r` | Kaynaklar: `odun, et, demir, komur, celik, kristal (Kor), kristalParcasi, aritilmisKristal, dari` |
| `l` | Yapı seviyeleri: `ocak, oba, yurt, odunluk, avci, demirci, sifa, kisla, sur, ambar, gozcu, bilgelik, komurluk, harpakademi` |
| `q`, `q2` | İnşaat sıraları `{k, left, tot, req, h, helpTime}` (2. usta Oba Sv 5) |
| `heat` | Ocak ısısı 0–100 (odun biterse düşer) |
| `pray` | Umay duası bekleme (sn) |
| `t` | Son kayıt zamanı |
| `log` | Son 30 olay |
| `nodes[]` | Harita kaynak noktaları `{t, lv, res, max, rg}` (114 adet; 108 normal + 6 kömür) |
| `sq[]` | Kafileler `{st, n, left, cargo, capacity, resource}`; `st`: 0 boşta, 1 gidiyor, 2 topluyor, 3 dönüyor, 4 keşif |
| `al` | İttifak: `pow, terr[], hq, tm, tc, th, cp` |
| `ch` | Alp (şef): `lv, xp, hp, eq{}, inv[], k{}, tp, tl{}, mt, cpn, cpl[]` |
| `mk[]` | Canavar bekleme süreleri (M dizisi sırası, 180) |
| `pt` | Bozkurt Yavrusu (kurt): `lv, xp, adv` |
| `en` | Enerji: `v, t, sup, it (Et Güveci), bd, w, pet` |
| `rs` | Araştırma seviyeleri `{anahtar: sv}`; `rq` araştırma sırası |
| `tr[3]`, `wd[3]`, `ttiers[3]`, `formation`, `tq`, `hq` | Askerler, yaralılar, talim kademesi, diziliş, eğitim sırası, iyileştirme sırası |
| `hc[9]`, `hs[9]` | Kahraman kartları ve yıldızları (HH sırası) |
| `hr[5]` | Bilge Meclisi (eski mitolojik kahramanlar) `{sh, lv}` |
| `ud` | Ustalık Tozu |
| `bk{}` | Yetenek kitapları (`a,f,h,x,d,r`) |
| `mb[]` | Posta `{t, f, d, rw}` (en çok 50) |
| `stat` | `kills, raidw, mined, arena, cay, rifts, melt, nvc` |
| `d` | Günlük sayaçlar `{day, p:{mine, build, hunt, melt, help, dg}, c}` |
| `ar` | Arena `{pts, n, day, dailyDuels, …}` |
| `nv` | Nevruz `{wk, day, today, total, run, ref, last}` |
| `wb` | Dünya boss'u (günlük) |
| `x6` | Boy Ocağı yapıları, Erlik Yarıkları, günlük görev (`dq`), duyurular |
| `ek` | Ek modüllerin tüm verisi (bkz. §15) |

---

## 3. Yapılar

Maliyet/süre tabloları: `public/upgrade-balance.js` (`ERGENEKON_UPGRADE_BALANCE.quote(k, sv)`), 11 yapı × 40 seviye, satır `[odun, et, demir, saniye]`. Bilgelik Ocağı, Kömürlük, Harp Ocağı tabloları `whiteout-research-data.js` → `WHITEOUT_RESEARCH_BUILDINGS`.

| Anahtar | Ad | Etki | Açılış |
|---|---|---|---|
| `ocak` | Kutsal Ocak | Ana yapı; diğer yapılar onu geçemez; Sv 40 = Demir Dağ eridi | — |
| `oba` | Boy Obası | Ocak maliyet/süresinin ×1,4'ü; Sv 5 ikinci usta | — |
| `yurt` | Yurt | +5 halk/sv | — |
| `odunluk` | Odunluk | Odun üretimi | — |
| `avci` | Avcı Çadırı | Et üretimi | — |
| `demirci` | Börteçine Demirhanesi | Demir üretimi; Sv 10+ çelik | Ocak 2 |
| `sifa` | Şifahane | Can yenilenmesi +%10/sv, yaralı kapasitesi, iyileştirme hızı | Ocak 3 |
| `kisla` | Kışla | Asker kapasitesi +%10/sv, eğitim hızı | Ocak 4 |
| `sur` | Sur | Akın savunması +%5/sv | Ocak 3 |
| `ambar` | Ambar | Yağma kaybı −%2/sv, kafile yükü +%10/sv | Ocak 5 |
| `gozcu` | Gözcü Kulesi | Keşif, izci, harita özel yerleri | Ocak 3 |
| `bilgelik` | Bilgelik Ocağı | Araştırma | Ocak 9 |
| `komurluk` | Kömürlük | Kömür üretimi | Ocak 1 |
| `harpakademi` | Harp Ocağı | Kor teknolojileri, ileri talim | Ocak 31 |

**26 Kasım 2026 — yapı değerleri Whiteout Survival Wiki'den birebir (kullanıcı kararı "A")**
- Kaynak: `data/wos/buildings.json` → `scripts/wos-buildings.py` → `public/wos-buildings-data.js`; çalışma: `public/wos-buildings.js` (`installWosBuildings`). Aşağıdaki eski formüller (tablo × indirim, Oba ×1,4, `buildingRequirements` kuralları, ≥Sv15 ek çelik) bu yapılarda artık geçerli değildir; yalnız eski kuyruk kayıtları için koddadır.
- Eşleme: Ocak = Furnace (1–30) + Fire Crystal Furnace (Kor 1–10 = Ocak 31–40) · Boy Obası = Embassy (+FC) · Şifahane = Infirmary (+FC) · Kışla = Infantry Camp (+FC) · Gözcü = Command Center (+FC) · Odunluk = Sawmill · Avcı = Hunter's Hut · Demirci = Iron Mine · Ambar = Storehouse · Yurt = Shelter · Sur = Barricade. (Bilgelik = Research Center, Harp Ocağı = War Academy, Kömürlük = Coal Mine zaten 17 Kasım'dan beri birebir.)
- Bedel (et, odun, kömür, demir, ateş kristali, arıtılmış kristal) ve süre wiki tablosundaki değerdir; süre yalnız mevcut hız bonuslarıyla (araştırma, yardım, dua, Kurultay Günü, premium) kısalır.
- Ön koşullar wiki satırından: Furnace→Ocak, Embassy→Boy Obası, Research Center→Bilgelik, Infantry/Marksman/Lancer Camp→Kışla, Infirmary→Şifahane, Command Center→Gözcü, Shelter→Yurt, Sawmill→Odunluk, Hunters' Hut→Avcı, Iron Mine→Demirci, Coal Mine→Kömürlük; "FC N" = 30+N. Hero Hall, Cookhouse, Clinic oyunda yok, yok sayılır. Piramit: Ocak dışı yapı Ocak'ı geçemez.
- **Kor ara aşamaları:** Ocak, Boy Obası, Şifahane, Kışla, Gözcü 30'dan sonra her Kor seviyesine wiki'deki gibi 4 ara aşama + ana aşamayla çıkar (30-1…30-4, Kor 1; Kor 1-1…1-4, Kor 2 …). Ara aşama seviyeyi değiştirmez, `s.ek.fcs[yapı]` (0–4) sayacında tutulur; ana aşama bitince seviye +1, sayaç 0. Yazı: "Sv 30 · ara 2/4", "Kor 3".
- Wiki'nin vermediği seviyeler: Odunluk/Avcı/Demirci/Ambar 31–40 ve Yurt 11–40 son wiki satırından eski Ergenekon eğrisinin büyüme oranıyla sürdürülür (veride `x:1`). Sur wiki'deki gibi en çok 10 (Barricade 10 seviye, Furnace 1–30'a yayılı); daha yüksek eski Sur seviyeleri korunur.
- Örnek (wiki): Ocak 9→10 460 B odun, 92 B kömür, 23 B demir, 6 sa · Ocak 24→25 81 M et/odun, 16 M kömür, 4 M demir, 18 g 8 sa · Ocak 29→30 300 M et/odun, 60 M kömür, 15 M demir, 40 g 4 sa · Kor 1-1 72 M et/odun, 14 M kömür, 3,6 M demir, 158 kristal, 9 g.

**Kurallar**
- `cost(k)` = tablo × (1 − min(0,10; 0,01·rs.masonry)); `oba` için ×1,4.
- `dur(k)` = tablo saniyesi (oba ×1,4). İnşaat hızı: `left -= dt × (Kurultay Günü ? 1,25 : 1) × (1 + 0,03·rs.bld + hb('b') + wosBonus('Construction Speed'))`; premium süreyi ÷1,35; Kut gücü −%0,5/sv.
- `can(k)`: sv < 40, aynı yapı sırada değil, boş usta var, gereksinim yok, kaynak yetiyor.
- Gereksinimler (`buildingRequirements`):
  - Ocak dışı her yapı: `Ocak ≥ max(hedef sv, açılış sv)`.
  - Ocak Sv ≥ 3 iken Ocak yükseltmesi: Yurt, Odunluk, Avcı, Demirhane ≥ (Ocak − 2).
  - Ocak hedef 6: Demirhane 5 · 7: Avcı 6 · 8: Kışla 7 · 9: Oba 8 + Şifahane 1 · 10: Gözcü 9 · 11+: Oba (hedef−1) + sırayla Kışla/Sur/Gözcü (hedef−1); her 5 katında Şifahane (hedef−3).
- Usta: `builders() = oba ≥ 5 ? 2 : 1`.
- Yardım: istek açıkken her 25 sn bir yardım, en çok `10 + floor(Ocak/4)`; her yardım −240 sn (Büyük Toy günü −480).
- Umay duası: kalan süreden `toplam × (0,05 + 0,01·Umay sv)` düşer; bekleme `3600 − 300·Umay sv` (Kam Duası günü 2× hızlı biter).
- 3'lü yükseltme sırası `s.ek.uq`: usta boşalınca sıradaki otomatik başlar.
- ≤5 dk kalan yapım/araştırma tek dokunuşla biter (ücretsiz).
- Görünüm basamakları: 1, 5, 10, 15, 20, 25, 30, 35, 40. Yeni oyunda çizim kademesi: Sv<10 t1, <20 t2, <30 t3, ≥30 t4.
- Hikâye satırları `STORY` (Ocak 2,3,4,5,8,10,12,15,18,20,24,28,32,35,38,40).

---

## 4. Kaynak ekonomisi

- `ECO()` = max(0,056875; 0,30 × 0,85^(Ocak−1)) — şehir üretim/tüketim çarpanı.
- `factor()` = (0,4 + 0,6·heat/100) × (et ≤ 0 ? 0,5 : 1) × (0,7 + 0,3·mutluluk/100).
- `pm()` = 1 + 0,03·fethedilen bölge + 0,04·rs.prod + 0,05·kuşatılan kale + (Bereket tılsımı 0,25) + 0,1·göç + hb('p') + 0,01·peri + 0,05·(sezon puanı eşikleri 200/600/1500/3500 başına).
- `evm(k)` = (günün etkinliği k ise 1,5) × (1 + 0,06·Bilge Meclisi sv).
- `jm(k)` = 1 + 0,05·o işe atanan halk.
- Saniyelik üretim (`f = factor × pm`):
  - Odun: `ECO × (0,3·(0,5 + L·1,095^L)·f·evm·jm·(1 + 0,05·rs.wood + wos 'Wood Output') − 0,03·Ocak^1,3·(1 − min(0,2; 0,02·rs.fuel)))`
  - Et: `ECO × (0,3·(0,3 + 0,8·L·1,095^L)·f·evm·jm·(1 + 0,05·rs.meat + wos 'Meat Output') − 0,03·halk·(1 − min(0,2; 0,02·rs.rations)))`, sıfırın altına inmez.
  - Demir: `ECO × 0,12·L·1,095^L·f·evm·jm·(1 + 0,05·rs.iron + wos 'Iron Output')`
  - Kömür: `ECO × 0,12·L·1,095^L·f·(1 + wos 'Coal Output')`
- Odun > 0 iken ısı +3/sn (en çok 100), odun bitince −1,5/sn.
- Depo: `cap() = 3 × 600 × 1,55^Ocak × (1 + 0,1·rs.cap) × (1 + 0,04·Boy Ambarı sv)`. Odun/et/demir/kömür bu sınırı aşamaz. Çelik sınırsız.
- Halk = 5 × Yurt; otomatik işe dağıtılır (odun/et/demir eşit).
- Mutluluk hedefi = 30 + 0,35·ısı + (et > 0 ? 20 : −20) + Şifahane sv; dakikalık yumuşak yaklaşım.
- Günlük etkinlik (`EVT`, UTC haftanın günü): Paz Kurultay Günü (inşaat %25), Pzt Odun Bayramı, Sal Av Şöleni, Çar Demirci Günü, Per Kam Duası, Cum Maden Seferi (toplama ×1,5), Cmt Büyük Toy (yardım ×2).
- **Çevrim dışı**: en fazla 12 sa (43 200 sn). Girişte "Tekrar hoş geldin" özeti.
- Kaynak döngüsü (ek): Kömür Ocak ateşine karışır (saatte 6·1,15^Ocak, yanarken üretim +%5), T4+ eğitimde kömür. Çelik: Demirhane Sv 10+ saatte 4·(L−9)·1,12^L; Sv 15+ yapı maliyetine çelik. Kor: Ocak 25+ av başına %3. Darı: tarlalar etin %35'i yerine darı; pet yemi ve binek.

---

## 5. Enerji

- Depo `EN_MAX = 200` (+1/Kut sv), her **240 sn (4 dk)** +1, dolu iken sayaç durur.
- Canavar ⚡10, boss ⚡20, Erlik Yarığı vuruşu ⚡10, Kutsal Yer bekçisi ⚡20.
- Ocak Ziyafeti: 6 saatte bir +40 (dolu iken alınamaz, süre birikmez).
- Et Güveci: +10 (canavardan %12 düşer).
- Ustalık Tozu: 80 toz → +10, günde 5.
- Bozkurt Yavrusu yeteneği: günde 1, +60 + 10·(pet sv − 1).
- Enerji iksiri (emekle): küçük +10, büyük +30.

---

## 6. Alp (şef), eşya ve Demirci

- Seviye sınırı = min(40, Ocak). `xpn(l) = floor(40 × 1,27^l)`; her seviye 1 yetenek puanı.
- Güç değerleri:
  - Saldırı = (8 + 3·lv + silah + 2 yüzük) × cb('a')
  - Savunma = (3 + 1,5·lv + kafa/kol/göğüs/alt/ayak) × cb('f')
  - Can = (80 + 25·lv + 2 küpe) × cb('h')
- `cb(k)` = 1 + Boy yapıları + Kutsal Yer + 0,05·göç + 0,03·rs.hero + 0,04·yetenek + set + hb(k) + kanat + unvan + yoldaşlar + binek (saldırı) + iksirler.
- Can yenilenmesi: saniyede `maxCan/1200 × (1 + 0,1·Şifahane + 0,08·rs.heal + 0,05·Umay sv)`.
- Yuvalar: silah 1 (`w`), kıyafet 5 (`b` kafa, `k` kol, `g` göğüs, `l` alt, `f` ayak), küpe 2 (`e0, e1`), yüzük 2 (`y0, y1`).
- Eşya `{s, r, L, v, n, p}`: tür, nadirlik 0–4 (Sıradan, Nadir, Destansı, Efsanevi, Mitik), seviye, değer, ad, "+" seviyesi.
- Değer `ivb`: silah 5·1,17^L, yüzük 1,75·1,17^L, küpe 20·1,18^L, kıyafet 0,9·1,17^L; × nadirlik çarpanı [1; 1,25; 1,6; 2,1; 2,8] × (0,9–1,1).
- Etkin değer `ev = round(v × (1 + 0,1·p))`.
- Nadirlik dağılımı `dw(L)`: taban [62, 26, 9, 2,6, 0,4] × [0,55; 0,95; 1,45; 1,9; 2,4]^(L/10), normalize.
- Tam set (10 yuva dolu): +%3 × (en düşük nadirlik + 1). Ek setler: Bozkurt (r2), Tulpar (r3), Hakan (r4) 2/4/6 parça → +%1/2/3.
- Eritme: `dust = floor((r+1) × (3 + 1,5·L))` Ustalık Tozu. Çanta 24 (+2/Boy Ambarı sv).
- **Basma (+)** yalnız Demirci'de: demir `ucost = min(2000·1,25^L·(1+p)·(1+0,4p)·(r+1), 0,9·depo)`; başarı şansı +0..+11: %50, 32, 20, 12, 7, 4, 2,2, 1,2, 0,6, 0,3, 0,15, 0,06; en çok +12; +5 ve üstünde başarısızlık −1 (Demirci Sv 5 %50, Sv 10 tam koruma).
- Malzeme: Yükseltme Kağıdı (her basma), Safir (+4 ve üstü), Opal (+8 ve üstü). Düşme: kağıt %5, safir %2,5 (Sv 4+ canavar), opal %2,5 (Sv 8+). Safir↔Opal 1:1 değişir; kağıt değişmez. `s.ek.dm = {lv, t1, mat:{kagit, safir, opal}}`.
- Demirci yapısı: Ocak 3'te açılır, en çok min(15, Ocak); maliyet 600/350/180 × 1,55^lv, süre 10 dk × 1,45^lv; +%3/sv toplama, basma şansı ×(1 + 0,03·lv).
- Yetenekler `TL`: Keskin Pençe (+%4 saldırı), Demir Deri (+%4 savunma), Bozkır Yüreği (+%4 can), Bilgelik (+%5 XP), Av Ustası (+%4 düşme), Kale Savunucusu (+%5 akın savunması). Sv 1 = 1 puan; sonra sv kadar kitap. En çok 5 ve Ocak.
- Yoldaşlar `CP` (canavar türü ilk kez yenilince): Kurt Yoldaş, Kam Ulu, Alp Er Tunga, Umay Ana, Kök Börü; savaşta özel vuruş.
- Binek `MT`: Bozkır Atı (3 000 demir, Alp 5), Bozkurt (150 000, Alp 15), Gökyüzü Kartalı (6 M, Alp 30); sefer süresi −%20/kademe. Ek binekler (Kazak, Yakut, Ahal-Teke, Tulpar) başarımla açılır.
- Unvanlar `TI` başarıma bağlı, seçili olan kalıcı küçük bonus verir.

---

## 7. Canavar savaşı (av)

- Canavar dizisi `M[i] = [ad, emoji, sv, x, y, base]`: ilk 13 sabit tür (0 Bozkır Kurdu … 11 Erlik Han boss, 12 Çayır Kurdu), sonra `denseWorld()` ile 96 + 84 sürü = **180 canavar**; `ergenekon-fauna.js` 13+ indeksleri seviyeye göre 32 türden birine atar (deterministik). Yeni oyun aynı kodu kullanır, böylece `s.mk[i]` ve `s.ek.ms` indeksleri tutar.
- Saldırı şartı: sv ≤ Ocak, bekleme yok, can ≥ %30, enerji.
- Canavar: saldırı `9 × 1,17^L`, can `40 × 1,18^L` (boss ×1,3 / ×1,5; Azman +2 sv, ×1,4 / ×2,5; göç ×(1 + 0,35·n)); savunma = 0,3 × saldırı.
- Tur: Alp vuruşu `max(1, atk − mD) × (0,85–1,15)`, canavar vuruşu `max(1, mA − 0,7·def) × (0,85–1,15)`; en çok 300 tur.
- Zafer: bekleme **60 sn**; XP `floor(10 × 1,22^L) × (boss 2) × (Azman 3)`; rastgele kaynak `floor(nrate(L) × 0,1)`; Et Güveci %12; eşya %65 (+%4·Av Ustası + hb('d'); boss/Azman %100); kahraman kartı %6 (Sv ≥ max(11, Ocak); boss %15); yetenek kitabı %2,5 (boss %7, Azman %25); Bilge Meclisi parçası %20.
- Yenilgi: Alp canı 0 (ölüm yok, dinlenir).
- Azman: her türün 14. öldürmesinde (ilk 11 tür).
- Kaynak paketi (çantaya): yeşil %6 (1 000), mavi %2 Sv 6+ (5 000), mor %0,5 Sv 15+ (10 000); çelik paketleri 100/500/1 000.
- Av Ustalığı `s.ek.ms[base]`: 25/100/250/500/1 000 öldürme → +%2/5/8/12/18 ganimet.
- Günlük 3 işaretli canavar `s.ek.mk`: çift ganimet.
- Seri av ⚔×5: enerji yettiğince 5 vuruş, tek rapor.
- Birlik üçgeni: 🗡️ piyade > 🐎 süvari > 🏹 okçu > 🗡️. Canavar biçimi adından; uygun öncü ×1,2, ters ×0,9. Turan Taktiği +%15.

---

## 8. Harita, kafile ve toplama

- Kaynak noktası verimi `nrate(lv) = 120 × 1,5^(lv−1)`/saat; rezerv `nrate × 80` (eski kayıtlar ×10 taşındı).
- Erişilebilir nokta seviyesi `maxLv = 1 + floor(Ocak/2)`.
- Kafile sayısı `sqn = 1 + floor(Ocak/8) + floor(rs.command/5)`.
- Yük `marchCapacity = floor(1200 × (1 + 0,15·Ocak + 0,1·Ambar) × (1 + 0,1·rs.camp) × (1 + 0,08·rs.logistics))`.
- Yol süresi `mt = max(1, ceil((20 + uzaklık×4) × (1 − 0,2·binek) / (1 + 0,03·rs.march)))`; ek binekler %2–6 kısaltır.
- Toplama hızı/sn: `nrate × (Maden Seferi 1,5) × pm × (1 + 0,04·rs.mine + hb('m')) × (1 + 0,06·Tonyukuk) × (1 + 0,05·rs.gather_tür + wos tür + wos 'Gathering Speed') × 3 / 3600`. Ek: Demirci +%3/sv, Kut +%1/sv, Uğurlu Saat +%50, premium +%35, Ocak ilimleri, toplayıcı kahraman (%2,5×(★+1), en çok %15).
- Yük dolunca ya da nokta bitince geri döner; yük **dönüşte** teslim edilir. Biten nokta 6 sa sonra yenilenir.
- Keşif yarıçapı `s.fx` (sis), Gözcü Kulesi ile açılan Boy Obaları, Kam Mağaraları, Kutsal Yerler, günlük sandıklar; haftalık 6 kurgan (`s.ek.rv`).
- Koordinat: mantıksal 0–100, oba 50/50, km = uzaklık × 2.

---

## 9. Ordu, yaralı ve iyileştirme

- Birlikler: Alp Er 🗡️ (×1), Atlı 🐎 (×1,3), Okçu 🏹 (×1,15). Kademe T1–T11; açık kademe `L = min(Ocak, Kışla)`: L<5 → T1, sonra 2 + floor((L−5)/5), en çok T9 (Kor XI ile T11).
- Eğitim partisi `tb = 10 + 5·Kışla + 5·rs.batch` (akıllı eğitimle ×10'a kadar). Maliyet/10 asker: `et 60u, odun 40u, demir 20u`, `u = 1,18^Ocak × tür × (1 + 0,35·(T−1))`. Süre `ceil((1 + 0,1(T−1)) × 60 × (1 + 0,2·Kışla) × (1 − min(0,7; 0,03·Kışla + 0,04·rs.spd)))`.
- Kapasite `tcap = floor(halk × 6 × (1 + 0,1·Kışla + 0,06·rs.camp) × (1 + 0,02·rs.command))`.
- Ordu gücü `tpow = Σ n × tür × kademe × diziliş × araştırma × 10 × 1,18^Ocak × savaş bonusları`. Diziliş: Dengeli / Alp Öncü / Atlı Kanat / Okçu Hattı (seçilen +%18, diğerleri −%6).
- **Yaralanma** `woundArmy(oran)`: her tür için `oran × (1 − min(0,2; 0,02·rs.triage)) / (savunma × can araştırması)` kadarı `wd`'ye geçer. Ölüm yok.
- Yaralı kapasitesi `wcap = 20 × (1 + Şifahane) × …`; iyileştirme maliyeti eğitim maliyetinin 1/20'si; süre `max(5, n × 1,5 × (1 + n/1250) × (1 + taşma) × (1 − min(0,6; 0,05·Şifahane)) × (1 − min(0,4; 0,04·rs.bandage)))` — 1 000 asker ≈ 45 dk. Otomatik iyileştirme açık.
- Erlik akını (Ocak 3+, 4 sa'te bir): düşman `40 × 1,18^Ocak × (1 + Ocak/10)`, savunma Alp + 1,5·savunma + 30·Ocak + bölgeler + 0,05·ordu, Sur +%5/sv. Kazanırsan depo %1 ganimet, kaybedersen kaynakların %5–25'i gider (Ambar azaltır). Askerler yaralanır.
- Kale kuşatması `CZL` (5 kale), zindan (günde 3, kat başına ödül), Erlik Yarıkları, dünya boss'u (günlük, 30 dk bekleme), destan canavarı (haftalık), Akıncı dalgaları (3 günde bir).

---

## 10. Kahramanlar (Kurultay) ve Bilge Meclisi

- 9 tarihî kahraman `HH`: Mete Han (saldırı), Tomris Hatun (savunma), Alparslan (can), Fatih Sultan Mehmet (üretim), Kara Fatma (ordu), Timur (ordu + akın savunması), Cengiz Han (saldırı + düşme), Oğuz Han (üretim + inşaat), Kubilay Han (XP + maden). Ana bonus +%4/★, ikinci +%3/★.
- Yıldız maliyeti (kod): **30, 75, 150, 300, 600 kart** (`HSC`). (Eski tasarım notu 10/25/50/100/200 idi; kod 30/75/150/300/600 kullanır.)
- Kart kaynakları: Sv ≥ max(11, Ocak) canavarlar %6, Nevruz (48 sa'te bir, 5 kart postayla), kurgan, Destan taraması, pet macerası.
- İkililer (ikisi de ≥1★): Mete+Oğuz saldırı, Cengiz+Kubilay XP, Timur+Cengiz ordu, Alparslan+Fatih üretim, Tomris+Kara Fatma savunma: +%6.
- 5★ sonrası uyanış (120 kart, +%5), fazla kart → toz ×20 ya da Kut ×4.
- Silah uyumu: yay (Mete, Oğuz, Cengiz, Tomris), kılıç (Alparslan, Fatih, Timur, Kara Fatma), mızrak (Kubilay) +%3 saldırı.
- Toplayıcı uzmanlar: Oğuz odun, Fatih et, Kubilay demir, Timur kömür.
- Takvimle gelecek kahramanlar (`ergenekon-icerik.js`): Bilge Kağan 2026-12-15, Kül Tigin 2027-01-15, Attila, Nene Hatun, Babür.
- Bilge Meclisi `HR` (eski mitolojik 5): Börteçine demir, Umay Ana et, Kam Ulu odun, Kürşad ordu, Tonyukuk maden; parça ile 10 seviye (`10·(sv+1)` parça).

## 11. Bozkurt Yavrusu (kurt)

- Ocak 4'te katılır; Sv 1–10. Tecrübe gereği `30 × (30 + 20·sv)`.
- Besle: `floor(80 × 1,3^Ocak)` et → +10 tecrübe.
- Yetenek: günde 1, +`60 + 10·(sv−1)` enerji.
- Macera: Kısa keşif 1 sa (Sv 1), Av gezisi 4 sa (Sv 3), Uzun macera 12 sa (Sv 5); kaynak `nrate(Ocak) × 0,08 / 0,25 / 0,6`, güveç, kart, Bilge parçası, tecrübe 15/40/100.
- Ek evcil hayvanlar `s.ek.pets`: Şahin, Tulpar (yem seferi, darı ile beslenir).

---

## 12. Görevler

- **Destan** `QU` (sıralı bölüm görevleri): ödül `600 × 1,4^Ocak` her kaynaktan + 15 sezon puanı + 3 Bilge parçası.
- **Günlük görevler** `s.ek.gg` (5): 5 canavar avla · haritadan `800 × 1,25^Ocak` topla · 1 yükseltme başlat · 3 boydaşa yardım · 1 arena düellosu. 5/5 sandık: her kaynaktan `1500 × 1,25^Ocak` + 1 kağıt + küçük iksir + küçük kum saati.
- **Günlük meydan** `s.x6.dq` (3 görev, kaynak + toz + şan; üçü bitince 40 toz, 2 güveç, 1 kitap).
- **Emek Defteri** `s.ek.ed` (haftalık 6 hedef, 2/4/6 ödül).
- **Giriş ödülü (28 Günlük Hediyeler)** `lgClaim` (26 Kasım 2026, kullanıcı onayıyla 7 → 28 gün): `s.lg.n` 1–28, gün atlanırsa 1'e döner. Haftanın günü d7 = (n−1)%7+1, hafta w = ⌈n/7⌉. Her gün odun/et/demir/kömür `200 × 1,4^Ocak × d7 × (1 + 0,25·(w−1))` (depo sınırına kadar), sezon puanı `5 × d7`, enerji iksiri 1 (d7 = 7 iken 3); d7 = 7 günlerinde eşya (Ocak+3 seviye); 28. gün ek olarak rastgele bir kahramana 30 kart ve rastgele bir Bilge'ye 3 parça. Altın/satın alma yok. Pencere: sağ sütunda Hediyeler (W.ekHediyeler), haftalar sekmeli.
- **Başarımlar** `AC` → unvanlar `TI`.
- Görev satırına dokunmak ilgili ekranı açar (`W.ekGo`).

---

## 13. Boy (klan) ve posta

- Boy şimdilik yapay üyelerle yerel (`s.ek.boy`): ad, 24 Oğuz boyu tamgası, rütbeler Han/Bey/Alp/Er, haftalık katkı, sabit mesaj, engelleme. Gerçek oyuncular Supabase bağlanınca.
- Boy seviyesi `1 + √(cx/150)` (en çok 20), üye sınırı 10 + 2·Sv.
- Ocak hediyesi 45 dk'da 1 (en çok 25), Akıncı dalgaları, Ocak ilimleri (6 dal × 10 sv), destan canavarı rallisi.
- Yardım: yapım sırasında istek, üyeler 25 sn'de bir yardım eder.
- Boy Ocağı yapıları (`s.x6.b`): Otağ (can), Sancak Direği (savunma), Ambar (depo + çanta), Kutsama Sunağı (XP); yapı planı + boy kasası.
- **Posta** `s.mb[]`: `{t, f, d, rw:{r, sp, ud, sh, cards, items, ek}}`; kategoriler savaş (`sv`), ödül (`ra`), sistem (`si`) başlıktan çıkar. "Hepsini al", okundu, sil. Eşya/altın ticareti postası yok.

## 14. Günlük hediye — Dilek Kuyusu

- Mevcut kural "günlük hediye sandığı" (`ergenekon-sistem.js`): günde 1 kez, gün anahtarı `s.ek.dc = 'YYYY-M-D'` (yerel saat).
- Ödül, `g = 1,32^(Ocak−1)`: odun `400g`, et `350g`, demir `120g`, Ocak 5+ kömür `60g`, Yükseltme Kağıdı 1 (+%35 ihtimalle 2), %12 Safir 1. Kaynaklar depo sınırına uyar (kömür hariç).
- Yeni oyunda bu sandık **Dilek Kuyusu** olarak sunulur: aynı kural, aynı kayıt alanı. Hak birikmez.

---

## 15. Ek modül verisi (`s.ek`)

| Alan | Anlam |
|---|---|
| `dm` | Demirci `{lv, t1, mat}` |
| `pk[]` | Kaynak paketleri (çanta) |
| `ps{}` | Orman parselleri (kesim/tarla) |
| `uq[]` | 3'lü yükseltme sırası |
| `dc` | Günlük hediye günü |
| `ks{m1,m5,m30,h1,h8}` | Kum saatleri (60/300/1800/3600/28800 sn) |
| `ei{s,l}` | Enerji iksirleri |
| `gg` | Günlük görevler |
| `ed` | Emek Defteri |
| `ms{}`, `mk` | Av ustalığı, günlük işaretli canavarlar |
| `rv` | Kurganlar |
| `mf` | Alp Müfrezeleri (2 yuva, 1/2/4/8/12 sa) |
| `pets`, `bn` | Evcil hayvanlar, binekler |
| `boy` | Boy (klan) |
| `oc`, `ot` | Ocak hediyesi/Akıncı, Ocak ilimleri |
| `db`, `ds`, `rl` | Destan canavarı, Destan seferi, ralli |
| `kut`, `kutx`, `ay` | Kut gücü, Ata Yurdu |
| `fr`, `dd`, `rk`, `gl` | Çerçeveler, Destan Defteri, rekorlar, ganimet kaydı |
| `era`, `aw` | Çağ, kahraman uyanışı |
| `prem`, `trial`, `sub` | Premium |
| `tt`, `us` | Turan taktiği, Uğurlu Saat |
| `nm`, `at` | İsim, Ad Tılsımı |
| ayarlar | `gq, eco, fs, vib, vo, ae, ah, ct, rg, wv, npcT, npcI…` |

Çağlar: Ocak 1–10 Oba, 11–20 Boy, 21–30 Bodun, 31–40 Kağanlık.

---

## 16. Diğer sistemler (kısa)

- **Araştırma**: `research-rules.js` (40 eski tür) + `whiteout-research-data.js` (287 düğüm, 2 643 seviye; bonuslar `WOS_RESEARCH.bonus(s.rs, etiket)`). Tek araştırma sırası `s.rq`.
- **Arena**: yapay rakipler, günlük haklar, puan ligleri Er/Alp/Bahadır/Kağan (1100/1300/1600).
- **Nevruz (Simurg)**: 48 sa'te bir, 2 dk sonra posta ile 5 kart + 10 puan; hasar tablosu.
- **Puan Marketi** (Ustalık Tozu ile, oyuncular arası değil): saldırı/savunma iksiri, XP/düşme tılsımı, Bilge Parşömeni, kanat, eldiven, peri.
- **Büyük Göç** (Ocak 40 sonrası prestij): kalıcı +%10 üretim/göç, canavarlar +%35.
- **Sezon**: 30 günlük; bitince puana göre ödül, arena puanı yarıya.
- **Kum saati**: düşme oranı süre uzadıkça azalır; satılmaz.

---

## 17. Yeni oyunun kapsamı (public/yeni/)

Yeni oyun aynı kaydı okur/yazar ve §3–§14 kurallarını kendi motorunda (`yeni/motor.js`) uygular. İlk sürümde motorda olmayan ek sistemler (parsel/tarla, Akıncı, Ocak ilimleri, müfrezeler, arena, araştırma ekranı vb.) **kayıtta korunur**; eski oyun açıldığında kaldığı yerden devam eder. Eksik kalan sistemler sırayla yeni oyuna taşınacak.
