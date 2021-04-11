import React, { useState,useEffect  } from 'react';
import Router from "next/router";
import firebaseHelper from '../../../util/firebase_helper';
import { Button,Dropdown,Modal } from 'react-bootstrap';
import LoaderHelper from '../loader_helper';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

let STLYE_ELEMENT_TEXT ={
     margin:0,
     padding:0,
     border_radius:0,
     back_color:'red',
     text_color:'#000',
}


const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
     <a
       href=""
       ref={ref}
       onClick={(e) => {
         e.preventDefault();
         onClick(e);
       }}
     >
       {children}
     </a>
   ));


var _ELEMENT_CORE_ARRAY = [];




function _Element_Text_Func(text,in_style){
     
     let element_prop_data = {
          element_id:0,
          text : "Lorem Impsum",
          style:Object.assign({},STLYE_ELEMENT_TEXT,in_style)
     }
     return(
          <div className="_page_element_main_bdy">
               <div 
               
               className='_page_element_text_class'
               >{text}
               </div>
               <div className="_page_element_overlay"></div>
          </div>
     )
}


import UserClass from '../../../util/User';
var User = new UserClass();
const firebaseHelp = new firebaseHelper(User);
export default class LandAct extends React.Component{
     constructor(props){
          super(props);            
          this.state={
               loading:false,
               dname:"Not done..",
               element_count:0,
               _add_elem_mod_show:false,
          }
          this._set_elem_mod = this._set_elem_mod.bind(this);
          this._set_dname = this._set_dname.bind(this);
          this._add_element_count = this._add_element_count.bind(this);
          this._set_element_count = this._set_element_count.bind(this);
          this._add_text_element = this._add_text_element.bind(this);
     }

     _set_element_count(int){
          this.setState({element_count:int});
     }

     _add_element_count(){
          this.setState({element_count:this.state.element_count++});
     }
     _set_elem_mod(bool){
          this.setState({_add_elem_mod_show:bool})
     }
     
     _set_dname(val){
          this.setState({dname:val});
     }

     _element_add_modal() {
          return (
            <Modal
               show={this.state._add_elem_mod_show}
               onHide={()=>{this._set_elem_mod(false)}}
               size="sm"
               aria-labelledby="contained-modal-title-vcenter"
               backdropClassName="backdrop"
              centered
               >
              <Modal.Header closeButton>
                
              </Modal.Header>
              <Modal.Body>
                <div className='land_act_elem_add_cont'>
                     <Button variant={'light'} className='land_act_elem_add_butt' onClick={this._add_text_element}>Text</Button> 
                </div>
                <div className='land_act_elem_add_cont'>
                <Button variant={'light'} className='land_act_elem_add_butt'>Audio player</Button>
                </div>
                <div className='land_act_elem_add_cont'>
                    <Button variant={'light'} className='land_act_elem_add_butt'>Video Player</Button>
               </div>
              </Modal.Body>
            </Modal>
          );
        }
     
        
     _add_text_element(){
          _ELEMENT_CORE_ARRAY.push(new _Element_Text_Func("TEXT"));
          console.log("ELEMENT | ELEMENT TEXT ADDED | SIZE "+_ELEMENT_CORE_ARRAY.length);
          this._set_element_count(_ELEMENT_CORE_ARRAY.length);
          this._set_elem_mod(false);
     }

     _render_component(){
          let res = [];
          console.log("RENDERED");
          console.log(_ELEMENT_CORE_ARRAY)
          _ELEMENT_CORE_ARRAY.map(
               element=>{
                    res.push(element);
               }
          );
          return res;
     }

     componentDidMount(){
          firebaseHelp._init_user_check(null,process.env.APP_NAME+'src/login');

     }
     render(){
     return(
          this.state.loading===true?
          <LoaderHelper/>:
          <div>
               <title>{process.env.APP_NAME}</title>
               
               <div className='land_act_head_main_cont'>
                    {this._element_add_modal()}
                    <div className='land_act_head_tit_cont'>{process.env.APP_NAME}.Aplha</div>  
                    <div className='land_act_head_cent_main_cont'>
                              <div className='land_act_head_cent_link_cont'><a href='#' className='land_act_head_cent_link_selec'>Editor</a></div>
                              <div className='land_act_head_cent_link_cont'><a href='#' className='land_act_head_cent_link'>Analytics</a></div>
                              <div className='land_act_head_cent_link_cont'><a href='#' className='land_act_head_cent_link'>Preview</a></div>
                    </div>
                    <div className='land_act_head_rght_main_cont'>
                              <div className='land_act_head_rght_feed_butt_cont'>
                                   <Button variant={'outline-light'}>Feedback</Button>
                              </div>
                              <div className='land_act_head_rght_feed_butt_cont'>
                              <Dropdown>
                              <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                   <img src='http://simpleicon.com/wp-content/uploads/account.png' className='land_act_head_rght_acc_img'></img>                                   
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                              <div className='land_act_head_nam_txt'>{this.state.dname}</div>
                              <Dropdown.Item as="button" onClick={firebaseHelp._firebaseGoogleSignOutInit}>Sign Out</Dropdown.Item>
                              </Dropdown.Menu>
                              </Dropdown>
                              </div>
                    </div>
               </div>     

               
               <div className='land_act_creat_main_cont'>
                    {/* <PageAdapter element_count={this.state.element_count}/>     */}
                    {this._render_component()}
               </div>
               <div className='land_act_creat_butt_main_cont'>
                    <Button variant={"primary"} onClick={()=>{this._set_elem_mod(true)}}className='land_act_creat_butt'>Add Element +</Button>
               </div>

          <div className='app_ver_cont'>Version: {process.env.DEV_VERSION}</div>
        </div>
     );
}
}