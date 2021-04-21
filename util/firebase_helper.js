import firebase from "firebase/app";
import axios from 'axios';
import FIREBASE_CONFIG from './firebase_config.js';
import "firebase/auth";
import qs from 'qs';
import Router from "next/router";
import Cookies from 'universal-cookie';
import _URLS from '../util/website_urls';
const cookies = new Cookies();

var FIREBASE_APP = null;
var FIREBASE_PROVIDER = null; 
var FIREBASE  = null;
export default class firebaseHelper{
      constructor(){

     }
     
     async _init_firebase_app(){
      if(firebase.apps.length<1){
        FIREBASE_APP = firebase.initializeApp(FIREBASE_CONFIG);
        FIREBASE_PROVIDER = new firebase.auth.GoogleAuthProvider(); 
        this._firestore_init();
        console.log('FIREBASE: new app initialised');
      }else{
        console.log('FIREBASE: app already initialised'); 
      }
      if(firebase!==null && FIREBASE === null){
        FIREBASE = firebase;
      }
    
     }
     _get_firebase(){
       return FIREBASE;
     }
     async _firestore_init(){
       await axios(_URLS.backend_firestore_init)
        .then(res=>{
          console.log("FIREBASE: Backend firebase app init success");            
          //console.log(res.data);
        })
        .catch(err=>{
          console.log("FIREBASE: Backend firebase app init failure "+err);
        });
      }

     async _app_init_auth_state_inti(){
      if(this._get_firebase().auth()!==null){
      return(await this._get_firebase().auth().onAuthStateChanged((user) => {
        if (user) {
          if(cookies.get('accessToken')===null||cookies.get('accessToken')===undefined){
            this._firebaseGoogleSignOutInit();
            return null;
          }
          console.log("FIREBASE: User exist already");
          Router.pathname!=='/src/land'||Router.pathname!=='/src/signup'?Router.push(_URLS.land):null;
          return true;
        } else {
          console.log("FIREBASE: No user exist already");
          cookies.remove('accessToken',{ path: '/' });
          return false;
        }
      }));}
      else{
        return null;
      }  
     }

     

     async _init_user_check(succ,fail){ 
      console.log("FIREBASE: Init user check");
      if(cookies.get('accessToken')==null||cookies.get('accessToken')==undefined){
        fail!=null?Router.push(fail):null;
        return false;
      }
      else{
        succ!=null?Router.push(succ):null;
        return true;
      }
      return null;
    }


     async _firebaseGoogleSignOutInit(){
      firebase.auth().signOut().then(() => {
          console.log("FIREBASE: Sign out success");
          cookies.remove('accessToken',{ path: '/' });
          Router.push('/')
      }).catch((error) => {
          Router.push('/')
        console.log("FIREBASE: Sign out failure");
      });
     }

     async _get_current_user(){
      if(firebase!==null && firebase.auth()!==null){ 
        return (firebase.auth().currentUser);
      }
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
              console.log("FIREBASE: Email user signin success"); 
              cookies.set('accessToken',result.user.uid, { path: '/' });
              Router.push(_URLS.land);  
              res = {err:false};
              return res; 
        }).catch((error) => {
          let errorCode = error.code;
          console.log("FIREBASE: Email user signin failure "+error); 
          res = {err:true,errCode:errorCode};
          return res;
        }));
      }
     async __firebaseGoogleSignInInit(){     
      let res  ={err:null,errCode:null};
         return(await firebase.auth().signInWithPopup(FIREBASE_PROVIDER).then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            console.log("FIREBASE: Google user signin success"); 
            cookies.set('accessToken',result.user.uid, { path: '/' });
            this._set_current_user();
            Router.push(_URLS.land);
            res = {err:false};
            return res;
          }).catch((error) => {
            let errorCode = error.code;
            console.log("FIREBASE: Google user signin failure "+error); 
            res = {err:true,errCode:errorCode};
            return res;
          }));
     }
      
}