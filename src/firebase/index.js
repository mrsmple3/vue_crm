import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCCV-3xjblsAFc-9olGM0apC8DEVvn5CaU",
  authDomain: "vue-crm-2edf3.firebaseapp.com",
  projectId: "vue-crm-2edf3",
  storageBucket: "vue-crm-2edf3.appspot.com",
  messagingSenderId: "66031232769",
  appId: "1:66031232769:web:13265dedb04cedea2e9d00",
  measurementId: "G-LCK8T4PRH5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
