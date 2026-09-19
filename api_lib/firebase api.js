// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADRwHHSlHjvkDPR5-CLn2Ebe1bEr4oPbk",
  authDomain: "programmering-b-adrian.firebaseapp.com",
  projectId: "programmering-b-adrian",
  storageBucket: "programmering-b-adrian.firebasestorage.app",
  messagingSenderId: "810577863211",
  appId: "1:810577863211:web:80fa57780b4f98a86e806e",
  measurementId: "G-2BZFX2WMY4"
};

// opreter fiber tiil fir
firebase.initializeApp(firebaseConfig)
console.log("firebase stare med :", firebaseConfig.projectId) 


//vi får nu et firesyero on´bjernb som vi kan bu
var db = firebase.firestore()
    console.log("forvbinsls til firestore oprettter")
