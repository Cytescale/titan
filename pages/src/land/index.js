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
import copy from "copy-to-clipboard";  

import  _, { concat } from 'lodash';
import Cookies from 'universal-cookie';



import { TwitterPicker,ChromePicker} from 'react-color'

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
var _BACK_DATA = null;


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
     back_color:'#fff',
     text_color:'#000',
     font_size:17,
     bold:false,
     italic:false,
     underline:false,
     text_align:'start',

}

class backgrounClass{
     constructor(){
          this.selec_color = 0;
          this.grad_deg = 160;
          this.back_type = 1;
          this.colors_array = ['#FFB3A2','#FDD075'];
          this.solid_color = '#e0e0e0';
          this.default_value = {
               backgroundColor:'#f1f1f1',
               backgroundImage:'linear-gradient(160deg,#fff,#FDD075)',
               backgroundSize:'1em 1em',                    
          }
     }
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

class _Element_Link{
     constructor(text,url,in_style){
          this.deleted = false;
          this.enabled = true;
          this.element_type_id = 1;
          this.element_url = '';
          this.element_id =_ELEMENT_CORE_ARRAY.length,
          this.data = text!==null?text:"Link";
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
          this._add_link_element = this._add_link_element.bind(this);
          this._add_video_ytube_element = this._add_video_ytube_element.bind(this);
          this._get_popover = this._get_popover.bind(this);
          this._get_page_type_render = this._get_page_type_render.bind(this);
          this._set_unsaved_bool = this._set_unsaved_bool.bind(this);     
          this._add_noti_cont = this._add_noti_cont.bind(this);
          this._get_back_type = this._get_back_type.bind(this);
          this._popover_back_overlay = this._popover_back_overlay.bind(this);
          this._get_back_picker = this._get_back_picker.bind(this);
          this._set_curr_back = this._set_curr_back.bind(this);
          this.noti_pool = [];     

     }

     copytoClip(txt){
          copy(txt);  
     }
     _set_unsaved_bool(bool){
          this.setState({isUnSaved:bool});
     }
     _add_notification(txt,type,dura){
          this.noti_pool.push(new notiClass(txt,type));
          this.forceUpdate();
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
                              <div className='noti_cont'>
                              <Alert variant={ele.type} onClose={() => this._hide_notification(index)}  dismissible >
                                   {ele.text}
                              </Alert>
                              </div>
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
          _BACK_DATA = new backgrounClass();
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
     _set_curr_back(){
          let set_style = {}
          if(_BACK_DATA!==null){
               switch(_BACK_DATA.back_type){
                    case 0:{
                         set_style = {
                              backgroundColor:_BACK_DATA.solid_color,
                         }
                         break;
                    }
                    case 1:{
                         let linerString = 'linear-gradient('+_BACK_DATA.grad_deg+'deg , ';
                         _BACK_DATA.colors_array.map((e,ind)=>{
                              let tr = e ;
                              if(ind !== (_BACK_DATA.colors_array.length-1)){
                                    tr+=',';
                              }
                              linerString += tr;
                         })
                         linerString += ')'
                         console.log(linerString);
                         set_style = {
                              backgroundImage:linerString,
                              backgroundSize:'100%',
                         }
                         
                         break;
                    }
                    default:{
                         set_style = _BACK_DATA.default_value
                         break;
                    }
               }
          }
          return set_style;
     }

     _get_back_type(){
          if(_BACK_DATA!==null){
          switch(_BACK_DATA.back_type){
               case 0:{return 'Solid'}
               case 1:{return 'Linear gradient'}
               default:{return 'Loading'}
          }}
     }
     _draw_linear_grad_tab(){
          let res = [];
          _BACK_DATA.colors_array.map((e,ind)=>{
               res.push(<Dropdown.Item as="button" onClick={()=>{
                    _BACK_DATA.selec_color = ind
                    this.forceUpdate();
               }}>Color {ind}</Dropdown.Item>)
          })
          return res;
     }
     _get_back_picker(){
          if(_BACK_DATA!==null){
               switch(_BACK_DATA.back_type){
                    case 0:{return (
                         <div>
                         <ChromePicker
                            color={_BACK_DATA.solid_color}
                            onChange={(col)=>{
                              _BACK_DATA.solid_color=col.hex;
                              this.forceUpdate();
                            }}
                            onChangeComplete={()=>{this.forceUpdate();}}
                         >
                         </ChromePicker>

                    </div>)}
                    case 1:{return (
                         <div>
                              <Button variant={'primary'} 
                                   className='popover_back_class_add_butt'
                                   onClick={()=>{
                                   _BACK_DATA.colors_array.push('#e0e0e0');
                                   console.log("BACK COLOR ADDED FOR SIZE"+_BACK_DATA.colors_array.length)
                                   this.forceUpdate();
                              }}>Add Color</Button>
                              <Dropdown>
                              <Dropdown.Toggle variant="primary" id="popover_back_class_color_selec_butt">
                              Color {_BACK_DATA.selec_color}
                              </Dropdown.Toggle>
                                   <Dropdown.Menu>
                                   {this._draw_linear_grad_tab()}
                                   </Dropdown.Menu>
                              </Dropdown>

                              <div className='ele_pop_bdy_txt'>Gradient angle</div>    
                                        <div className='ele_pop_bdy_slid_cont'>
                                        <div className='ele_pop_bdy_slid_hold'>
                                        <Slider
                                        orientation="horizontal"
                                        tooltip={false}
                                        max='360'
                                        value={_BACK_DATA.grad_deg}
                                        onChange={(val) =>{
                                             _BACK_DATA.grad_deg =val;   
                                             this.forceUpdate();
                                        }}
                                        />
                                        </div>
                                        <input type='text' className='ele_bdy_pop_sld_txt_fld' value={_BACK_DATA.grad_deg}
                                        onChange={(e)=>{
                                        _BACK_DATA.grad_deg = e.target.value;   
                                        this.forceUpdate();
                                        }}
                                        />
                                        </div>

                              <ChromePicker
                              color={_BACK_DATA.colors_array[_BACK_DATA.selec_color]}
                              className="popover_back_class_color_selec_pick"
                              onChange={(col)=>{
                                   _BACK_DATA.colors_array[_BACK_DATA.selec_color]=col.hex;
                                   this.forceUpdate();
                              }}
                              onChangeComplete={()=>{this.forceUpdate();}}
                              >
                              </ChromePicker>

                              <Button variant='danger' id='popover_back_class_color_selec_butt' onClick={()=>{
                                   if(_BACK_DATA.colors_array.length>=3){
                                        _BACK_DATA.colors_array.splice((_BACK_DATA.colors_array.length-1),1);
                                        this.forceUpdate();
                                   }
                                   else{
                                        this._add_notification("Minimum two colors are nesscary for gradient","danger",2500)
                                   }
                              }}>
                                   Delete color
                              </Button>

                         </div>
                    )}
                    default:{return 'Loading'}
               }}
     }
     _popover_back_overlay(){
          return(
               <Popover id="popover-basic"  className='popover_back_class'
               >
                    <div className='popover_back_class_main_cont'>
                         <div className='popover_back_class_main_cont_tit'>Background</div>
                    <Dropdown>
                              <Dropdown.Toggle variant="light" id="popover_back_class_selec_butt">
                              {this._get_back_type() }
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                              <Dropdown.Item as="button" onClick={()=>{
                                   _BACK_DATA.back_type = 0;
                                   this.forceUpdate();
                                   }}>Solid</Dropdown.Item>
                              <Dropdown.Item as="button"
                                   onClick={()=>{
                                   _BACK_DATA.back_type = 1;
                                   this.forceUpdate();
                                   }}
                              >Linear Gradient</Dropdown.Item>
                              </Dropdown.Menu>
                              </Dropdown>
                              <div className='popover_back_class_main_pick_cont'>
                                   {this._get_back_picker()}
                              </div>
                    </div>
               </Popover>
          )
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
                                   <div className='ele_pop_bdy_txt'>Padding left</div>    
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
     _popover_lnk_overlay(element_id){
          if(_ELEMENT_CORE_ARRAY[element_id]!==undefined&&_ELEMENT_CORE_ARRAY[element_id]!==null){
               return(          
                    <Popover id="popover-basic" className='popover_txt_class'>
                    <div className='ele_pop_main_bdy'>
                              <div className='pop_txt_head_main_cont'>
                                        <div className='pop_txt_head_txt'>Link</div>
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
                              <Tab eventKey="text" title="Link">
                              <div>

                                   <div className='ele_pop_bdy_txt'>Url</div>
                                   <input  
                                        type='url'
                                    placeholder='Text Value' 
                                    className='ele_lnk_tit_pop_cont' 
                                   value={_ELEMENT_CORE_ARRAY[element_id].element_url!==undefined?_ELEMENT_CORE_ARRAY[element_id].element_url:"undefined"}
                                   onChange={(e)=>{
                                        _ELEMENT_CORE_ARRAY[element_id].element_url  = e.target.value;
                                        this.forceUpdate();
                                   }} />

                                   <div className='ele_pop_bdy_txt'>Title</div>
                                   <input  
                                        type='text'
                                    placeholder='Text Value' 
                                    className='ele_lnk_tit_pop_cont' 
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
                                        <div className='ele_pop_bdy_txt'>Padding left</div>    
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
              <Modal.Body className='land_act_elem_add_cont_bdy'>
                <div className='land_act_elem_add_cont'>
                     <Button variant={'light'} className='land_act_elem_add_butt' onClick={this._add_text_element}>
                          <svg className='land_act_elem_add_cont_ico' viewBox='0 0 512 512'><title>Text</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M32 415.5l120-320 120 320M230 303.5H74M326 239.5c12.19-28.69 41-48 74-48h0c46 0 80 32 80 80v144'/><path d='M320 358.5c0 36 26.86 58 60 58 54 0 100-27 100-106v-15c-20 0-58 1-92 5-32.77 3.86-68 19-68 58z' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/></svg>
                          Text
                          </Button> 
                </div>
                <div className='land_act_elem_add_cont'>
                <Button variant={'light'} className='land_act_elem_add_butt' onClick={this._add_link_element}>
                         <svg className='land_act_elem_add_cont_ico' viewBox='0 0 512 512'><title>Link</title><path d='M208 352h-64a96 96 0 010-192h64M304 160h64a96 96 0 010 192h-64M163.29 256h187.42' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='36'/></svg>
                         Link</Button>
                </div>
                <div className='land_act_elem_add_cont'>
                <Button variant={'light'} className='land_act_elem_add_butt'>
                         <svg className='land_act_elem_add_cont_ico' viewBox='0 0 512 512'><title>Image</title><rect x='48' y='80' width='416' height='352' rx='48' ry='48' fill='none' stroke='currentColor' stroke-linejoin='round' stroke-width='32'/><circle cx='336' cy='176' r='32' fill='none' stroke='currentColor' stroke-miterlimit='10' stroke-width='32'/><path d='M304 335.79l-90.66-90.49a32 32 0 00-43.87-1.3L48 352M224 432l123.34-123.34a32 32 0 0143.11-2L464 368' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/></svg>
                         Image</Button>
                </div>
                <div className='land_act_elem_add_cont'>
                <Button variant={'light'} className='land_act_elem_add_butt'>
                         <svg className='land_act_elem_add_cont_ico' viewBox='0 0 512 512'><title>Play Skip Forward</title><path d='M112 111v290c0 17.44 17 28.52 31 20.16l247.9-148.37c12.12-7.25 12.12-26.33 0-33.58L143 90.84c-14-8.36-31 2.72-31 20.16z' fill='none' stroke='currentColor' stroke-miterlimit='10' stroke-width='32'/><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-miterlimit='10' stroke-width='32' d='M400 80v352'/></svg>
                         Audio player</Button>
                </div>
                
                <div className='land_act_elem_add_cont'>
                    <Button variant={'light'} className='land_act_elem_add_butt'  onClick={this._add_video_ytube_element}>
                         <svg className='land_act_elem_add_cont_ico' viewBox='0 0 512 512'><title>Videocam</title><path d='M374.79 308.78L457.5 367a16 16 0 0022.5-14.62V159.62A16 16 0 00457.5 145l-82.71 58.22A16 16 0 00368 216.3v79.4a16 16 0 006.79 13.08z' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/><path d='M268 384H84a52.15 52.15 0 01-52-52V180a52.15 52.15 0 0152-52h184.48A51.68 51.68 0 01320 179.52V332a52.15 52.15 0 01-52 52z' fill='none' stroke='currentColor' stroke-miterlimit='10' stroke-width='32'/></svg>
                         Video Player</Button>
               </div>
              </Modal.Body>
            </Modal>
          );
        }  
     _add_text_element(){
          _ELEMENT_CORE_ARRAY.push(new _Element_Text("Text Element"));
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
     _add_link_element(){
          _ELEMENT_CORE_ARRAY.push(new _Element_Link("Link Element","null"));
          console.log("ELEMENT | ELEMENT LUNK ADDED | SIZE "+_ELEMENT_CORE_ARRAY.length);
          this._set_element_count(_ELEMENT_CORE_ARRAY.length);
          this._set_elem_mod(false);
     }

    _get_popover(element_type_id,ele_id){
     switch(element_type_id){
          case 0:{return(this._popover_txt_overlay(ele_id))}
          case 1:{return(this._popover_lnk_overlay(ele_id))}
          case 4:{return(this._popover_vid_ytube_overlay(ele_id))}
          default:{break}
          }
    }

     _render_component(){
          let res = [];
          //res.push(new elementRender()._render_profile_element());
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

          console.log(_GEN_CODE);

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
                                  <FeedbackComp/> 
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
                    <div className='land_act_back_cust_body'>
                                   <OverlayTrigger trigger="click" placement="auto" overlay={this._popover_back_overlay} rootClose={true}>
                                   <button className='land_act_back_cust_butt'>
                                   <svg className='land_act_back_cust_butt_ico' viewBox='0 0 512 512'><title>Color Palette</title><path d='M430.11 347.9c-6.6-6.1-16.3-7.6-24.6-9-11.5-1.9-15.9-4-22.6-10-14.3-12.7-14.3-31.1 0-43.8l30.3-26.9c46.4-41 46.4-108.2 0-149.2-34.2-30.1-80.1-45-127.8-45-55.7 0-113.9 20.3-158.8 60.1-83.5 73.8-83.5 194.7 0 268.5 41.5 36.7 97.5 55 152.9 55.4h1.7c55.4 0 110-17.9 148.8-52.4 14.4-12.7 11.99-36.6.1-47.7z' fill='none' stroke='currentColor' stroke-miterlimit='10' stroke-width='32'/><circle cx='144' cy='208' r='32'/><circle cx='152' cy='311' r='32'/><circle cx='224' cy='144' r='32'/><circle cx='256' cy='367' r='48'/><circle cx='328' cy='144' r='32'/></svg>
                                   </button>
                                   </OverlayTrigger>
                   
                    </div>

                    <div className='land_act_creat_main_cont'
                    style={this._set_curr_back()}
                    >
                         <div>
                              <Button className='land_act_gen_butt' onClick={()=>{
                              this._gen_page_code();
                         }}>Save</Button>
                                        <div className='land_act_prv_add_bar_cont'>
                                        <div className='land_act_prv_add_bar'>
                                             <svg className='land_act_prv_add_ico' viewBox='0 0 512 512'><title>Lock Closed</title><path d='M336 208v-95a80 80 0 00-160 0v95' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/><rect x='96' y='208' width='320' height='272' rx='48' ry='48' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/></svg>                                             
                                             <a className='land_act_prv_add_lnk' href={process.env.NEXT_PUBLIC_HOST+'api/view?q='+_VIEW_ID}>
                                             {process.env.NEXT_PUBLIC_HOST+'api/view?q='+_VIEW_ID}
                                             </a>
                                        </div>
                                        <button className='land_act_prv_add_cpy_butt'
                                        onClick={()=>{
                                             this.copytoClip(process.env.NEXT_PUBLIC_HOST+'api/view?q='+_VIEW_ID);
                                             this._add_notification("Link copied to clipboard","success",1000);
                                        }}
                                        ><svg className='land_act_prv_add_cpy' viewBox='0 0 512 512'><title>Copy</title><rect x='128' y='128' width='336' height='336' rx='57' ry='57' fill='none' stroke='currentColor' stroke-linejoin='round' stroke-width='32'/><path d='M383.5 128l.5-24a56.16 56.16 0 00-56-56H112a64.19 64.19 0 00-64 64v216a56.16 56.16 0 0056 56h24' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/></svg></button>
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


class FeedbackComp extends React.Component{
     constructor(props){
          super(props)
     }

     feedBackPop(){
          return(
                <Popover id="popover-basic" className='feed_back_pop_main_cont'>
                     <div>
                          <div className='feed_back_pop_tit_cont'>What do you think?</div>
                         <textarea
                         placeholder='Please tell us any suggestions or bugs'
                         >
                              
                              </textarea> 
                     </div>
               </Popover>
        )
     }

     render(){
          return(
               <div className='feed_back_main_cont'>
               <OverlayTrigger trigger="click" target={this} placement="bottom" overlay={this.feedBackPop()}>
               <Button variant={'outline-light'}>Feedback</Button>
               </OverlayTrigger>     
               </div>
          )
     }

}