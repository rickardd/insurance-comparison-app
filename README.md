npx create vite@latest insurance-comparison-tool --template react-ts
cd insurance-comparison-tool

npm install
npm install firebase
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install react-router-dom
npm install zustand

touch vite.config.ts

```
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
```

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyCvdOr2bIy5jbbaqFpF_DjSg7YuQUbfw-4",
authDomain: "insurance-app-f0029.firebaseapp.com",
projectId: "insurance-app-f0029",
storageBucket: "insurance-app-f0029.firebasestorage.app",
messagingSenderId: "161916150055",
appId: "1:161916150055:web:467f6dbb98d33af34e0902",
measurementId: "G-FCK4CV5S38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

### Set up a firebase project and create an app.

- add google and email/passwords to authentication
- Create an empty firestore database
- got to profile settings and register a new app, follow the steps which would be something like
  - npm install -g firebase-tools
  - firebase login
  - firebase init
  - firebase deploy

## Add config and cridentials

copy and past the app config to `firebase.ts`
Ideally add this to `.env.dev` or `.env.prod`

```js
const firebaseConfig = {
  // import.meta.env is the vite way of importing env props
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};
```

add keys firebase cridentials to the app.
**Note:** vite only exposes env variables to the client that are prefiexed with `VITE_`
Create `.env` in the vite project root.

```yml
VITE_FIREBASE_API_KEY="..."
VITE_FIREBASE_AUTH_DOMAIN="..."
VITE_FIREBASE_PROJECT_ID="..."
VITE_FIREBASE_STORAGE_BUCKET="..."
VITE_FIREBASE_MESSAGING_SENDER_ID="..."
VITE_FIREBASE_APP_ID="..."
VITE_FIREBASE_MEASUREMENT_ID="..."
```

Delete vite related assets and files

## Update firebaser database rules

Ensure correct permissions.
Go to firebaser database console and then rules.
For debugging we can set e.g allow read: true... but risky :)

```
service cloud.firestore {
  match /databases/{database}/documents {
    match /clients/{clientId} {
      allow read: if request.auth != null; // Allow read if authenticated
      allow write: if request.auth != null; // Allow write if authenticated
    }
    match /brokers/{brokerId} {
      allow read, write: if request.auth != null; // Allow read/write if authenticated
    }
    match /insurance_companies/{companyId} {
      allow read: if request.auth != null; // Allow read if authenticated
    }
  }
}
```

## Serve locally

- `npm run dev`
- maybe we need to login to firebase first!? - `firebase login`

## Deploy for production.

- Ensure the build script is using `npm run build`

## Clean up

Maybe we can remove the public folder in favor of src folder.
