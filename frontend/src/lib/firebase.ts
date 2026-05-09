import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  EmailAuthProvider,
  PhoneAuthProvider,
  signInWithPopup, 
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "dummy-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "dummy-domain.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "dummy-project",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "dummy-bucket.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const isDummy = firebaseConfig.apiKey === "dummy-key";

const app = !isDummy && getApps().length === 0 ? initializeApp(firebaseConfig) : (getApps().length > 0 ? getApp() : null);

export const auth = isDummy ? {} as any : getAuth(app!);
export const googleProvider = isDummy ? {} as any : new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  if (isDummy) {
    return { user: { displayName: "Nexus Scholar", email: "scholar@nexus.ai", photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nexus" } };
  }
  return signInWithPopup(auth, googleProvider);
};

export const logout = async () => {
  if (isDummy) return;
  return signOut(auth);
};

export { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier
};
