
// Check to see script is being executed
// console.log("Webscraper script loaded");


// Import the Firebase and Firestore SDK
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, where, getDocs } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPcx5w2WAPwrH962M-Bku5n8rcUiBd7jk",
  authDomain: "r-interview-a414c.firebaseapp.com",
  projectId: "r-interview-a414c",
  storageBucket: "r-interview-a414c.firebasestorage.app",
  messagingSenderId: "884791632168",
  appId: "1:884791632168:web:1f81168ff7a0e7e80c301d",
  measurementId: "G-CT17BLY72M"
};

// Initialize Firebase and Firestore db
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const col = collection(db, "html_content");

// Get full page URL
const pageUrl = window.location.href;

// Get the entire text content of the page
const pageText = document.body.innerText;

const pageHTML = document.documentElement.innerHTML;

// Log the page URL and text content to the console to ensure it's working
console.log("Page URL: ", pageUrl);
console.log("Page Text: ", pageText);
console.log("Page HTML: ", pageHTML); 

// Check if the page URL already exists in the Firestore collection
(async () => {
  try {
    const q = query(col, where("page", "==", pageUrl));
    const querySnapshot = await getDocs(q);


    if (!querySnapshot.empty) {
      console.log("Page URL already exists in Firestore");
      return;
    } else {
      const docRef = await addDoc(col, {
        page: pageUrl,
        content_txt: pageText,
        content_html: pageHTML
      });
      console.log("Document written with ID: ", docRef.id);
    }
  } catch (error) {
    console.error("Error adding or checking document: ", error);
  }
}
)();




