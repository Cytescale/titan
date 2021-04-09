import React, { useState,useEffect  } from 'react';
import Router from "next/router";
import firebaseHelper from '../../../util/firebase_helper';
import UserClass from '../../../util/User';


var User = new UserClass();
const firebaseHelp = new firebaseHelper(User);
export default class LoginAct extends React.Component{

     constructor(props){
          super(props);  
          this.state = {loading:false,errCode:0,errMess:null,eml:'',pass:''};
          this._loginActGoogleSignIn = this._loginActGoogleSignIn.bind(this);
          this.handleEmailFormSubmit = this.handleEmailFormSubmit.bind(this);
          this.handleEmlChange = this.handleEmlChange.bind(this);
          this.handlePassChange = this.handlePassChange.bind(this);
          this._set_err = this._set_err.bind(this);
          this._set_load_bool = this._set_load_bool.bind(this);
     }

     _set_err(code,mess){
          this.setState({errCode:code,errMess:mess});
     }
     _set_load_bool(bool){
          this.setState({loading:bool});
     }

     componentDidMount(){
          firebaseHelp._init_user_check(process.env.NEXT_PUBLIC_HOST+'src/land',null);
     }

     handleEmlChange(event) {
          this.setState({eml: event.target.value});
     }
     handlePassChange(event) {
          this.setState({pass: event.target.value});
     }
     handleEmailFormSubmit(event){
          event.preventDefault();
          this._set_load_bool(true);
          if(this.state.eml!==''&&this.state.pass!==''){
               if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.eml)){this._loginActEmailSignIn();}
               else{
                    this._set_err(2,"Enter valid email address");
                    this._set_load_bool(false);
               }
          }else{
               this._set_err(1,"Enter all details");
               this._set_load_bool(false);
          }
     }

     _loginActEmailSignIn(){
          firebaseHelp._firebaseEmailSignInInit(this.state.eml,this.state.pass).then(res=>{
               if(res.err===true){
                    switch(res.errCode){
                         case "auth/user-not-found":{
                              this._set_err(1,"No such user found");
                              break;
                         }
                         case "auth/wrong-password":{
                              this._set_err(1,"Incorrent password");
                              break;
                         }
                         default:{

                         }
                    }
                    this._set_load_bool(false);
               }
          });
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
                         <form onSubmit={this.handleEmailFormSubmit}>
                              <div><input type='text' disabled={this.state.loading} placeholder='Email' value={this.state.eml} onChange={this.handleEmlChange}  className='login_act_main_unm_txt'/></div>
                              {this.state.errCode==2?<div className='login_act_err_cont'>{this.state.errMess}</div>:<span/>}
                              <div><input type='password' disabled={this.state.loading} placeholder='Password'  value={this.state.pass} onChange={this.handlePassChange} className='login_act_main_pass_txt'/></div>
                              {this.state.errCode==1?<div className='login_act_err_cont'>{this.state.errMess}</div>:<span/>}
                              <div><a className='login_act_for_lnk' href='#'>Forgot password?</a></div>
                              <div><input type='submit' value='Login' disabled={this.state.loading} className='login_act_main_sub_butt' ></input></div>
                              </form>
                              <div className='login_act_or_txt'>or</div>
                              <div><button className='login_act_gog_butt' onClick={this._loginActGoogleSignIn}>Sign-in with Google</button></div>
                              <div className='login_act_sgnup_cont'>
                                   <a href='/src/signup' className='login_act_sgnup_cont_lnk'>Create Account</a>
                              </div>
                         
                         
                    </div>
                  

       </div>   
     );
     }
}