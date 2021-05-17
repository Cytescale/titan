import React, { useState,useEffect  } from 'react';
import {ProgressBar} from 'react-bootstrap';
export default class LoaderHelper extends React.Component{
     constructor(props){
          super(props);    
          this.state = {
      
          }
     }
     componentWillMount(){
          
     }

     render(){
          return(
               <div className='loader_main_cont'>
                    <div  className='loader_cont'>
                    <div className='loader_main_cont_txt'>Just a sec...</div>
                    <div  className='loader_cont_prog_cont'>
                    <ProgressBar className='loader_cont_prog' now={this.props.prog} />
                    </div>
                    </div>
                    
               </div>
          );
     }
}