import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDLFELgDMpa86d4X5qkSIRoao2Tc56Xxdk",
    authDomain: "test-744c0.firebaseapp.com",
    projectId: "test-744c0",
    storageBucket: "test-744c0.appspot.com",
    messagingSenderId: "232432301030",
    appId: "1:232432301030:web:285e98075556ddfb1b9c27",
    measurementId: "G-G2TMMEVR53"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };