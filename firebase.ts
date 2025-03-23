import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const getFirebaseConfig = () => {
  if (import.meta.env.MODE === "development") {
    return {
      // import.meta.env is the vite way of importing env props
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
      measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
    };
  } else {
    // Production configuration
    return {
      // These are currently set in gitHub -> settings (for the repo) -> secrets and variables -> actions
      // @ts-expect-error temporary
      apiKey: secret.FIREBASE_API_KEY,
      // @ts-expect-error temporary
      authDomain: secret.FIREBASE_AUTH_DOMAIN,
      // @ts-expect-error temporary
      projectId: secret.FIREBASE_PROJECT_ID,
      // @ts-expect-error temporary
      storageBucket: secret.FIREBASE_STORAGE_BUCKET,
      // @ts-expect-error temporary
      messagingSenderId: secret.FIREBASE_MESSAGING_SENDER_ID,
      // @ts-expect-error temporary
      appId: secret.FIREBASE_APP_ID,
      // @ts-expect-error temporary
      measurementId: secret.FIREBASE_MEASUREMENT_ID,
    };
  }
};

const firebaseConfig = getFirebaseConfig();

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
