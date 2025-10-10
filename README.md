# Aesthetica - Wallpaper App  

**Aesthetica** is a **React Native app** for wallpaper lovers who love exploring **modern wallpapers** and **visual aesthetics**.  

This open-source project focuses on **UI/UX excellence**, smooth animations, and a polished frontend experience — perfect for those who want to enhance their mobile design and animation skills while contributing to open source.  

---

## Overview  

Aesthetica lets users browse curated wallpapers and UI design shots, save their favorites, and even upload their own creations.  
With a clean, minimal interface and smooth transitions, it’s an elegant showcase of what can be achieved with **React Native**, **Reanimated**, and **Lottie**.  

---

## Features  

### 🖼️ Explore & Discover  
- Browse a gallery of wallpapers and UI shots  
- Infinite scroll for seamless browsing  
- Category-based filtering (Wallpapers, UI Designs, Illustrations, etc.)  

### 💾 Save Favorites  
- Mark wallpapers or designs as favorites  
- View all saved items in one place  

### 📤 Upload Your Own  
- Upload your wallpapers or design shots  
- Add title, tags, and color palette  
- Share your creativity with the community  

### 🎨 Smart Search & Filters  
- Search by **color**, **style**, or **theme**  
- Dynamic color extraction for beautiful previews  

### 🌈 UI Highlights  
- Fluid animations (Reanimated / Lottie)  
- Soft gradients and minimal aesthetic  
- Light/Dark mode support  

---

## Tech Stack  

| Category | Tools |
|-----------|-------|
| Framework | **React Native (Expo)** |
| UI Library | **React Native Paper / Tailwind RN** |
| Animations | **Reanimated 3**, **Lottie**, **Gesture Handler** |
| State Management | **Zustand / Redux Toolkit** |
| Backend (Optional) | **Firebase / Supabase** |
| Image Hosting | **Cloudinary / Firebase Storage** |

---

## Goals  

- Build a **visually stunning** app focused purely on **frontend polish**.  
- Encourage contributors to work on **animations**, **UI components**, and **interactive elements**.  
- Serve as an excellent **portfolio project** for React Native developers.  

---

## Authentication (Supabase)

This project includes a basic Supabase Auth integration (email/password). To enable it:

1. Copy `.env.example` to `.env` and fill `SUPABASE_URL` and `SUPABASE_ANON_KEY`.
2. Install new dependencies: `npm install @supabase/supabase-js @reduxjs/toolkit react-redux @react-native-async-storage/async-storage`
3. Run the app with `npm start`.

Files added/changed for auth: `lib/supabaseClient.ts`, `store/*`, `app/(auth)/*`, `app/_layout.tsx`, `app/(tabs)/profile.tsx`.

Notes: The Supabase client reads values from environment variables. In Expo you can use `app.config.js` or `expo-cli` env injection for local testing.
