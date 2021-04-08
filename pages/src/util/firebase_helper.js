import firebase from "firebase/app";
import FIREBASE_CONFIG from './firebase_config.js';
require('firebase/auth');

var FIREBASE_APP = null;
var FIREBASE_PROVIDER = null; 
export default class firebaseHelper{
      constructor(){
          console.log("FIREBASE HELPER INIT")
          firebase.apps.length?1:FIREBASE_APP = firebase.initializeApp(FIREBASE_CONFIG);
          FIREBASE_PROVIDER = new firebase.auth.GoogleAuthProvider();
     }
     
     __firebaseGoogleSignInInit(){
          firebase.auth().signInWithPopup(FIREBASE_PROVIDER).then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;
            var token = credential.accessToken;
            var user = result.user;
            
          }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            console.log("NO NEW GOOGLE SIGNIIN errCode"+errorCode+" MESSAGE "+errorMessage);
          });

     }
      
}