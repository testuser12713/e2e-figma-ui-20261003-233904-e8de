# Business Handler

Eine vollständig offline laufende Business-Handler-App, gebaut mit Expo und React Native.
Sie bündelt drei Kernbereiche in einer App: ein Dashboard mit Menü- und Statistik-Ansicht,
Money Management (Umsätze, Filter und Kontostand aus den Beispieldaten) sowie
Time Management (Termine, Zeitraum-Ansicht und Fortschritt). Alle Screens arbeiten
ausschließlich mit im Code hinterlegten Beispieldaten — es gibt kein Backend, keine
Persistenz und keinen Login. Die App ist für den Phone-Viewport 414×896 gestaltet.

## Tech-Stack

- **Sprache:** TypeScript
- **Framework:** React Native mit Expo (SDK 57)
- **Navigation:** React Navigation mit Bottom-Tabs und Stack
- **UI:** React-Native-Komponenten mit `StyleSheet`, Design-Tokens als TypeScript-Konstanten in `src/theme.ts`
- **State:** lokaler React-State über Context (`src/state/AppStore.tsx`) auf Basis der Beispieldaten
- **Daten:** statische, typisierte Mock-Datenmodule unter `src/data/`
- **Assets:** lokale Bilddateien unter `assets/` und `design/figma/assets/`
- **Tests:** Jest mit `jest-expo` und `@testing-library/react-native`
- **Web-Build:** `expo export --platform web` (Ausgabe in `dist/`)

## Installation

Voraussetzung: Node.js 20+ und npm.

```sh
npm ci
```

## Entwicklung starten (Gerät oder Simulator)

```sh
npm start
```

Damit startet der Expo-Dev-Server. Danach:

- **Android:** `npm run android` (Android-Emulator oder angeschlossenes Gerät)
- **iOS:** `npm run ios` (macOS mit iOS-Simulator)
- **Expo Go:** den QR-Code aus dem Terminal mit der Expo-Go-App auf dem Gerät scannen
- **Web:** `npm run web` öffnet die App im Browser

## Produktions-Build (Web-Export)

```sh
npm run build
```

Der Befehl exportiert die App als statische Web-Anwendung nach `dist/`. Dieser Ordner
ist der Inhalt, den `RUN.json` als `serve_dir` deklariert:

```sh
npx serve dist
```

## Tests

```sh
npm test
```

## Wie man die App benutzt

Die App startet auf dem **Dashboard**. Die Navigation läuft über die Bottom-Tab-Bar
am unteren Rand:

- **Home** → Dashboard
- **Products** → Money Management
- **Today** → Time Management
- **Liked** → noch nicht verfügbar (sichtbar deaktiviert, „coming soon")

Ein Tippen auf einen Tab wechselt sofort zum zugehörigen Screen und markiert den Tab
als aktiv. Bereits besuchte Screens behalten ihren Zustand. Die Ansichten
**Dashboard Menu** und **Dashboard Statistics** werden vom Dashboard aus als Stack
über die Tabs geöffnet und mit dem Zurück-Chevron wieder verlassen.

## Funktionen

- Dashboard-Screen als Startbildschirm mit aktiv markiertem Dashboard-Tab
- Bottom-Tab-Bar mit Home, Products, Today und dem deaktivierten Liked-Eintrag
- Money Management: Ledger der Beispiel-Transaktionen, Filter nach Einnahmen/Ausgaben und Kontostand aus den Beispieldaten
- Time Management: Terminliste mit Fortschrittsanzeige
- Dashboard Menu und Dashboard Statistics als eigene Ansichten
- Gemeinsame Design-Tokens (Farben, Typografie, Abstände, Radien) aus `DESIGN.md`
- Reactive, In-Memory-App-State ohne Netzwerkzugriff
