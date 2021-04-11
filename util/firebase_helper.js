import firebase from "firebase/app";
import axios from 'axios';
import FIREBASE_CONFIG from './firebase_config.js';
import "firebase/auth";
import qs from 'qs';

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
     }
     
     _init_firebase_app(){
      firebase.apps.length?1:FIREBASE_APP = firebase.initializeApp(FIREBASE_CONFIG);
      FIREBASE_PROVIDER = new firebase.auth.GoogleAuthProvider(); 
      FIREBASE = firebase;
      this._firestore_init();
     }
     _get_firebase(){
       return FIREBASE;
     }
     async _firestore_init(){
       await axios(process.env.NEXT_PUBLIC_HOST+"api/firebase_firestore_init")
        .then(res=>{console.log(res.data);})
        .catch(err=>{console.log(err);});
      }

     async _app_init_auth_state_inti(){
      console.log("INIT AUTH");
      return(await this._get_firebase().auth().onAuthStateChanged((user) => {
        if (user) {
          if(cookies.get('accessToken')===null||cookies.get('accessToken')===undefined){
            this._firebaseGoogleSignOutInit();
          }
          console.log("AUTH CHANGE CALL yes exist sign in | USER TOKEN "+user.uid);
          this._set_current_user();
          const DEST_URL = process.env.NEXT_PUBLIC_HOST+'src/land';
          Router.pathname!=='/src/land'||Router.pathname!=='/src/signup'?Router.push(DEST_URL):null;
          return true;
        } else {
          console.log("AUTH CHANGE CALL no exist sign in | USER TOKEN "+user);
          cookies.remove('accessToken',{ path: '/' });
          return false;
        }
      }));  
     }

     

     async _init_user_check(succ,fail){ 
      console.log("CURRENT USER CHECK TOKEN "+cookies.get('accessToken'));
      if(cookies.get('accessToken')==null||cookies.get('accessToken')==undefined){
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
      //console.log("SET USER INFO"+JSON.stringify(firebase.auth().currentUser));
      this.UserClass._set_curr_user(firebase.auth().currentUser);
     }

     async _get_current_user(){
       return (firebase.auth().currentUser);
     }

     async _firebaseEmailCreateInit(front_data){
      console.warn("EMAL INIT");  
      let res  ={err:null,errCode:null};
        return(await firebase.auth().createUserWithEmailAndPassword(front_data.eml,front_data.pass  ).then(res=>{
          var user = res.user;
          front_data.UID = user.uid;
          front_data.login_method = 0;
          res = {err:false};
              axios(process.env.NEXT_PUBLIC_HOST+"api/db/db_create_user",{
                method: 'POST',
                mode: 'no-cors',
                cache: 'no-cache',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                credentials: 'same-origin',
                redirect: 'follow',
                referrerPolicy: 'no-referrer', 
                data: qs.stringify(front_data)
              })
              .then(res=>{
                if(res.data.errBool===false){
                  Router.push(process.env.NEXT_PUBLIC_HOST+'src/login?create=1')
                }
                else{
                  res = {err:true}
                  user.delete();
                }
              })
              .catch(err=>{console.log(err);
                user.delete();
              });
          return res;
        }).catch(error=>{
          var errorCode = error.code;
          console.log("EMAIL ACCOUTN CREAT FAIL AT ERROR"+errorCode);
          res = {err:true,errCode:errorCode};
          return res;
        }));

     }
     async _firebaseEmailSignInInit(email,pass)
      {
        let res  ={err:null,errCode:null};
        return(await firebase.auth().signInWithEmailAndPassword(email,pass).then((result)=>{
              /** @type {firebase.auth.OAuthCredential} */
              console.log("EMAIL LOGIN RESULT"+result.user.uid); 
              let token = result.user.uid;
              cookies.set('accessToken',token, { path: '/' });
              this._set_current_user();
              Router.push(process.env.NEXT_PUBLIC_HOST+'src/land');  
              res = {err:false};
              return res;
        }).catch((error) => {
          let errorCode = error.code;
          console.log("NO NEW EMAIL SIGNIIN AT ERROR "+error);
          res = {err:true,errCode:errorCode};
          return res;
        }));
      }
     async __firebaseGoogleSignInInit(){     
         return(await firebase.auth().signInWithPopup(FIREBASE_PROVIDER).then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            const credential = result.credential;
            const token = credential.accessToken;
            console.log("LOG IN CREDS" + credential);
            cookies.set('accessToken',token, { path: '/' });
            this._set_current_user();
            Router.push(process.env.NEXT_PUBLIC_HOST+'src/land');
            return true;
          }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            console.log("NO NEW GOOGLE SIGNIIN AT ERROR "+errorCode);
            return false;
          }));
     }
      
}