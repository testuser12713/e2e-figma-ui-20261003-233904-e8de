# Design — Project Identity

> This document is project-long-lived. Tokens are not changed without
> the Architect's approval. Developers MUST use these tokens
> instead of improvising their own colors/spacings.

## Style Direction

Light, airy business-handler mobile UI taken verbatim from the Figma frames: white cards and panels floating on a cool #F4F5FA canvas, one friendly green #6CC57C reserved for primary actions, progress and the active calendar day, Aleo serif headings and nav labels against Inter UI text — calm, generous and predictable, built for one-handed 414×896 use.

## Colors

- `--color-bg`: **#F4F5FA**
- `--color-surface`: **#FFFFFF**
- `--color-surface-alt`: **#F4F4F4**
- `--color-panel`: **#ECF1FA**
- `--color-chip`: **#DCE5F4**
- `--color-fg`: **#23233C**
- `--color-ink`: **#1C1C1C**
- `--color-black`: **#000000**
- `--color-accent`: **#6CC57C**
- `--color-accent-deep`: **#179F2F**
- `--color-accent-soft`: **#61D27C**
- `--color-accent-85`: **#6CC57CD9**
- `--color-accent-64`: **#6CC57CA3**
- `--color-accent-tint`: **#6CC57C33**
- `--color-hero-tint`: **#6CC57C2E**
- `--color-on-accent`: **#FFFFFF**
- `--color-secondary`: **#23233C**
- `--color-deposit`: **#2B2B2B**
- `--color-muted`: **#A5A5A5**
- `--color-muted-2`: **#8D8D8D**
- `--color-muted-3`: **#898888**
- `--color-muted-4`: **#B4B4B4**
- `--color-nav-inactive`: **#BBC7DB**
- `--color-track`: **#E3E3E3**
- `--color-border`: **#707070**
- `--color-divider`: **#1C1C1C**
- `--color-rule-warm`: **#C48B30**
- `--color-back-ink`: **#181461**
- `--color-danger`: **#D9534F**

## Typography

- `font_family`: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif
- `font_family_display`: Aleo, 'Noto Serif', Georgia, 'Times New Roman', serif
- `font_family_calendar`: Ubuntu, Inter, -apple-system, 'Segoe UI', Roboto, sans-serif
- `heading_weight`: 700
- `body_weight`: 400
- `text-45`: Inter 500 45px/57px uppercase
- `text-40`: Aleo 700 40px/51px
- `text-25`: Aleo 700 25px/30px
- `text-25-alt`: Aleo 700 25px/32px
- `text-24`: Aleo 700 24px/29px
- `text-20`: Aleo 700 20px/25px
- `text-17`: Ubuntu 700 17px/20px
- `text-16`: Aleo 700 16px/19px
- `text-16-alt`: Inter 400 16px/19px
- `text-15-alt`: Inter 500 15px/19px
- `text-14`: Aleo 700 14px/17px
- `text-14-alt`: Inter 400 14px/17px
- `text-14-100`: Inter 100 14px/18px
- `text-13-alt`: Inter 400 13px/17px
- `text-12`: Inter 100 12px/15px letter-spacing 2.4px uppercase
- `text-12-alt`: Inter 400 12px/14px
- `text-11-ubuntu`: Ubuntu 700 11px/12px letter-spacing 0.3px
- `text-10-ubuntu`: Ubuntu 400 10px/12px
- `text-10`: Inter 400 10px/13px
- `text-9`: Inter 100 9px/11px uppercase letter-spacing 1.8px
- `text-7`: Aleo 700 7px/5px

## Spacing Scale

- `--space-0`: 4px
- `--space-1`: 8px
- `--space-2`: 12px
- `--space-3`: 16px
- `--space-4`: 20px
- `--space-5`: 24px
- `--space-6`: 32px
- `--space-7`: 40px

## Border-Radii

- `--radius-sm`: 3px
- `--radius-md`: 5px
- `--radius-lg`: 8px
- `--radius-lg2`: 10px
- `--radius-xl`: 12px
- `--radius-2xl`: 18px
- `--radius-3xl`: 20px
- `--radius-pill`: 999px

## Components

### Button / Primary (filled green)

Box 334×43, radius 8, bg accent #6CC57C, shadow card '0 3px 16px #00000014', label text-16-alt (Inter 400 16px/19px) #FFFFFF centred, horizontal padding 24. Frames use it full content width (x=40, w=334). States: default bg #6CC57C; hover bg #7ECD8C (+6% lightness); pressed/active bg #5CB06B with 0.98 scale; disabled bg #6CC57C at opacity 0.4, label #FFFFFF, no shadow, cursor default. Touch target: min-height 44px (visual height 43px + 1px hit-slop padding). Variants: 'Button / Primary Soft' fill accent-85 #6CC57CD9 (85% green, frame 'Overview'); 'Button / Dark' 333×54 radius 18 bg #23233C, label Aleo 700 20px/25px #FFFFFF centred (frame Login).

### Button / Back chevron

Two forms as drawn. (a) Bare: 11×18 icon 'noun_back_1227057' tinted #181461, placement 40/25 (Money Management, Time Management), 44×44 hit area. (b) Boxed: 32×32 rounded square radius 8 fill #23233C with a 9×16 white chevron centred, placement 47/55 (Money Management 2 + 3, Add Expense / Add Appointment headers). States: default as above; hover boxed fill #2E2E4C; pressed 0.96 scale; tap always performs one step back (AC-07).

### BottomTabBar

Full-width, fixed at the bottom: white bar 413×77 at y=819 with shadow navbar '0 3px 20px #60719329', top edge carrying a centre notch, plus 4 items and a centre action pill. Items (frames' own labels, kept verbatim): Home (icon 'noun_Home_1191731' 22×21), Products (shop icon 19×19), Liked (noun_Favorite 20×18), Today (feather-user-check 15×18); icons centred over labels Aleo 700 7px/5px. Geometry: icon row at y=836, label row at y=862. Colors: active tab icon + label #6CC57C; inactive #BBC7DB; disabled item keeps #BBC7DB at opacity 0.45 and is not tappable. Mapping to the three screens: Home → Dashboard, Products → Money Management, Today → Time Management ('Liked' stays disabled as 'coming soon').

### FloatingAddButton

Pill 64×63 absolutely positioned, horizontally centred (x=179) with its centre on y=810 — it overlaps the notch of the tab bar. Fill gradient '180deg #6CC57C 0% → #179F2F 100%', 4px #FFFFFF inside stroke, shadow fab '0 3px 40px #00000029', plus a white 20×20 plus (two 3px #FFFFFF bars, 20×1 and 1×20). States: default; hover brightness 1.06; pressed 0.96 scale + brightness 0.96; opens the entry sheet on the list screens. 64px circle already exceeds the 44px touch target.

### HeroStatHeader (Money Management)

White panel 414×406 at the top of the screen, #FFFFFF, with the decorative line illustration 'illustration-525x387.png' (525×387) anchored at -73/-74 and clipped. Content block at x=49, y=282: eyebrow 'MONTHLY EXPENSES' text-12 (Inter 100 12px/15px, ls 2.4px, uppercase) #000000; value '1,345.00€' text-45 (Inter 500 45px/57px uppercase) #000000 — value always computed from the mock data, never hard-coded. AvatarBadge 'R' at x=296, y=77: 51×51, pill radius, bg #6CC57C, shadow '0 3px 6px #00000029', glyph Aleo 700 32px/41px #FFFFFF.

### Card (Quick Categories)

330×276, radius 20, fill #FFFFFF, no border, soft shadow card. Inner title 'Quick Categories' text-12 (Inter 100 12px/15px ls 2.4px uppercase) #000000, x=137, y=487 (centred). 6 tiles in a 3×2 grid: x=69/175/284, rows y=530 and y=622, 55×55.

### CategoryTile

55×55, fill #FFFFFF, 1px #000000 dashed inside stroke, radius 12. Icon centred, size 36–42px, tint #000000 (briefcase 41×34, dish-spoon-knife 41×29, home 42×39, friends 40×30, shopping-bag 36×42, gas-station 37×39 — export from the frames; where Figma renders the asset empty, redraw a matching line icon in the same weight). States: default as drawn; hover 1px #6CC57C dashed; pressed bg #6CC57C33 and icon #23233C; selected bg #6CC57C with icon #FFFFFF (added — the frames show no selection); 44px+ touch target via 55px box.

### SegmentedTab (underline tabs)

Row 336×38 at x=39, y=194. Active label Aleo 700 16px/19px #23233C; inactive label Inter 400 16px/19px #1C1C1C. Underline: active marker 51×2 #23233C, full-width rail 336×1 0.5px #1C1C1C opacity 0.2. States: default; hover inactive label #23233C; pressed opacity 0.7; switching the tab re-filters the list in place. Mirrors the 'Upcoming / Past' pairing and stands in for the time-period and income/expense toggles.

### InputField

334×43, fill #FFFFFF, radius 8, shadow card '0 3px 16px #00000014', vertical rhythm 24px (frames y=149/212/275 and 176/239/302/365). Label/placeholder text-16-alt (Inter 400 16px/19px) #1C1C1C; search placeholder at opacity 0.2. Leading icon 14–16px #23233C at x≈56 (search, map/pin, calendar); trailing icon 16×16 #1C1C1C at x=341 (search). States: default; focus border 1px #6CC57C + shadow kept (added); filled text full-opacity #1C1C1C; error border 1px #D9534F with a 10px/13px #D9534F hint below (added) — the error only appears after the field was touched or submit was pressed, never on first render (AC-08); disabled bg #F4F4F4, text #A5A5A5.

### FormSheet (Add Expense / Add Appointment)

Full-screen state of the list screens. Header 414×126 (Time Management 3) or 414×138 (Money Management 3), fill #FFFFFF, shadow '0 3px 16px #0000001A': back-control 32×32 at 47/55, title 'Add Expense' text-14-100 (Inter 100 14px/18px ls 2.8px uppercase) #000000 or 'Add an appointment' Aleo 700 24px/29px #23233C, user icon 27×27 #181461 top-right. Body on bg #F4F5FA with the three to four InputFields stacked 334 wide, then Button / Primary 334×43 ('Add Expense' / 'Add Appointment'). Submit enabled only with a valid amount and name; on submit the row and all totals update immediately. Below the form (Time Management 3) the 'Quick Adds' block.

### TransactionRow (Money Management 2)

Row 326 wide, illustration 53×53 at the left (assets 'illustration-53x53-1..4'), text column starting at x=103, amount right-aligned ending at x=354. Title text-12-alt (Inter 400 12px/14px) #000000 e.g. 'Spend On Fun Mall Cinema'; category text-9 (Inter 100 9px/11px ls 1.8px uppercase) #000000 e.g. 'MOVIE'; date text-9 #000000 '02- MONDAY'; amount text-14-100 (Inter 100 14px/18px) #000000 e.g. '23.00€'. Row pitch 83px (y=439/522/605/688). No card background — rows sit directly on the white panel; 44px+ row height, whole row tappable to the detail view.

### WeeklyBarChart

White top panel 414×407 with title 'weekly report' text-14-100 (Inter 100 14px/18px ls 2.8px uppercase) #000000 at 129/61 and illustration 'illustration-256x218.png' (256×218) at 74/110. 7 columns, pitch ~33px, column width 13, radius 3 at both ends: track #E3E3E3, expenses fill #6CC57C, deposit fill #2B2B2B stacked from the bottom. Legend row at y=358: 13×13 radius-3 swatches (accent #6CC57C, deposit #2B2B2B) with text-9 #000000 labels 'EXPENSES' / 'DEPOSIT'. Bar heights derive from the mock data.

### LegendChip

13×13 square, radius 3, fill accent #6CC57C or deposit #2B2B2B, followed by a 9px/11px uppercase label #000000 with 1.8px letter-spacing. Horizontal gap 8px between chip and label, 20px between chips.

### AppointmentCard (Time Management 2)

286×118, fill accent-64 #6CC57CA3, no radius. Inside: title 'Work' Ubuntu 700 11px/12px #23233C at +20/+15; subtitle 'Besprechung' Ubuntu 400 10px/12px #000000 opacity 0.42; time '10AM - 11AM' Ubuntu 700 7px/10px #23233C; clock icon 11×11 #23233C left of the time; circular avatar 56×56 at the right (asset fc8cc65f…png) with 1px #FFFFFF ring. Bottom rule 1px #C48B30 opacity 0.18. Left grid gutter: time label Aleo 700 11px/12px ls 0.3px #000000 (10 AM / 12 AM / 15 AM), dashed tick 22×1 #707070 opacity 0.18, hour pitch 135px, card pitch 135px starting y=334. States: default; pressed card fill #6CC57CD9; tapped card opens the appointment detail.

### CalendarStrip (Time Management 2)

White sheet, top radius 20, starting y=268; day header 414 wide. Month range '15-21 April 2019' Ubuntu 400 13px/15px #000000 centred with 8×14 chevrons #000000 on both sides. Weekday letters S M T W T F S Ubuntu 400 15px/20px (a few 13px/18px as measured) #000000, evenly distributed every ~52px starting x=36. Day numbers Ubuntu 400 15px/20px #000000; selected day: 42×42 accent #6CC57C ellipse behind the white number. Below the strip the date caption '18 April 2019' Ubuntu 700 11px/12px ls 0.3px #000000 opacity 0.44, then the time grid.

### AppointmentRow / QuickAddRow (Time Management 3)

Row 336×90 at x=39, pitch 109px (y=455/564/673/782), separated by a 336×1 divider 0.5px #1C1C1C opacity 0.2. Thumbnail 69×69 at x=39 (local images 'image-69x69-1..4'). Title Aleo 700 14px/17px #1C1C1C at x=121; subtitle Inter 400 12px/14px #1C1C1C opacity 0.4 ('Customize Plan' / 'Normal Day' / 'Friend' / 'Dermatologist'). Right side: kebab 3×14 of three 3×3 dots #23233C at x=372, 44px hit area. States: default; pressed row bg #F4F4F4; disabled rows keep full colours at opacity 0.4 with a 'coming soon' marker.

### ListRow (Time Management — appointments)

Row 337×57 at x=38, pitch 72px (y=244/316/388). Date line text-12-alt (Inter 400 12px/22px) #1C1C1C opacity 0.4 ('09/04/2020'); title Aleo 700 14px/17px #1C1C1C ('Dentist - Clara Odding'); right-side action 'Modify' Aleo 700 14px/17px #23233C right-aligned at x=308 with a 12×12 pencil icon #23233C and an optional 12×12 info icon #23233C beside the title. Bottom rule 336×1 0.5px #1C1C1C opacity 0.2. States: default as drawn; hover title #6CC57C; pressed opacity 0.7; tapped row opens the detail view.

### ScreenHeader

Back control per 'Button / Back chevron' plus one title. Money/Time list variant: back chevron 11×18 at 40/25, title 'My Appointments' Aleo 700 16px/19px #1C1C1C at 39/80, user icon 27×27 #23233C at 348/25, search field 334×43 below at y=116. Primary-action variant (Time Management): two stacked buttons at x=39-41, w=334-336, h=43, 24px vertical rhythm — 'Add a new appointment' fill #6CC57C and 'Overview' fill #6CC57CD9, both text-16-alt #FFFFFF centred.

## Source Frames

This design was taken from the Figma frames below. They are the reference; the tokens above were read from them. Each frame's spec carries its exact sizes, colours, fonts and texts and the arrangement to lay out (not to pin to pixels); `design/figma/README.md` is the index.

Platform: mobile app (`mobile-app`) — design viewport 414×896 (phone, portrait) — one viewport, the design is not responsive.

- **Money Management** · businesshandler — spec `design/figma/money-management.md` — `design/figma/money-management.png` — https://www.figma.com/design/edl4sapqOV1QVVleWmFCt3/?node-id=0-2446
- **Money Management 2** · businesshandler — spec `design/figma/money-management-2.md` — `design/figma/money-management-2.png` — https://www.figma.com/design/edl4sapqOV1QVVleWmFCt3/?node-id=0-2573
- **Money Management 3** · businesshandler — spec `design/figma/money-management-3.md` — `design/figma/money-management-3.png` — https://www.figma.com/design/edl4sapqOV1QVVleWmFCt3/?node-id=0-2673
- **Time Management** · businesshandler — spec `design/figma/time-management.md` — `design/figma/time-management.png` — https://www.figma.com/design/edl4sapqOV1QVVleWmFCt3/?node-id=0-803
- **Time Management - 2** · businesshandler — spec `design/figma/time-management-2.md` — `design/figma/time-management-2.png` — https://www.figma.com/design/edl4sapqOV1QVVleWmFCt3/?node-id=0-3047
- **Time Management - 3** · businesshandler — spec `design/figma/time-management-3.md` — `design/figma/time-management-3.png` — https://www.figma.com/design/edl4sapqOV1QVVleWmFCt3/?node-id=0-1029
- **Login** · businesshandler — spec `design/figma/login.md` — `design/figma/login.png` — https://www.figma.com/design/edl4sapqOV1QVVleWmFCt3/?node-id=0-81
- **Login Slide** · businesshandler — spec `design/figma/login-slide.md` — `design/figma/login-slide.png` — https://www.figma.com/design/edl4sapqOV1QVVleWmFCt3/?node-id=0-20
- **Login Slide 2** · businesshandler — spec `design/figma/login-slide-2.md` — `design/figma/login-slide-2.png` — https://www.figma.com/design/edl4sapqOV1QVVleWmFCt3/?node-id=0-208
- **Dashboard** · businesshandler — spec `design/figma/dashboard.md` — `design/figma/dashboard.png` — https://www.figma.com/design/edl4sapqOV1QVVleWmFCt3/?node-id=0-681
- **Dashboard Menu** · businesshandler — spec `design/figma/dashboard-menu.md` — `design/figma/dashboard-menu.png` — https://www.figma.com/design/edl4sapqOV1QVVleWmFCt3/?node-id=0-2973
- **Dashboard Stats** · businesshandler — spec `design/figma/dashboard-stats.md` — `design/figma/dashboard-stats.png` — https://www.figma.com/design/edl4sapqOV1QVVleWmFCt3/?node-id=0-900
