import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBu4V9kAIdTKcjvKYqKkDzYt8BOUgDOjVQ",
  authDomain: "leasingoo.firebaseapp.com",
  projectId: "leasingoo",
  storageBucket: "leasingoo.appspot.com",
  messagingSenderId: "658592661455",
  appId: "1:658592661455:web:3c71e6ae61d1e6c44edcba",
  measurementId: "G-YEF25V7VN8",
};

// console.log("heybye", {
//   apiKey: process.env.NEXT_PUBLIC_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_APP_ID,
//   measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
// });

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
