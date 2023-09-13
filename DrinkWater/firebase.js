// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4rIiRDIhrBjCqOMe0Uk_ecADFCGGVVzk",
  authDomain: "suic-ad288.firebaseapp.com",
  projectId: "suic-ad288",
  storageBucket: "suic-ad288.appspot.com",
  messagingSenderId: "94142761978",
  appId: "1:94142761978:web:27fd77b1bb487535223243"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();

export { auth };
