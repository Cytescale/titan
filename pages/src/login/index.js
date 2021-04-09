import React, { useState,useEffect  } from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Router from "next/router";
import firebaseHelper from '../../../util/firebase_helper';
import UserClass from '../../../util/User';


var User = new UserClass();
const firebaseHelp = new firebaseHelper(User);
export default class LoginAct extends React.Component{
     constructor(props){
          super(props);  
          this._loginActGoogleSignIn = this._loginActGoogleSignIn.bind(this);
          NotificationManager.info('Info message');
     }

     com(){
          firebaseHelp._init_user_check(process.env.NEXT_PUBLIC_HOST+'src/land',null);
     }

     _loginActGoogleSignIn(){
          firebaseHelp.__firebaseGoogleSignInInit();
     }

     render(){
     return(
       <div className='login_act_main_body'>
                    <div className='app_ver_cont'>Version: {process.env.DEV_VERSION}</div>
                    <title>Login</title>
                    
                    <div className='login_act_main_form_body'>
                         <div className='login_act_tit_cont'>Login to Titan</div>
                         <form>
                              <div><input type='text' placeholder='Email' className='login_act_main_unm_txt'/></div>
                              <div><input type='password' placeholder='Password' className='login_act_main_pass_txt'/></div>
                              <div><a className='login_act_for_lnk' href='#'>Forgot password?</a></div>
                              <div><input type='submit' value='Login' className='login_act_main_sub_butt' ></input></div>
                              </form>
                              <div className='login_act_or_txt'>or</div>
                              <div><button className='login_act_gog_butt' onClick={this._loginActGoogleSignIn}>Sign-in with Google</button></div>
                              <div className='login_act_sgnup_cont'>
                                   <a href='/src/signup' className='login_act_sgnup_cont_lnk'>Create Account</a>
                              </div>
                         
                         
                    </div>
                    <NotificationContainer/>

       </div>   
     );
     }
}