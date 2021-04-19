import LoginAct from './src/login';
import SignUpAct from './src/signup';
import firebaseHelper from '../util/firebase_helper';
import UserClass from '../util/User';
import React from 'react';
import Link from 'next/link'
import Router from "next/router";
import axios from 'axios';
import LoaderHelper from './src/loader_helper';


var User = new UserClass();
const firebaseHelp = new firebaseHelper(User);
firebaseHelp._init_firebase_app();
firebaseHelp._app_init_auth_state_inti();
export default class Home extends React.Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    firebaseHelp._init_user_check(process.env.NEXT_PUBLIC_HOST+'src/land',process.env.NEXT_PUBLIC_HOST+'src/login');
  }

  render(){
    return (
      <div>
        <LoaderHelper/>
      </div>
    );
  }
}
