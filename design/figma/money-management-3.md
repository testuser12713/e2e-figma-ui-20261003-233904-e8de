# Money Management 3

Screen spec of the Figma frame "Money Management 3" — file "businesshandler", page "Page 1".
Figma: https://www.figma.com/design/edl4sapqOV1QVVleWmFCt3/?node-id=0-2673

- Platform: mobile app — 414×896 (phone, portrait) — one viewport, the design is not responsive
- Image (visual reference only): `design/figma/money-management-3.png`

How to read it: boxes are `[x,y w×h]` in px from the screen's top-left corner. A box shows where an element sits — the arrangement, spacing and alignment to reproduce with a flex/stack layout — not a coordinate to pin it to; absolute positioning only for what floats over the layout (a floating button, a badge, an overlay). Elements are listed back to front (a later one paints over an earlier one), each group's children indented under it. Colours are hex (`#RRGGBBAA` when translucent); a font reads `family weight size/line-height`. An icon, illustration or picture is an exported image: use the file named, do not draw your own.

Screen: 414×896 · fill #F4F4F4 · clips content

- shape [0,0 414×138] fill #FFFFFF
- text "Add ExPense" [129,61 122×18] Inter 100 14px/18px letter-spacing 2.8px uppercase #000000
- icon [47,55 32×32] → `design/figma/assets/icon-32x32.png`
- group [1,819 413×77]
  - group [1,819 413×77]
    - shape "Navbar" [1,819 413×77] fill #FFFFFF · shadow 0/3 blur 20 #60719329
    - icon "noun_Home_1191731" [35,836 22×21] #BBC7DB → `design/figma/assets/noun-home-1191731.png`
    - text "Home" [36,862 20×5] Aleo 700 7px/5px #BBC7DB
    - text "Products" [87,862 29×5] Aleo 700 7px/5px #BBC7DB
    - text "Liked" [297,862 18×5] Aleo 700 7px/5px #BBC7DB
    - text "Today" [354,862 21×5] Aleo 700 7px/5px #BBC7DB
    - icon "Icon feather-user-check" [357,837 15×18] #BBC7DB → `design/figma/assets/icon-feather-user-check.png`
  - icon "shop" [93,837 19×19] #BBC7DB (Figma renders this asset empty — no image; draw a matching one)
  - icon "noun_Favorite_1481179" [296,837 20×18] #BBC7DB (Figma renders this asset empty — no image; draw a matching one)
- group "Search" [40,176 334×43] fill #FFFFFF · shadow 0/3 blur 16 #00000014
  - text "Name" [77,187 216×23] Inter 400 16px/19px #1C1C1C
  - icon "noun_Search_860389" [55,189 16×16] #23233C (Figma renders this asset empty — no image; draw a matching one)
- group "Search" [40,239 334×43] fill #FFFFFF · shadow 0/3 blur 16 #00000014
  - text "Beschreibung" [77,250 142×23] Inter 400 16px/19px #1C1C1C
  - icon "noun_Map_2404959" [56,251 14×18] #23233C (Figma renders this asset empty — no image; draw a matching one)
- group "Search" [40,365 334×43] fill #FFFFFF · shadow 0/3 blur 16 #00000014
  - text "Select Date" [78,376 142×23] Inter 400 16px/19px #1C1C1C
  - icon [57,379 15×16] #23233C → `design/figma/assets/icon-15x16.png`
- group "Search" [40,437 334×43] fill #6CC57C · shadow 0/3 blur 16 #00000014
  - text "Add Expense" [136,448 142×23] Inter 400 16px/19px #FFFFFF align center
- group "Search" [40,302 334×43] fill #FFFFFF · shadow 0/3 blur 16 #00000014
  - text "Amount" [78,313 142×23] Inter 400 16px/19px #1C1C1C
  - icon "noun_Map_2404959" [57,314 14×18] #23233C (Figma renders this asset empty — no image; draw a matching one)
