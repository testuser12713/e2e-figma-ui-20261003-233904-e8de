# Money Management

Screen spec of the Figma frame "Money Management" — file "businesshandler", page "Page 1".
Figma: https://www.figma.com/design/edl4sapqOV1QVVleWmFCt3/?node-id=0-2446

- Platform: mobile app — 414×896 (phone, portrait) — one viewport, the design is not responsive
- Image (visual reference only): `design/figma/money-management.png`

How to read it: boxes are `[x,y w×h]` in px from the screen's top-left corner. A box shows where an element sits — the arrangement, spacing and alignment to reproduce with a flex/stack layout — not a coordinate to pin it to; absolute positioning only for what floats over the layout (a floating button, a badge, an overlay). Elements are listed back to front (a later one paints over an earlier one), each group's children indented under it. Colours are hex (`#RRGGBBAA` when translucent); a font reads `family weight size/line-height`. An icon, illustration or picture is an exported image: use the file named, do not draw your own.

Screen: 414×896 · fill #F4F4F4 · clips content

- shape [0,0 414×406] fill #FFFFFF
- illustration [-73,-74 525×387] → `design/figma/assets/illustration-525x387.png`
- group [49,282 217×73]
  - text "MontHly EXPENSES" [49,282 158×15] Inter 100 12px/15px letter-spacing 2.4px uppercase #000000
  - text "1,345.00€" [49,298 217×57] Inter 500 45px/57px uppercase #000000
- group [45,453 330×276] fill #FFFFFF · radius 20
  - text "Quick Categories" [137,487 149×15] Inter 100 12px/15px letter-spacing 2.4px uppercase #000000
  - shape [69,530 55×55] fill #FFFFFF · stroke 1px #000000 dashed inside · radius 12
  - icon "home-icon" [290,542 42×39] #000000 (Figma renders this asset empty — no image; draw a matching one)
- shape [284,536 55×55] stroke 1px #000000 dashed inside
- group [296,77 51×51] fill #6CC57C · shadow 0/3 blur 6 #00000029
  - text "R" [311,82 22×41] Aleo 700 32px/41px #FFFFFF
- shape [175,532 55×55] fill #FFFFFF · stroke 1px #000000 dashed inside
- icon "dish-spoon-knife-icon" [182,545 41×29] #000000 (Figma renders this asset empty — no image; draw a matching one)
- icon "briefcase-icon" [75,539 41×34] #000000 (Figma renders this asset empty — no image; draw a matching one)
- shape [71,622 55×55] fill #FFFFFF · stroke 1px #000000 dashed inside · radius 12
- icon "friends-icon" [79,633 40×30] #000000 (Figma renders this asset empty — no image; draw a matching one)
- shape [175,622 55×55] fill #FFFFFF · stroke 1px #000000 dashed inside
- icon "shopping-bag-icon" [184,627 36×42] #000000 (Figma renders this asset empty — no image; draw a matching one)
- icon "noun_back_1227057" [22,25 11×18] #181461 → `design/figma/assets/noun-back-1227057.png`
- shape [284,621 55×55] fill #FFFFFF · stroke 1px #000000 dashed inside
- icon "gas-station-icon" [296,629 37×39] #000000 (Figma renders this asset empty — no image; draw a matching one)
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
    - line [203,808 20×1] stroke 3px #FFFFFF
  - icon "shop" [93,837 19×19] #BBC7DB (Figma renders this asset empty — no image; draw a matching one)
  - icon "noun_Favorite_1481179" [296,837 20×18] #BBC7DB (Figma renders this asset empty — no image; draw a matching one)
