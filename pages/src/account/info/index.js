import React, { useState,useEffect  } from 'react';
import firebaseHelper from '../../../../util/firebase_helper';
import UserClass from '../../../../util/User';
var User = new UserClass();
const firebaseHelp = new firebaseHelper(User);
export default class AccountInfoAct extends React.Component{
     constructor(props){
          super(props);
     }
     render(){
          return(
               <div className='info_act_main_body'>
                    <title>Titan</title>
                    <div className='info_form_main_body'>
                              <div className='info_form_main_body_tit'>Tell us about yourself</div>
                              <form>
                                   
                                   <div><input type='submit' value='Save' className='info_main_form_fld_sub_class'></input></div>
                              </form>
                    </div>
               </div>
          )
     }

}