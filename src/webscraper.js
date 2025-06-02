
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

const pageHTML = document.body.innerHTML;


// Get all rows in the table
const rows = Array.from(document.querySelectorAll("tr")).map(tr => {
  return Array.from(tr.querySelectorAll("td, th")).map(td => td.innerText).filter(row => row.length > 0);
});

// Convert rows to array of objects using the first row as headers
let tableObjects = [];
if (rows.length > 1) {
  const headers = rows[0];
  tableObjects = rows.slice(1).map(row => {
    const obj = {};
    headers.forEach((header, i) => {
      obj[header] = row[i] || "";
    });
    return obj;
  });
}

// Log the page URL and text content to the console to ensure it's working
console.log("Page URL: ", pageUrl);
console.log("Page Text: ", pageText);
console.log("Page HTML: ", pageHTML); 
console.log("Table rows: ", rows);
console.log("Table objects: ", tableObjects);



// Check if the page URL already exists in the Firestore collection
(async () => {
  try {
    const q = query(col, where("page", "==", pageUrl));
    const querySnapshot = await getDocs(q);


    if (!querySnapshot.empty) {
      console.log("Page URL already exists in Firestore");
      return;
    } else {
      if (rows.length > 1) {
        console.log("Table rows found, processing...");
        const docRef = await addDoc(col, {
          page: pageUrl,
          table: tableObjects,
          content_txt: pageText,
          content_html: pageHTML
        });
        console.log("Document written with ID: ", docRef.id);
      } else {
        console.log("No table rows found, proceeding to add page content.");
        const docRef = await addDoc(col, {
          page: pageUrl,
          content_txt: pageText,
          content_html: pageHTML
        });
        console.log("Document written with ID: ", docRef.id);
      }
    }
  } catch (error) {
    console.error("Error adding or checking document: ", error);
  }
}
)();




