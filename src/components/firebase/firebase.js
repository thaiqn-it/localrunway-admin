import firebase from "firebase";

// web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBOO7d8P1oOKkBRIAnVQxDtkxAVnBrRVtY",
  authDomain: "local-runway-image.firebaseapp.com",
  projectId: "local-runway-image",
  storageBucket: "local-runway-image.appspot.com",
  messagingSenderId: "1073914590249",
  appId: "1:1073914590249:web:1fab738f8caf04376f9838",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
