import LoginAct from './src/login';
import SignUpAct from './src/signup';
import firebaseHelper from '../util/firebase_helper';
import UserClass from '../util/User';
import React from 'react';
import Link from 'next/link'
import Router from "next/router";


var User = new UserClass();
const firebaseHelp = new firebaseHelper(User);
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
        loading..
      </div>
    );
  }
}
