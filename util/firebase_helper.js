import firebase from "firebase/app";
import FIREBASE_CONFIG from './firebase_config.js';
import "firebase/auth";
import Router from "next/router";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

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

     async _app_init_auth_state_inti(){
      console.log("INIT AUTH");
      await this._get_firebase().auth().onAuthStateChanged((user) => {
        if (user) {
          console.log("AUTH CHANGE CALL yes exist sign in | USER TOKEN "+user.uid);
          this._set_current_user();
          const DEST_URL = process.env.NEXT_PUBLIC_HOST+'src/land';
          
          Router.pathname!=='/src/land'?Router.push(DEST_URL):null;
          return true;
        } else {
          console.log("AUTH CHANGE CALL no exist sign in | USER TOKEN "+user);
          cookies.remove('accessToken',{ path: '/' });
          return false;
        }
      });  
     }

     

     async _init_user_check(succ,fail){ 
      console.log("CURRENT USER CHECK TOKEN "+cookies.get('accessToken'));
      if(cookies.get('accessToken')==null||undefined){
        fail!=null?Router.push(fail):null;
      }
      else{
        succ!=null?Router.push(succ):null;
      }

    }

     async _firebaseGoogleSignOutInit(){
      firebase.auth().signOut().then(() => {
          console.log("FIREBASE SIGN OUT SUCCESS");
          cookies.remove('accessToken',{ path: '/' });
          Router.push('/')
      }).catch((error) => {
          Router.push('/')
        console.log("FIREBASE SIGN OUT ERROR");
      });
     }

     async _set_current_user(){
      this.UserClass._set_curr_user(firebase.auth().currentUser);
     }

     async __firebaseGoogleSignInInit(){     
         return(await firebase.auth().signInWithPopup(FIREBASE_PROVIDER).then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            const credential = result.credential;
            const token = credential.accessToken;
            console.log("LOG IN CREDS" + credential);
            cookies.set('accessToken',token, { path: '/' });
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