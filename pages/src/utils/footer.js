import React from 'react';
export default class FooterClass extends React.Component{
     constructor(props){
          super(props);
     }
     render(){
          return(
                    <div className='login_act_foot_main_cont'> 
                              <div className='login_act_foot_sys_cont'>All systems nominal <div  className='login_act_foot_sys_indi'></div></div>
                              <div className='login_act_foot_ver_cont'>Version: {process.env.DEV_VERSION}.Alpha</div>    
                              <div className='login_act_foot_ver_cont'>Made with ❤️</div>    
                    </div>    
          );
     }
}