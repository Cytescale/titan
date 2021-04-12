import React, { useState,useEffect  } from 'react';
import Router from "next/router";
import firebaseHelper from '../../../util/firebase_helper';
import { Button,Dropdown,Modal,OverlayTrigger,Popover } from 'react-bootstrap';
import LoaderHelper from '../loader_helper';
import Slider from 'react-rangeslider'
import Embed from 'react-embed';
import $ from 'jquery';


import elementRender from '../../../util/element_render';

import Cookies from 'universal-cookie';
const cookies  = new Cookies();


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
     padding:5,
     border_radius:12,
     back_color:'',
     text_color:'#000',
     font_size:17,
     
     
}

class _Element_Video_Youtube{
     constructor(in_style){
          this.enabled = true;
          this.element_type_id = 4;
          this.element_id =_ELEMENT_CORE_ARRAY.length,
          this.data ='';
          this.style = Object.assign({},STLYE_ELEMENT_TEXT,in_style);
     }
    
     _set_text_font_size(int){
          if(int>=10){
               this.style.font_size = int
          }else{
               this.style.font_size = 11
          }
     }
}

class _Element_Text{
     constructor(text,in_style){
          this.enabled = true;
          this.element_type_id = 0;
          this.element_id =_ELEMENT_CORE_ARRAY.length,
          this.data = text!==null?text:"Lorem Ipsum";
          this.style = Object.assign({},STLYE_ELEMENT_TEXT,in_style);
     }
     
     _set_text_data(val){
          if(val.length>0){
               this.data = val
          }else{
               this.data = "Lorem Ipsum"
          }
     }
     _set_text_font_size(int){
          if(int>=10){
               this.style.font_size = int
          }else{
               this.style.font_size = 11
          }
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
               _txt_pop_shw:false,
          }
          this._set_txt_pop_show = this._set_txt_pop_show.bind(this);
          this._set_elem_mod = this._set_elem_mod.bind(this);
          this._set_dname = this._set_dname.bind(this);
          this._add_element_count = this._add_element_count.bind(this);
          this._set_element_count = this._set_element_count.bind(this);
          this._add_text_element = this._add_text_element.bind(this);
          this._add_video_ytube_element = this._add_video_ytube_element.bind(this);
          this._get_popover = this._get_popover.bind(this);
     }
     _set_txt_pop_show(bool){
          this.setState({_txt_pop_shw:bool});
     }
     _popover_txt_overlay(element_id){
     if(_ELEMENT_CORE_ARRAY[element_id]!==undefined&&_ELEMENT_CORE_ARRAY[element_id]!==null){
          return(          
               <Popover id="popover-basic" className='popover_txt_class'>
               <div className='ele_pop_main_bdy'>
                         <div className='pop_txt_head_main_cont'>
                                   <div className='pop_txt_head_txt'>Text</div>
                                   <div className='pop_txt_head_rght_cont'>
                                   
                                   <input type="checkbox" checked={_ELEMENT_CORE_ARRAY[element_id].enabled} id="switch" onChange={(e)=>{    
                                        _ELEMENT_CORE_ARRAY[element_id].enabled = !(_ELEMENT_CORE_ARRAY[element_id].enabled)
                                        this.forceUpdate();
                                   }} />
                                   <label for="switch">Toggle</label>
                                   
                                   </div>
                         </div>
                         <div className='ele_pop_bdy'>
                              <div className='ele_pop_bdy_txt'>Value</div>
                              <textarea  
                                   wrap="hard"
                               placeholder='Text Value' 
                               className='ele_txt_pop_cont' 
                              value={_ELEMENT_CORE_ARRAY[element_id].data!==undefined?_ELEMENT_CORE_ARRAY[element_id].data:"undefined"}
                              onChange={(e)=>{
                                   _ELEMENT_CORE_ARRAY[element_id]._set_text_data(e.target.value);
                                   this.forceUpdate();
                              }} />
                                   <div className='ele_pop_bdy_txt'>Font Size</div>
                                   
                                   <Slider
                                   orientation="horizontal"
                                   value={_ELEMENT_CORE_ARRAY[element_id].style.font_size}
                                   onChange={(val) =>{
                                        _ELEMENT_CORE_ARRAY[element_id]._set_text_font_size(val);
                                        this.forceUpdate();
                                   }}
                                   />
                                   <div className='ele_pop_bdy_txt'>Background Color</div>
                                   <input 
                                        type='text'
                                        placeholder='Color value' 
                                        className='ele_txt_pop_cont_color' 
                                        value={_ELEMENT_CORE_ARRAY[element_id].style.back_color}
                                        onChange={(e)=>{
                                             _ELEMENT_CORE_ARRAY[element_id].style.back_color = e.target.value;
                                             this.forceUpdate();
                                        }} />

                                   <Button onClick={()=>{
                                        console.log($('#popover-basic'));
                                   }}>
                                        hide
                                   </Button>
                         </div>
               </div>
               </Popover>)     
     }
     }
     _popover_vid_ytube_overlay(element_id){
          return(
          <Popover id="popover-basic" className='popover_txt_class'>
          <div className='ele_pop_main_bdy'>
                    <div className='pop_txt_head_main_cont'>
                              <div className='pop_txt_head_txt'>Video player</div>
                              <div className='pop_txt_head_rght_cont'>
                              <input type="checkbox" checked={_ELEMENT_CORE_ARRAY[element_id].enabled} id="switch" onChange={(e)=>{    
                                        _ELEMENT_CORE_ARRAY[element_id].enabled = !(_ELEMENT_CORE_ARRAY[element_id].enabled)
                                        this.forceUpdate();
                                   }} />
                                   <label for="switch">Toggle</label>
                              </div>
                    </div>
                    <div className='ele_pop_bdy'>
                         <div className='ele_pop_bdy_txt'>Embeded Link</div>
                         <input 
                              type='url'
                          placeholder='Enter embeded url value' 
                          className='ele_txt_pop_cont_color' 
                         value={_ELEMENT_CORE_ARRAY[element_id].data}
                         onChange={(e)=>{
                              _ELEMENT_CORE_ARRAY[element_id].data = e.target.value;
                              this.forceUpdate();
                         }} />
                              
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
                <Button variant={'light'} className='land_act_elem_add_butt'>Link</Button>
                </div>
                <div className='land_act_elem_add_cont'>
                    <Button variant={'light'} className='land_act_elem_add_butt'  onClick={this._add_video_ytube_element}>Video Player</Button>
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
     _add_video_ytube_element(){
          _ELEMENT_CORE_ARRAY.push(new _Element_Video_Youtube());
          console.log("ELEMENT | ELEMENT VIDEO YTUBE ADDED | SIZE "+_ELEMENT_CORE_ARRAY.length);
          this._set_element_count(_ELEMENT_CORE_ARRAY.length);
          this._set_elem_mod(false);
     }

    _get_popover(element_type_id,ele_id){
     switch(element_type_id){
          case 0:{return(this._popover_txt_overlay(ele_id))}
          case 4:{return(this._popover_vid_ytube_overlay(ele_id))}
          default:{break}
          }
    }

     _render_component(){
          let res = [];
          res.push(new elementRender()._render_profile_element());
          _ELEMENT_CORE_ARRAY.map(
               (element,index)=>{
                         res.push(new elementRender(element,this._get_popover(element.element_type_id,element.element_id))._render_element_overlay());
               }
          );
          res.push(new elementRender()._render_foot_element());
          return res;
     }

     componentDidUpdate(){

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

               <div className='land_act_main_bdy_cont'>
                    <div className='land_act_creat_main_cont'>
                         <div className='land_act_creat_sub_cont'>
                              {this._render_component()}
                         </div>
                    </div>
                    <div className='land_act_prv_main_cont'>
                         <div className='land_act_prv_sub_cont'>
                              <div className='land_act_prv_add_bar_cont'>
                                        <div className='land_act_prv_add_bar'>
                                             https://titan.com/page/56197
                                        </div>
                                        <Button variant={"light"} className='land_act_prv_add_bar_rel_butt'>Reload</Button>
                              </div>
                              <div className='land_act_prv_base_cont'>
                              {/* <iframe   className='land_act_prv_base'></iframe> */}
                              </div>
                         </div>
                    </div>
               </div>
               <div className='land_act_creat_butt_main_cont'>
                    <Button variant={"primary"} onClick={()=>{this._set_elem_mod(true)}}className='land_act_creat_butt'>Add Element +</Button>
               </div>

          <div className='app_ver_cont'>Version: {process.env.DEV_VERSION}</div>
        </div>
     );
}
}