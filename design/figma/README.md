# Figma design — businesshandler

The Architect's design, imported from Figma: the target of every UI ticket. Build from the screen specs — they carry the binding numbers (sizes, colours, fonts, texts) and, in each element's box, the arrangement to lay out (not to pin); the PNGs are visual references.

## Platform

- Platform: mobile app (`mobile-app`), confidence high
- Design viewport: 414×896 (phone, portrait) — one viewport, the design is not responsive
- Evidence: 18/18 frames 414×896 (phone, a device's screen height); bottom tab bar in 'Money Management', 'Money Management 2' (+5 more frames); floating add button in 'Money Management', 'Money Management 2' (+2 more frames); onboarding slides in 'Login', 'Login Slide' (+1 more frame); back chevron in 'Money Management', 'Time Management' (+2 more frames); social login in 'Login'
- One phone viewport of 414×896: every screen fills it, respecting the safe areas; no desktop breakpoints, no max-width container, no top navigation bar the frames do not show.
- Navigation as the frames show it: a bottom tab bar fixed to the bottom edge on the screens whose frames draw one (bottom tab bar in 'Money Management', 'Money Management 2' (+5 more frames)) and only there — a screen whose frame shows no tab bar gets none, and no app-wide bar is added on top of one a frame draws; the other screens are reached the way the frames show (cards, a menu) and go back with a chevron.

## Screens (reading order)

1. **Money Management** (414×896) — spec `design/figma/money-management.md` · image `design/figma/money-management.png`
2. **Money Management 2** (414×896) — spec `design/figma/money-management-2.md` · image `design/figma/money-management-2.png`
3. **Money Management 3** (414×896) — spec `design/figma/money-management-3.md` · image `design/figma/money-management-3.png`
4. **Time Management** (414×896) — spec `design/figma/time-management.md` · image `design/figma/time-management.png`
5. **Time Management - 2** (414×896) — spec `design/figma/time-management-2.md` · image `design/figma/time-management-2.png`
6. **Time Management - 3** (414×896) — spec `design/figma/time-management-3.md` · image `design/figma/time-management-3.png`
7. **Login** (414×896) — spec `design/figma/login.md` · image `design/figma/login.png`
8. **Login Slide** (414×896) — spec `design/figma/login-slide.md` · image `design/figma/login-slide.png`
9. **Login Slide 2** (414×896) — spec `design/figma/login-slide-2.md` · image `design/figma/login-slide-2.png`
10. **Dashboard** (414×896) — spec `design/figma/dashboard.md` · image `design/figma/dashboard.png`
11. **Dashboard Menu** (414×896) — spec `design/figma/dashboard-menu.md` · image `design/figma/dashboard-menu.png`
12. **Dashboard Stats** (414×896) — spec `design/figma/dashboard-stats.md` · image `design/figma/dashboard-stats.png`

## Assets

39 icon(s), illustration(s) and picture(s) are exported under `design/figma/assets/`; each spec names the ones on its screen. Use those files — do not draw replacements.

## Colours and typography (measured over the frames)

- Colour roles suggested by the measured shares: bg `#F4F5FA`, surface `#FFFFFF`, fg `#23233C`, accent `#6CC57C`, on-accent `#FFFFFF`, secondary `#23233C`, muted `#A5A5A5`, border `#707070`
- Fill colours by visible area: `#F4F5FA` 37% — backgrounds, panels, in 8 of 12 frames; `#FFFFFF` 25% — cards, backgrounds, panels, in 11 of 12 frames; `#F4F4F4` 10% — backgrounds, in 3 of 12 frames; `#6CC57C` 9.1% — panels, header bars, bottom bars, in 9 of 12 frames; `#ECF1FA` 1.0% — backgrounds, in 1 of 12 frames; `#23233C` 0.5% — buttons, badges, dividers, in 2 of 12 frames; `#DCE5F4` 0.2% — cards, in 1 of 12 frames
- Text colours by characters: `#23233C` 24% (in 9 of 12 frames); `#1C1C1C` 24% (in 6 of 12 frames); `#000000` 23% (in 5 of 12 frames); `#A5A5A5` 11% (in 1 of 12 frames); `#FFFFFF` 6.2% (in 8 of 12 frames); `#BBC7DB` 4.2% (in 3 of 12 frames); `#6CC57C` 2.9% (in 1 of 12 frames); `#898888` 1.9% (in 1 of 12 frames)
- Frame backgrounds (each frame's own fill): `#F4F5FA` (8 frames), `#F4F4F4` (3 frames), `#ECF1FA` (1 frame)
- Text styles: text-25: Aleo 25px/30px 700; text-16: Aleo 16px/19px 700; text-16-alt: Inter 16px/19px 400; text-14: Aleo 14px/17px 700; text-14-alt: Inter 14px/17px 400; text-12: Inter 12px/15px 100; text-12-alt: Inter 12px/14px 400; text-10: Inter 10px/13px 400; text-9: Inter 9px/11px 100; text-7: Aleo 7px/5px 700
- Font families: Inter, Aleo, Ubuntu
- Corner radii: 3px, 5px, 8px, 10px, 12px, 20px
