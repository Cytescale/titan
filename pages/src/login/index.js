"use strict"
import React from 'react';
import firebaseHelper from '../../../util/firebase_helper';
import UserClass from '../../../util/User';
import FooterClass from '../utils/footer';

var User = new UserClass();
const firebaseHelp = new firebaseHelper(User);

export default class LoginAct extends React.Component{
     constructor(props){
          super(props);  
          this.state = {loading:false,errCode:0,errMess:null,eml:undefined,pass:undefined};
          this._loginActGoogleSignIn = this._loginActGoogleSignIn.bind(this);
          this.handleEmailFormSubmit = this.handleEmailFormSubmit.bind(this);
          this.handleEmlChange = this.handleEmlChange.bind(this);
          this.handlePassChange = this.handlePassChange.bind(this);
          this._set_err = this._set_err.bind(this);
          this._set_load_bool = this._set_load_bool.bind(this);
          
     }

     _set_err(code,mess){this.setState({errCode:code,errMess:mess});}
     _set_load_bool(bool){this.setState({loading:bool});}
     componentDidMount(){firebaseHelp._init_user_check(process.env.NEXT_PUBLIC_HOST+'src/land',null);}
     handleEmlChange(event) {this.setState({eml: event.target.value});}
     handlePassChange(event) {this.setState({pass: event.target.value});}

     handleEmailFormSubmit(event){
          event.preventDefault();
          this._set_load_bool(true);
          if(this.state.eml!==''&&this.state.pass!==''){
               if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.eml)){
                    this._loginActEmailSignIn();
               }
               else{
                    this._set_err(2,"Enter valid email address");
                    this._set_load_bool(false);
               }
          }
          else{
               this._set_err(1,"Enter all details");
               this._set_load_bool(false);
          }
     }

     async _loginActEmailSignIn(){
          await firebaseHelp._firebaseEmailSignInInit(this.state.eml,this.state.pass).then(res=>{
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
                              this._set_err(1,"Error occured");
                              break;
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
     <React.StrictMode>
       <div className='login_act_main_body'>
                    <div className='app_ver_cont'>Version: {process.env.DEV_VERSION}</div>
                    <title>Titan login</title>     
                    <div className='login_act_main_head_body'><div className='land_act_head_tit_cont_logo'/></div>
                    <div className='login_act_main_cont'>
                    <div className='login_act_tit_main_cont'>
                              <div className='login_act_main_cont_bg_txt'>Plain<br/>And<br/>Easy<br/>For<br/>All</div>
                              <div className='login_act_tit'>
                                   <span className='login_act_sub_tit'>Login to,</span><br/>
                                   Project  Titan
                                   <div className='login_act_tit_deco'>
                                        <div className='login_act_tit_deco_cir'></div>
                                        <div className='login_act_tit_deco_bar'></div>
                                        <div className='login_act_tit_deco_cir'></div>
                                   </div>
                              </div>

                    </div> 
                    <div className='login_act_main_form_body'>
                              <div className='login_act_main_form_body_sub'>
                                   <div className='login_act_ext'>
                                        <div className='login_act_ext_cir'></div>
                                        </div>
                                   <div className='login_act_sub_form_body'>
                                   <div className='login_act_tit_cont'>Already a family member?</div>
                                   <form onSubmit={this.handleEmailFormSubmit}>
                                   <div><input type='text' disabled={this.state.loading} placeholder='Email' value={this.state.eml} autoComplete='username'  onChange={this.handleEmlChange}  className='login_act_main_unm_txt'/></div>
                                   {this.state.errCode==2?<div className='login_act_err_cont'>{this.state.errMess}</div>:<span/>}
                                   <div><input type='password' disabled={this.state.loading} placeholder='Password'  autoComplete='current-password' value={this.state.pass} onChange={this.handlePassChange} className='login_act_main_unm_txt'/></div>
                                   {this.state.errCode==1?<div className='login_act_err_cont'>{this.state.errMess}</div>:<span/>}
                                   <div><a className='login_act_for_lnk' href='#'>Forgot password?</a></div>
                                   <div><input type='submit' value={this.state.loading===true?'Loading':'Login'} disabled={this.state.loading} className='login_act_main_sub_butt' ></input></div>
                                   </form>
                                   <div className='login_act_or_txt'>or</div>
                                   <div><button className='login_act_gog_butt' onClick={this._loginActGoogleSignIn}>     
                                   <svg className='login_act_gog_butt_ico' viewBox='0 0 512 512'><title>Logo Google</title><path d='M473.16 221.48l-2.26-9.59H262.46v88.22H387c-12.93 61.4-72.93 93.72-121.94 93.72-35.66 0-73.25-15-98.13-39.11a140.08 140.08 0 01-41.8-98.88c0-37.16 16.7-74.33 41-98.78s61-38.13 97.49-38.13c41.79 0 71.74 22.19 82.94 32.31l62.69-62.36C390.86 72.72 340.34 32 261.6 32c-60.75 0-119 23.27-161.58 65.71C58 139.5 36.25 199.93 36.25 256s20.58 113.48 61.3 155.6c43.51 44.92 105.13 68.4 168.58 68.4 57.73 0 112.45-22.62 151.45-63.66 38.34-40.4 58.17-96.3 58.17-154.9 0-24.67-2.48-39.32-2.59-39.96z' fill='currentColor'/></svg>
                                   Sign in with Google</button></div>
                                   
                                   </div>
                                   <div className='login_act_sgnup_cont'>
                                        <a href='/src/signup' className='login_act_sgnup_cont_lnk'>Create account now</a>
                                   </div>
                              
                              </div>
                    </div>
                    </div>
                    <FooterClass/>

       </div>   
       </React.StrictMode>
     );
     }
}