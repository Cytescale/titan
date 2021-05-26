import firebaseHelper from '../util/firebase_helper';
import UserClass from '../util/User';
import React from 'react';
import LoaderHelper from './src/loader_helper';

const firebaseHelp = new firebaseHelper();
firebaseHelp._init_firebase_app();
firebaseHelp._app_init_auth_state_inti();
export default class Home extends React.Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    firebaseHelp._init_user_check(process.env.NEXT_DEV_PUBLIC_HOST+'src/land',process.env.NEXT_DEV_PUBLIC_HOST+'src/login');
  }

  render(){
    return (
      <div>
        <LoaderHelper/>
      </div>
    );
  }
}
