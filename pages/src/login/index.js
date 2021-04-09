import React, { useState,useEffect  } from 'react';



export default class LoginAct extends React.Component{
     constructor(props){
          super(props);          
          this._loginActGoogleSignIn = this._loginActGoogleSignIn.bind(this);
     }
     _loginActGoogleSignIn(){
          this.props.firebaseHelp.__firebaseGoogleSignInInit().then((res)=>{
               this.props.setlogFlag(res);
          });
     }

     render(){
     return(
       <div className='login_act_main_body'>
                    <title>Login</title>
                    <div className='login_act_main_head_body'>
                              Titan
                              
                    </div>
                    <div className='login_act_main_form_body'>
                         <form>
                              <div><input type='text' placeholder='Email' className='login_act_main_unm_txt'/></div>
                              <div><input type='password' placeholder='Password' className='login_act_main_pass_txt'/></div>
                              <div><a className='login_act_for_lnk' href='#'>Forgot password?</a></div>
                              <div><input type='submit' value='Login' className='login_act_main_sub_butt' ></input></div>
                              </form>
                              <div className='login_act_or_txt'>or</div>
                              <div><button className='login_act_gog_butt' onClick={this._loginActGoogleSignIn}>Sign-in with Google</button></div>
                              <div className='login_act_sgnup_cont'>
                                   <a href='#' className='login_act_sgnup_cont_lnk'>Create Account</a>
                              </div>
                         
                         
                    </div>
       </div>   
     );
     }
}