import React, { useState,useEffect  } from 'react';
import Router from "next/router";
import firebaseHelper from '../../../util/firebase_helper';

import UserClass from '../../../util/User';
var User = new UserClass();
const firebaseHelp = new firebaseHelper(User);
export default class LandAct extends React.Component{
     constructor(props){
          super(props);            
     }
     componentDidMount(){
          firebaseHelp._init_user_check(null,process.env.NEXT_PUBLIC_HOST+'src/login');

     }
     render(){
     return(
          <div>
          <div className='app_ver_cont'>Version: {process.env.DEV_VERSION}</div>
          LOGGED IN 
          <button onClick={firebaseHelp._firebaseGoogleSignOutInit}>Sign Out</button>
        </div>
     );
}
}