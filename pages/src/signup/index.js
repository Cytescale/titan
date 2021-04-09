import React, { useState,useEffect  } from 'react';
import firebaseHelper from '../../../util/firebase_helper';
import UserClass from '../../../util/User';


var User = new UserClass();
const firebaseHelp = new firebaseHelper(User);
export default class SignUpAct extends React.Component{
     constructor(props){
          super(props);
          
     }
     componentDidMount(){
          firebaseHelp._init_user_check(process.env.NEXT_PUBLIC_HOST+'src/land',null);
     }
     render(){
          return(
          <div className='login_act_main_body'>
                         <title>Sign Up</title>
                         {/* <div className='login_act_main_head_body'>Titan</div> */}
                         <div className='login_act_main_form_body'>
                              <form>
                                   <div className='login_act_tit_cont'>Sign Up to Titan</div>
                                   <div><input type='text' placeholder='Email' className='login_act_main_unm_txt'/></div>
                                   <div><input type='password' placeholder='Password' className='login_act_main_pass_txt'/></div>
                                   <div><input type='submit' value='Create Account' className='login_act_main_sub_butt' ></input></div>
                                   <div className='login_act_or_txt'>or</div>
                                   <div><button className='login_act_gog_butt'>Sign-up with Google</button></div>
                                   <div className='login_act_sgnup_cont'>
                                        <a href='/src/login' className='login_act_sgnup_cont_lnk'>Have an account?</a>
                                   </div>
                              </form>
                              
                         </div>
          </div>   
          );
     }
}