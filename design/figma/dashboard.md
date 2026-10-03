# Dashboard

Screen spec of the Figma frame "Dashboard" — file "businesshandler", page "Page 1".
Figma: https://www.figma.com/design/edl4sapqOV1QVVleWmFCt3/?node-id=0-681

- Platform: mobile app — 414×896 (phone, portrait) — one viewport, the design is not responsive
- Image (visual reference only): `design/figma/dashboard.png`

How to read it: boxes are `[x,y w×h]` in px from the screen's top-left corner. A box shows where an element sits — the arrangement, spacing and alignment to reproduce with a flex/stack layout — not a coordinate to pin it to; absolute positioning only for what floats over the layout (a floating button, a badge, an overlay). Elements are listed back to front (a later one paints over an earlier one), each group's children indented under it. Colours are hex (`#RRGGBBAA` when translucent); a font reads `family weight size/line-height`. An icon, illustration or picture is an exported image: use the file named, do not draw your own.

Screen: 414×896 · fill #F4F5FA · clips content

- group "Header" [0,0 414×126] fill #6BC67C · shadow 0/3 blur 16 #0000001A
  - icon "noun_menu_933312" [20,33 18×15] #FFFFFF (Figma renders this asset empty — no image; draw a matching one)
  - icon "noun_User_1335326" [367,25 27×27] #FFFFFF → `design/figma/assets/noun-user-1335326-ffffff.png`
  - text "Dashboard" [18,62 158×29] Aleo 700 24px/29px #FFFFFF
- group "Search" [40,165 334×43] fill #FFFFFF · shadow 0/3 blur 16 #00000014
  - text "Search" [56,176 142×23] Inter 400 16px/19px #1C1C1C opacity 0.2
  - icon "noun_Search_860389" [340,178 16×16] #1C1C1C (Figma renders this asset empty — no image; draw a matching one)
- group [40,245 157×280] fill #FFFFFF · radius 8 · shadow 0/3 blur 16 #00000014
  - text "Time Management" [55,264 129×40] Aleo 700 16px/19px #23233C
  - illustration [55,338 128×114] → `design/figma/assets/illustration-128x114.png`
- group [218,245 157×280] fill #FFFFFF · radius 8 · shadow 0/3 blur 16 #00000014
  - text "Money Management" [233,264 129×43] Aleo 700 16px/19px #23233C
  - illustration [237,346 118×109] → `design/figma/assets/illustration-118x109.png`
- group [218,545 157×280] fill #FFFFFF · radius 8 · shadow 0/3 blur 16 #00000014
  - text "Food Management" [233,564 129×44] Aleo 700 16px/19px #23233C
  - illustration "undraw_personal_site_xyd1" [250,636 88×130] → `design/figma/assets/undraw-personal-site-xyd1.png`
- group [39,545 157×280] fill #FFFFFF · radius 8 · shadow 0/3 blur 16 #00000014
  - text "App Management" [54,564 129×23] Aleo 700 16px/19px #23233C
  - illustration [54,630 120×133] → `design/figma/assets/illustration-120x133.png`
