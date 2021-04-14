import React, { useState,useEffect  } from 'react';
import { renderToString } from 'react-dom/server'
import Router from "next/router";
import firebaseHelper from '../../../util/firebase_helper';
import firestoreHelper from '../../../util/firestore_helper';
import {Alert,Button,Dropdown,Modal,OverlayTrigger,Popover,Tabs,Tab,DropdownButton,ToggleButton,ButtonGroup,ToggleButtonGroup } from 'react-bootstrap';
import LoaderHelper from '../loader_helper';
import Slider from 'react-rangeslider'
import Embed from 'react-embed';
import $ from 'jquery';
import portDriverCode from '../../../util/port_driver_code';
import elementRender from '../../../util/element_render';

import  _, { concat } from 'lodash';
import Cookies from 'universal-cookie';

import { TwitterPicker  } from 'react-color'

const cookies  = new Cookies();
const storeHelper = new firestoreHelper(cookies.get('accessToken'));
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
var _PAGE_ID = null;
var _VIEW_ID = null;
var _PAGE_CODE = '';
var _GEN_CODE ='';
var _PRIVEW_GEN_CODE = '';

var STLYE_ELEMENT_TEXT ={
     margin:0,
     margin_top:0,
     margin_bottom:0,
     padding_right:0,
     padding_left:10,
     padding_top:0,
     padding_bottom:0,
     padding:0,
     border_radius:0,
     border_width:2,
     bordered:false,
     border_color:'#000',
     back_color:'',
     text_color:'#000',
     font_size:17,
     bold:false,
     italic:false,
     underline:false,
     text_align:'start',

}


class notiClass{
     constructor(txt,type,dura){
          this.closed = false;
          this.text = txt;
          this.type = type;
          this.dura = dura;
     }
}


class _Element_Video_Youtube{
   
     constructor(in_style){
          this.deleted = false;
          this.enabled = true;
          this.element_type_id = 4;
          this.element_id =_ELEMENT_CORE_ARRAY.length,
          this.data ='';
          this.style = Object.assign({},STLYE_ELEMENT_TEXT,in_style);
     }
    
}

class _Element_Text{
     constructor(text,in_style){
          this.deleted = false;
          this.enabled = true;
          this.element_type_id = 0;
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
               isUnSaved:false,
               dname:"Not done..",
               element_count:0,
               _add_elem_mod_show:false,
               _txt_pop_shw:false,
          }
          this._set_load_bool = this._set_load_bool.bind(this);
          this._set_txt_pop_show = this._set_txt_pop_show.bind(this);
          this._set_elem_mod = this._set_elem_mod.bind(this);
          this._set_dname = this._set_dname.bind(this);
          this._add_element_count = this._add_element_count.bind(this);
          this._set_element_count = this._set_element_count.bind(this);
          this._add_text_element = this._add_text_element.bind(this);
          this._add_video_ytube_element = this._add_video_ytube_element.bind(this);
          this._get_popover = this._get_popover.bind(this);
          this._get_page_type_render = this._get_page_type_render.bind(this);
          this._set_unsaved_bool = this._set_unsaved_bool.bind(this);     
          this._add_noti_cont = this._add_noti_cont.bind(this);
          this.noti_pool = [];     

     }

     _set_unsaved_bool(bool){
          this.setState({isUnSaved:bool});
     }

     _add_notification(txt,type,dura){
          this.noti_pool.push(new notiClass(txt,type));
          setTimeout(()=>{
               console.log("TIMEOUT");
               this._hide_notification(this.noti_pool.length-1);
               this.forceUpdate();
          },dura)
     }

     _hide_notification(index){
          console.log("HIDE");
          this.noti_pool.splice(index,1);
          this.forceUpdate();
     }

     _render_notification(){
          let res = [];
          if(this.noti_pool.length>0){
               this.noti_pool.map(
                    (ele,index)=>{
                         
                         res.push(
                              <Alert variant={ele.type} onClose={() => this._hide_notification(index)}  dismissible>
                                   {ele.text}
                              </Alert>
                         );
                    }
               );
               return res;
          }
          else{
               return null;
          }
     }
     _render_notif(){
          return(
               <div className='noti_main_cont'>
                    {this._render_notification()}
               </div>
          )
     }

     async _init_land_data(){
          this._set_load_bool(true);      
          await storeHelper._get_page_data().then(res=>{
               //console.log("OUTSIDE RES "+JSON.stringify(res.page_data));
               if(res.errBool===false){
                    if(res.page_data!==null){ 
                    _PAGE_ID = res.page_id;
                     _PAGE_CODE = res.page_data;
                     _VIEW_ID = res.page_data._VISIT_CODE;
                     
                    const GOT_ARRAY =  JSON.parse(res.page_data._PAGE_CORE_ARRAY);
                    if(GOT_ARRAY!==null){
                         _ELEMENT_CORE_ARRAY = GOT_ARRAY;     
                    }
                    this._update_preview_wind();
                    //console.log(GOT_ARRAY);
                    }
               }else{
               }
               this._set_load_bool(false);
          });
     }

     _set_load_bool(bool){
          this.setState({loading:bool});
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
                                        <div className='pop_txt_head_rght_cont_swt'>
                                        <input type="checkbox" checked={_ELEMENT_CORE_ARRAY[element_id].enabled} id="switch" onChange={(e)=>{    
                                             _ELEMENT_CORE_ARRAY[element_id].enabled = !(_ELEMENT_CORE_ARRAY[element_id].enabled)
                                             this.forceUpdate();
                                        }} />
                                        <label for="switch" className='ele_pop_elem_lab'>Toggle</label>
                                        </div>
                                        <div className='pop_txt_head_rght_cont_del_swt'>
                                                  <button className='pop_txt_head_rght_cont_del_swt_butt'
                                                   onClick={()=>{
                                                       _ELEMENT_CORE_ARRAY[element_id].deleted = true;
                                                       this._add_notification("Text element deleted","danger",1000);
                                                       $('.popover_txt_class').hide();
                                                       this.forceUpdate();           
                                                  }}>
                                                  <svg
                                                  className='pop_txt_head_rght_cont_del_swt_ico'
                                                  viewBox='0 0 512 512'>
                                                  <path d='M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/><path stroke='currentColor' stroke-linecap='round' stroke-miterlimit='10' stroke-width='32' d='M80 112h352'/><path d='M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/>
                                                  </svg>
                                                  </button>
                                        </div>
                                   
                                   </div>



                         </div>
                         <div className='ele_pop_bdy'>
                         <Tabs defaultActiveKey="text" id="uncontrolled-tab-example">
                         <Tab eventKey="text" title="Text">
                         <div>
                              <div className='ele_pop_bdy_txt'>Value</div>
                              <textarea  
                                   wrap="hard"
                               placeholder='Text Value' 
                               className='ele_txt_pop_cont' 
                              value={_ELEMENT_CORE_ARRAY[element_id].data!==undefined?_ELEMENT_CORE_ARRAY[element_id].data:"undefined"}
                              onChange={(e)=>{
                                   _ELEMENT_CORE_ARRAY[element_id].data  = e.target.value;
                                   this.forceUpdate();
                              }} />
                                     <div className='ele_pop_bdy_txt'>Font Size</div>    
                                        <div className='ele_pop_bdy_slid_cont'>
                                        <div className='ele_pop_bdy_slid_hold'>
                                        <Slider
                                        orientation="horizontal"
                                        tooltip={false}
                                        value={_ELEMENT_CORE_ARRAY[element_id].style.font_size}
                                        onChange={(val) =>{
                                             _ELEMENT_CORE_ARRAY[element_id].style.font_size =val;   
                                             this.forceUpdate();
                                        }}
                                        />
                                        </div>
                                   <input type='text' className='ele_bdy_pop_sld_txt_fld' value={  _ELEMENT_CORE_ARRAY[element_id].style.font_size}
                                   onChange={(e)=>{
                                        _ELEMENT_CORE_ARRAY[element_id].style.font_size =e.target.value;   
                                        this.forceUpdate();
                                   }}
                                   />
                                   </div>
                                   
                                   <div className='ele_pop_bdy_txt'>Border width</div>    
                                   <div className='ele_pop_bdy_slid_cont'>
                                   <div className='ele_pop_bdy_slid_hold'>
                                   <Slider
                                   orientation="horizontal"
                                   tooltip={false}
                                   value={_ELEMENT_CORE_ARRAY[element_id].style.border_width}
                                   onChange={(val) =>{
                                        _ELEMENT_CORE_ARRAY[element_id].style.border_width =val;   
                                        this.forceUpdate();
                                   }}
                                   />
                                   </div>
                                   <input type='text' className='ele_bdy_pop_sld_txt_fld' value={_ELEMENT_CORE_ARRAY[element_id].style.border_width}
                                   onChange={(e)=>{
                                   _ELEMENT_CORE_ARRAY[element_id].style.border_width = e.target.value;   
                                   this.forceUpdate();
                                   }}
                                   />
                                   </div>
                                   
                                   <div className='ele_pop_bdy_txt'>Border raidus</div>    
                                   <div className='ele_pop_bdy_slid_cont'>
                                        <div className='ele_pop_bdy_slid_hold'>
                                        <Slider
                                        orientation="horizontal"
                                        tooltip={false}
                                        value={_ELEMENT_CORE_ARRAY[element_id].style.border_radius}
                                        onChange={(val) =>{
                                             _ELEMENT_CORE_ARRAY[element_id].style.border_radius =val;   
                                             this.forceUpdate();
                                        }}
                                        />
                                        </div>
                                   <input type='text' className='ele_bdy_pop_sld_txt_fld' value={  _ELEMENT_CORE_ARRAY[element_id].style.border_radius}
                                   onChange={(e)=>{
                                        _ELEMENT_CORE_ARRAY[element_id].style.border_radius =e.target.value;   
                                        this.forceUpdate();
                                   }}
                                   />
                                   </div>
                                   <div className='ele_pop_bdy_txt'>Text alignment</div>        
                                   <ToggleButtonGroup name='txt_algn_rad_ele_pop' type="radio" defaultValue={_ELEMENT_CORE_ARRAY[element_id].style.text_align} className="mb-2"
                                   onChange={(val)=>{
                                        _ELEMENT_CORE_ARRAY[element_id].style.text_align =  val;
                                        this.forceUpdate();
                                   }}
                                   >
                                   <ToggleButton value={'start'}>Left</ToggleButton>
                                   <ToggleButton value={'center'}>Center</ToggleButton>
                                   <ToggleButton value={'end'}>Right </ToggleButton>
                                   </ToggleButtonGroup>

                                   <ButtonGroup toggle className="mb-2">
                                   <ToggleButton
                                        type="checkbox"
                                        variant="light"
                                        checked={_ELEMENT_CORE_ARRAY[element_id].style.undeline}
                                        value="1"
                                        onChange={(e) => {
                                             _ELEMENT_CORE_ARRAY[element_id].style.undeline = e.currentTarget.checked;
                                             this.forceUpdate();
                                        }}
                                   >
                                        Underline
                                   </ToggleButton>
                                   <ToggleButton
                                        type="checkbox"
                                        variant="light"
                                        checked={_ELEMENT_CORE_ARRAY[element_id].style.italic}
                                        value="1"
                                        onChange={(e) => {
                                             _ELEMENT_CORE_ARRAY[element_id].style.italic = e.currentTarget.checked;
                                             this.forceUpdate();
                                        }}
                                   >
                                        Italic
                                   </ToggleButton>
                                   <ToggleButton
                                        type="checkbox"
                                        variant="light"
                                        checked={_ELEMENT_CORE_ARRAY[element_id].style.bordered}
                                        value="1"
                                        onChange={(e) => {
                                             _ELEMENT_CORE_ARRAY[element_id].style.bordered = e.currentTarget.checked;
                                             this.forceUpdate();
                                        }}
                                   >
                                        Border
                                   </ToggleButton>
                                   </ButtonGroup>
                                   </div>
                         </Tab>
                         <Tab eventKey="col" title="Color">

                                   <div className='ele_pop_bdy_txt'>Background Color</div>
                                   <TwitterPicker width={'100%'}
                                   onChange={(colr,evnt)=>{
                                        _ELEMENT_CORE_ARRAY[element_id].style.back_color = colr.hex;
                                             this.forceUpdate();
                                   }}     
                                   />      
                                   <div className='ele_pop_bdy_txt'>Text Color</div>
                                   <TwitterPicker width={'100%'}
                                   onChange={(colr,evnt)=>{
                                        _ELEMENT_CORE_ARRAY[element_id].style.text_color = colr.hex;
                                             this.forceUpdate();
                                   }}     
                                   />   
                                    <div className='ele_pop_bdy_txt'>Border Color</div>
                                   <TwitterPicker width={'100%'}
                                   onChange={(colr,evnt)=>{
                                        _ELEMENT_CORE_ARRAY[element_id].style.border_color = colr.hex;
                                             this.forceUpdate();
                                   }}     
                                   />  
                         </Tab>
                         <Tab eventKey="pos" title="Position">


                                   <div className='ele_pop_bdy_txt'>Margin top</div>    
                                   <div className='ele_pop_bdy_slid_cont'>
                                        <div className='ele_pop_bdy_slid_hold'>
                                        <Slider
                                        orientation="horizontal"
                                        tooltip={false}
                                        value={_ELEMENT_CORE_ARRAY[element_id].style.margin_top}
                                        onChange={(val) =>{
                                             _ELEMENT_CORE_ARRAY[element_id].style.margin_top =val;   
                                             this.forceUpdate();
                                        }}
                                        />
                                        </div>
                                   <input type='text' className='ele_bdy_pop_sld_txt_fld' value={  _ELEMENT_CORE_ARRAY[element_id].style.margin_top}
                                   onChange={(e)=>{
                                        _ELEMENT_CORE_ARRAY[element_id].style.margin_top =e.target.value;   
                                        this.forceUpdate();
                                   }}
                                   />
                                   </div>
                                   <div className='ele_pop_bdy_txt'>Margin bottom</div>    
                                   <div className='ele_pop_bdy_slid_cont'>
                                        <div className='ele_pop_bdy_slid_hold'>
                                        <Slider
                                        orientation="horizontal"
                                        tooltip={false}
                                        value={_ELEMENT_CORE_ARRAY[element_id].style.margin_bottom}
                                        onChange={(val) =>{
                                             _ELEMENT_CORE_ARRAY[element_id].style.margin_bottom =val;   
                                             this.forceUpdate();
                                        }}
                                        />
                                        </div>
                                   <input type='text' className='ele_bdy_pop_sld_txt_fld' value={  _ELEMENT_CORE_ARRAY[element_id].style.margin_bottom}
                                   onChange={(e)=>{
                                        _ELEMENT_CORE_ARRAY[element_id].style.margin_bottom =e.target.value;   
                                        this.forceUpdate();
                                   }}
                                   />
                                   </div>
                                   <div className='ele_pop_bdy_txt'>Padding right</div>    
                                   <div className='ele_pop_bdy_slid_cont'>
                                        <div className='ele_pop_bdy_slid_hold'>
                                        <Slider
                                        orientation="horizontal"
                                        tooltip={false}
                                        value={_ELEMENT_CORE_ARRAY[element_id].style.padding_left}
                                        onChange={(val) =>{
                                             _ELEMENT_CORE_ARRAY[element_id].style.padding_left =val;   
                                             this.forceUpdate();
                                        }}
                                        />
                                        </div>
                                   <input type='text' className='ele_bdy_pop_sld_txt_fld' value={  _ELEMENT_CORE_ARRAY[element_id].style.padding_left}
                                   onChange={(e)=>{
                                        _ELEMENT_CORE_ARRAY[element_id].style.padding_left =e.target.value;   
                                        this.forceUpdate();
                                   }}
                                   />
                                   </div>
                                   <div className='ele_pop_bdy_txt'>Padding right</div>    
                                   <div className='ele_pop_bdy_slid_cont'>
                                        <div className='ele_pop_bdy_slid_hold'>
                                        <Slider
                                        orientation="horizontal"
                                        tooltip={false}
                                        value={_ELEMENT_CORE_ARRAY[element_id].style.padding_right}
                                        onChange={(val) =>{
                                             _ELEMENT_CORE_ARRAY[element_id].style.padding_right =val;   
                                             this.forceUpdate();
                                        }}
                                        />
                                        </div>
                                   <input type='text' className='ele_bdy_pop_sld_txt_fld' value={  _ELEMENT_CORE_ARRAY[element_id].style.padding_right}
                                   onChange={(e)=>{
                                        _ELEMENT_CORE_ARRAY[element_id].style.padding_right =e.target.value;   
                                        this.forceUpdate();
                                   }}
                                   />
                                   </div>
                                   <div className='ele_pop_bdy_txt'>Padding top</div>    
                                   <div className='ele_pop_bdy_slid_cont'>
                                        <div className='ele_pop_bdy_slid_hold'>
                                        <Slider
                                        orientation="horizontal"
                                        tooltip={false}
                                        value={_ELEMENT_CORE_ARRAY[element_id].style.padding_top}
                                        onChange={(val) =>{
                                             _ELEMENT_CORE_ARRAY[element_id].style.padding_top =val;   
                                             this.forceUpdate();
                                        }}
                                        />
                                        </div>
                                   <input type='text' className='ele_bdy_pop_sld_txt_fld' value={  _ELEMENT_CORE_ARRAY[element_id].style.padding_top}
                                   onChange={(e)=>{
                                        _ELEMENT_CORE_ARRAY[element_id].style.padding_top =e.target.value;   
                                        this.forceUpdate();
                                   }}
                                   />
                                   </div>
                                   <div className='ele_pop_bdy_txt'>Padding bottom</div>    
                                   <div className='ele_pop_bdy_slid_cont'>
                                        <div className='ele_pop_bdy_slid_hold'>
                                        <Slider
                                        orientation="horizontal"
                                        tooltip={false}
                                        value={_ELEMENT_CORE_ARRAY[element_id].style.padding_bottom}
                                        onChange={(val) =>{
                                             _ELEMENT_CORE_ARRAY[element_id].style.padding_bottom =val;   
                                             this.forceUpdate();
                                        }}
                                        />
                                        </div>
                                   <input type='text' className='ele_bdy_pop_sld_txt_fld' value={  _ELEMENT_CORE_ARRAY[element_id].style.padding_bottom}
                                   onChange={(e)=>{
                                        _ELEMENT_CORE_ARRAY[element_id].style.padding_bottom =e.target.value;   
                                        this.forceUpdate();
                                   }}
                                   />
                                   </div>

                         </Tab>
                         </Tabs>
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
          if(_ELEMENT_CORE_ARRAY!==null){
          _ELEMENT_CORE_ARRAY.map(
               (element,index)=>{
                         if(element.deleted===false){
                         res.push(new elementRender(element,this._get_popover(element.element_type_id,element.element_id))._render_element_overlay());
                         }
               }
          );
          }
          res.push(new elementRender()._render_foot_element());
          return res;
     }

     _get_page_type_render(element){
          switch(element.element_type_id){
               case 0:{return(renderToString(new elementRender(element)._render_text_element()))}
               case 4:{return("<div>Player</div>")}
               default:{break}
               }
     }


     _update_preview_wind(){
          
          let gcoode = '';
          if(_ELEMENT_CORE_ARRAY!==null){
          _ELEMENT_CORE_ARRAY.map(
               (element,index)=>{
                    gcoode += this._get_page_type_render(element);
               }
          )
          gcoode += renderToString(new elementRender()._foot_code());
          _PRIVEW_GEN_CODE = portDriverCode(gcoode);
          }
     }

     async _gen_page_code(){
          console.log(JSON.stringify(_ELEMENT_CORE_ARRAY));
          console.log("PAGECODE")

          _GEN_CODE = '';
          _ELEMENT_CORE_ARRAY.map(
               (element,index)=>{
                    if(element.deleted===false){
                    _GEN_CODE += this._get_page_type_render(element);
                    }
               }
          )
          _GEN_CODE += renderToString(new elementRender()._foot_code());
          let _SEND_DATA = {
               UID:cookies.get('accessToken'),
               PID:_PAGE_ID,
               _ELEMENT_COUNT:this.state.element_count,
               _PAGE_CORE_CODE:_GEN_CODE,
               _PAGE_CORE_ARRAY:JSON.stringify(_ELEMENT_CORE_ARRAY),
               
          }
          this._add_notification("Saving...","warning",2000);
          let up_res = await storeHelper._update_page_data(_SEND_DATA);
          if(up_res.errBool===false){
               this._add_notification("Saved","success",2000);
               this._set_unsaved_bool(false);
          }
          else{
               this._add_notification("Error Occurred","danger",2000);
          }

          //console.log("SEND DATA"+JSON.stringify(_SEND_DATA));
     }
     componentDidUpdate(){
          
         // this._update_preview_wind();
     }

     _add_noti_cont(){
          
          this._add_notification("TEXT","danger",2000);
          this.forceUpdate();
     }

     componentDidMount(){  
          firebaseHelp._init_user_check(null,process.env.APP_NAME+'src/login');
          this._init_land_data();
          console.log();
          
     }
     render(){          
     return(
          this.state.loading===true?
          <LoaderHelper/>:
          <div>
               <title>{process.env.APP_NAME}</title>
               
               <div className='land_act_head_main_cont'>
                    {this._element_add_modal()}
                    <div className='land_act_head_tit_cont'>{process.env.APP_NAME}.Aplha 
                    <div className='land_act_head_save_cont' style={{
                         color:this.state.isUnSaved===true?'#F6BC4F':'#A9EB9F',
                         borderColor:this.state.isUnSaved===true?'#F6BC4F':'#A9EB9F',
                    }}>{this.state.isUnSaved===true?'Unsaved':'Saved'}</div>
                    </div>  
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
                         <div>
                              <Button className='land_act_gen_butt' onClick={()=>{
                              this._gen_page_code();
                         }}>Save</Button>
                                        <div className='land_act_prv_add_bar_cont'>
                                        <div className='land_act_prv_add_bar'>
                                             <a href={process.env.NEXT_PUBLIC_HOST+'api/view?q='+_VIEW_ID}>
                                             {process.env.NEXT_PUBLIC_HOST+'api/view?q='+_VIEW_ID}
                                             </a>
                                        </div>
                              </div>


                         <div className='land_act_creat_sub_cont'>
                              {this._render_component()}
                         </div>
                         </div>
                    </div>
                    {/* <div className='land_act_prv_main_cont'>
                         <div className='land_act_prv_sub_cont'>
                              <div className='land_act_prv_add_bar_cont'>
                                        <div className='land_act_prv_add_bar'>
                                             https://titan.com/page/56197
                                        </div>
                                        <Button variant={"light"} className='land_act_prv_add_bar_rel_butt'>Reload</Button>
                              </div>
                              <div className='land_act_prv_base_cont' dangerouslySetInnerHTML={{ __html:_PRIVEW_GEN_CODE }}>
                              </div>
                         </div>
                    </div> */}
               </div>
               <div className='land_act_creat_butt_main_cont'>
                    <Button variant={"primary"} onClick={()=>{this._set_elem_mod(true)}}className='land_act_creat_butt'>Add Element +</Button>
               </div>
               {this._render_notif()}
          <div className='app_ver_cont'>Version: {process.env.DEV_VERSION}</div>
        
        </div>
     );
}
}