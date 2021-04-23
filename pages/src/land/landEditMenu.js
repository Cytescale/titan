import React from "react";



export default class EditMenu extends React.Component{
     constructor(props){
          super(props);
          
     }
     render(){
          
          return(
              <div className='element_edit_overlay_main_cont'>
                   <div className='element_edit_overlay_tit_main_cont'>
                         Menu Title
                   </div>
              </div> 
          );
     }
}