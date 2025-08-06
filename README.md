# 🌱 Let's Plant - Tree Plantation Tracker (Ionic + Angular)

This project is a **cross-platform tree plantation app** built using **Ionic Framework + Angular**, designed to help users record, track, and share their tree planting activities. It supports geolocation, photo uploads, species data display, and environmental impact insights.

<br/>

## 📸 Features

- ✅ **Tree Species Selection** with scientific and environmental data
- 📅 **Date Picker** for selecting planting date
- 📍 **GPS Location Capture** using Capacitor Geolocation
- 📝 **Optional Notes & Address**
- 📷 **Photo Capture & Uploads** with preview, compression, and metadata
- 📊 **Environmental Impact Summary**
- ♻️ Built with **mobile-first design**, reusable components, and Angular Reactive Forms

---

## ⚙️ Tech Stack

| Layer         | Technology         |
|---------------|--------------------|
| Frontend      | Ionic + Angular 17+ |
| UI Components | Ionic UI Components |
| Forms         | Angular Reactive Forms |
| Location      | Capacitor Geolocation |
| Camera/File   | Capacitor Filesystem (Extendable) |
| Styling       | CSS + Ionic Utilities |
| Deployment    | Web, Android, iOS   |

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash

npm install
3️⃣ Add Capacitor Plugins
npm install @capacitor/geolocation
npx cap sync
Optional (if you enable camera):

##TO Run the app, follow these steps:

npm run start

npm install @capacitor/camera
npx cap sync
4️⃣ Run in Browser
bash
Copy
Edit
ionic serve
5️⃣ Run on Device (Android/iOS)
bash
Copy
Edit
ionic build
npx cap add android
npx cap open android
📁 Project Structure
css
Copy
Edit
src/
├── app/
│   ├── plant-tree-form/           # Form component
│   │   ├── plant-tree-form.component.ts
│   │   ├── plant-tree-form.component.html
│   │   └── plant-tree-form.component.scss
│   ├── home/                      # Main screen
│   └── app.module.ts
├── assets/images/                 # Species thumbnails
└── theme/
```

✨ Future Improvements
🔐 Firebase Auth (Google Login)

☁️ Firebase Firestore for activity storage

📦 Species API with search

📍 Map integration (Google Maps or Leaflet)

🎖️ Certificate generation + badges

🤝 Contributing
Want to contribute? Pull requests are welcome. Please open an issue first to discuss what you would like to change.

📄 License
MIT

🙌 Credits
Made with 💚 by Hredoy Sen
Inspired by the mission to plant more trees and save our planet 🌍

---






