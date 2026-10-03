# Money Management 2

Screen spec of the Figma frame "Money Management 2" — file "businesshandler", page "Page 1".
Figma: https://www.figma.com/design/edl4sapqOV1QVVleWmFCt3/?node-id=0-2573

- Platform: mobile app — 414×896 (phone, portrait) — one viewport, the design is not responsive
- Image (visual reference only): `design/figma/money-management-2.png`

How to read it: boxes are `[x,y w×h]` in px from the screen's top-left corner. A box shows where an element sits — the arrangement, spacing and alignment to reproduce with a flex/stack layout — not a coordinate to pin it to; absolute positioning only for what floats over the layout (a floating button, a badge, an overlay). Elements are listed back to front (a later one paints over an earlier one), each group's children indented under it. Colours are hex (`#RRGGBBAA` when translucent); a font reads `family weight size/line-height`. An icon, illustration or picture is an exported image: use the file named, do not draw your own.

Screen: 414×896 · fill #F4F4F4 · clips content

- shape [0,0 414×407] fill #FFFFFF
- text "weekly report" [129,61 144×18] Inter 100 14px/18px letter-spacing 2.8px uppercase #000000
- illustration [74,110 256×218] → `design/figma/assets/illustration-256x218.png`
- group [74,358 140×13] radius 3
  - group [74,358 63×13] radius 3
    - text "expenses" [92,358 45×11] Inter 100 9px/11px uppercase #000000
    - shape [74,358 13×13] fill #6CC57C · radius 3
  - group [158,358 56×13] radius 3
    - text "deposit" [176,358 38×11] Inter 100 9px/11px uppercase #000000
    - shape [158,358 13×13] fill #2B2B2B · radius 3
- group [28,436 326×302]
  - illustration [30,436 53×53] → `design/figma/assets/illustration-53x53.png`
  - group [103,439 149×45]
    - text "movie" [103,439 35×11] Inter 100 9px/11px letter-spacing 1.8px uppercase #000000
    - text "02- Monday" [103,473 56×11] Inter 100 9px/11px uppercase #000000
    - text "Spend On Fun Mall Cinema" [103,454 149×15] Inter 100 12px/15px #000000
  - text "23.00€" [308,453 46×18] Inter 100 14px/18px #000000
  - illustration [28,519 53×53] → `design/figma/assets/illustration-53x53-2.png`
  - group [103,522 113×45]
    - text "coffee" [103,522 44×11] Inter 100 9px/11px letter-spacing 1.8px uppercase #000000
    - text "02- Monday" [103,556 56×11] Inter 100 9px/11px uppercase #000000
    - text "Spend On Starbucks" [103,537 113×15] Inter 100 12px/15px #000000
  - text "13.00€" [308,536 43×18] Inter 100 14px/18px #000000
  - illustration [28,602 53×53] → `design/figma/assets/illustration-53x53-3.png`
  - group [103,605 131×45]
    - text "shop" [103,605 30×11] Inter 100 9px/11px letter-spacing 1.8px uppercase #000000
    - text "01- Sunday" [103,639 52×11] Inter 100 9px/11px uppercase #000000
    - text "Spend On Super Market" [103,620 131×15] Inter 100 12px/15px #000000
  - text "43.00€" [307,619 46×18] Inter 100 14px/18px #000000
  - illustration [28,685 53×53] → `design/figma/assets/illustration-53x53-4.png`
  - group [100,688 131×45]
    - text "shop" [100,688 30×11] Inter 100 9px/11px letter-spacing 1.8px uppercase #000000
    - text "01- sunday" [100,722 52×11] Inter 100 9px/11px uppercase #000000
    - text "Spend On Super Market" [100,703 131×15] Inter 100 12px/15px #000000
- text "25.00€" [306,702 46×18] Inter 100 14px/18px #000000
- icon [47,55 32×32] → `design/figma/assets/icon-32x32.png`
- group [1,778 413×118]
  - group [1,778 413×118]
    - group "Navbar" [1,778 413×118]
      - ellipse [179,778 64×63] fill linear-gradient(180deg, #6CC57C 0%, #179F2F 100%) · stroke 4px #FFFFFF inside · shadow 0/3 blur 40 #00000029
      - shape [1,819 413×77] fill #FFFFFF · shadow 0/3 blur 20 #60719329
    - line [212,799 1×20] stroke 3px #FFFFFF
    - line [203,808 20×1] stroke 3px #FFFFFF
    - icon "noun_Home_1191731" [35,836 22×21] #BBC7DB → `design/figma/assets/noun-home-1191731.png`
    - text "Home" [36,862 20×5] Aleo 700 7px/5px #BBC7DB
    - text "Products" [87,862 29×5] Aleo 700 7px/5px #BBC7DB
    - text "Liked" [297,862 18×5] Aleo 700 7px/5px #BBC7DB
    - text "Today" [354,862 21×5] Aleo 700 7px/5px #BBC7DB
    - icon "Icon feather-user-check" [357,837 15×18] #BBC7DB → `design/figma/assets/icon-feather-user-check.png`
    - line [212,799 1×20] stroke 3px #FFFFFF
  - icon "shop" [93,837 19×19] #BBC7DB (Figma renders this asset empty — no image; draw a matching one)
  - icon "noun_Favorite_1481179" [296,837 20×18] #BBC7DB (Figma renders this asset empty — no image; draw a matching one)
