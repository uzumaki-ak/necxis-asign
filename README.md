# Necxis Asign

A responsive Next.js + Firebase-powered web app, wrapped in an Expo mobile container using WebView. The app supports Google authentication and is designed for smooth access via both desktop and mobile.

## Features

- *Built with Next.js 15 and MUI*
- *Firebase Authentication (Google Login)*
- *Responsive design* with mobile navigation (hamburger menu)
- **(Attempted) Expo app wrapper using react-native-webview**
- *WebView fallback to open sign-in in external browser* (due to Firebase redirect limitations)

## Live Demo

*Web URL:* [https://necxis-asign-g95e.vercel.app/](https://necxis-asign-g95e.vercel.app/)

---

## Expo Attempt (Important Note)

I tried wrapping the web app in an Expo app using react-native-webview. My goal was to provide a mobile container experience that renders the full web UI inside an Expo app.

- The **Expo source code is available in the expo branch**.
- I implemented logic to detect WebView and open the login in an external browser if needed.
- However, I encountered persistent Firebase auth issues when trying to use signInWithRedirect inside WebView.

### Key Error Faced


Unable to process request due to missing initial state.
This may happen if browser sessionStorage is inaccessible or accidentally cleared.
Some specific scenarios are:
1) Using IDP-Initiated SAML SSO.
2) Using signInWithRedirect in a storage-partitioned browser environment.


Firebase authentication relies on sessionStorage, which is often *unavailable inside embedded WebViews* (especially in Expo Go or Android WebViews). This caused login redirects to fail or lose state entirely.

---

### Why It Couldn't Be Solved

While I'm comfortable with web technologies, this was my first time working with Expo and React Native. I explored several workarounds including:

- External browser redirects
- Custom deep linking
- Firebase alternatives
- Hybrid auth patterns

Despite best efforts, the limitation seems rooted in how session-based auth works within restricted WebView contexts.

> I left the Expo implementation in the repo to show that I gave it a genuine attempt. With more React Native experience or native modules, it may be possible, but within the constraints of Expo Go and time, it couldn't be fully resolved.

---

## How to Run Locally

### 1. Clone the Repository

bash
git clone https://github.com/uzumaki-ak/necxis-asign.git
cd necxis-asign


### 2. Install Dependencies

npm install


### 3. Setup Firebase

- Create a Firebase project
- Enable Google Sign-In under *Authentication > Sign-in method*
- Add your Firebase config to firebase.ts

### 4. Run the Web App

npm run dev
open localhost:3000
### 5. Run the Expo App (Mobile)

- Switch to the expo branch:

bash
git checkout expo
cd expo-app-directory
npm install
npx expo start


Scan the QR code using the Expo Go app on your phone.

---



## Notes

- Google Sign-In via Firebase doesn't work inside WebView due to sessionStorage restrictions.
- Login is opened in the system browser to bypass WebView limitations (partial workaround).
- Notifications via Firebase are planned for future integration.

## License

This project is for educational/demo purposes. All rights reserved.
