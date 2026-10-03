# Time Management

Screen spec of the Figma frame "Time Management" — file "businesshandler", page "Page 1".
Figma: https://www.figma.com/design/edl4sapqOV1QVVleWmFCt3/?node-id=0-803

- Platform: mobile app — 414×896 (phone, portrait) — one viewport, the design is not responsive
- Image (visual reference only): `design/figma/time-management.png`

How to read it: boxes are `[x,y w×h]` in px from the screen's top-left corner. A box shows where an element sits — the arrangement, spacing and alignment to reproduce with a flex/stack layout — not a coordinate to pin it to; absolute positioning only for what floats over the layout (a floating button, a badge, an overlay). Elements are listed back to front (a later one paints over an earlier one), each group's children indented under it. Colours are hex (`#RRGGBBAA` when translucent); a font reads `family weight size/line-height`. An icon, illustration or picture is an exported image: use the file named, do not draw your own.

Screen: 414×896 · fill #F4F5FA · clips content

- group "Header" [40,25 335×27]
  - icon "noun_User_1335326" [348,25 27×27] #23233C → `design/figma/assets/noun-user-1335326.png`
  - icon "noun_back_1227057" [40,29 11×18] #181461 → `design/figma/assets/noun-back-1227057.png`
- text "My Appointments" [39,80 235×19] Aleo 700 16px/19px #1C1C1C
- group "Tabs" [39,194 336×38]
  - text "Upcoming" [39,194 86×19] Aleo 700 16px/19px #23233C
  - text "Past" [302,194 73×19] Inter 400 16px/19px #1C1C1C align right
  - group [39,229 336×3]
    - line [39,229 51×2] fill #23233C
    - line [40,231 336×1] stroke 0.5px #1C1C1C · opacity 0.2
- group "Languages" [38,244 337×57]
  - text "Dentist - Clara Odding" [39,267 158×19] Aleo 700 14px/17px #1C1C1C
  - text "Modify" [308,267 67×19] Aleo 700 14px/17px #23233C align right
  - text "09/04/2020" [38,244 76×26] Inter 400 12px/22px #1C1C1C opacity 0.4
  - line [39,300 336×1] stroke 0.5px #1C1C1C · opacity 0.2
  - icon "noun_Pencil_2174975" [311,270 12×12] #23233C → `design/figma/assets/noun-pencil-2174975.png`
  - icon "noun_Info_1174604" [184,270 12×12] #23233C → `design/figma/assets/noun-info-1174604.png`
- group "Languages" [38,316 337×57]
  - text "Cardiologist - Steven Pauliner" [39,339 199×19] Aleo 700 14px/17px #1C1C1C
  - text "Modify" [308,339 67×19] Aleo 700 14px/17px #23233C align right
  - text "21/04/2020" [38,316 76×26] Inter 400 12px/22px #1C1C1C opacity 0.4
  - line [39,372 336×1] stroke 0.5px #1C1C1C · opacity 0.2
  - icon "noun_Pencil_2174975" [311,342 12×12] #23233C → `design/figma/assets/noun-pencil-2174975.png`
  - icon "noun_Info_1174604" [228,341 12×12] #23233C → `design/figma/assets/noun-info-1174604.png`
- group "Languages" [38,388 337×57]
  - text "Dermatologist - Noemi Shinte" [39,411 199×19] Aleo 700 14px/17px #1C1C1C
  - text "Modify" [308,411 67×19] Aleo 700 14px/17px #23233C align right
  - text "18/06/2020" [38,388 76×26] Inter 400 12px/22px #1C1C1C opacity 0.4
  - line [39,444 336×1] stroke 0.5px #1C1C1C · opacity 0.2
  - icon "noun_Pencil_2174975" [311,414 12×12] #23233C → `design/figma/assets/noun-pencil-2174975.png`
  - icon "noun_Info_1174604" [230,415 12×12] #23233C → `design/figma/assets/noun-info-1174604.png`
- group "Search" [41,116 334×43] fill #FFFFFF · shadow 0/3 blur 16 #00000014
  - text "Search" [56,127 142×23] Inter 400 16px/19px #1C1C1C opacity 0.2
  - icon "noun_Search_860389" [341,129 16×16] #1C1C1C (Figma renders this asset empty — no image; draw a matching one)
- group "Search" [39,477 336×43] fill #6CC57C · shadow 0/3 blur 16 #00000014
  - text "Add a new appointment" [95,488 224×23] Inter 400 16px/19px #FFFFFF align center
- group "Search" [39,544 336×43] fill #6CC57CD9 · shadow 0/3 blur 16 #00000014
  - text "Overview" [95,555 224×23] Inter 400 16px/19px #FFFFFF align center
