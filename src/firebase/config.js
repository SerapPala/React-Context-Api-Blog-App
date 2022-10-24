
import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCA6eU9J3z1YzD97jDdYrZ1QpYjmwopkMQ",
    authDomain: "kapsamli-blog-app.firebaseapp.com",
    projectId: "kapsamli-blog-app",
    storageBucket: "kapsamli-blog-app.appspot.com",
    messagingSenderId: "643691306017",
    appId: "1:643691306017:web:25704703ce6079845f1760",
    measurementId: "G-7NE101MP3P"
  };

initializeApp(firebaseConfig);

const db=getFirestore();

export {db}