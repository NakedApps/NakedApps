# LocaLite

A modular, cross-platform app for local tasks, reducing internet dependencies.

## Features
- **Modular Design**: Add custom modules without changing the main app code.
- **Cross-Platform**: Runs on desktop (via Electron) and mobile (iOS/Android via Expo).
- **Local Tasks**: QR code reader, calculator, PDF modifier, and more.

## Getting Started

### Prerequisites
- Node.js
- Expo CLI: `npm install -g @expo/cli`
- For desktop: Electron (installed via npm)

### Installation
1. Clone or download the project.
2. Run `npm install` to install dependencies.

### Running the App

#### Web/Desktop
- `npm run web` - Start web development server.
- `npm run desktop` - Build for web and run in Electron.

#### Mobile
- `npm run android` - Run on Android device/emulator.
- `npm run ios` - Run on iOS simulator (macOS required).

### Adding Modules
1. Create a new folder in `modules/` (e.g., `modules/my-module/`).
2. Create `index.js` exporting a default React component.
3. Add an entry to `modules.json`:
   ```json
   {
     "name": "my-module",
     "description": "Description of my module"
   }
   ```
4. Rebuild/run the app to include the new module.

### Example Modules
- **Calculator**: Simple arithmetic calculator.
- **QR Reader**: Scan QR codes using camera.
- **PDF Modifier**: Generate PDFs with text.

## Architecture
- Main app in `src/`
- Modules in `modules/`
- Configuration in `modules.json`
- Dynamic loading via React Navigation and dynamic imports.

## Technologies
- React Native with Expo
- Electron for desktop
- TypeScript