# Ergenekon — 3D model kılavuzu (Tripo3D / ChatGPT)

Yönetici panelinde **🧊 3D model** ile .glb dosyasını seçince bu sınırlara göre denetlenir.

| Tür | Üçgen (△) | Doku | Dosya | Not |
|---|---|---|---|---|
| Bina (her görünüm kademesi: 1,5,10…40) | ≤ 15 000 | ≤ 1024 px, en çok 4 | ≤ 2 MB | taban 8×8 m içinde |
| NPC / figür | ≤ 8 000 | ≤ 1024 px | ≤ 1,5 MB | ayakta, T-poz değil |
| Canavar | ≤ 6 000 | ≤ 512 px | ≤ 1 MB | sürü için 3 kopya çizilir |
| Kahraman / şef | ≤ 12 000 | ≤ 1024 px | ≤ 2 MB | silah ayrı parça |
| Uzak sürüm | ≤ 1 500 | ≤ 256 px | ≤ 0,3 MB | haritada uzaktan |

**Kurallar:** tek dosya `.glb` · ölçü birimi metre · yüzü +Z · zemin y = 0 · dokular 2’nin kuvveti (256/512/1024) · PBR (base color + normal yeterli) · gereksiz iç yüzey yok · animasyon gerekiyorsa en çok 3 (idle, saldırı, yürüme).

**Tripo3D istem eki:** "low-poly game asset, realistic proportions, PBR, under 8k triangles, single mesh, centered, feet on ground, no background".

**Sıkıştırma (184):** sunucu/derleme ortamı paket kurabildiğinde `gltf-transform optimize --compress meshopt --texture-compress webp` ile otomatik yapılacak ve uzak sürüm (`--simplify 0.1`) üretilecek. O zamana kadar modelleri bana gönder, elle sıkıştırırım.
