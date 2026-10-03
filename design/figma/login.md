# Login

Screen spec of the Figma frame "Login" — file "businesshandler", page "Page 1".
Figma: https://www.figma.com/design/edl4sapqOV1QVVleWmFCt3/?node-id=0-81

- Platform: mobile app — 414×896 (phone, portrait) — one viewport, the design is not responsive
- Image (visual reference only): `design/figma/login.png`

How to read it: boxes are `[x,y w×h]` in px from the screen's top-left corner. A box shows where an element sits — the arrangement, spacing and alignment to reproduce with a flex/stack layout — not a coordinate to pin it to; absolute positioning only for what floats over the layout (a floating button, a badge, an overlay). Elements are listed back to front (a later one paints over an earlier one), each group's children indented under it. Colours are hex (`#RRGGBBAA` when translucent); a font reads `family weight size/line-height`. An icon, illustration or picture is an exported image: use the file named, do not draw your own.

Screen: 414×896 · fill #F4F5FA · clips content

- shape [39,411 336×54] fill #FFFFFF · radius 5 · shadow 0/10 blur 10 #0D4E810D
- shape [39,321 336×54] fill #FFFFFF · radius 5 · shadow 0/10 blur 10 #0D4E810D
- group "Gruppe maskieren 1" [0,722 414×198]
  - shape [0,722 414×174] masked fill #61D27C · opacity 0.2
  - text "saltar" [42,868 41×19] Inter 500 15px/19px #FFFFFF
  - text "siguiente" [308,868 66×19] Inter 500 15px/19px #FFFFFF
  - shape [0,722 414×174] masked fill #6CC57C
- illustration "Gruppe maskieren 2" [-2,-4 417×201] → `design/figma/assets/gruppe-maskieren-2.png`
- text "mauricio@divelement.io" [64,339 144×18] Actor 400 14px/18px #23233C align center
- text "***********" [64,430 69×18] Actor 400 14px/18px #23233C align center
- shape [42,529 333×54] fill #23233C · radius 18
- text "Login" [181,543 52×25] Aleo 700 20px/25px #FFFFFF align center
- shape [115,649 82×51] fill #FFFFFF · radius 10 · shadow 0/0 blur 10 #0000000F
- shape [218,649 82×51] fill #FFFFFF · radius 10 · shadow 0/0 blur 10 #0000000F
- icon "facebook (2)" [150,663 12×24] #0F279E → `design/figma/assets/facebook-2.png`
- text "Forgot you password?" [139,489 136×17] Inter 400 13px/17px #8D8D8D align center
- text "Don't have an account? sign up" [119,602 191×17] Aleo 700 13px/17px #898888C9
- icon "search (1)" [247,663 24×24] → `design/figma/assets/search-1.png`
- text "Welcome" [120,230 174×51] Aleo 700 40px/51px #23233C align center
- icon "check" [329,339 17×17] (Figma renders this asset empty — no image; draw a matching one)
- icon "view" [329,432 19×12] #23233C (Figma renders this asset empty — no image; draw a matching one)
