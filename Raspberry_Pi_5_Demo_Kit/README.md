# Raspberry Pi 5 Demo Kit PWA/TUI

A landscape-oriented, highly responsive React Progressive Web App (PWA) with Text User Interface (TUI) features. Browse and interact with multidisciplinary content from The-Directory. Optimized for Raspberry Pi 5 (8GB RAM).

## Features

- Flexbox sidebar/main layout for classic TUI navigation
- Touch-friendly controls and adaptive font sizes
- Landscape/portrait orientation support
- Subject browsing with static content (ready for dynamic integration)
- Easy to upgrade and extend

## Setup

1. **Install dependencies**
   ```bash
   cd Raspberry_Pi_5_Demo_Kit
   npm install
   ```
2. **Start development server**

   ```bash
   npm start
   ```

   The app will open at `http://localhost:3000`.

3. **Build for production**
   ```bash
   npm run build
   ```
   Output will be in the `build/` folder, ready for deployment.

## Usage

- Use the sidebar to navigate between Home, The-Directory, and Settings.
- In The-Directory, select a subject to view its content.
- Touch controls and keyboard navigation are supported.
- Layout adapts for landscape and portrait screens.

## Customization

- To add real content, connect The-Directory subject folders and files.
- Update styles in `index.css` for further UI tweaks.
- Extend navigation and subject panels as needed.

## Requirements

- Node.js (v16+ recommended)
- Raspberry Pi 5 (8GB RAM recommended for best performance)

---

_This project is designed for easy upgrades and future expansion. For questions or improvements, open an issue or contribute!_
