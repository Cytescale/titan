import firebase from "firebase/app";
import FIREBASE_CONFIG from './firebase_config.js';
import "firebase/auth";

var FIREBASE_APP = null;
var FIREBASE_PROVIDER = null; 
var LOGGED_USER = null;
var FIREBASE  = null;
export default class firebaseHelper{
      constructor(UserClass){
          this.UserClass = UserClass;
          console.log("FIREBASE HELPER INIT")
          firebase.apps.length?1:FIREBASE_APP = firebase.initializeApp(FIREBASE_CONFIG);
          FIREBASE_PROVIDER = new firebase.auth.GoogleAuthProvider();
          FIREBASE = firebase;
     }
     
     _get_firebase(){
       return FIREBASE;
     }

    //  async _get_current_user(){
    //   console.log("GET CURRENT USER INIT"); 
    //   let found = false;
    //   let res = await firebase.auth().onAuthStateChanged((user) => {
    //       if (user) {
    //         console.log("AUTH CHANGE CALL yes exist sign in | USER TOKEN "+user.uid);
    //         found =  true;
    //         this._set_current_user();
    //         console.log("FOUND RES"+ found);
    //         return found;
    //       } else {
    //         console.log("AUTH CHANGE CALL no exist sign in | USER TOKEN "+user);
    //         found =  false;
    //         console.log("FOUND RES"+ found);
    //         return found;
    //       }
    //     }); 
    //     return res;
    //  }

     async _firebaseGoogleSignOutInit(){
      firebase.auth().signOut().then(() => {
          console.log("FIREBASE SIGN OUT SUCCESS");
      }).catch((error) => {
        console.log("FIREBASE SIGN OUT ERROR");
      });
     }

     async _set_current_user(){
      this.UserClass._set_curr_user(firebase.auth().currentUser);
     }

     async __firebaseGoogleSignInInit(){     
         return(await firebase.auth().signInWithPopup(FIREBASE_PROVIDER).then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;
            var token = credential.accessToken;
            var user = result.user;
            this._set_current_user();
            return true;
          }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            console.log("NO NEW GOOGLE SIGNIIN AT ERROR "+error);
            return false;
          }));
     }
      
}