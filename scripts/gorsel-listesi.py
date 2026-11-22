# Görsel listesi üretici — dosya adları yeni/gorsel.js ile aynı tutulur
STYLE=("Hand-painted semi-realistic mobile strategy game art, rich fine detail, warm golden-hour sunlight from the upper left, "
"soft ambient occlusion, earthy natural palette (steppe greens, warm browns, felt white) with accents of deep red, gold and turquoise. "
"Theme: ancient Turkic steppe peoples of the Altai mountains: felt yurts, carved timber, horse-tail tug standards, "
"crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. "
"No text, no letters, no numbers, no watermark, no UI.")
ISO="Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. "
TR="Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides."
OPQ="Full-bleed image, no transparency, no border."
rows=[]  # (bölüm, dosya, boyut, şeffaf, öncelik, komut)
def add(sec,f,size,tr,pri,p): rows.append((sec,f,size,tr,pri,p))

# 1 Şehir
add("Şehir","sehir_zemin.png","1024x1536","Hayır",1,
 "Top-down isometric painted terrain for a mobile city-building screen, portrait. A green Altai mountain valley seen from above at 45 degrees: "
 "at the very top a dark iron mountain (Demir Dag) with thin glowing orange molten veins; below it grassy terraces, a winding dirt road from bottom to top, "
 "one grey rocky cliff band with stone stairs across the middle, a clear river with a small waterfall along the right edge, scattered pines and birches at the edges, "
 "wildflowers. Leave large flat empty grass clearings in the central 70% of the width (buildings will be placed there later). No buildings, no people, no animals. "+STYLE+" "+OPQ)
add("Şehir","sehir_kilit.png","1024x1024","Evet",1,
 ISO+"A locked empty building plot marker: a short carved wooden post with an iron chain wrapped around it and a round stone medallion engraved with a crescent tamga, "
 "standing on a small square of packed earth with four stone corner markers. "+STYLE+" "+TR)
add("Şehir","sehir_insaat.png","1024x1024","Evet",2,
 ISO+"A construction site overlay: timber scaffolding, ropes, stacked logs and a small crane frame, on a square dirt base. "+STYLE+" "+TR)

# 2 Binalar
B=[("ocak","Kutsal Ocak","the sacred hearth of the tribe: a great fire burning in a circular carved stone fire pit, ringed by standing balbal stones and two tug poles with horse-tail standards"),
("oba","Boy Obası","the chieftain's camp: a large white felt otag yurt with a red-and-gold door, smaller yurts around it, enclosed by a wooden palisade with a gate"),
("yurt","Yurt","a cluster of family felt yurts with smoke from the roof rings, firewood and water jars"),
("odunluk","Odunluk","a lumber camp: stacked logs, a chopping block with axes, a timber saw frame under a thatched lean-to"),
("avci","Avcı Çadırı","a hunters' tent: hides stretched on drying racks, bows and quivers, antlers over the entrance, a meat smoking rack"),
("demirci","Börteçine Demirhanesi","an iron forge and mine: a mine entrance cut into a rock face, ore carts on a short rail, a clay smelting furnace with leather bellows and glowing coals"),
("sifa","Şifahane","a healing house: a white felt yurt with herb bundles hanging, clay pots, a small herb garden and wooden cots"),
("kisla","Kışla","a barracks: a training yard with straw target dummies, spear and shield racks, rows of soldiers' tents"),
("sur","Sur","a fortified gate section of the town wall: a sturdy gatehouse flanked by two short wall segments"),
("ambar","Ambar","a storehouse: a raised timber granary with grain sacks, barrels and covered crates"),
("gozcu","Gözcü Kulesi","a tall wooden watchtower with a lookout platform, signal horn and banner"),
("bilgelik","Bilgelik Ocağı","a house of wisdom: a round building with a domed felt roof, carved runic stone steles in front, scroll shelves visible through the open door"),
("komurluk","Kömürlük","charcoal kilns: domed earthen kilns with smoke, stacks of charcoal and wood, a covered coal pile"),
("harpakademi","Harp Ocağı","a war academy: an armory hall with weapon racks and a glowing orange fire-crystal on a stone pedestal in the courtyard")]
T=[(1,"humble and small: rough timber, felt and rope, very simple"),
(5,"slightly larger and sturdier: proper timber frame, a few red cloth banners"),
(10,"larger: carved wooden details, a low stone foundation"),
(15,"stone-based, bronze fittings, red and gold banners with crescent emblems"),
(20,"an expanded complex with stone walls and carved wolf-head beam ends"),
(25,"grand: turquoise glazed tile accents, multiple connected structures"),
(30,"monumental: gilded roof finials with crescents, ornate carvings"),
(35,"majestic: black iron and gold, glowing braziers, tall standards"),
(40,"legendary final form: gold and turquoise, faint orange molten-iron glow, sky-blue banners, a subtle magical aura")]
for k,ad,d in B:
  for lv,td in T:
    add("Binalar",f"bina_{k}_{lv}.png","1024x1024","Evet",1 if lv==1 else (2 if lv in (10,20,30,40) else 3),
      ISO+f"Building '{ad}' at level {lv}: {d}. Level look: {td}. On its own square ground base. "+STYLE+" "+TR)

# 3 Şehirdeki yerler
P=[("yer_kurultay","Kurultay Otağı (kahramanlar)","a grand ceremonial felt tent with nine hero banners in a half circle in front"),
("yer_tug","Tuğ Direği (görevler, etkinlik)","a tall wooden pole crowned with a golden crescent and black horse-tail tassels, ribbons and small offering stones around"),
("yer_sefer","Sefer Otağı (seferler)","an expedition camp: a war tent with a map table, saddled horses tied nearby"),
("yer_agil","Ağıl (kurt ve evcil hayvanlar)","a wooden animal pen with a wolf den of rocks and a small shelter, a feeding trough"),
("yer_hazine","Hazine Otağı","a treasure tent with bronze-bound chests and hanging carpets, guarded entrance"),
("yer_arena","Bahadır Meydanı","a round sand dueling ring with a stake fence, banners and a weapon rack"),
("yer_ors","Sihirli Örs (Demirci)","an outdoor anvil on an octagonal stone platform with a glowing turquoise rune circle and four short crystal pillars"),
("yer_eritme","Eritme Ocağı","a squat clay melting furnace with a stone chimney, glowing slag and a pile of broken old weapons"),
("yer_kuyu","Dilek Kuyusu","a round old stone well with a small wooden roof and a bucket, coins and ribbons tied to a nearby tree, soft turquoise glow from the water")]
for f,ad,d in P:
  add("Şehirdeki yerler",f+".png","1024x1024","Evet",1,ISO+f"Place '{ad}': {d}. On its own ground base. "+STYLE+" "+TR)

# 4 Harita
add("Harita","harita_zemin.png","1024x1024","Hayır",1,"Seamless tileable top-down terrain texture of an Altai steppe seen from high above: grass, small dirt patches, a few tiny bushes. Even lighting, no strong shadows, no objects, edges must tile seamlessly. "+STYLE+" "+OPQ)
add("Harita","harita_orman.png","1024x1024","Evet",2,"Top-down 45 degree view of a small clump of pines and birches as a decorative map object. "+STYLE+" "+TR)
add("Harita","harita_kaya.png","1024x1024","Evet",2,"Top-down 45 degree view of a group of mossy grey rocks as a decorative map object. "+STYLE+" "+TR)
for k,d in [("odun","a forest resource site: felled logs and a woodcutter's stump among pines"),("et","a hunting ground resource site: a grassy clearing with deer tracks and a hunter's hide"),
 ("demir","an iron ore resource site: dark rocks with rusty-red ore veins"),("komur","a coal resource site: black coal seams in a small rocky hollow")]:
  add("Harita",f"maden_{k}.png","1024x1024","Evet",1,"Top-down 45 degree view, map object: "+d+". "+STYLE+" "+TR)
for i in range(1,6):
  add("Harita",f"harita_oba_{i}.png","1024x1024","Evet",1 if i==1 else 2,f"Top-down 45 degree view, a player's steppe settlement as seen on the world map, size stage {i} of 5 (1 = a few yurts in a fence, 5 = a large fortified town with a golden-crescent otag). "+STYLE+" "+TR)
add("Harita","harita_kurgan.png","1024x1024","Evet",2,"Top-down 45 degree view, an ancient burial mound (kurgan) with standing stones, partly covered by mist. "+STYLE+" "+TR)

# 5 Canavarlar
C=[(1,"Bozkır Kurdu","a grey steppe wolf"),(2,"Kara Ayı","a black bear"),(3,"Yılan Ruhu","a ghostly giant serpent spirit"),(4,"Albastı","a pale female forest demon with long hair"),
(5,"Kızıl Boğa","a huge red bull"),(6,"Buz Devi","an ice giant"),(7,"Tepegöz","a one-eyed giant from Turkic legend"),(8,"Karakoncolos","a hairy winter goblin creature"),
(9,"Evren Ejderi","a great serpent-dragon"),(10,"Demir Dev","an iron golem giant"),(11,"Erlik'in Gölgesi","a dark shadow warrior of the underworld"),(12,"Erlik Han","the underworld lord, horned crown, dark robe, black-gold armor (boss)"),
(13,"Çayır Kurdu","a lean meadow wolf"),(14,"Ala Geyik","a spotted red deer stag"),(15,"Yaban Domuzu","a wild boar"),(16,"Kızıl Tilki","a red fox"),
(18,"Börü Kartalı","a large steppe eagle"),(19,"Yaban Öküzü","a wild aurochs ox"),(20,"Kar Parsı","a snow leopard"),(21,"Bozkır Mamutu","a woolly mammoth"),
(22,"Karaca","a roe deer"),(23,"Bozayı","a brown bear"),(24,"Alageyik","a fallow deer"),(25,"Vaşak","a lynx"),(26,"Yaban Atı Sürüsü","a small herd of wild horses"),
(27,"Anadolu Parsı","an Anatolian leopard"),(28,"Dağ Keçisi Sürüsü","a small herd of mountain goats"),(29,"Kartal","a golden eagle"),(30,"Kara Kurt Sürüsü","a pack of three black wolves"),
(31,"Ak Geyik","a legendary white stag with glowing antlers"),(32,"Kara Boğa","a black bull with fiery eyes"),(33,"Börü Ana'nın Yavruları","three blue-grey wolf cubs with a faint sky-blue aura"),
(34,"Ejder Yavrusu","a young dragon")]
for n,ad,d in C:
  add("Canavarlar",f"canavar_{n:02d}.png","1024x1024","Evet",1 if n<=13 else 2,
   f"Creature '{ad}': {d}, full body, three-quarter side view facing left, dynamic but readable pose, realistic proportions, not cartoon. "+STYLE+" "+TR)

# 6 Kahramanlar ve kurt
H=[("mete","Mete Han","Hun ruler, 2nd century BC, fur-lined armor, composite bow"),("tomris","Tomris Hatun","Saka queen, scale armor, golden diadem, spear"),
("alparslan","Alparslan","Seljuk sultan, white robe over chainmail, sword"),("fatih","Fatih Sultan Mehmet","Ottoman sultan, large white turban, red kaftan"),
("karafatma","Kara Fatma","Turkish War of Independence heroine, dark coat, cartridge belts, rifle"),("timur","Timur","Turco-Mongol conqueror, steel helmet, ornate armor"),
("cengiz","Cengiz Han","Mongol khan, fur hat, lamellar armor"),("oguz","Oğuz Han","legendary Oghuz ruler, sun emblem, wolf companion at his side"),
("kubilay","Kubilay Han","Yuan emperor, silk robes, golden ornaments")]
for k,ad,d in H:
  add("Kahramanlar",f"kahraman_{k}.png","1024x1536","Hayır",2,
   f"Portrait card art of the historical figure {ad} ({d}), waist-up, dignified pose, face inspired by historical depictions (miniatures, statues), dramatic backlight, dark painted background with subtle crescent motif. Realistic, not cartoon. "+STYLE+" "+OPQ)
add("Kahramanlar","arka_kahraman.png","1024x1536","Hayır",1,"Background for the hero hall screen: the interior of a great felt otag tent at night, carved wooden pillars, red-gold banners, warm brazier light, soft blur toward the edges, empty center. "+STYLE+" "+OPQ)
add("Kahramanlar","arka_kurt.png","1024x1536","Hayır",1,"Background for the wolf screen: a moonlit rocky wolf den on an Altai slope, blue night sky with a crescent moon, misty pines, soft focus, empty center. "+STYLE+" "+OPQ)
for i,d in [(1,"a small blue-grey wolf pup with bright blue eyes and a tiny crescent collar (stage 1)"),(2,"a young lean grey wolf (stage 2)"),(3,"a strong adult grey wolf with a battle-scarred muzzle and bronze collar (stage 3)"),(4,"the legendary sky-blue wolf Bozkurt, large and noble, faint sky-blue aura, golden crescent collar (final stage)")]:
  add("Kahramanlar",f"kurt_{i}.png","1024x1024","Evet",1,"Full body "+d+", three-quarter view facing left, realistic. "+STYLE+" "+TR)

# 7 Arayüz
UI=[("ui_baslik.png","1536x1024","Evet",1,"A wide horizontal window title banner: a long bar of dark-red lacquered wood with carved gold edges, ending on both sides with carved golden wolf heads facing outward. Flat front view, perfectly horizontal, centered, empty center area (text will be added later)."),
("ui_pencere.png","1024x1536","Evet",1,"A tall window frame, flat front view: dark carved walnut wood border with gold corner pieces shaped like crescents and small wolf heads at the top corners; the inner area is plain warm parchment, evenly lit (it will be stretched as a 9-slice)."),
("ui_satir.png","1536x1024","Evet",1,"A wide horizontal list row plate, flat front view: cream parchment with a thin carved dark-wood edge and tiny gold rivets, empty, evenly lit."),
("ui_ust_cubuk.png","1536x1024","Evet",1,"A long thin horizontal top bar, flat front view: dark wood with gold trim and round gold rivets along the bottom edge, empty."),
("ui_alt_menu.png","1536x1024","Evet",1,"A long horizontal bottom menu bar, flat front view: dark lacquered wood with a gold top rim, four slightly raised panels separated by small gold studs, empty."),
("ui_portre.png","1024x1024","Evet",1,"A round portrait frame, flat front view: gold ring with a carved wolf head at the top and a small crescent at the bottom, empty transparent center."),
("ui_yuvarlak.png","1024x1024","Evet",1,"A round button frame, flat front view: bronze-gold ring with fine runic engraving, dark red inner disc, no icon."),
("ui_dunya.png","1024x1024","Evet",1,"A large round main button frame, flat front view: thick gold ring with two small wolf heads on the sides, deep red inner disc, no icon."),
("ui_kart_1.png","1024x1536","Evet",1,"A hero card frame, flat front view, common rank: bronze border with a small wolf-head crest at the top, empty transparent window."),
("ui_kart_2.png","1024x1536","Evet",2,"The same hero card frame, rare rank: silver-turquoise border with a wolf-head crest, empty transparent window."),
("ui_kart_3.png","1024x1536","Evet",2,"The same hero card frame, epic rank: purple and gold border with a wolf-head crest, empty transparent window."),
("ui_kart_4.png","1024x1536","Evet",2,"The same hero card frame, legendary rank: bright gold border with radiant crescent and wolf-head crest, empty transparent window."),
("ui_dugme_altin.png","1536x1024","Evet",1,"A wide horizontal game button, flat front view: glossy gold-orange center with carved bronze end caps shaped like small wolf heads, no text."),
("ui_dugme_mavi.png","1536x1024","Evet",1,"A wide horizontal game button, flat front view: deep blue enamel center with gold trim and bronze end caps, no text."),
("ui_dugme_yesil.png","1536x1024","Evet",1,"A wide horizontal game button, flat front view: green enamel center with gold trim, no text."),
("ui_dugme_kirmizi.png","1536x1024","Evet",2,"A wide horizontal game button, flat front view: dark red enamel center with gold trim, no text."),
("ui_tamga.png","1024x1024","Evet",1,"A small round stone seal (tamga) medallion with an engraved Turkic tamga mark, used as an info icon, front view."),
("ui_hilal.png","1024x1024","Evet",1,"A small glowing golden crescent moon emblem, used as an alert badge, front view, soft glow."),
("ui_kilit.png","1024x1024","Evet",1,"A small antique bronze padlock with a crescent keyhole, front view.")]
for f,sz,tr,pri,d in UI: add("Arayüz",f,sz,tr,pri,d+" "+STYLE+(" "+TR if tr=="Evet" else " "+OPQ))
SN=[("sandik_1","plain wooden chest with iron bands"),("sandik_2","bronze-bound wooden chest"),("sandik_3","silver chest with turquoise inlays"),("sandik_4","golden chest with crescent emblem"),("sandik_5","legendary chest of dark wood and gold with a wolf-head lock and a soft sky-blue glow")]
for f,d in SN: add("Sandıklar",f+".png","1024x1024","Evet",1,"A closed "+d+", three-quarter front view. "+STYLE+" "+TR)
add("Sandıklar","sandik_acik.png","1024x1024","Evet",1,"An opened golden chest overflowing with light, gold-white rays and sparkles coming out, three-quarter front view. "+STYLE+" "+TR)

# 8 Simgeler
I=[("ikon_odun","a bundle of chopped logs"),("ikon_et","a leg of roasted meat"),("ikon_demir","a stack of iron ingots"),("ikon_komur","a pile of black coal lumps"),
("ikon_celik","a stack of polished steel bars"),("ikon_kor","a glowing orange fire crystal (Kor)"),("ikon_dari","a sheaf of millet"),("ikon_toz","a small pouch of glittering golden mastery dust"),
("ikon_enerji","a lightning bolt carved in bronze with turquoise glow"),("ikon_guc","two crossed sabres over a round shield"),("ikon_xp","a glowing scroll"),
("ikon_kagit","an upgrade scroll with a red wax seal"),("ikon_safir","a cut blue sapphire"),("ikon_opal","a cut iridescent opal"),("ikon_kart","a hero card back with a wolf emblem"),
("ikon_kitap","a leather skill book with a crescent clasp"),("ikon_guvec","a clay pot of meat stew"),("ikon_iksir","a small glass vial of turquoise energy potion"),
("ikon_kumsaati","an hourglass with a bronze frame"),("ikon_paket","a tied canvas supply sack"),
("menu_kahraman","a warrior helmet with a red plume"),("menu_canta","a leather saddle bag"),("menu_posta","a rolled letter with a red seal and a feather"),("menu_boy","a round wolf-head shield crest"),
("menu_dunya","a rolled map with a compass"),("menu_sehir","a felt yurt with a crescent finial"),("menu_gorev","an open scroll with a quill"),("menu_etkinlik","a war drum with ribbons"),
("menu_yardim","two clasped hands in bronze gauntlets"),("menu_topla","an overflowing sack of grain, logs and iron"),("menu_ayar","a bronze gear with runes"),("menu_kuyu","a small stone well"),
("sira_insaat","a hammer"),("sira_arastirma","an open book with a quill"),("sira_egitim","a steel helmet"),
("birlik_piyade","a sword and shield"),("birlik_atli","a horse head"),("birlik_okcu","a drawn bow"),
("esya_silah","a curved steppe sabre"),("esya_kafa","a pointed steppe helmet"),("esya_kol","leather bracers"),("esya_govde","lamellar armor"),("esya_alt","riding trousers"),("esya_ayak","riding boots"),("esya_kupe","a gold earring"),("esya_yuzuk","a signet ring")]
for f,d in I: add("Simgeler",f+".png","1024x1024","Evet",1,"Game icon: "+d+", bold readable silhouette, three-quarter front view, slight rim light. "+STYLE+" "+TR)

# 9 Diğer
add("Diğer","giris.png","1024x1536","Hayır",1,"Loading screen: the legendary Ergenekon valley at dawn, a grey wolf standing on a rock in the foreground looking at a huge iron mountain whose veins glow orange as it melts, the Turkic tribes' yurts below, epic and calm. Leave the bottom third darker for a progress bar. "+STYLE+" "+OPQ)
add("Diğer","arka_kuyu.png","1024x1536","Hayır",1,"Background for the wishing well screen: the old stone well in a quiet glade beside a waterfall, ribbons on a sacred tree, soft turquoise light from the water, empty space in the middle. "+STYLE+" "+OPQ)
add("Diğer","arka_isik.png","1024x1536","Hayır",2,"Celebration background: deep blue night with soft radial golden light rays from the center and tiny sparkles, no objects. "+STYLE+" "+OPQ)
add("Diğer","arka_boy.png","1024x1536","Hayır",2,"Background for the tribe screen: a big kurultay gathering seen from afar, many yurts and banners on a steppe at sunset, soft focus. "+STYLE+" "+OPQ)

import collections
out=[]
out.append("# Ergenekon: Demir Dağ — ChatGPT görsel listesi\n")
out.append("Yeni oyun (`public/yeni/`) bu dosya adlarını bekler. Bir görsel gelene kadar oyun geçici görsel kullanır; gelen her dosya kendi yerine oturur.\n")
out.append("## Nasıl üretilir\n")
out.append("- Her komutu ChatGPT'ye **ayrı ayrı** yapıştır. Ortak tarz her komutun içinde zaten var.\n- Boyutu tablodaki gibi seç (1024x1024 kare, 1024x1536 dikey, 1536x1024 yatay).\n- Şeffaf = Evet olanlarda arka plan **şeffaf PNG** olmalı. ChatGPT şeffaf vermezse düz yeşil (#00FF00) arka plan iste; ben temizlerim.\n- Dosyayı tablodaki adla kaydet, hepsini tek zip olarak getir. Ben WebP'ye çevirip oyuna koyarım.\n- Öncelik 1 = ilk açılış için gerekli, 2 = sonra, 3 = süs (ara seviyeler).\n- King of Altay'ın resim, simge ve yazıları kullanılmaz; komutlar özgün tasarım ister.\n")
out.append("## Ortak tarz\n")
out.append("```\n"+STYLE+"\n```\n")
out.append("Binalarda ek olarak: `"+ISO.strip()+"`\n\nŞeffaf olanlarda ek olarak: `"+TR+"`\n")
c=collections.Counter(r[4] for r in rows)
out.append(f"Toplam **{len(rows)}** görsel · Öncelik 1: {c[1]} · Öncelik 2: {c[2]} · Öncelik 3: {c[3]}\n")
sec=None
for s,f,size,tr,pri,p in rows:
  if s!=sec:
    sec=s; out.append(f"\n## {s}\n")
    if s=="Binalar": out.append("Her bina 9 görünüm: Sv 1, 5, 10, 15, 20, 25, 30, 35, 40. Ara görünüm yoksa oyun bir alttakini kullanır.\n")
  out.append(f"### `{f}`\n{size} · Şeffaf: {tr} · Öncelik {pri}\n\n```\n{p}\n```\n")
open('GORSEL-LISTESI.md','w').write("\n".join(out))
import json
json.dump([{"f":r[1],"s":r[2],"t":r[3],"p":r[4]} for r in rows],open('/tmp/gorsel.json','w'),ensure_ascii=False)
print(len(rows),c)
