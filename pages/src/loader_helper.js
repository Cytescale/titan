import React, { useState,useEffect  } from 'react';
import Image from 'next/image'
import {ProgressBar} from 'react-bootstrap';

// const anims={
//      walk:'https://icons8.com/preloaders/preloaders/1474/Walk.gif',
//      plant:'https://icons8.com/preloaders/preloaders/1477/Plant.gif',
//      ghost:'https://icons8.com/preloaders/preloaders/1479/Ghost.gif',
//      skate:'https://icons8.com/preloaders/preloaders/1475/Skateboarding.gif',     
// }
// const anim_arr = [[anims.walk,"Hold on..."],[anims.plant,"So natural"],[anims.ghost,"BoOoooOo"],[anims.skate,"We are rushing"]]
export default class LoaderHelper extends React.Component{
     constructor(props){
          super(props);    
          this.state = {
               cho:1
          }
          this._loader_randomise = this._loader_randomise.bind(this);
     }
     
     componentWillMount(){
          this._loader_randomise();
     }

     _loader_randomise(){
          let val = Math.floor(Math.random() * 4);
          this.setState({cho:val}); 
     }
     render(){
          return(
               <div className='loader_main_cont'>
                    <div  className='loader_cont'>
                    {/* <Image src={anim_arr[this.state.cho][0]} className='loader_main_cont_img' width="62" height="62"></Image> */}
                    {/* <div className='loader_main_cont_txt'>{anim_arr[this.state.cho][1]}</div> */}
                    <div  className='loader_cont_prog_cont'>
                    <ProgressBar className='loader_cont_prog' now={this.props.prog} />
                    </div>
                    <div className='loader_main_cont_txt'>Just a sec..</div>
                    </div>
               </div>
          );
     }
}