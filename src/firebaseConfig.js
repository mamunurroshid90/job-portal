import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCZTe1s9lq7cESc2aDH9fOpqYCbw0KfLe0",
  authDomain: "online-job-portal-c87d5.firebaseapp.com",
  projectId: "online-job-portal-c87d5",
  storageBucket: "online-job-portal-c87d5.appspot.com",
  messagingSenderId: "1017535500988",
  appId: "1:1017535500988:web:943e58e5a863073b2876b9",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
