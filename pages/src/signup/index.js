import React, { useState,useEffect  } from 'react';
import firebaseHelper from '../../../util/firebase_helper';
import UserClass from '../../../util/User';


var User = new UserClass();
const firebaseHelp = new firebaseHelper(User);
export default class SignUpAct extends React.Component{
     constructor(props){
          super(props);
          this.state = {loading:false,errCode:0,errMess:null,polChck:false,comname:'',dname:'',eml:'',pass:''};
          this._signActGoogleSignIn = this._signActGoogleSignIn.bind(this);
          this.handleEmailFormSubmit = this.handleEmailFormSubmit.bind(this);
          this.handleEmlChange = this.handleEmlChange.bind(this);
          this.handlePassChange = this.handlePassChange.bind(this);
          this.handleDsnameChange = this.handleDsnameChange.bind(this);
          this.handleCnameChange = this.handleCnameChange.bind(this);
          this.handlePolChckChange = this.handlePolChckChange.bind(this);
          this._set_err = this._set_err.bind(this);
          this._set_load_bool = this._set_load_bool.bind(this);
     }
     componentDidMount(){
          firebaseHelp._init_user_check(process.env.NEXT_PUBLIC_HOST+'src/land',null);
     }
     
     _set_err(code,mess){
          this.setState({errCode:code,errMess:mess});
     }
     _set_load_bool(bool){
          this.setState({loading:bool});
     }
     handleDsnameChange(event) {
          this.setState({dname: event.target.value});
     }
     handleCnameChange(event) {
               this.setState({comname: event.target.value});
     }
     handlePolChckChange(event) {
          this.setState({polChck: event.target.checked});
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
          if(this.state.eml!==''&&this.state.pass!==''&&this.state.dname!==''){
               if(this.state.polChck===true){
                    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.eml)){
                         this._set_err(0);
                         let send_data ={
                              UID:null,
                              login_method:0,
                              eml:this.state.eml,
                              pass:this.state.pass,
                              cname:this.state.comname,
                              dname:this.state.dname,
                         }
                         this._signActEmailCreate(send_data);
                    }
                    else{
                         this._set_err(2,"Enter valid email address");
                         this._set_load_bool(false);
                    }
               }
               else{
                    this._set_load_bool(false);
                    this._set_err(3,"Please check the box to continue");
               }
          }else{
               this._set_err(1,"Enter all details");
               this._set_load_bool(false);
          }
     }
     async _signActEmailCreate(data){
          await firebaseHelp._firebaseEmailCreateInit(data).then(res=>{
               if(res.err===true){
                    switch (res.errCode) {
                         case "auth/email-already-in-use":{
                              this._set_load_bool(false);
                              this._set_err(1,"Email already exists");
                              break;
                         }
                         case "auth/weak-password":{
                              this._set_load_bool(false);
                              this._set_err(1,"Weak password");
                              break;
                         }
                         default:
                              break;
                    }
               }
          });
     }
     _signActGoogleSignIn(){
          firebaseHelp.__firebaseGoogleSignInInit();
     }
     render(){
          return(
          <div className='login_act_main_body'>
                  <div className='app_ver_cont'>Version: {process.env.DEV_VERSION}</div>
                         <title>Sign Up</title>
                         {/* <div className='login_act_main_head_body'>Titan</div> */}
                         <div className='login_act_main_form_body'>
                                   <form onSubmit={this.handleEmailFormSubmit}>
                                   <div className='login_act_tit_cont'>Sign Up to Titan</div>
                                   <div><input type='text' placeholder='Display name*'disabled={this.state.loading}  value={this.state.dname} onChange={this.handleDsnameChange} className='info_main_form_fld_class'></input></div>
                                   <div><input type='text' placeholder='Company name' disabled={this.state.loading}  value={this.state.comname} onChange={this.handleCnameChange} className='info_main_form_fld_class'></input></div>
                                   <div><input type='text' placeholder='Email*' disabled={this.state.loading}  value={this.state.eml} onChange={this.handleEmlChange}   className='login_act_main_unm_txt'/></div>
                                   {this.state.errCode==2?<div className='login_act_err_cont'>{this.state.errMess}</div>:<span/>}
                                   <div><input type='password' disabled={this.state.loading} placeholder='Password*'  value={this.state.pass} onChange={this.handlePassChange} className='login_act_main_pass_txt'/></div>
                                   <div className='sign_act_poli_main_cont'>
                                        <input type='checkbox'  disabled={this.state.loading}  defaultChecked={this.state.polChck} onClick={this.handlePolChckChange} className='sign_act_poli_chck'></input>
                                        <span className='sign_act_poli_txt_cont'>I agree to the terms of service and privacy policy.</span>
                                   </div>
                                   {this.state.errCode==1||3?<div className='login_act_err_cont'>{this.state.errMess}</div>:<span/>}
                                   <div><input type='submit' disabled={this.state.loading} value='Create Account' className='login_act_main_sub_butt' ></input></div>
                                   </form>
                                   <div className='login_act_or_txt'>or</div>
                                   <div><button  disabled={this.state.loading}  className='login_act_gog_butt'onClick={this._signActGoogleSignIn}>Sign-up with Google</button></div>
                                   <div className='login_act_sgnup_cont'>
                                        <a href='/src/login' className='login_act_sgnup_cont_lnk'>Have an account?</a>
                                   </div>
                              
                              
                         </div>
          </div>   
          );
     }
}