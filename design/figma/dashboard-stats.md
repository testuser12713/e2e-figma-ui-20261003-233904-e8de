# Dashboard Stats

Screen spec of the Figma frame "Dashboard Stats" — file "businesshandler", page "Page 1".
Figma: https://www.figma.com/design/edl4sapqOV1QVVleWmFCt3/?node-id=0-900

- Platform: mobile app — 414×896 (phone, portrait) — one viewport, the design is not responsive
- Image (visual reference only): `design/figma/dashboard-stats.png`

How to read it: boxes are `[x,y w×h]` in px from the screen's top-left corner. A box shows where an element sits — the arrangement, spacing and alignment to reproduce with a flex/stack layout — not a coordinate to pin it to; absolute positioning only for what floats over the layout (a floating button, a badge, an overlay). Elements are listed back to front (a later one paints over an earlier one), each group's children indented under it. Colours are hex (`#RRGGBBAA` when translucent); a font reads `family weight size/line-height`. An icon, illustration or picture is an exported image: use the file named, do not draw your own.

Screen: 414×896 · fill #F4F5FA · clips content

- illustration "Gruppe maskieren 6" [0,0 455×120] → `design/figma/assets/gruppe-maskieren-6.png`
- group "Header" [40,25 335×27]
  - icon "noun_User_1335326" [348,25 27×27] #181461 → `design/figma/assets/noun-user-1335326-181461.png`
  - icon "noun_back_1227057" [40,29 11×18] #181461 → `design/figma/assets/noun-back-1227057.png`
- text "Statistics" [40,135 235×19] Aleo 700 16px/19px #1C1C1C
- group "Rest Rate" [39,193 336×485]
  - group "TXT" [40,193 169×80]
    - text "Since 21. Dec" [40,193 169×19] Inter 400 14px/17px #23233C
    - text "Dec 2024 - Jan 2024" [40,255 159×18] Inter 400 14px/17px #1C1C1C
    - text "20 DAYS" [40,219 85×29] Inter 400 24px/17px #1C1C1C · styled apart: "DAYS" 14px
  - group "Stat" [39,342 336×336] fill #FFFFFF · radius 8 · shadow 0/3 blur 16 #00000014
    - group [42,342 320×334]
      - group "Numbers" [49,342 313×331]
        - text "M" [49,656 9×15] Aleo 700 12px/14px #1C1C1C opacity 0.2
        - text "J" [76,656 9×15] Aleo 700 12px/14px #1C1C1C opacity 0.2
        - text "J" [103,656 9×15] Aleo 700 12px/14px #1C1C1C opacity 0.2
        - text "A" [129,656 9×15] Aleo 700 12px/14px #1C1C1C opacity 0.2
        - text "S" [156,656 9×15] Aleo 700 12px/14px #1C1C1C opacity 0.2
        - text "O" [183,656 9×15] Aleo 700 12px/14px #1C1C1C opacity 0.2
        - text "N" [210,656 9×15] Aleo 700 12px/14px #1C1C1C opacity 0.2
        - text "D" [237,656 9×15] Aleo 700 12px/14px #1C1C1C opacity 0.2
        - text "J" [263,656 9×15] Aleo 700 12px/14px #1C1C1C opacity 0.2
        - text "M" [290,656 9×15] Aleo 700 12px/14px #1C1C1C opacity 0.2
        - text "A" [317,656 9×15] Aleo 700 12px/14px #1C1C1C opacity 0.2
        - text "60" [348,626 14×15] Aleo 700 12px/14px #1C1C1C opacity 0.2
        - text "70" [348,548 14×15] Aleo 700 12px/14px #1C1C1C opacity 0.2
        - text "80" [348,465 14×15] Aleo 700 12px/14px #1C1C1C opacity 0.2
        - text "90" [348,382 14×15] Aleo 700 12px/14px #1C1C1C opacity 0.2
        - line [336,342 1×331] stroke 0.2px #707070 dashed
        - line [336,344 1×329] stroke 0.2px #707070 dashed
      - illustration "Gruppe maskieren 1" [42,344 293×333] → `design/figma/assets/gruppe-maskieren-1.png`
    - group "Horizontal" [39,426 336×170]
      - line [39,596 336×1] stroke 0.2px #707070 dashed
      - line [39,512 336×1] stroke 0.2px #707070 dashed
      - line [39,426 336×1] stroke 0.2px #707070 dashed
    - group [51,463 246×164]
      - shape [52,498 244×129] fill linear-gradient(180deg, #6BC57B 0%, #00FF2D00 100%) · stroke 3px #6BC57B · opacity 0.1
      - shape [52,498 244×120] stroke 3px #6BC67C
      - ellipse [51,618 3×3] fill #FFFFFF · stroke 3px #6BC57B outside
      - ellipse [79,555 3×3] fill #FFFFFF · stroke 3px #6BC57B outside
      - ellipse [105,541 3×3] fill #FFFFFF · stroke 3px #6BC57B outside
      - ellipse [131,535 3×3] fill #FFFFFF · stroke 3px #6BC57B outside
      - ellipse [159,551 3×3] fill #FFFFFF · stroke 3px #6BC57B outside
      - shape [186,535 3×3] fill #FFFFFF · stroke 3px #6BC67C outside
      - ellipse [212,496 5×5] fill #FFFFFF · stroke 3px #6BC57B outside · shadow 0/3 blur 16 #F8130014
      - ellipse [239,552 3×3] fill #FFFFFF · stroke 3px #6BC57B outside
      - ellipse [265,566 3×3] fill #FFFFFF · stroke 3px #6BC57B outside
      - ellipse [294,536 3×3] fill #FFFFFF · stroke 3px #6BC57B outside
      - group [178,463 72×26] fill #FFFFFF · shadow 0/3 blur 16 #00C62329
        - text "20 DAYS" [194,468 48×14] Inter 400 12px/14px #1C1C1C
  - group "Switch" [40,293 335×34] fill #DCE5F4 · radius 8
    - text "D" [61,302 9×14] Inter 400 12px/14px #1C1C1C
    - text "W" [156,302 12×14] Inter 400 12px/14px #1C1C1C
    - text "M" [251,302 11×14] Inter 400 12px/14px #1C1C1C
    - group [330,297 41×26] fill #FFFFFF · shadow 0/3 blur 6 #00000029
      - text "Y" [346,302 9×14] Aleo 700 12px/14px #1C1C1C
- text "Top Run: 20 Days" [40,717 159×18] Inter 400 14px/17px #1C1C1C
- text "Restarts: 4" [40,742 159×18] Inter 400 14px/17px #1C1C1C
