// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzcptvsZxU_BT3P0WwLyYRbsdJzzVj78Q",
  authDomain: "kingmru-ai-chat.firebaseapp.com",
  projectId: "kingmru-ai-chat",
  storageBucket: "kingmru-ai-chat.firebasestorage.app",
  messagingSenderId: "1050038048664",
  appId: "1:1050038048664:web:c86ca8cf60be5dc690fded"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = firebase.auth();

// Google Auth Provider
const googleProvider = new firebase.auth.GoogleAuthProvider();
