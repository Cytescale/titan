import LoginAct from './src/login';
import SignUpAct from './src/signup';
import firebaseHelper from '../util/firebase_helper';
import UserClass from '../util/User';
import React from 'react';

var User = new UserClass();
const firebaseHelp = new firebaseHelper(User);
export default class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isLoggedFlag:false
    };
    this._set_logged_flag = this._set_logged_flag.bind(this);
  }
  
  async _init_user_check(){
    console.log("INIT USER LOGED CHECK");
    await firebaseHelp._get_firebase().auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("AUTH CHANGE CALL yes exist sign in | USER TOKEN "+user.uid);
        firebaseHelp._set_current_user();
        this._set_logged_flag(true);
        return true;
      } else {
        console.log("AUTH CHANGE CALL no exist sign in | USER TOKEN "+user);
        this._set_logged_flag(false);
        return false;
      }
    }); 
  }
  componentDidUpdate(){
   // this._init_user_check();
  }

  componentWillMount(){
    this._init_user_check();
  }

  _set_logged_flag(bool){
    console.log("LOGIIN BOOL CHANGE "+ bool);
    bool!=null?this.setState({isLoggedFlag:bool}):console.log("Wrong flag");
  }

  render(){
    return (
        this.state.isLoggedFlag!=true?
        <LoginAct 
        firebaseHelp={firebaseHelp} 
        User={User} 
        setlogFlag={this._set_logged_flag}/>
        :
        <div>
          LOGGED IN 
          <button onClick={firebaseHelp._firebaseGoogleSignOutInit}>Sign Out</button>
        </div>
    );
  }
}
