# Ergenekon: Demir Dağ — ChatGPT görsel listesi

Yeni oyun (`public/yeni/`) bu dosya adlarını bekler. Bir görsel gelene kadar oyun geçici görsel kullanır; gelen her dosya kendi yerine oturur.

## Nasıl üretilir

- Her komutu ChatGPT'ye **ayrı ayrı** yapıştır. Ortak tarz her komutun içinde zaten var.
- Boyutu tablodaki gibi seç (1024x1024 kare, 1024x1536 dikey, 1536x1024 yatay).
- Şeffaf = Evet olanlarda arka plan **şeffaf PNG** olmalı. ChatGPT şeffaf vermezse düz yeşil (#00FF00) arka plan iste; ben temizlerim.
- Dosyayı tablodaki adla kaydet, hepsini tek zip olarak getir. Ben WebP'ye çevirip oyuna koyarım.
- Öncelik 1 = ilk açılış için gerekli, 2 = sonra, 3 = süs (ara seviyeler).
- King of Altay'ın resim, simge ve yazıları kullanılmaz; komutlar özgün tasarım ister.

## Ortak tarz

```
Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI.
```

Binalarda ek olarak: `Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building.`

Şeffaf olanlarda ek olarak: `Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.`

Toplam **274** görsel · Öncelik 1: 119 · Öncelik 2: 99 · Öncelik 3: 56


## Şehir

### `sehir_zemin.png`
1024x1536 · Şeffaf: Hayır · Öncelik 1

```
Top-down isometric realistic terrain for a mobile city-building screen, portrait, camera about 45 degrees. The inside of a hill fortress in a green Altai valley: at the very top a dark iron mountain (Demir Dag) with thin glowing orange molten veins; an outer stone city wall with square towers runs along the left edge, the right edge and the bottom edge, with an open gate gap at the bottom center; inside the walls grassy terraces, cobbled paths and packed-earth yards, one low stone retaining wall with stairs across the middle; outside the right wall a river with a small waterfall; a few pines and birches. Leave large flat empty clearings in the central 70% of the width (buildings will be placed there later). No buildings inside the walls, no people, no animals. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Full-bleed image, no transparency, no border.
```

### `sehir_kilit.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. A locked empty building plot: a square of packed earth with stone corner blocks, a short stone pillar carved with a crescent tamga and wrapped with an iron chain. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `sehir_insaat.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. A construction site overlay: timber scaffolding, ropes, stacked logs and a small crane frame, on a square dirt base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```


## Binalar

Her bina 9 görünüm: Sv 1, 5, 10, 15, 20, 25, 30, 35, 40. Ara görünüm yoksa oyun bir alttakini kullanır.

### `bina_ocak_1.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Kutsal Ocak' at level 1: the sacred fire sanctuary of the fortress: an eternal flame on a large stepped stone altar, carved runic standing stones around it, low stone walls and two tug standards. Level look: small and humble: rough timber, wattle and packed earth. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_ocak_5.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Kutsal Ocak' at level 5: the sacred fire sanctuary of the fortress: an eternal flame on a large stepped stone altar, carved runic standing stones around it, low stone walls and two tug standards. Level look: sturdier: timber on a stone footing, a few red banners. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_ocak_10.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Kutsal Ocak' at level 10: the sacred fire sanctuary of the fortress: an eternal flame on a large stepped stone altar, carved runic standing stones around it, low stone walls and two tug standards. Level look: larger: stone lower walls with timber upper floors. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_ocak_15.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Kutsal Ocak' at level 15: the sacred fire sanctuary of the fortress: an eternal flame on a large stepped stone altar, carved runic standing stones around it, low stone walls and two tug standards. Level look: mostly stone, iron fittings, red and gold banners with crescent emblems. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_ocak_20.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Kutsal Ocak' at level 20: the sacred fire sanctuary of the fortress: an eternal flame on a large stepped stone altar, carved runic standing stones around it, low stone walls and two tug standards. Level look: expanded: crenellated stone walls, carved wolf-head beam ends. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_ocak_25.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Kutsal Ocak' at level 25: the sacred fire sanctuary of the fortress: an eternal flame on a large stepped stone altar, carved runic standing stones around it, low stone walls and two tug standards. Level look: grand: several connected stone buildings, turquoise glazed tile accents. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_ocak_30.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Kutsal Ocak' at level 30: the sacred fire sanctuary of the fortress: an eternal flame on a large stepped stone altar, carved runic standing stones around it, low stone walls and two tug standards. Level look: monumental fortified stone, gilded crescent finials on the roofs. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_ocak_35.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Kutsal Ocak' at level 35: the sacred fire sanctuary of the fortress: an eternal flame on a large stepped stone altar, carved runic standing stones around it, low stone walls and two tug standards. Level look: majestic: dark stone and gold, burning braziers, tall standards. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_ocak_40.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Kutsal Ocak' at level 40: the sacred fire sanctuary of the fortress: an eternal flame on a large stepped stone altar, carved runic standing stones around it, low stone walls and two tug standards. Level look: legendary citadel form: gold and turquoise details, a faint orange molten-iron glow, sky-blue banners. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_oba_1.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Boy Obası (ana kale)' at level 1: the main fortress of the tribe: a tall square stone keep tower with a timber upper gallery and red banners, an attached timber hall, a white felt yurt in the inner courtyard, surrounded by stone-and-timber walls with a gate and stairs. Level look: small and humble: rough timber, wattle and packed earth. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_oba_5.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Boy Obası (ana kale)' at level 5: the main fortress of the tribe: a tall square stone keep tower with a timber upper gallery and red banners, an attached timber hall, a white felt yurt in the inner courtyard, surrounded by stone-and-timber walls with a gate and stairs. Level look: sturdier: timber on a stone footing, a few red banners. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_oba_10.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Boy Obası (ana kale)' at level 10: the main fortress of the tribe: a tall square stone keep tower with a timber upper gallery and red banners, an attached timber hall, a white felt yurt in the inner courtyard, surrounded by stone-and-timber walls with a gate and stairs. Level look: larger: stone lower walls with timber upper floors. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_oba_15.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Boy Obası (ana kale)' at level 15: the main fortress of the tribe: a tall square stone keep tower with a timber upper gallery and red banners, an attached timber hall, a white felt yurt in the inner courtyard, surrounded by stone-and-timber walls with a gate and stairs. Level look: mostly stone, iron fittings, red and gold banners with crescent emblems. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_oba_20.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Boy Obası (ana kale)' at level 20: the main fortress of the tribe: a tall square stone keep tower with a timber upper gallery and red banners, an attached timber hall, a white felt yurt in the inner courtyard, surrounded by stone-and-timber walls with a gate and stairs. Level look: expanded: crenellated stone walls, carved wolf-head beam ends. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_oba_25.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Boy Obası (ana kale)' at level 25: the main fortress of the tribe: a tall square stone keep tower with a timber upper gallery and red banners, an attached timber hall, a white felt yurt in the inner courtyard, surrounded by stone-and-timber walls with a gate and stairs. Level look: grand: several connected stone buildings, turquoise glazed tile accents. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_oba_30.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Boy Obası (ana kale)' at level 30: the main fortress of the tribe: a tall square stone keep tower with a timber upper gallery and red banners, an attached timber hall, a white felt yurt in the inner courtyard, surrounded by stone-and-timber walls with a gate and stairs. Level look: monumental fortified stone, gilded crescent finials on the roofs. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_oba_35.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Boy Obası (ana kale)' at level 35: the main fortress of the tribe: a tall square stone keep tower with a timber upper gallery and red banners, an attached timber hall, a white felt yurt in the inner courtyard, surrounded by stone-and-timber walls with a gate and stairs. Level look: majestic: dark stone and gold, burning braziers, tall standards. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_oba_40.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Boy Obası (ana kale)' at level 40: the main fortress of the tribe: a tall square stone keep tower with a timber upper gallery and red banners, an attached timber hall, a white felt yurt in the inner courtyard, surrounded by stone-and-timber walls with a gate and stairs. Level look: legendary citadel form: gold and turquoise details, a faint orange molten-iron glow, sky-blue banners. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_yurt_1.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Yurt' at level 1: the people's quarter: stone-based timber houses and a few felt yurts inside a low stone wall. Level look: small and humble: rough timber, wattle and packed earth. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_yurt_5.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Yurt' at level 5: the people's quarter: stone-based timber houses and a few felt yurts inside a low stone wall. Level look: sturdier: timber on a stone footing, a few red banners. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_yurt_10.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Yurt' at level 10: the people's quarter: stone-based timber houses and a few felt yurts inside a low stone wall. Level look: larger: stone lower walls with timber upper floors. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_yurt_15.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Yurt' at level 15: the people's quarter: stone-based timber houses and a few felt yurts inside a low stone wall. Level look: mostly stone, iron fittings, red and gold banners with crescent emblems. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_yurt_20.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Yurt' at level 20: the people's quarter: stone-based timber houses and a few felt yurts inside a low stone wall. Level look: expanded: crenellated stone walls, carved wolf-head beam ends. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_yurt_25.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Yurt' at level 25: the people's quarter: stone-based timber houses and a few felt yurts inside a low stone wall. Level look: grand: several connected stone buildings, turquoise glazed tile accents. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_yurt_30.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Yurt' at level 30: the people's quarter: stone-based timber houses and a few felt yurts inside a low stone wall. Level look: monumental fortified stone, gilded crescent finials on the roofs. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_yurt_35.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Yurt' at level 35: the people's quarter: stone-based timber houses and a few felt yurts inside a low stone wall. Level look: majestic: dark stone and gold, burning braziers, tall standards. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_yurt_40.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Yurt' at level 40: the people's quarter: stone-based timber houses and a few felt yurts inside a low stone wall. Level look: legendary citadel form: gold and turquoise details, a faint orange molten-iron glow, sky-blue banners. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_odunluk_1.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Odunluk' at level 1: a sawmill: a timber-frame saw hall with stacked logs and a log ramp. Level look: small and humble: rough timber, wattle and packed earth. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_odunluk_5.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Odunluk' at level 5: a sawmill: a timber-frame saw hall with stacked logs and a log ramp. Level look: sturdier: timber on a stone footing, a few red banners. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_odunluk_10.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Odunluk' at level 10: a sawmill: a timber-frame saw hall with stacked logs and a log ramp. Level look: larger: stone lower walls with timber upper floors. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_odunluk_15.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Odunluk' at level 15: a sawmill: a timber-frame saw hall with stacked logs and a log ramp. Level look: mostly stone, iron fittings, red and gold banners with crescent emblems. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_odunluk_20.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Odunluk' at level 20: a sawmill: a timber-frame saw hall with stacked logs and a log ramp. Level look: expanded: crenellated stone walls, carved wolf-head beam ends. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_odunluk_25.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Odunluk' at level 25: a sawmill: a timber-frame saw hall with stacked logs and a log ramp. Level look: grand: several connected stone buildings, turquoise glazed tile accents. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_odunluk_30.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Odunluk' at level 30: a sawmill: a timber-frame saw hall with stacked logs and a log ramp. Level look: monumental fortified stone, gilded crescent finials on the roofs. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_odunluk_35.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Odunluk' at level 35: a sawmill: a timber-frame saw hall with stacked logs and a log ramp. Level look: majestic: dark stone and gold, burning braziers, tall standards. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_odunluk_40.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Odunluk' at level 40: a sawmill: a timber-frame saw hall with stacked logs and a log ramp. Level look: legendary citadel form: gold and turquoise details, a faint orange molten-iron glow, sky-blue banners. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_avci_1.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Avcı Çadırı' at level 1: a hunters' lodge: a timber lodge with hide-drying racks, antlers over the door and a smokehouse. Level look: small and humble: rough timber, wattle and packed earth. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_avci_5.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Avcı Çadırı' at level 5: a hunters' lodge: a timber lodge with hide-drying racks, antlers over the door and a smokehouse. Level look: sturdier: timber on a stone footing, a few red banners. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_avci_10.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Avcı Çadırı' at level 10: a hunters' lodge: a timber lodge with hide-drying racks, antlers over the door and a smokehouse. Level look: larger: stone lower walls with timber upper floors. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_avci_15.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Avcı Çadırı' at level 15: a hunters' lodge: a timber lodge with hide-drying racks, antlers over the door and a smokehouse. Level look: mostly stone, iron fittings, red and gold banners with crescent emblems. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_avci_20.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Avcı Çadırı' at level 20: a hunters' lodge: a timber lodge with hide-drying racks, antlers over the door and a smokehouse. Level look: expanded: crenellated stone walls, carved wolf-head beam ends. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_avci_25.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Avcı Çadırı' at level 25: a hunters' lodge: a timber lodge with hide-drying racks, antlers over the door and a smokehouse. Level look: grand: several connected stone buildings, turquoise glazed tile accents. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_avci_30.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Avcı Çadırı' at level 30: a hunters' lodge: a timber lodge with hide-drying racks, antlers over the door and a smokehouse. Level look: monumental fortified stone, gilded crescent finials on the roofs. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_avci_35.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Avcı Çadırı' at level 35: a hunters' lodge: a timber lodge with hide-drying racks, antlers over the door and a smokehouse. Level look: majestic: dark stone and gold, burning braziers, tall standards. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_avci_40.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Avcı Çadırı' at level 40: a hunters' lodge: a timber lodge with hide-drying racks, antlers over the door and a smokehouse. Level look: legendary citadel form: gold and turquoise details, a faint orange molten-iron glow, sky-blue banners. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_demirci_1.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Börteçine Demirhanesi' at level 1: an iron mine and smelter: a mine entrance with timber supports cut into a rock face, a stone smelting furnace with leather bellows and glowing coals, ore carts. Level look: small and humble: rough timber, wattle and packed earth. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_demirci_5.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Börteçine Demirhanesi' at level 5: an iron mine and smelter: a mine entrance with timber supports cut into a rock face, a stone smelting furnace with leather bellows and glowing coals, ore carts. Level look: sturdier: timber on a stone footing, a few red banners. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_demirci_10.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Börteçine Demirhanesi' at level 10: an iron mine and smelter: a mine entrance with timber supports cut into a rock face, a stone smelting furnace with leather bellows and glowing coals, ore carts. Level look: larger: stone lower walls with timber upper floors. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_demirci_15.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Börteçine Demirhanesi' at level 15: an iron mine and smelter: a mine entrance with timber supports cut into a rock face, a stone smelting furnace with leather bellows and glowing coals, ore carts. Level look: mostly stone, iron fittings, red and gold banners with crescent emblems. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_demirci_20.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Börteçine Demirhanesi' at level 20: an iron mine and smelter: a mine entrance with timber supports cut into a rock face, a stone smelting furnace with leather bellows and glowing coals, ore carts. Level look: expanded: crenellated stone walls, carved wolf-head beam ends. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_demirci_25.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Börteçine Demirhanesi' at level 25: an iron mine and smelter: a mine entrance with timber supports cut into a rock face, a stone smelting furnace with leather bellows and glowing coals, ore carts. Level look: grand: several connected stone buildings, turquoise glazed tile accents. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_demirci_30.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Börteçine Demirhanesi' at level 30: an iron mine and smelter: a mine entrance with timber supports cut into a rock face, a stone smelting furnace with leather bellows and glowing coals, ore carts. Level look: monumental fortified stone, gilded crescent finials on the roofs. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_demirci_35.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Börteçine Demirhanesi' at level 35: an iron mine and smelter: a mine entrance with timber supports cut into a rock face, a stone smelting furnace with leather bellows and glowing coals, ore carts. Level look: majestic: dark stone and gold, burning braziers, tall standards. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_demirci_40.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Börteçine Demirhanesi' at level 40: an iron mine and smelter: a mine entrance with timber supports cut into a rock face, a stone smelting furnace with leather bellows and glowing coals, ore carts. Level look: legendary citadel form: gold and turquoise details, a faint orange molten-iron glow, sky-blue banners. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_sifa_1.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Şifahane' at level 1: an infirmary: a stone and timber healing house with a herb garden and covered beds. Level look: small and humble: rough timber, wattle and packed earth. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_sifa_5.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Şifahane' at level 5: an infirmary: a stone and timber healing house with a herb garden and covered beds. Level look: sturdier: timber on a stone footing, a few red banners. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_sifa_10.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Şifahane' at level 10: an infirmary: a stone and timber healing house with a herb garden and covered beds. Level look: larger: stone lower walls with timber upper floors. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_sifa_15.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Şifahane' at level 15: an infirmary: a stone and timber healing house with a herb garden and covered beds. Level look: mostly stone, iron fittings, red and gold banners with crescent emblems. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_sifa_20.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Şifahane' at level 20: an infirmary: a stone and timber healing house with a herb garden and covered beds. Level look: expanded: crenellated stone walls, carved wolf-head beam ends. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_sifa_25.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Şifahane' at level 25: an infirmary: a stone and timber healing house with a herb garden and covered beds. Level look: grand: several connected stone buildings, turquoise glazed tile accents. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_sifa_30.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Şifahane' at level 30: an infirmary: a stone and timber healing house with a herb garden and covered beds. Level look: monumental fortified stone, gilded crescent finials on the roofs. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_sifa_35.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Şifahane' at level 35: an infirmary: a stone and timber healing house with a herb garden and covered beds. Level look: majestic: dark stone and gold, burning braziers, tall standards. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_sifa_40.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Şifahane' at level 40: an infirmary: a stone and timber healing house with a herb garden and covered beds. Level look: legendary citadel form: gold and turquoise details, a faint orange molten-iron glow, sky-blue banners. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_kisla_1.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Kışla' at level 1: barracks: a stone barracks hall with a training yard, archery targets and weapon racks. Level look: small and humble: rough timber, wattle and packed earth. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_kisla_5.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Kışla' at level 5: barracks: a stone barracks hall with a training yard, archery targets and weapon racks. Level look: sturdier: timber on a stone footing, a few red banners. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_kisla_10.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Kışla' at level 10: barracks: a stone barracks hall with a training yard, archery targets and weapon racks. Level look: larger: stone lower walls with timber upper floors. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_kisla_15.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Kışla' at level 15: barracks: a stone barracks hall with a training yard, archery targets and weapon racks. Level look: mostly stone, iron fittings, red and gold banners with crescent emblems. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_kisla_20.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Kışla' at level 20: barracks: a stone barracks hall with a training yard, archery targets and weapon racks. Level look: expanded: crenellated stone walls, carved wolf-head beam ends. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_kisla_25.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Kışla' at level 25: barracks: a stone barracks hall with a training yard, archery targets and weapon racks. Level look: grand: several connected stone buildings, turquoise glazed tile accents. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_kisla_30.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Kışla' at level 30: barracks: a stone barracks hall with a training yard, archery targets and weapon racks. Level look: monumental fortified stone, gilded crescent finials on the roofs. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_kisla_35.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Kışla' at level 35: barracks: a stone barracks hall with a training yard, archery targets and weapon racks. Level look: majestic: dark stone and gold, burning braziers, tall standards. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_kisla_40.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Kışla' at level 40: barracks: a stone barracks hall with a training yard, archery targets and weapon racks. Level look: legendary citadel form: gold and turquoise details, a faint orange molten-iron glow, sky-blue banners. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_sur_1.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Sur' at level 1: the city wall gate: a fortified stone gatehouse with timber hoardings, flanked by two short wall segments. Level look: small and humble: rough timber, wattle and packed earth. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_sur_5.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Sur' at level 5: the city wall gate: a fortified stone gatehouse with timber hoardings, flanked by two short wall segments. Level look: sturdier: timber on a stone footing, a few red banners. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_sur_10.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Sur' at level 10: the city wall gate: a fortified stone gatehouse with timber hoardings, flanked by two short wall segments. Level look: larger: stone lower walls with timber upper floors. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_sur_15.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Sur' at level 15: the city wall gate: a fortified stone gatehouse with timber hoardings, flanked by two short wall segments. Level look: mostly stone, iron fittings, red and gold banners with crescent emblems. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_sur_20.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Sur' at level 20: the city wall gate: a fortified stone gatehouse with timber hoardings, flanked by two short wall segments. Level look: expanded: crenellated stone walls, carved wolf-head beam ends. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_sur_25.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Sur' at level 25: the city wall gate: a fortified stone gatehouse with timber hoardings, flanked by two short wall segments. Level look: grand: several connected stone buildings, turquoise glazed tile accents. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_sur_30.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Sur' at level 30: the city wall gate: a fortified stone gatehouse with timber hoardings, flanked by two short wall segments. Level look: monumental fortified stone, gilded crescent finials on the roofs. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_sur_35.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Sur' at level 35: the city wall gate: a fortified stone gatehouse with timber hoardings, flanked by two short wall segments. Level look: majestic: dark stone and gold, burning braziers, tall standards. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_sur_40.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Sur' at level 40: the city wall gate: a fortified stone gatehouse with timber hoardings, flanked by two short wall segments. Level look: legendary citadel form: gold and turquoise details, a faint orange molten-iron glow, sky-blue banners. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_ambar_1.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Ambar' at level 1: a storehouse: a stone granary with a timber roof, grain sacks and barrels. Level look: small and humble: rough timber, wattle and packed earth. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_ambar_5.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Ambar' at level 5: a storehouse: a stone granary with a timber roof, grain sacks and barrels. Level look: sturdier: timber on a stone footing, a few red banners. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_ambar_10.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Ambar' at level 10: a storehouse: a stone granary with a timber roof, grain sacks and barrels. Level look: larger: stone lower walls with timber upper floors. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_ambar_15.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Ambar' at level 15: a storehouse: a stone granary with a timber roof, grain sacks and barrels. Level look: mostly stone, iron fittings, red and gold banners with crescent emblems. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_ambar_20.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Ambar' at level 20: a storehouse: a stone granary with a timber roof, grain sacks and barrels. Level look: expanded: crenellated stone walls, carved wolf-head beam ends. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_ambar_25.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Ambar' at level 25: a storehouse: a stone granary with a timber roof, grain sacks and barrels. Level look: grand: several connected stone buildings, turquoise glazed tile accents. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_ambar_30.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Ambar' at level 30: a storehouse: a stone granary with a timber roof, grain sacks and barrels. Level look: monumental fortified stone, gilded crescent finials on the roofs. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_ambar_35.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Ambar' at level 35: a storehouse: a stone granary with a timber roof, grain sacks and barrels. Level look: majestic: dark stone and gold, burning braziers, tall standards. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_ambar_40.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Ambar' at level 40: a storehouse: a stone granary with a timber roof, grain sacks and barrels. Level look: legendary citadel form: gold and turquoise details, a faint orange molten-iron glow, sky-blue banners. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_gozcu_1.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Gözcü Kulesi' at level 1: a watchtower: a tall stone-based tower with a timber lookout top and a signal brazier. Level look: small and humble: rough timber, wattle and packed earth. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_gozcu_5.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Gözcü Kulesi' at level 5: a watchtower: a tall stone-based tower with a timber lookout top and a signal brazier. Level look: sturdier: timber on a stone footing, a few red banners. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_gozcu_10.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Gözcü Kulesi' at level 10: a watchtower: a tall stone-based tower with a timber lookout top and a signal brazier. Level look: larger: stone lower walls with timber upper floors. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_gozcu_15.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Gözcü Kulesi' at level 15: a watchtower: a tall stone-based tower with a timber lookout top and a signal brazier. Level look: mostly stone, iron fittings, red and gold banners with crescent emblems. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_gozcu_20.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Gözcü Kulesi' at level 20: a watchtower: a tall stone-based tower with a timber lookout top and a signal brazier. Level look: expanded: crenellated stone walls, carved wolf-head beam ends. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_gozcu_25.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Gözcü Kulesi' at level 25: a watchtower: a tall stone-based tower with a timber lookout top and a signal brazier. Level look: grand: several connected stone buildings, turquoise glazed tile accents. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_gozcu_30.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Gözcü Kulesi' at level 30: a watchtower: a tall stone-based tower with a timber lookout top and a signal brazier. Level look: monumental fortified stone, gilded crescent finials on the roofs. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_gozcu_35.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Gözcü Kulesi' at level 35: a watchtower: a tall stone-based tower with a timber lookout top and a signal brazier. Level look: majestic: dark stone and gold, burning braziers, tall standards. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_gozcu_40.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Gözcü Kulesi' at level 40: a watchtower: a tall stone-based tower with a timber lookout top and a signal brazier. Level look: legendary citadel form: gold and turquoise details, a faint orange molten-iron glow, sky-blue banners. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_bilgelik_1.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Bilgelik Ocağı' at level 1: an academy of wisdom: a stone hall with a domed roof and a courtyard of carved runic stelae. Level look: small and humble: rough timber, wattle and packed earth. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_bilgelik_5.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Bilgelik Ocağı' at level 5: an academy of wisdom: a stone hall with a domed roof and a courtyard of carved runic stelae. Level look: sturdier: timber on a stone footing, a few red banners. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_bilgelik_10.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Bilgelik Ocağı' at level 10: an academy of wisdom: a stone hall with a domed roof and a courtyard of carved runic stelae. Level look: larger: stone lower walls with timber upper floors. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_bilgelik_15.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Bilgelik Ocağı' at level 15: an academy of wisdom: a stone hall with a domed roof and a courtyard of carved runic stelae. Level look: mostly stone, iron fittings, red and gold banners with crescent emblems. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_bilgelik_20.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Bilgelik Ocağı' at level 20: an academy of wisdom: a stone hall with a domed roof and a courtyard of carved runic stelae. Level look: expanded: crenellated stone walls, carved wolf-head beam ends. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_bilgelik_25.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Bilgelik Ocağı' at level 25: an academy of wisdom: a stone hall with a domed roof and a courtyard of carved runic stelae. Level look: grand: several connected stone buildings, turquoise glazed tile accents. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_bilgelik_30.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Bilgelik Ocağı' at level 30: an academy of wisdom: a stone hall with a domed roof and a courtyard of carved runic stelae. Level look: monumental fortified stone, gilded crescent finials on the roofs. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_bilgelik_35.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Bilgelik Ocağı' at level 35: an academy of wisdom: a stone hall with a domed roof and a courtyard of carved runic stelae. Level look: majestic: dark stone and gold, burning braziers, tall standards. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_bilgelik_40.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Bilgelik Ocağı' at level 40: an academy of wisdom: a stone hall with a domed roof and a courtyard of carved runic stelae. Level look: legendary citadel form: gold and turquoise details, a faint orange molten-iron glow, sky-blue banners. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_komurluk_1.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Kömürlük' at level 1: charcoal works: domed stone kilns with smoke, stacks of charcoal and covered sheds. Level look: small and humble: rough timber, wattle and packed earth. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_komurluk_5.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Kömürlük' at level 5: charcoal works: domed stone kilns with smoke, stacks of charcoal and covered sheds. Level look: sturdier: timber on a stone footing, a few red banners. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_komurluk_10.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Kömürlük' at level 10: charcoal works: domed stone kilns with smoke, stacks of charcoal and covered sheds. Level look: larger: stone lower walls with timber upper floors. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_komurluk_15.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Kömürlük' at level 15: charcoal works: domed stone kilns with smoke, stacks of charcoal and covered sheds. Level look: mostly stone, iron fittings, red and gold banners with crescent emblems. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_komurluk_20.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Kömürlük' at level 20: charcoal works: domed stone kilns with smoke, stacks of charcoal and covered sheds. Level look: expanded: crenellated stone walls, carved wolf-head beam ends. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_komurluk_25.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Kömürlük' at level 25: charcoal works: domed stone kilns with smoke, stacks of charcoal and covered sheds. Level look: grand: several connected stone buildings, turquoise glazed tile accents. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_komurluk_30.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Kömürlük' at level 30: charcoal works: domed stone kilns with smoke, stacks of charcoal and covered sheds. Level look: monumental fortified stone, gilded crescent finials on the roofs. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_komurluk_35.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Kömürlük' at level 35: charcoal works: domed stone kilns with smoke, stacks of charcoal and covered sheds. Level look: majestic: dark stone and gold, burning braziers, tall standards. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_komurluk_40.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Kömürlük' at level 40: charcoal works: domed stone kilns with smoke, stacks of charcoal and covered sheds. Level look: legendary citadel form: gold and turquoise details, a faint orange molten-iron glow, sky-blue banners. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_harpakademi_1.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Harp Ocağı' at level 1: a war academy: a fortified stone armory hall with a glowing orange fire-crystal on a stone pedestal in the courtyard. Level look: small and humble: rough timber, wattle and packed earth. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_harpakademi_5.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Harp Ocağı' at level 5: a war academy: a fortified stone armory hall with a glowing orange fire-crystal on a stone pedestal in the courtyard. Level look: sturdier: timber on a stone footing, a few red banners. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_harpakademi_10.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Harp Ocağı' at level 10: a war academy: a fortified stone armory hall with a glowing orange fire-crystal on a stone pedestal in the courtyard. Level look: larger: stone lower walls with timber upper floors. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_harpakademi_15.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Harp Ocağı' at level 15: a war academy: a fortified stone armory hall with a glowing orange fire-crystal on a stone pedestal in the courtyard. Level look: mostly stone, iron fittings, red and gold banners with crescent emblems. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_harpakademi_20.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Harp Ocağı' at level 20: a war academy: a fortified stone armory hall with a glowing orange fire-crystal on a stone pedestal in the courtyard. Level look: expanded: crenellated stone walls, carved wolf-head beam ends. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_harpakademi_25.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Harp Ocağı' at level 25: a war academy: a fortified stone armory hall with a glowing orange fire-crystal on a stone pedestal in the courtyard. Level look: grand: several connected stone buildings, turquoise glazed tile accents. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_harpakademi_30.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Harp Ocağı' at level 30: a war academy: a fortified stone armory hall with a glowing orange fire-crystal on a stone pedestal in the courtyard. Level look: monumental fortified stone, gilded crescent finials on the roofs. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_harpakademi_35.png`
1024x1024 · Şeffaf: Evet · Öncelik 3

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Harp Ocağı' at level 35: a war academy: a fortified stone armory hall with a glowing orange fire-crystal on a stone pedestal in the courtyard. Level look: majestic: dark stone and gold, burning braziers, tall standards. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `bina_harpakademi_40.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Building 'Harp Ocağı' at level 40: a war academy: a fortified stone armory hall with a glowing orange fire-crystal on a stone pedestal in the courtyard. Level look: legendary citadel form: gold and turquoise details, a faint orange molten-iron glow, sky-blue banners. On its own square ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```


## Şehirdeki yerler

### `yer_kurultay.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Place 'Kurultay Otağı (kahramanlar)': a grand ceremonial felt tent with nine hero banners in a half circle in front. On its own ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `yer_tug.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Place 'Tuğ Direği (görevler, etkinlik)': a tall wooden pole crowned with a golden crescent and black horse-tail tassels, ribbons and small offering stones around. On its own ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `yer_sefer.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Place 'Sefer Otağı (seferler)': an expedition camp: a war tent with a map table, saddled horses tied nearby. On its own ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `yer_agil.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Place 'Ağıl (kurt ve evcil hayvanlar)': a wooden animal pen with a wolf den of rocks and a small shelter, a feeding trough. On its own ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `yer_hazine.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Place 'Hazine Otağı': a treasure tent with bronze-bound chests and hanging carpets, guarded entrance. On its own ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `yer_arena.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Place 'Bahadır Meydanı': a round sand dueling ring with a stake fence, banners and a weapon rack. On its own ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `yer_ors.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Place 'Sihirli Örs (Demirci)': an outdoor anvil on an octagonal stone platform with a glowing turquoise rune circle and four short crystal pillars. On its own ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `yer_eritme.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Place 'Eritme Ocağı': a squat clay melting furnace with a stone chimney, glowing slag and a pile of broken old weapons. On its own ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `yer_kuyu.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Isometric 3/4 top-down view, camera about 45 degrees, same angle for every building. Place 'Dilek Kuyusu': a round old stone well with a small wooden roof and a bucket, coins and ribbons tied to a nearby tree, soft turquoise glow from the water. On its own ground base. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```


## Harita

### `harita_zemin.png`
1024x1024 · Şeffaf: Hayır · Öncelik 1

```
Seamless tileable top-down terrain texture of an Altai steppe seen from high above: grass, small dirt patches, a few tiny bushes. Even lighting, no strong shadows, no objects, edges must tile seamlessly. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Full-bleed image, no transparency, no border.
```

### `harita_orman.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Top-down 45 degree view of a small clump of pines and birches as a decorative map object. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `harita_kaya.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Top-down 45 degree view of a group of mossy grey rocks as a decorative map object. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `maden_odun.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Top-down 45 degree view, map object: a forest resource site: felled logs and a woodcutter's stump among pines. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `maden_et.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Top-down 45 degree view, map object: a hunting ground resource site: a grassy clearing with deer tracks and a hunter's hide. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `maden_demir.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Top-down 45 degree view, map object: an iron ore resource site: dark rocks with rusty-red ore veins. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `maden_komur.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Top-down 45 degree view, map object: a coal resource site: black coal seams in a small rocky hollow. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `harita_oba_1.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Top-down 45 degree view, a player's fortress as seen on the world map, size stage 1 of 5 (1 = a small timber fort with a watchtower, 5 = a large stone citadel with towers and red banners). Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `harita_oba_2.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Top-down 45 degree view, a player's fortress as seen on the world map, size stage 2 of 5 (1 = a small timber fort with a watchtower, 5 = a large stone citadel with towers and red banners). Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `harita_oba_3.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Top-down 45 degree view, a player's fortress as seen on the world map, size stage 3 of 5 (1 = a small timber fort with a watchtower, 5 = a large stone citadel with towers and red banners). Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `harita_oba_4.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Top-down 45 degree view, a player's fortress as seen on the world map, size stage 4 of 5 (1 = a small timber fort with a watchtower, 5 = a large stone citadel with towers and red banners). Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `harita_oba_5.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Top-down 45 degree view, a player's fortress as seen on the world map, size stage 5 of 5 (1 = a small timber fort with a watchtower, 5 = a large stone citadel with towers and red banners). Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `harita_kurgan.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Top-down 45 degree view, an ancient burial mound (kurgan) with standing stones, partly covered by mist. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```


## Canavarlar

### `canavar_01.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Creature 'Bozkır Kurdu': a grey steppe wolf, full body, three-quarter side view facing left, dynamic but readable pose, realistic proportions, not cartoon. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `canavar_02.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Creature 'Kara Ayı': a black bear, full body, three-quarter side view facing left, dynamic but readable pose, realistic proportions, not cartoon. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `canavar_03.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Creature 'Yılan Ruhu': a ghostly giant serpent spirit, full body, three-quarter side view facing left, dynamic but readable pose, realistic proportions, not cartoon. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `canavar_04.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Creature 'Albastı': a pale female forest demon with long hair, full body, three-quarter side view facing left, dynamic but readable pose, realistic proportions, not cartoon. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `canavar_05.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Creature 'Kızıl Boğa': a huge red bull, full body, three-quarter side view facing left, dynamic but readable pose, realistic proportions, not cartoon. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `canavar_06.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Creature 'Buz Devi': an ice giant, full body, three-quarter side view facing left, dynamic but readable pose, realistic proportions, not cartoon. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `canavar_07.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Creature 'Tepegöz': a one-eyed giant from Turkic legend, full body, three-quarter side view facing left, dynamic but readable pose, realistic proportions, not cartoon. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `canavar_08.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Creature 'Karakoncolos': a hairy winter goblin creature, full body, three-quarter side view facing left, dynamic but readable pose, realistic proportions, not cartoon. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `canavar_09.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Creature 'Evren Ejderi': a great serpent-dragon, full body, three-quarter side view facing left, dynamic but readable pose, realistic proportions, not cartoon. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `canavar_10.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Creature 'Demir Dev': an iron golem giant, full body, three-quarter side view facing left, dynamic but readable pose, realistic proportions, not cartoon. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `canavar_11.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Creature 'Erlik'in Gölgesi': a dark shadow warrior of the underworld, full body, three-quarter side view facing left, dynamic but readable pose, realistic proportions, not cartoon. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `canavar_12.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Creature 'Erlik Han': the underworld lord, horned crown, dark robe, black-gold armor (boss), full body, three-quarter side view facing left, dynamic but readable pose, realistic proportions, not cartoon. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `canavar_13.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Creature 'Çayır Kurdu': a lean meadow wolf, full body, three-quarter side view facing left, dynamic but readable pose, realistic proportions, not cartoon. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `canavar_14.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Creature 'Ala Geyik': a spotted red deer stag, full body, three-quarter side view facing left, dynamic but readable pose, realistic proportions, not cartoon. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `canavar_15.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Creature 'Yaban Domuzu': a wild boar, full body, three-quarter side view facing left, dynamic but readable pose, realistic proportions, not cartoon. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `canavar_16.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Creature 'Kızıl Tilki': a red fox, full body, three-quarter side view facing left, dynamic but readable pose, realistic proportions, not cartoon. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `canavar_18.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Creature 'Börü Kartalı': a large steppe eagle, full body, three-quarter side view facing left, dynamic but readable pose, realistic proportions, not cartoon. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `canavar_19.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Creature 'Yaban Öküzü': a wild aurochs ox, full body, three-quarter side view facing left, dynamic but readable pose, realistic proportions, not cartoon. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `canavar_20.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Creature 'Kar Parsı': a snow leopard, full body, three-quarter side view facing left, dynamic but readable pose, realistic proportions, not cartoon. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `canavar_21.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Creature 'Bozkır Mamutu': a woolly mammoth, full body, three-quarter side view facing left, dynamic but readable pose, realistic proportions, not cartoon. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `canavar_22.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Creature 'Karaca': a roe deer, full body, three-quarter side view facing left, dynamic but readable pose, realistic proportions, not cartoon. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `canavar_23.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Creature 'Bozayı': a brown bear, full body, three-quarter side view facing left, dynamic but readable pose, realistic proportions, not cartoon. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `canavar_24.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Creature 'Alageyik': a fallow deer, full body, three-quarter side view facing left, dynamic but readable pose, realistic proportions, not cartoon. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `canavar_25.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Creature 'Vaşak': a lynx, full body, three-quarter side view facing left, dynamic but readable pose, realistic proportions, not cartoon. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `canavar_26.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Creature 'Yaban Atı Sürüsü': a small herd of wild horses, full body, three-quarter side view facing left, dynamic but readable pose, realistic proportions, not cartoon. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `canavar_27.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Creature 'Anadolu Parsı': an Anatolian leopard, full body, three-quarter side view facing left, dynamic but readable pose, realistic proportions, not cartoon. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `canavar_28.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Creature 'Dağ Keçisi Sürüsü': a small herd of mountain goats, full body, three-quarter side view facing left, dynamic but readable pose, realistic proportions, not cartoon. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `canavar_29.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Creature 'Kartal': a golden eagle, full body, three-quarter side view facing left, dynamic but readable pose, realistic proportions, not cartoon. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `canavar_30.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Creature 'Kara Kurt Sürüsü': a pack of three black wolves, full body, three-quarter side view facing left, dynamic but readable pose, realistic proportions, not cartoon. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `canavar_31.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Creature 'Ak Geyik': a legendary white stag with glowing antlers, full body, three-quarter side view facing left, dynamic but readable pose, realistic proportions, not cartoon. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `canavar_32.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Creature 'Kara Boğa': a black bull with fiery eyes, full body, three-quarter side view facing left, dynamic but readable pose, realistic proportions, not cartoon. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `canavar_33.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Creature 'Börü Ana'nın Yavruları': three blue-grey wolf cubs with a faint sky-blue aura, full body, three-quarter side view facing left, dynamic but readable pose, realistic proportions, not cartoon. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `canavar_34.png`
1024x1024 · Şeffaf: Evet · Öncelik 2

```
Creature 'Ejder Yavrusu': a young dragon, full body, three-quarter side view facing left, dynamic but readable pose, realistic proportions, not cartoon. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```


## Kahramanlar

### `kahraman_mete.png`
1024x1536 · Şeffaf: Hayır · Öncelik 2

```
Portrait card art of the historical figure Mete Han (Hun ruler, 2nd century BC, fur-lined armor, composite bow), waist-up, dignified pose, face inspired by historical depictions (miniatures, statues), dramatic backlight, dark painted background with subtle crescent motif. Realistic, not cartoon. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Full-bleed image, no transparency, no border.
```

### `kahraman_tomris.png`
1024x1536 · Şeffaf: Hayır · Öncelik 2

```
Portrait card art of the historical figure Tomris Hatun (Saka queen, scale armor, golden diadem, spear), waist-up, dignified pose, face inspired by historical depictions (miniatures, statues), dramatic backlight, dark painted background with subtle crescent motif. Realistic, not cartoon. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Full-bleed image, no transparency, no border.
```

### `kahraman_alparslan.png`
1024x1536 · Şeffaf: Hayır · Öncelik 2

```
Portrait card art of the historical figure Alparslan (Seljuk sultan, white robe over chainmail, sword), waist-up, dignified pose, face inspired by historical depictions (miniatures, statues), dramatic backlight, dark painted background with subtle crescent motif. Realistic, not cartoon. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Full-bleed image, no transparency, no border.
```

### `kahraman_fatih.png`
1024x1536 · Şeffaf: Hayır · Öncelik 2

```
Portrait card art of the historical figure Fatih Sultan Mehmet (Ottoman sultan, large white turban, red kaftan), waist-up, dignified pose, face inspired by historical depictions (miniatures, statues), dramatic backlight, dark painted background with subtle crescent motif. Realistic, not cartoon. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Full-bleed image, no transparency, no border.
```

### `kahraman_karafatma.png`
1024x1536 · Şeffaf: Hayır · Öncelik 2

```
Portrait card art of the historical figure Kara Fatma (Turkish War of Independence heroine, dark coat, cartridge belts, rifle), waist-up, dignified pose, face inspired by historical depictions (miniatures, statues), dramatic backlight, dark painted background with subtle crescent motif. Realistic, not cartoon. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Full-bleed image, no transparency, no border.
```

### `kahraman_timur.png`
1024x1536 · Şeffaf: Hayır · Öncelik 2

```
Portrait card art of the historical figure Timur (Turco-Mongol conqueror, steel helmet, ornate armor), waist-up, dignified pose, face inspired by historical depictions (miniatures, statues), dramatic backlight, dark painted background with subtle crescent motif. Realistic, not cartoon. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Full-bleed image, no transparency, no border.
```

### `kahraman_cengiz.png`
1024x1536 · Şeffaf: Hayır · Öncelik 2

```
Portrait card art of the historical figure Cengiz Han (Mongol khan, fur hat, lamellar armor), waist-up, dignified pose, face inspired by historical depictions (miniatures, statues), dramatic backlight, dark painted background with subtle crescent motif. Realistic, not cartoon. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Full-bleed image, no transparency, no border.
```

### `kahraman_oguz.png`
1024x1536 · Şeffaf: Hayır · Öncelik 2

```
Portrait card art of the historical figure Oğuz Han (legendary Oghuz ruler, sun emblem, wolf companion at his side), waist-up, dignified pose, face inspired by historical depictions (miniatures, statues), dramatic backlight, dark painted background with subtle crescent motif. Realistic, not cartoon. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Full-bleed image, no transparency, no border.
```

### `kahraman_kubilay.png`
1024x1536 · Şeffaf: Hayır · Öncelik 2

```
Portrait card art of the historical figure Kubilay Han (Yuan emperor, silk robes, golden ornaments), waist-up, dignified pose, face inspired by historical depictions (miniatures, statues), dramatic backlight, dark painted background with subtle crescent motif. Realistic, not cartoon. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Full-bleed image, no transparency, no border.
```

### `arka_kahraman.png`
1024x1536 · Şeffaf: Hayır · Öncelik 1

```
Background for the hero hall screen: the interior of a great felt otag tent at night, carved wooden pillars, red-gold banners, warm brazier light, soft blur toward the edges, empty center. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Full-bleed image, no transparency, no border.
```

### `arka_kurt.png`
1024x1536 · Şeffaf: Hayır · Öncelik 1

```
Background for the wolf screen: a moonlit rocky wolf den on an Altai slope, blue night sky with a crescent moon, misty pines, soft focus, empty center. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Full-bleed image, no transparency, no border.
```

### `kurt_1.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Full body a small blue-grey wolf pup with bright blue eyes and a tiny crescent collar (stage 1), three-quarter view facing left, realistic. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `kurt_2.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Full body a young lean grey wolf (stage 2), three-quarter view facing left, realistic. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `kurt_3.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Full body a strong adult grey wolf with a battle-scarred muzzle and bronze collar (stage 3), three-quarter view facing left, realistic. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `kurt_4.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Full body the legendary sky-blue wolf Bozkurt, large and noble, faint sky-blue aura, golden crescent collar (final stage), three-quarter view facing left, realistic. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```


## Arayüz

### `ui_baslik.png`
1536x1024 · Şeffaf: Evet · Öncelik 1

```
A wide horizontal window title banner: a long bar of dark-red lacquered wood with carved gold edges, ending on both sides with carved golden wolf heads facing outward. Flat front view, perfectly horizontal, centered, empty center area (text will be added later). Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `ui_pencere.png`
1024x1536 · Şeffaf: Evet · Öncelik 1

```
A tall window frame, flat front view: dark carved walnut wood border with gold corner pieces shaped like crescents and small wolf heads at the top corners; the inner area is plain warm parchment, evenly lit (it will be stretched as a 9-slice). Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `ui_satir.png`
1536x1024 · Şeffaf: Evet · Öncelik 1

```
A wide horizontal list row plate, flat front view: cream parchment with a thin carved dark-wood edge and tiny gold rivets, empty, evenly lit. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `ui_ust_cubuk.png`
1536x1024 · Şeffaf: Evet · Öncelik 1

```
A long thin horizontal top bar, flat front view: dark wood with gold trim and round gold rivets along the bottom edge, empty. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `ui_alt_menu.png`
1536x1024 · Şeffaf: Evet · Öncelik 1

```
A long horizontal bottom menu bar, flat front view: dark lacquered wood with a gold top rim, four slightly raised panels separated by small gold studs, empty. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `ui_portre.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
A round portrait frame, flat front view: gold ring with a carved wolf head at the top and a small crescent at the bottom, empty transparent center. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `ui_yuvarlak.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
A round button frame, flat front view: bronze-gold ring with fine runic engraving, dark red inner disc, no icon. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `ui_dunya.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
A large round main button frame, flat front view: thick gold ring with two small wolf heads on the sides, deep red inner disc, no icon. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `ui_kart_1.png`
1024x1536 · Şeffaf: Evet · Öncelik 1

```
A hero card frame, flat front view, common rank: bronze border with a small wolf-head crest at the top, empty transparent window. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `ui_kart_2.png`
1024x1536 · Şeffaf: Evet · Öncelik 2

```
The same hero card frame, rare rank: silver-turquoise border with a wolf-head crest, empty transparent window. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `ui_kart_3.png`
1024x1536 · Şeffaf: Evet · Öncelik 2

```
The same hero card frame, epic rank: purple and gold border with a wolf-head crest, empty transparent window. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `ui_kart_4.png`
1024x1536 · Şeffaf: Evet · Öncelik 2

```
The same hero card frame, legendary rank: bright gold border with radiant crescent and wolf-head crest, empty transparent window. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `ui_dugme_altin.png`
1536x1024 · Şeffaf: Evet · Öncelik 1

```
A wide horizontal game button, flat front view: glossy gold-orange center with carved bronze end caps shaped like small wolf heads, no text. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `ui_dugme_mavi.png`
1536x1024 · Şeffaf: Evet · Öncelik 1

```
A wide horizontal game button, flat front view: deep blue enamel center with gold trim and bronze end caps, no text. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `ui_dugme_yesil.png`
1536x1024 · Şeffaf: Evet · Öncelik 1

```
A wide horizontal game button, flat front view: green enamel center with gold trim, no text. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `ui_dugme_kirmizi.png`
1536x1024 · Şeffaf: Evet · Öncelik 2

```
A wide horizontal game button, flat front view: dark red enamel center with gold trim, no text. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `ui_tamga.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
A small round stone seal (tamga) medallion with an engraved Turkic tamga mark, used as an info icon, front view. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `ui_hilal.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
A small glowing golden crescent moon emblem, used as an alert badge, front view, soft glow. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `ui_kilit.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
A small antique bronze padlock with a crescent keyhole, front view. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```


## Sandıklar

### `sandik_1.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
A closed plain wooden chest with iron bands, three-quarter front view. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `sandik_2.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
A closed bronze-bound wooden chest, three-quarter front view. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `sandik_3.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
A closed silver chest with turquoise inlays, three-quarter front view. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `sandik_4.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
A closed golden chest with crescent emblem, three-quarter front view. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `sandik_5.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
A closed legendary chest of dark wood and gold with a wolf-head lock and a soft sky-blue glow, three-quarter front view. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `sandik_acik.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
An opened golden chest overflowing with light, gold-white rays and sparkles coming out, three-quarter front view. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```


## Simgeler

### `ikon_odun.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Game icon: a bundle of chopped logs, bold readable silhouette, three-quarter front view, slight rim light. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `ikon_et.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Game icon: a leg of roasted meat, bold readable silhouette, three-quarter front view, slight rim light. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `ikon_demir.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Game icon: a stack of iron ingots, bold readable silhouette, three-quarter front view, slight rim light. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `ikon_komur.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Game icon: a pile of black coal lumps, bold readable silhouette, three-quarter front view, slight rim light. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `ikon_celik.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Game icon: a stack of polished steel bars, bold readable silhouette, three-quarter front view, slight rim light. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `ikon_kor.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Game icon: a glowing orange fire crystal (Kor), bold readable silhouette, three-quarter front view, slight rim light. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `ikon_dari.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Game icon: a sheaf of millet, bold readable silhouette, three-quarter front view, slight rim light. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `ikon_toz.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Game icon: a small pouch of glittering golden mastery dust, bold readable silhouette, three-quarter front view, slight rim light. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `ikon_enerji.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Game icon: a lightning bolt carved in bronze with turquoise glow, bold readable silhouette, three-quarter front view, slight rim light. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `ikon_guc.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Game icon: two crossed sabres over a round shield, bold readable silhouette, three-quarter front view, slight rim light. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `ikon_xp.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Game icon: a glowing scroll, bold readable silhouette, three-quarter front view, slight rim light. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `ikon_kagit.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Game icon: an upgrade scroll with a red wax seal, bold readable silhouette, three-quarter front view, slight rim light. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `ikon_safir.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Game icon: a cut blue sapphire, bold readable silhouette, three-quarter front view, slight rim light. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `ikon_opal.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Game icon: a cut iridescent opal, bold readable silhouette, three-quarter front view, slight rim light. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `ikon_kart.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Game icon: a hero card back with a wolf emblem, bold readable silhouette, three-quarter front view, slight rim light. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `ikon_kitap.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Game icon: a leather skill book with a crescent clasp, bold readable silhouette, three-quarter front view, slight rim light. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `ikon_guvec.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Game icon: a clay pot of meat stew, bold readable silhouette, three-quarter front view, slight rim light. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `ikon_iksir.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Game icon: a small glass vial of turquoise energy potion, bold readable silhouette, three-quarter front view, slight rim light. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `ikon_kumsaati.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Game icon: an hourglass with a bronze frame, bold readable silhouette, three-quarter front view, slight rim light. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `ikon_paket.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Game icon: a tied canvas supply sack, bold readable silhouette, three-quarter front view, slight rim light. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `menu_kahraman.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Game icon: a warrior helmet with a red plume, bold readable silhouette, three-quarter front view, slight rim light. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `menu_canta.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Game icon: a leather saddle bag, bold readable silhouette, three-quarter front view, slight rim light. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `menu_posta.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Game icon: a rolled letter with a red seal and a feather, bold readable silhouette, three-quarter front view, slight rim light. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `menu_boy.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Game icon: a round wolf-head shield crest, bold readable silhouette, three-quarter front view, slight rim light. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `menu_dunya.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Game icon: a rolled map with a compass, bold readable silhouette, three-quarter front view, slight rim light. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `menu_sehir.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Game icon: a felt yurt with a crescent finial, bold readable silhouette, three-quarter front view, slight rim light. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `menu_gorev.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Game icon: an open scroll with a quill, bold readable silhouette, three-quarter front view, slight rim light. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `menu_etkinlik.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Game icon: a war drum with ribbons, bold readable silhouette, three-quarter front view, slight rim light. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `menu_yardim.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Game icon: two clasped hands in bronze gauntlets, bold readable silhouette, three-quarter front view, slight rim light. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `menu_topla.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Game icon: an overflowing sack of grain, logs and iron, bold readable silhouette, three-quarter front view, slight rim light. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `menu_ayar.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Game icon: a bronze gear with runes, bold readable silhouette, three-quarter front view, slight rim light. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `menu_kuyu.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Game icon: a small stone well, bold readable silhouette, three-quarter front view, slight rim light. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `sira_insaat.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Game icon: a hammer, bold readable silhouette, three-quarter front view, slight rim light. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `sira_arastirma.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Game icon: an open book with a quill, bold readable silhouette, three-quarter front view, slight rim light. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `sira_egitim.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Game icon: a steel helmet, bold readable silhouette, three-quarter front view, slight rim light. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `birlik_piyade.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Game icon: a sword and shield, bold readable silhouette, three-quarter front view, slight rim light. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `birlik_atli.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Game icon: a horse head, bold readable silhouette, three-quarter front view, slight rim light. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `birlik_okcu.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Game icon: a drawn bow, bold readable silhouette, three-quarter front view, slight rim light. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `esya_silah.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Game icon: a curved steppe sabre, bold readable silhouette, three-quarter front view, slight rim light. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `esya_kafa.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Game icon: a pointed steppe helmet, bold readable silhouette, three-quarter front view, slight rim light. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `esya_kol.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Game icon: leather bracers, bold readable silhouette, three-quarter front view, slight rim light. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `esya_govde.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Game icon: lamellar armor, bold readable silhouette, three-quarter front view, slight rim light. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `esya_alt.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Game icon: riding trousers, bold readable silhouette, three-quarter front view, slight rim light. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `esya_ayak.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Game icon: riding boots, bold readable silhouette, three-quarter front view, slight rim light. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `esya_kupe.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Game icon: a gold earring, bold readable silhouette, three-quarter front view, slight rim light. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```

### `esya_yuzuk.png`
1024x1024 · Şeffaf: Evet · Öncelik 1

```
Game icon: a signet ring, bold readable silhouette, three-quarter front view, slight rim light. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Single object centered, fully transparent background (PNG with alpha). Nothing outside the object and its own square ground base; keep 6% empty margin on all sides.
```


## Diğer

### `giris.png`
1024x1536 · Şeffaf: Hayır · Öncelik 1

```
Loading screen: the legendary Ergenekon valley at dawn, a grey wolf standing on a rock in the foreground looking at a huge iron mountain whose veins glow orange as it melts, the Turkic tribes' yurts below, epic and calm. Leave the bottom third darker for a progress bar. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Full-bleed image, no transparency, no border.
```

### `arka_kuyu.png`
1024x1536 · Şeffaf: Hayır · Öncelik 1

```
Background for the wishing well screen: the old stone well in a quiet glade beside a waterfall, ribbons on a sacred tree, soft turquoise light from the water, empty space in the middle. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Full-bleed image, no transparency, no border.
```

### `arka_isik.png`
1024x1536 · Şeffaf: Hayır · Öncelik 2

```
Celebration background: deep blue night with soft radial golden light rays from the center and tiny sparkles, no objects. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Full-bleed image, no transparency, no border.
```

### `arka_boy.png`
1024x1536 · Şeffaf: Hayır · Öncelik 2

```
Background for the tribe screen: a big kurultay gathering seen from afar, many yurts and banners on a steppe at sunset, soft focus. Realistic high-detail painterly 3D render look of a premium mobile strategy game, physically plausible materials (weathered stone, aged timber, felt, wrought iron), natural soft sunlight from the upper left with gentle realistic shadows, muted earthy realistic colors with accents of deep red banners and gold. NOT cartoon, NOT chibi, NOT toy-like, no exaggerated proportions, realistic scale and detail. Theme: medieval Turkic steppe fortress-city of the Altai (Gokturk and Uyghur era inspiration): stone keeps and walls, timber galleries, felt yurts inside courtyards, horse-tail tug standards, crescent-moon and wolf-head ornaments, Orhun-style runic carvings. Original design, do not imitate any existing game, logo or brand. No text, no letters, no numbers, no watermark, no UI. Full-bleed image, no transparency, no border.
```
