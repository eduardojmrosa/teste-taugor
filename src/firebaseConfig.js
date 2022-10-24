import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseApp = {
  apiKey: "AIzaSyCexjTKI1v_4ASkmGBNrQ3hdlXPJmc8KTs",
  authDomain: "velvety-striker-313719.firebaseapp.com",
  projectId: "velvety-striker-313719",
  storageBucket: "velvety-striker-313719.appspot.com",
  messagingSenderId: "887606094911",
  appId: "1:887606094911:web:1cb3a16a2dd810d42f1c8a",
  measurementId: "G-THCM377XVB",
};
export const app = initializeApp(firebaseApp);
export const auth = getAuth(app);
