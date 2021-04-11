import React, { useState,useEffect  } from 'react';
import Router from "next/router";
import firebaseHelper from '../../../util/firebase_helper';
import { Button,Dropdown,Modal,OverlayTrigger,Popover } from 'react-bootstrap';
import LoaderHelper from '../loader_helper';
import Slider from 'react-rangeslider'

import Cookies from 'universal-cookie';
const cookies = new Cookies();


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

var STLYE_ELEMENT_TEXT ={
     margin:0,
     padding:10,
     border_radius:0,
     back_color:'',
     text_color:'#000',
     font_size:17,
     
}

class _Element_Text{
     constructor(text,in_style){
          this.element_id =_ELEMENT_CORE_ARRAY.length,
          this.data = text!==null?text:"Lorem Ipsum";
          this.style = Object.assign({},STLYE_ELEMENT_TEXT,in_style);
         
     }
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
     _popover_txt_overlay(element_id){
     return(
     <Popover id="popover-basic" className='popover_txt_class'>
     <div className='ele_pop_main_bdy'>
               <div className='pop_txt_head_main_cont'>
                         <div className='pop_txt_head_txt'>Text</div>
                         <div className='pop_txt_head_rght_cont'>
                                 
                         </div>
               </div>
               <div className='ele_pop_bdy'>
                    <div className='ele_pop_bdy_txt'>Value</div>
                    <input 
                    type='text'
                     placeholder='Text Value' 
                     className='ele_txt_pop_cont' 
                    value={_ELEMENT_CORE_ARRAY[element_id].data}
                    onChange={(e)=>{
                         _ELEMENT_CORE_ARRAY[element_id].data = e.target.value;
                         this.forceUpdate();
                    }} />
                         <div className='ele_pop_bdy_txt'>Font Size</div>
                         <Slider
                         orientation="horizontal"
                         value={_ELEMENT_CORE_ARRAY[element_id].style.font_size}
                         onChange={(val) =>{
                              _ELEMENT_CORE_ARRAY[element_id].style.font_size=val;
                              this.forceUpdate();
                         }}
                   
                         />

                         <div className='ele_pop_bdy_txt'>Background Color</div>
                         <input 
                              type='text'
                              placeholder='Color value' 
                              className='ele_txt_pop_cont' 
                              value={_ELEMENT_CORE_ARRAY[element_id].style.back_color}
                              onChange={(e)=>{
                                   _ELEMENT_CORE_ARRAY[element_id].style.back_color = e.target.value;
                                   this.forceUpdate();
                              }} />

                                   {/* <Button className='pop_txt_head_rght_del_butt' variant={"outline-danger"}
                                   onClick={()=>{
                     
                                   }}
                                   >delete</Button> */}
               </div>
     </div>
     </Popover>)     
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
          _ELEMENT_CORE_ARRAY.push(new _Element_Text("TEXT"));
          console.log("ELEMENT | ELEMENT TEXT ADDED | SIZE "+_ELEMENT_CORE_ARRAY.length);
          this._set_element_count(_ELEMENT_CORE_ARRAY.length);
          this._set_elem_mod(false);
     }

     _render_component(){
          let res = [];
          console.log("RENDERED");
          _ELEMENT_CORE_ARRAY.map(
               (element,index)=>{
                         console.log(element);
                         res.push(
                              <OverlayTrigger trigger="click" placement="bottom" rootClose={true} overlay={this._popover_txt_overlay(element.element_id)}>
                              <div className="_page_element_main_bdy">
                                   <div 
                                   style={
                                        {
                                             margin:element.style.margin+"px",
                                             padding:element.style.padding+"px",
                                             fontSize:element.style.font_size+"px",
                                             backgroundColor:element.style.back_color,
                                        }
                                   }
                                   className='_page_element_text_class'
                                   >{element.data}
                                   </div>
                                   <div className="_page_element_overlay" ></div>
                              </div>
                              </OverlayTrigger>
                         )
               }
          );
          return res;
     }

     componentDidUpdate(){
          cookies.set('pageData',_ELEMENT_CORE_ARRAY, { path: '/' });

     }

     componentDidMount(){
          let exstPageData = cookies.get('pageData');
          if(exstPageData!==null&&exstPageData!==undefined){
               console.log("PAGE DATA EXIST");     
               _ELEMENT_CORE_ARRAY = exstPageData;
          }
          
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