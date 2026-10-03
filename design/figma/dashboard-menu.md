# Dashboard Menu

Screen spec of the Figma frame "Dashboard Menu" — file "businesshandler", page "Page 1".
Figma: https://www.figma.com/design/edl4sapqOV1QVVleWmFCt3/?node-id=0-2973

- Platform: mobile app — 414×896 (phone, portrait) — one viewport, the design is not responsive
- Image (visual reference only): `design/figma/dashboard-menu.png`

How to read it: boxes are `[x,y w×h]` in px from the screen's top-left corner. A box shows where an element sits — the arrangement, spacing and alignment to reproduce with a flex/stack layout — not a coordinate to pin it to; absolute positioning only for what floats over the layout (a floating button, a badge, an overlay). Elements are listed back to front (a later one paints over an earlier one), each group's children indented under it. Colours are hex (`#RRGGBBAA` when translucent); a font reads `family weight size/line-height`. An icon, illustration or picture is an exported image: use the file named, do not draw your own.

Screen: 414×896 · fill #ECF1FA · clips content

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
- shape [0,-1 414×898] fill #000000 · opacity 0.4
- shape [0,-114 294×1010] fill #FFFFFF · shadow 0/3 blur 16 #00000029
- group "Header" [1,-1 294×208] fill #6BC67C
  - text "Sophie Garnier" [106,100 144×21] Aleo 700 16px/19px #23233C
  - text "Luxembourg" [106,126 101×21] Inter 400 14px/17px #23233C
  - icon [260,87 13×13] #23233C → `design/figma/assets/icon-13x13.png`
  - image "Profile Image" [23,87 75×75] → `design/figma/assets/profile-image.png`
- group [26,357 208×21]
  - text "Help" [49,357 185×21] Aleo 700 14px/17px #23233C opacity 0.6
  - icon "noun_Info_1174604" [26,359 17×17] #23233C → `design/figma/assets/noun-info-1174604-17x17.png`
- group [24,246 201×21]
  - text "Statistics" [50,246 175×21] Aleo 700 14px/17px #23233C opacity 0.6
  - icon [24,246 19×18] #23233C (Figma renders this asset empty — no image; draw a matching one)
- group [24,301 201×21]
  - text "Account Settings" [50,301 175×21] Aleo 700 14px/17px #23233C opacity 0.6
  - icon "noun_User_1335326" [24,303 19×19] #23233C → `design/figma/assets/noun-user-1335326-19x19.png`
- group [22,836 200×21]
  - text "Logout" [47,836 175×21] Aleo 700 14px/17px #23233C opacity 0.6
  - icon [22,837 20×18] #23233C (Figma renders this asset empty — no image; draw a matching one)
