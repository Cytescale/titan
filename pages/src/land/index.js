import React, { useState,useEffect,Suspense } from 'react';
import { renderToString } from 'react-dom/server';
import firebaseHelper from '../../../util/firebase_helper';
import firestoreHelper from '../../../util/firestore_helper';
import {Accordion,Alert,Button,Dropdown,Modal,OverlayTrigger,Tooltip,Popover,Tabs,Tab,DropdownButton,ToggleButton,ButtonGroup,ToggleButtonGroup } from 'react-bootstrap';
import LoaderHelper from '../loader_helper';
import Slider from 'react-rangeslider'
import $ from 'jquery';
import elementRender from '../../../util/element_render';
import copy from "copy-to-clipboard";  
import ImageUploading from 'react-images-uploading';
import  _, { concat, repeat } from 'lodash';
import Cookies from 'universal-cookie';
import { TwitterPicker,ChromePicker, SwatchesPicker} from 'react-color'
import _URLS from '../../../util/website_urls';
import Router from 'next/router'
import {
     Menu,
     Item,
     Separator,
     Submenu,
     contextMenu ,
     animation,
     useContextMenu
   } from "react-contexify";

import { Resizable } from "re-resizable";


const cookies  = new Cookies();
const storeHelper = new firestoreHelper(cookies.get('accessToken'));

   
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (<a href="" ref={ref} onClick={(e) => { e.preventDefault();onClick(e);}}>{children}</a>));


const FINAL_WEBSITE_WIDTH =  900;
var _ELEMENT_ROWS_CORE_ARRAY = [];
var _ELEMENT_CORE_ARRAY = [];
var  RENDER_ELEMENT_ARRAY = [];
var _PAGE_ID = null;
var _VIEW_ID = null;
var _PAGE_CODE = '';
var _GEN_CODE ='';
var _PRIVEW_GEN_CODE = '';
var _BACK_DATA = null;
var _SELECTED_ELEMENT_ID=undefined;
var _SELECTED_ELEMENT_ROW_ID = undefined;
var _INSERT_BOOL = 1;
var _SLIDER_SELECT_BOOl = false;
var _SLIDER_EDIT_BOOl = false;
var _RIGHT_CLICK_ELEMENT_COLMID = -1;
var _RIGHT_CLICK_ELEMENT_ROWID= -1;


const FONT_FAMILY_NAMES = [
     'Limelight',
     'Lexend',
     'Abril Fatface',
     'Comfortaa',
     'Varela Round',
     'Teko',
     'Bebas Neue',
     'Lobster',
     'Josefin Sans',
     'Quicksand',
     'Dela Gothic One',
     'Nunito',
     'Raleway',
     'Poppins',
     'Montserrat',
     'Antonio',
     'Zen Dots',
     'Dancing Script',
     'Pacifico',
     'Prompt',
     'Questrial',
     'Fredoka One',
     'Righteous',
     'Cinzel',
     'Orbitron',
     'Playfair Display SC',
     'DM Serif Display',
     'Monoton',
     'Pirata One',
     'Julius Sans One',
     'Alata',
     'Varela',
     'Pinyon Script',
     'Reem Kufi',
     'Alegreya Sans SC',
     'Michroma',
     'Sen',
     'Cinzel Decorative',
     'Charm',
     'Marcellus SC',
     'Allerta Stencil',
     'Rozha One',
     'Rye',
     'Copse',
     'Merienda One',
     'Calligraffitti',
     'UnifrakturMaguntia',
     'Bowlby One',
     'Rammetto One',
     'Cherry Cream Soda',
     'Coiny',
     'UnifrakturCook',
     'Bellota',
     'Chango',
     'Lexend Exa',
     'Metal Mania',
     'Lexend Mega',
     'Lexend Giga',
     'Stalinist One',
     'Lexend Peta',
     'Nova Cut'
]

var STLYE_ELEMENT_TEXT ={
     margin:0,
     element_width:320,
     element_height:70,     
     margin_top:0,
     margin_bottom:0,
     margin_left:0,
     margin_right:0,
     padding_right:0,
     padding_left:12,
     padding_top:20,
     padding_bottom:20,
     padding:0,
     border_radius:0,
     border_width:2,
     bordered:false,
     font_family:'Poppins',
     border_color:'#000',
     back_color:'#f1f1f1',
     text_color:'#000',
     font_size:17,
     font_weight:500,
     bold:false,
     italic:false,
     underline:false,
     text_align:'start',
     image_width:'100',
     image_height:'100',
     vertical_center:false,   
     box_shadow_enable:false,
     box_shadow_x:0,
     box_shadow_y:0,
     box_shadow_blur:0,
     box_shadow_spread:0,
     box_shadow_color:'#fff',
     slider:'10',
}

const back_preset_gradient = [
     ['#ff9a9e','#fad0c4'],
     ['#a18cd1','#fbc2eb'],
     ['#fad0c4','#ffd1ff'],
     ['#ffecd2','#fcb69f'],
     ['#fbc2eb','#a6c1ee'],
     ['#a6c0fe','#f68084'],
]

class backgrounClass{
     constructor(){
          this.selec_color = 0;
          this.grad_deg = 160;
          this.back_type = 0;
          this.back_image = null;
          this.colors_array = back_preset_gradient[Math.floor(Math.random() * back_preset_gradient.length)];
          this.solid_color = '#f6f6f6';
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
     constructor(row_id,indx_id,in_style){
          this.element_name='Embeded'
          this.deleted = false;
          this.enabled = true;
          this.element_type_id = 4;
          this.data ='';
          this.row_id = row_id;
          this.element_id =indx_id;
          this.style = Object.assign({},STLYE_ELEMENT_TEXT,in_style);
     }
    
}
class _Element_Link{
     constructor(row_id,indx_id,in_style){
          this.element_name='Link'
          this.deleted = false;
          this.enabled = true;
          this.element_type_id = 1;
          this.element_url = '';
          this.row_id = row_id;
          this.element_id =indx_id;
          this.data ="Placeholder Link";
          this.style = Object.assign({},STLYE_ELEMENT_TEXT,in_style);
     }
     
}
class _Element_Image{
     constructor(row_id,indx_id,in_style){
          this.element_name='Image'
          this.deleted = false;
          this.enabled = true;
          this.element_type_id = 2;
          this.row_id = row_id;
          this.element_id = indx_id;
          this.image_data = null;
          this.style = Object.assign({},STLYE_ELEMENT_TEXT,in_style);
     }
}
class _Element_Text{
     constructor(row_id,indx_id,in_style){
          this.element_name='Text'
          this.deleted = false;
          this.enabled = true;
          this.element_type_id = 0;
          this.row_id = row_id;
          this.element_id = indx_id;
          this.data = "Lorem Ipsum";
          this.style = Object.assign({},STLYE_ELEMENT_TEXT,in_style);
     }
     
  
}

const ELEMENT_OVERLAY_MENU_ID = "element-overlay-menu";
const ELEMENT_OVERLAY_BASE_ID = "element-base-menu";


 function menuHandler(e){
     let colmId = e.currentTarget.getAttribute("data-colmid");
     let rowId = e.currentTarget.getAttribute("data-rowId");
     let menuId = e.currentTarget.getAttribute("data-menuId")
     _RIGHT_CLICK_ELEMENT_COLMID = colmId;
     _RIGHT_CLICK_ELEMENT_ROWID = rowId;
     contextMenu.show({
       id: menuId,
       event: e
     });
   }

   function basemenuHandler(e){
     let menuId = e.currentTarget.getAttribute("data-menuId")
     contextMenu.show({
       id: menuId,
       event: e
     });
   }



const firebaseHelp = new firebaseHelper();
export default class LandAct extends React.Component{
     
     constructor(props){
          super(props);            
          this.state={
               loading:false,
               isUnSaved:false,
               dname:"Not done..",
               element_count:0,
               _temp_select_mod_show:false,
               _select_template_id:0,
               _show_layer_menu:false,
               _select_element_id:-1,
               _select_row_id:-1,
               _add_elem_mod_show:false,
               _txt_pop_shw:false,
               _edit_menu_width:270,
               _desktop_viewing_mode: true,
               _adder_type:0,
          }
         
          this._set_load_bool = this._set_load_bool.bind(this);
          this._set_txt_pop_show = this._set_txt_pop_show.bind(this);
          this._set_elem_mod = this._set_elem_mod.bind(this);
          this._set_dname = this._set_dname.bind(this);
          this._add_element_count = this._add_element_count.bind(this);
          this._set_element_count = this._set_element_count.bind(this);
          this._get_page_type_render = this._get_page_type_render.bind(this);
          this._set_unsaved_bool = this._set_unsaved_bool.bind(this);     
          this._add_noti_cont = this._add_noti_cont.bind(this);
          this._get_back_type = this._get_back_type.bind(this);
          this._get_back_picker = this._get_back_picker.bind(this);
          this._set_curr_back = this._set_curr_back.bind(this);
          this.renderer_add_butt_callback = this.renderer_add_butt_callback.bind(this);
          this._ELEMENT_ADDER_TO_ARRAY = this._ELEMENT_ADDER_TO_ARRAY.bind(this);
          this._set_url_param_selec_id = this._set_url_param_selec_id.bind(this);
          this._set_selec_element_id = this._set_selec_element_id.bind(this);
          this._render_element_menu = this._render_element_menu.bind(this);
          this._set_edit_menu_width = this._set_edit_menu_width.bind(this);
          this._render_menu_slider = this._render_menu_slider.bind(this);
          this._renderer_resize_callback = this._renderer_resize_callback.bind(this);
          this._set_viewing_mode = this._set_viewing_mode.bind(this);
          this._set_adder_type  =this._set_adder_type.bind(this);
          this._set_layer_menu_visi = this._set_layer_menu_visi.bind(this);
          this._set_template_id = this._set_template_id.bind(this);
          this._set_temp_mod_show = this._set_temp_mod_show.bind(this);
          this.noti_pool = [];     

     }
     _set_temp_mod_show(bool){
          this.setState({_temp_select_mod_show:bool});
     }

     _set_template_id(id){
          this.setState({_select_template_id:id});
     }
     _set_layer_menu_visi(bool){
          this.setState({_show_layer_menu:bool})
     }    

     _set_adder_type(val){
          this.setState({_adder_type:val});
     }
     _set_viewing_mode(val){
          this.setState({_desktop_viewing_mode:val})
     }
     copytoClip(txt){
          copy(txt);  
     }
     _set_selec_element_id(val,row_id){
          this.setState({_select_element_id:val,
                         _select_row_id:row_id
                         })
     }
     _set_edit_menu_width(val){
          this.setState({_edit_menu_width:val})
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
     async _init_land_data(req_count){
          this._set_load_bool(true);      
          if(req_count>5){
               console.log(req_count);
               console.log('FIRESTORE Choke error occured');
               this._add_notification('Choke error occured','danger',5000);
               return;
          }
          _BACK_DATA = new backgrounClass();
          await storeHelper._get_page_data().then(res=>{
               //console.log("OUTSIDE RES "+JSON.stringify(res.page_data));
               if(res!==null){
                    if(res.errBool===false){
                              this._set_load_bool(false);
                                   if(res.page_data!==null){ 
                                   console.log('LAND: Page data load success');
                                   _PAGE_ID = res.page_id;
                                   _PAGE_CODE = res.page_data;
                                   _VIEW_ID = res.page_data._VISIT_CODE;
                                   const GOT_ARRAY =  JSON.parse(res.page_data._PAGE_CORE_ARRAY);
                                   if(GOT_ARRAY!==null){
                                        _ELEMENT_CORE_ARRAY = GOT_ARRAY;     
                                   }
                                   this.forceUpdate();
                              }
                         else{
                              console.log('LAND: Page data load failure');
                              this._add_notification('Page data failure','danger',5000);
                         }
                    }
                    else{
                         switch(res.errCode){
                              case 1:{
                                   console.log('FIRESTORE Existant page not found')
                                   this._add_notification('Existant page not found','danger',5000);
                                   this._init_land_data((req_count+1))
                                   break;
                              }
                              case 2:{
                                   console.log('FIRESTORE new page creation failed')
                                   this._add_notification('New page creation failed','danger',5000);
                                   this._init_land_data((req_count+1))
                                   break;
                              }
                              case 3:{
                                   console.log('FIRESTORE NULL/invalid UID supplied')
                                   this._add_notification('NULL/invalid UID supplied','danger',5000);
                                   this._init_land_data((req_count+1))
                                   break;
                              }
                              default:{
                                   console.log('FIRESTORE Unknown error occured');
                                   this._add_notification('Unknown error occured','danger',5000);
                                   this._init_land_data((req_count+1))
                                   break;
                              }
                         }
                    }
               }else{
                    this._add_notification('Fatal error occured Please reload','danger',5000);
               }
               
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
                         set_style = {
                              backgroundImage:linerString,
                              backgroundSize:'100%',
                         }
                         
                         break;
                    }
                    case 2:{
                         if(_BACK_DATA.back_image!==null){
                         let linerString = 'url("';
                         _BACK_DATA.back_image.map((e,ind)=>{
                              let tr = e ;
                              if(tr!==null){
                                   linerString += tr['data_url']+'")';
                              }
                         })
                         set_style = {
                              backgroundImage:linerString,
                              backgroundPosition: 'center',
                              backgroundRepeat: 'no-repeat',
                              backgroundSize: 'cover',
                         }}
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
               case 2:{return 'Image'}
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
                    case 2:{
                         return(
                              <div>
                                    <ImageUploading
                                        multiple={false}
                                        value={_BACK_DATA.back_image}
                                        onChange={(imageList,addUpdateIndex)=>{
                                             _BACK_DATA.back_image = imageList;
                                             this.forceUpdate(); 
                                        }}
                                        maxNumber={1}
                                        dataURLKey="data_url"
                                        >
                                        {({
                                             imageList,
                                             onImageUpload,
                                             onImageRemoveAll,
                                             onImageUpdate,
                                             onImageRemove,
                                             isDragging,
                                             dragProps,
                                        }) => (
                                             <div className="upload__image-wrapper">
                                             {_BACK_DATA.back_image===null?<Button variant={'primary'} className='upload__image-wrapper_butt' onClick={onImageUpload}>Upload</Button>:undefined}
                                             {imageList.map((image, index) => (
                                             <div key={index} className="image-item">
                                                  <img src={image['data_url']} className='image_img' alt="" width="100" />
                                                  <div className="image-item__btn-wrapper">
                                                  <Button variant={'primary'} className='image-item__btn-wrapper_butt'  onClick={() => onImageUpdate(index)}>Update</Button>
                                                  {/* <Button variant={'primary'} className='image-item__btn-wrapper_butt'  onClick={() => onImageRemove(index)}>Remove</Button> */}
                                                  </div>
                                             </div>
                                             ))}
                                             </div>
                                        )}
                                        </ImageUploading>
                              </div>
                         );
                    }
                    default:{return 'Loading'}
               }}
     }
     _draw_font_family(element_id,row_id){
          let res = []
          
               FONT_FAMILY_NAMES.map((e,ind)=>{
                 res.push(<Dropdown.Item as="button" onClick={()=>{
                    this._get_element_by_index(row_id,element_id).style.font_family = e;
                    this.forceUpdate();
                 }}>{e}</Dropdown.Item>);
               })
          
          return res;
     }
     _set_element_count(int){
          this.setState({element_count:int});
     }
     _add_element_count(){
          this.setState({element_count:this.state.element_count++});
     }
     _set_elem_mod(bool){
          this.setState({_add_elem_mod_show:bool})
          if(bool===false){
               _SELECTED_ELEMENT_ID=undefined;
               _INSERT_BOOL = 1;
          }
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
                     <Button variant={'light'} className='land_act_elem_add_butt' onClick={()=>this._ELEMENT_ADDER_TO_ARRAY(0)}>
                          <svg className='land_act_elem_add_cont_ico' viewBox='0 0 512 512'><title>Text</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M32 415.5l120-320 120 320M230 303.5H74M326 239.5c12.19-28.69 41-48 74-48h0c46 0 80 32 80 80v144'/><path d='M320 358.5c0 36 26.86 58 60 58 54 0 100-27 100-106v-15c-20 0-58 1-92 5-32.77 3.86-68 19-68 58z' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/></svg>
                          Text
                          </Button> 
                </div>
                <div className='land_act_elem_add_cont'>
                <Button variant={'light'} className='land_act_elem_add_butt' onClick={()=>this._ELEMENT_ADDER_TO_ARRAY(1)}>
                         <svg className='land_act_elem_add_cont_ico' viewBox='0 0 512 512'><title>Link</title><path d='M208 352h-64a96 96 0 010-192h64M304 160h64a96 96 0 010 192h-64M163.29 256h187.42' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='36'/></svg>
                         Link</Button>
                </div>
                <div className='land_act_elem_add_cont'>
                <Button variant={'light'} className='land_act_elem_add_butt' onClick={()=>this._ELEMENT_ADDER_TO_ARRAY(2)}>
                         <svg className='land_act_elem_add_cont_ico' viewBox='0 0 512 512'><title>Image</title><rect x='48' y='80' width='416' height='352' rx='48' ry='48' fill='none' stroke='currentColor' stroke-linejoin='round' stroke-width='32'/><circle cx='336' cy='176' r='32' fill='none' stroke='currentColor' stroke-miterlimit='10' stroke-width='32'/><path d='M304 335.79l-90.66-90.49a32 32 0 00-43.87-1.3L48 352M224 432l123.34-123.34a32 32 0 0143.11-2L464 368' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/></svg>
                         Image</Button>
                </div>        
                <div className='land_act_elem_add_cont'>
                    <Button variant={'light'} className='land_act_elem_add_butt'  onClick={()=>this._ELEMENT_ADDER_TO_ARRAY(4)}>
                         Embeded</Button>
               </div>
              </Modal.Body>
            </Modal>
          );
        } 
     _get_element_by_index(row_id,indx_id){
          if(_ELEMENT_ROWS_CORE_ARRAY[row_id][indx_id]!==undefined){
               return(_ELEMENT_ROWS_CORE_ARRAY[row_id][indx_id]);
          }
          else{
               return false;
          }
          
     }
     _render_embeded_menu(element_id,row_id){
          if(this._get_element_by_index(row_id,element_id)!==false){ 
               return(
               <div className='ele_pop_main_bdy'>
                         <div className='pop_txt_head_main_cont'>
                                   <div className='pop_txt_head_txt'>Embeded</div>
                                        <div className='pop_txt_head_rght_cont'>
                                        <div className='pop_txt_head_rght_cont_swt'>
                                        <input type="checkbox" checked={this._get_element_by_index(row_id,element_id).enabled} id="switch" onChange={(e)=>{    
                                             this._get_element_by_index(row_id,element_id).enabled = !(this._get_element_by_index(row_id,element_id).enabled)
                                             this.forceUpdate();
                                        }} />
                                        <label for="switch" className='ele_pop_elem_lab'>Toggle</label>
                                        </div>
                                        <div className='pop_txt_head_rght_cont_del_swt'>
                                                  <button className='pop_txt_head_rght_cont_del_swt_butt'
                                                   onClick={()=>{
                                                       this._get_element_by_index(row_id,element_id).deleted = true;
                                                       this._add_notification("Text element deleted","danger",1000);
                                                       this._set_selec_element_id(-1)
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
                         <div>
                         <div className='ele_menu_bdy_main_cont'>
                         <div>
                                   <div className='ele_pop_bdy_txt'>Embeded Link</div>
                                        <input 
                                             type='url'
                                        placeholder='Enter embeded url value' 
                                        className='ele_txt_pop_cont_color' 
                                        value={this._get_element_by_index(row_id,element_id).data}
                                        onChange={(e)=>{
                                             this._get_element_by_index(row_id,element_id).data = e.target.value;
                                             this.forceUpdate();
                                        }} />          
                                        </div>
                              </div>    
                              <Accordion className='ele_men_acrd_main_cont'>
                                   <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main'>
                                        <div className='_ele_acrd_header_main_cont'>
                                        <svg   className='_ele_acrd_header_main_cont_left_ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z"/></svg>
                                        <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                        Background 
                                        </div>
                                   </Accordion.Toggle>
                              <Accordion.Collapse eventKey="0">
                                   <div className='ele_menu_bdy_main_cont'>
                                   <div className='ele_pop_bdy_opt_main_cont'>
                                   <div className='ele_pop_bdy_txt'>Box shadow</div>        
                                   <input className='ele_pop_bdy_chck_cont' checked={this._get_element_by_index(row_id,element_id).style.box_shadow_enable} type='checkbox' onClick={
                                        (e)=>{this._get_element_by_index(row_id,element_id).style.box_shadow_enable=!this._get_element_by_index(row_id,element_id).style.box_shadow_enable
                                             this.forceUpdate();
                                        }
                                   }></input>
                                   </div>

                                   <div className='ele_pop_bdy_txt'>Box shadow</div>
                                   <div className='ele_pop_box_shad_main_cont'>

                                        <div className='ele_pop_box_shad_main_cont_row'>
                                        <div className='ele_pop_box_shad_main_txt_main_cont'>
                                        <div className='ele_pop_box_shad_main_txt_main_cont_lab'>X</div>
                                        <input type='text' className='ele_pop_box_shad_main_txt' value={this._get_element_by_index(row_id,element_id).style.box_shadow_x}
                                        onChange={(e)=>{
                                             this._get_element_by_index(row_id,element_id).style.box_shadow_x = e.target.value
                                             this.forceUpdate();
                                        }}
                                        ></input>
                                        </div>
                                        <div className='ele_pop_box_shad_main_txt_main_cont'>
                                        <div className='ele_pop_box_shad_main_txt_main_cont_lab'>Y</div>
                                        <input type='text' className='ele_pop_box_shad_main_txt' value={this._get_element_by_index(row_id,element_id).style.box_shadow_y}
                                        onChange={(e)=>{
                                             this._get_element_by_index(row_id,element_id).style.box_shadow_y = e.target.value
                                             this.forceUpdate();
                                        }}></input>
                                        </div>
                                        </div>

                                        <div className='ele_pop_box_shad_main_cont_row'>
                                        <div className='ele_pop_box_shad_main_txt_main_cont'>
                                        <div className='ele_pop_box_shad_main_txt_main_cont_lab'>Blur</div>
                                        <input type='text' className='ele_pop_box_shad_main_txt' value={this._get_element_by_index(row_id,element_id).style.box_shadow_blur}
                                        onChange={(e)=>{
                                             this._get_element_by_index(row_id,element_id).style.box_shadow_blur = e.target.value
                                             this.forceUpdate();
                                        }}></input>
                                        </div>

                                        <div className='ele_pop_box_shad_main_txt_main_cont'>
                                        <div className='ele_pop_box_shad_main_txt_main_cont_lab'>Spread</div>
                                        <input type='text' className='ele_pop_box_shad_main_txt' value={this._get_element_by_index(row_id,element_id).style.box_shadow_spread}
                                        onChange={(e)=>{
                                             this._get_element_by_index(row_id,element_id).style.box_shadow_spread = e.target.value
                                             this.forceUpdate();
                                        }}></input>
                                        </div>
                                        </div>
                                        <div className='ele_pop_bdy_txt'>Shadow Color</div>
                                        <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={<Popover id="popover-basic"  className='element_color_pick_popover'    backdropClassName="backdrop">
                                             <ChromePicker
                                                  color={this._get_element_by_index(row_id,element_id).style.box_shadow_color}
                                                  onChange={(col)=>{                                             
                                                       this._get_element_by_index(row_id,element_id).style.box_shadow_color = `rgba(${col.rgb.r},${col.rgb.g},${col.rgb.b},${col.rgb.a})`;
                                                       this.forceUpdate()
                                        }}
                                        onChangeComplete={()=>{this.forceUpdate()}}
                                   >
                                   </ChromePicker>
                                   </Popover>}
                                   >
                                   <Button variant={'light'} className='ele_pop_bdy_col_butt'>
                                        <div className='ele_pop_bdy_col_butt_col' style={{backgroundColor: this._get_element_by_index(row_id,element_id).style.box_shadow_color!==null? this._get_element_by_index(row_id,element_id).style.box_shadow_color:'#fff'}}></div>
                                        {this._get_element_by_index(row_id,element_id).style.box_shadow_color===undefined?'none':this._get_element_by_index(row_id,element_id).style.box_shadow_color}
                                   </Button>
                                   </OverlayTrigger>
                                   </div>

                                   <div className='ele_pop_bdy_txt'>Background Color</div>
                                   <OverlayTrigger
                                   trigger="click"
                                   placement="left"
                                   rootClose={true}
                                   overlay={<Popover id="popover-basic"  className='element_color_pick_popover'    backdropClassName="backdrop">
                                   <ChromePicker
                                        color={this._get_element_by_index(row_id,element_id).style.back_color}
                                        onChange={(col)=>{
                                             
                                             this._get_element_by_index(row_id,element_id).style.back_color = `rgba(${col.rgb.r},${col.rgb.g},${col.rgb.b},${col.rgb.a})`;

                                             this.forceUpdate()
                                        }}
                                        onChangeComplete={()=>{this.forceUpdate()}}
                                   >
                                   </ChromePicker>
                                   </Popover>}
                                   >
                                   <Button variant={'light'} className='ele_pop_bdy_col_butt'>
                                        <div className='ele_pop_bdy_col_butt_col' style={{backgroundColor:this._get_element_by_index(row_id,element_id).style.back_color!==null?this._get_element_by_index(row_id,element_id).style.back_color:'#fff'}}></div>
                                        {this._get_element_by_index(row_id,element_id).style.back_color===undefined?'none':this._get_element_by_index(row_id,element_id).style.back_color}
                                   </Button>
                                   </OverlayTrigger>
                                        
                                   
                                   </div>
                              </Accordion.Collapse>
                              </Accordion>
                              <Accordion className='ele_men_acrd_main_cont'>
                                   <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main' >
                                        <div className='_ele_acrd_header_main_cont'>
                                        <svg className='_ele_acrd_header_main_cont_left_ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M15 21h2v-2h-2v2zm4 0h2v-2h-2v2zM7 21h2v-2H7v2zm4 0h2v-2h-2v2zm8-4h2v-2h-2v2zm0-4h2v-2h-2v2zM3 3v18h2V5h16V3H3zm16 6h2V7h-2v2z"/></svg>
                                        <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                        Border 
                                        <div className='_ele_acrd_menu_chck_main_cont'>
                                             <input type='checkbox' className='_ele_acrd_menu_chck' checked={this._get_element_by_index(row_id,element_id).style.bordered}
                                        onClick={(e)=>{
                                             this._get_element_by_index(row_id,element_id).style.bordered = !this._get_element_by_index(row_id,element_id).style.bordered
                                             this.forceUpdate();
                                        }}
                                        ></input></div></div>
                                   </Accordion.Toggle>
                              <Accordion.Collapse eventKey="0">
                                   <div className='ele_menu_bdy_main_cont'>
                                             <div className='ele_pop_bdy_txt'>Border width</div>    
                                             <div className='ele_pop_bdy_slid_cont'>
                                             {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.border_width),0,100,(val)=>{this._get_element_by_index(row_id,element_id).style.border_width = val;})}
                                             </div>
                                             
                                             <div className='ele_pop_bdy_txt'>Border raidus</div>    
                                             <div className='ele_pop_bdy_slid_cont'>
                                             {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.border_radius),0,100,(val)=>{this._get_element_by_index(row_id,element_id).style.border_radius = val;})}
                                             </div>

                                             <div className='ele_pop_bdy_txt'>Border Color</div>
                                                  <OverlayTrigger
                                                  trigger="click"
                                                  placement="left"
                                                  rootClose={true}
                                                  overlay={<Popover id="popover-basic"  className='element_color_pick_popover'    backdropClassName="backdrop">
                                                  <ChromePicker
                                                       color={this._get_element_by_index(row_id,element_id).style.border_color}
                                                       onChange={(col)=>{
                                                            this._get_element_by_index(row_id,element_id).style.border_color = `rgba(${col.rgb.r},${col.rgb.g},${col.rgb.b},${col.rgb.a})`;
                                                            this.forceUpdate()
                                                       }}
                                                       onChangeComplete={()=>{this.forceUpdate()}}
                                                  >
                                                  </ChromePicker>
                                                  </Popover>}
                                                  >
                                                  <Button variant={'light'} className='ele_pop_bdy_col_butt'>
                                                       <div className='ele_pop_bdy_col_butt_col' style={{backgroundColor:this._get_element_by_index(row_id,element_id).style.border_color!==null?this._get_element_by_index(row_id,element_id).style.border_color:'#fff'}}></div>
                                                       {this._get_element_by_index(row_id,element_id).style.border_color}
                                                  </Button>
                                                  </OverlayTrigger>     
                                   
                                   </div>
                              </Accordion.Collapse>
                              </Accordion>                                  
                              <Accordion className='ele_men_acrd_main_cont'>
                                   <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main'>
                                        <div className='_ele_acrd_header_main_cont'>
                                        <svg  className='_ele_acrd_header_main_cont_left_ico'  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z"/></svg>
                                        <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                        Alignment 
                                        </div>
                                   </Accordion.Toggle>
                              <Accordion.Collapse eventKey="0">
                                   <div className='ele_menu_bdy_main_cont'>
                                        <div className='ele_pop_bdy_opt_main_cont'>
                                        <div className='ele_pop_bdy_txt'>Vertically center</div>        
                                        <input className='ele_pop_bdy_chck_cont' checked={this._get_element_by_index(row_id,element_id).style.vertical_center} type='checkbox' onClick={
                                             (e)=>{this._get_element_by_index(row_id,element_id).style.vertical_center=!this._get_element_by_index(row_id,element_id).style.vertical_center
                                                  this.forceUpdate();
                                             }
                                        }></input>
                                        </div>

                                        <ToggleButtonGroup name='txt_algn_rad_ele_pop' type="radio" defaultValue={this._get_element_by_index(row_id,element_id).style.text_align} className="mb-2"
                                        onChange={(val)=>{
                                             this._get_element_by_index(row_id,element_id).style.text_align =  val;
                                             this.forceUpdate();
                                        }}
                                        >
                                        <ToggleButton value={'start'} className='txt_algn_rad_ele_pop_butt'>Left</ToggleButton>
                                        <ToggleButton value={'center'} className='txt_algn_rad_ele_pop_butt'>Center</ToggleButton>
                                        <ToggleButton value={'end'} className='txt_algn_rad_ele_pop_butt'>Right </ToggleButton>
                                        </ToggleButtonGroup>
                                   </div>
                              </Accordion.Collapse>
                              </Accordion>
                              <Accordion className='ele_men_acrd_main_cont'>
                                   <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main'>
                                        <div className='_ele_acrd_header_main_cont'>
                                        <svg className='_ele_acrd_header_main_cont_left_ico' xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"/></g><g><g/><polygon points="13,6.99 16,6.99 12,3 8,6.99 11,6.99 11,17.01 8,17.01 12,21 16,17.01 13,17.01"/></g></svg>
                                        <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                        Width and Height 
                                        </div>
                                   </Accordion.Toggle>
                              <Accordion.Collapse eventKey="0">
                                   <div className='ele_menu_bdy_main_cont'>
                                   <div className='ele_pop_bdy_txt'>Width</div>    
                                             <div className='ele_pop_bdy_slid_cont'>
                                             {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.element_width),0,900,(val)=>{this._get_element_by_index(row_id,element_id).style.element_width = val;})}
                                             </div>

                                             <div className='ele_pop_bdy_txt'>Height</div>    
                                             <div className='ele_pop_bdy_slid_cont'>
                                             {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.element_height),0,900,(val)=>{this._get_element_by_index(row_id,element_id).style.element_height = val;})}
                                             </div>
                                   </div>
                              </Accordion.Collapse>
                              </Accordion>
                              <Accordion className='ele_men_acrd_main_cont'>
                                   <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main'>
                                        <div className='_ele_acrd_header_main_cont'>
                                        <svg className='_ele_acrd_header_main_cont_left_ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H3V8h2v4h2V8h2v4h2V8h2v4h2V8h2v4h2V8h2v8z"/></svg>
                                        <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                             Margin
                                        </div>
                                   </Accordion.Toggle>
                              <Accordion.Collapse eventKey="0">
                                   <div className='ele_menu_bdy_main_cont'>
                                        <div className='ele_pop_bdy_txt'>Margin left</div>    
                                                  <div className='ele_pop_bdy_slid_cont'>
                                                  {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.margin_left),0,900,(val)=>{this._get_element_by_index(row_id,element_id).style.margin_left = val;})}
                                                  </div>

                                                  <div className='ele_pop_bdy_txt'>Margin right</div>    
                                                  <div className='ele_pop_bdy_slid_cont'>
                                                  {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.margin_right),0,900,(val)=>{this._get_element_by_index(row_id,element_id).style.margin_right = val;})}
                                                  </div>


                                        <div className='ele_pop_bdy_txt'>Margin top</div>    
                                        <div className='ele_pop_bdy_slid_cont'>
                                        {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.margin_top),0,900,(val)=>{this._get_element_by_index(row_id,element_id).style.margin_top = val;})}
                                        </div>
                                        <div className='ele_pop_bdy_txt'>Margin bottom</div>    
                                        <div className='ele_pop_bdy_slid_cont'>
                                        {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.margin_bottom),0,900,(val)=>{this._get_element_by_index(row_id,element_id).style.margin_bottom = val;})}
                                        </div>
                                   </div>
                              </Accordion.Collapse>
                              </Accordion>
                              <Accordion className='ele_men_acrd_main_cont'>
                                   <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main'>
                                        <div className='_ele_acrd_header_main_cont'>
                                        <svg className='_ele_acrd_header_main_cont_left_ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18 9v4H6V9H4v6h16V9z"/></svg>
                                        <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                             Padding
                                        </div>
                                   </Accordion.Toggle>
                              <Accordion.Collapse eventKey="0">
                                   <div className='ele_menu_bdy_main_cont'>
                                        
                                   <div className='ele_pop_bdy_txt'>Padding left</div>    
                                   <div className='ele_pop_bdy_slid_cont'>
                                   {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.padding_left),0,900,(val)=>{this._get_element_by_index(row_id,element_id).style.padding_left = val;})}
                                   </div>
                                   <div className='ele_pop_bdy_txt'>Padding right</div>    
                                   <div className='ele_pop_bdy_slid_cont'>
                                        {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.padding_right),0,900,(val)=>{this._get_element_by_index(row_id,element_id).style.padding_right = val;})}
                                   </div>

                                   <div className='ele_pop_bdy_txt'>Padding top</div>    
                                   <div className='ele_pop_bdy_slid_cont'>
                                   {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.padding_top),0,900,(val)=>{this._get_element_by_index(row_id,element_id).style.padding_top = val;})}
                                   </div>
                                   <div className='ele_pop_bdy_txt'>Padding bottom</div>    
                                   <div className='ele_pop_bdy_slid_cont'>
                                   {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.padding_bottom),0,900,(val)=>{this._get_element_by_index(row_id,element_id).style.padding_bottom = val;})}
                                   </div>
                                   </div>
                              </Accordion.Collapse>
                              </Accordion>
                                   </div>
                         </div>
               </div>);}
               else{
                    return(<div>Fault Menu</div>)
               }
     }
     _render_image_menu(element_id,row_id){
          if(this._get_element_by_index(row_id,element_id)!==false){ 
               return(
               <div className='ele_pop_main_bdy'>
                         <div className='pop_txt_head_main_cont'>
                                   <div className='pop_txt_head_txt'>Image</div>
                                        <div className='pop_txt_head_rght_cont'>
                                        <div className='pop_txt_head_rght_cont_swt'>
                                        <input type="checkbox" checked={this._get_element_by_index(row_id,element_id).enabled} id="switch" onChange={(e)=>{    
                                             this._get_element_by_index(row_id,element_id).enabled = !(this._get_element_by_index(row_id,element_id).enabled)
                                             this.forceUpdate();
                                        }} />
                                        <label for="switch" className='ele_pop_elem_lab'>Toggle</label>
                                        </div>
                                        <div className='pop_txt_head_rght_cont_del_swt'>
                                                  <button className='pop_txt_head_rght_cont_del_swt_butt'
                                                   onClick={()=>{
                                                       this._get_element_by_index(row_id,element_id).deleted = true;
                                                       this._add_notification("Text element deleted","danger",1000);
                                                       this._set_selec_element_id(-1)
                                                       //$('.popover_txt_class').hide();
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
                         <div>
                         <div className='ele_menu_bdy_main_cont'>
                                   <div>
                                                            <ImageUploading
                                                                 multiple={false}
                                                                 value={this._get_element_by_index(row_id,element_id).image_data}
                                                                 onChange={(imageList,addUpdateIndex)=>{
                                                                      this._get_element_by_index(row_id,element_id).image_data = imageList;
                                                                      console.log(imageList);
                                                                      this.forceUpdate(); 
                                                                 }}
                                                                 maxNumber={1}
                                                                 dataURLKey="data_url"
                                                                 >
                                                                 {({
                                                                      imageList,
                                                                      onImageUpload,
                                                                      onImageRemoveAll,
                                                                      onImageUpdate,
                                                                      onImageRemove,
                                                                      isDragging,
                                                                      dragProps,
                                                                 }) => (
                                                                      <div className="upload__image-wrapper">
                                                                      {this._get_element_by_index(row_id,element_id).image_data===null?<Button variant={'primary'} className='upload__image-wrapper_butt' onClick={onImageUpload}>Upload</Button>:undefined}
                                                                      {imageList.map((image, index) => (
                                                                      <div key={index} className="image-item">
                                                                           <img src={image['data_url']} className='image_img' alt="" width="100" />
                                                                           <div className="image-item__btn-wrapper">
                                                                           <Button variant={'primary'} className='image-item__btn-wrapper_butt'  onClick={() => onImageUpdate(index)}>Update</Button>
                                                                           {/* <Button variant={'primary'} className='image-item__btn-wrapper_butt'  onClick={() => onImageRemove(index)}>Remove</Button> */}
                                                                           </div>
                                                                      </div>
                                                                      ))}
                                                                      </div>
                                                                 )}
                                                                 </ImageUploading>
                                                  </div>
                              </div>    
                              <Accordion className='ele_men_acrd_main_cont'>
                                   <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main'>
                                        <div className='_ele_acrd_header_main_cont'>
                                        <svg   className='_ele_acrd_header_main_cont_left_ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z"/></svg>
                                        <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                        Background 
                                        </div>
                                   </Accordion.Toggle>
                              <Accordion.Collapse eventKey="0">
                                   <div className='ele_menu_bdy_main_cont'>
                                   <div className='ele_pop_bdy_opt_main_cont'>
                                   <div className='ele_pop_bdy_txt'>Box shadow</div>        
                                   <input className='ele_pop_bdy_chck_cont' checked={this._get_element_by_index(row_id,element_id).style.box_shadow_enable} type='checkbox' onClick={
                                        (e)=>{this._get_element_by_index(row_id,element_id).style.box_shadow_enable=!this._get_element_by_index(row_id,element_id).style.box_shadow_enable
                                             this.forceUpdate();
                                        }
                                   }></input>
                                   </div>

                                   <div className='ele_pop_bdy_txt'>Box shadow</div>
                                   <div className='ele_pop_box_shad_main_cont'>

                                        <div className='ele_pop_box_shad_main_cont_row'>
                                        <div className='ele_pop_box_shad_main_txt_main_cont'>
                                        <div className='ele_pop_box_shad_main_txt_main_cont_lab'>X</div>
                                        <input type='text' className='ele_pop_box_shad_main_txt' value={this._get_element_by_index(row_id,element_id).style.box_shadow_x}
                                        onChange={(e)=>{
                                             this._get_element_by_index(row_id,element_id).style.box_shadow_x = e.target.value
                                             this.forceUpdate();
                                        }}
                                        ></input>
                                        </div>
                                        <div className='ele_pop_box_shad_main_txt_main_cont'>
                                        <div className='ele_pop_box_shad_main_txt_main_cont_lab'>Y</div>
                                        <input type='text' className='ele_pop_box_shad_main_txt' value={this._get_element_by_index(row_id,element_id).style.box_shadow_y}
                                        onChange={(e)=>{
                                             this._get_element_by_index(row_id,element_id).style.box_shadow_y = e.target.value
                                             this.forceUpdate();
                                        }}></input>
                                        </div>
                                        </div>

                                        <div className='ele_pop_box_shad_main_cont_row'>
                                        <div className='ele_pop_box_shad_main_txt_main_cont'>
                                        <div className='ele_pop_box_shad_main_txt_main_cont_lab'>Blur</div>
                                        <input type='text' className='ele_pop_box_shad_main_txt' value={this._get_element_by_index(row_id,element_id).style.box_shadow_blur}
                                        onChange={(e)=>{
                                             this._get_element_by_index(row_id,element_id).style.box_shadow_blur = e.target.value
                                             this.forceUpdate();
                                        }}></input>
                                        </div>

                                        <div className='ele_pop_box_shad_main_txt_main_cont'>
                                        <div className='ele_pop_box_shad_main_txt_main_cont_lab'>Spread</div>
                                        <input type='text' className='ele_pop_box_shad_main_txt' value={this._get_element_by_index(row_id,element_id).style.box_shadow_spread}
                                        onChange={(e)=>{
                                             this._get_element_by_index(row_id,element_id).style.box_shadow_spread = e.target.value
                                             this.forceUpdate();
                                        }}></input>
                                        </div>
                                        </div>
                                        <div className='ele_pop_bdy_txt'>Shadow Color</div>
                                        <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={<Popover id="popover-basic"  className='element_color_pick_popover'    backdropClassName="backdrop">
                                             <ChromePicker
                                                  color={this._get_element_by_index(row_id,element_id).style.box_shadow_color}
                                                  onChange={(col)=>{                                             
                                                       this._get_element_by_index(row_id,element_id).style.box_shadow_color = `rgba(${col.rgb.r},${col.rgb.g},${col.rgb.b},${col.rgb.a})`;
                                                       this.forceUpdate()
                                        }}
                                        onChangeComplete={()=>{this.forceUpdate()}}
                                   >
                                   </ChromePicker>
                                   </Popover>}
                                   >
                                   <Button variant={'light'} className='ele_pop_bdy_col_butt'>
                                        <div className='ele_pop_bdy_col_butt_col' style={{backgroundColor: this._get_element_by_index(row_id,element_id).style.box_shadow_color!==null? this._get_element_by_index(row_id,element_id).style.box_shadow_color:'#fff'}}></div>
                                        {this._get_element_by_index(row_id,element_id).style.box_shadow_color===undefined?'none':this._get_element_by_index(row_id,element_id).style.box_shadow_color}
                                   </Button>
                                   </OverlayTrigger>
                                   </div>

                                   <div className='ele_pop_bdy_txt'>Background Color</div>
                                   <OverlayTrigger
                                   trigger="click"
                                   placement="left"
                                   rootClose={true}
                                   overlay={<Popover id="popover-basic"  className='element_color_pick_popover'    backdropClassName="backdrop">
                                   <ChromePicker
                                        color={this._get_element_by_index(row_id,element_id).style.back_color}
                                        onChange={(col)=>{
                                             
                                             this._get_element_by_index(row_id,element_id).style.back_color = `rgba(${col.rgb.r},${col.rgb.g},${col.rgb.b},${col.rgb.a})`;

                                             this.forceUpdate()
                                        }}
                                        onChangeComplete={()=>{this.forceUpdate()}}
                                   >
                                   </ChromePicker>
                                   </Popover>}
                                   >
                                   <Button variant={'light'} className='ele_pop_bdy_col_butt'>
                                        <div className='ele_pop_bdy_col_butt_col' style={{backgroundColor:this._get_element_by_index(row_id,element_id).style.back_color!==null?this._get_element_by_index(row_id,element_id).style.back_color:'#fff'}}></div>
                                        {this._get_element_by_index(row_id,element_id).style.back_color===undefined?'none':this._get_element_by_index(row_id,element_id).style.back_color}
                                   </Button>
                                   </OverlayTrigger>
                                        
                                   
                                   </div>
                              </Accordion.Collapse>
                              </Accordion>
                              <Accordion className='ele_men_acrd_main_cont'>
                                   <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main' >
                                        <div className='_ele_acrd_header_main_cont'>
                                        <svg className='_ele_acrd_header_main_cont_left_ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M15 21h2v-2h-2v2zm4 0h2v-2h-2v2zM7 21h2v-2H7v2zm4 0h2v-2h-2v2zm8-4h2v-2h-2v2zm0-4h2v-2h-2v2zM3 3v18h2V5h16V3H3zm16 6h2V7h-2v2z"/></svg>
                                        <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                        Border 
                                        <div className='_ele_acrd_menu_chck_main_cont'>
                                             <input type='checkbox' className='_ele_acrd_menu_chck' checked={this._get_element_by_index(row_id,element_id).style.bordered}
                                        onClick={(e)=>{
                                             this._get_element_by_index(row_id,element_id).style.bordered = !this._get_element_by_index(row_id,element_id).style.bordered
                                             this.forceUpdate();
                                        }}
                                        ></input></div></div>
                                   </Accordion.Toggle>
                              <Accordion.Collapse eventKey="0">
                                   <div className='ele_menu_bdy_main_cont'>
                                             <div className='ele_pop_bdy_txt'>Border width</div>    
                                             <div className='ele_pop_bdy_slid_cont'>
                                             {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.border_width),0,100,(val)=>{this._get_element_by_index(row_id,element_id).style.border_width = val;})}
                                             </div>
                                             
                                             <div className='ele_pop_bdy_txt'>Border raidus</div>    
                                             <div className='ele_pop_bdy_slid_cont'>
                                             {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.border_radius),0,100,(val)=>{this._get_element_by_index(row_id,element_id).style.border_radius = val;})}
                                             </div>

                                             <div className='ele_pop_bdy_txt'>Border Color</div>
                                                  <OverlayTrigger
                                                  trigger="click"
                                                  placement="left"
                                                  rootClose={true}
                                                  overlay={<Popover id="popover-basic"  className='element_color_pick_popover'    backdropClassName="backdrop">
                                                  <ChromePicker
                                                       color={this._get_element_by_index(row_id,element_id).style.border_color}
                                                       onChange={(col)=>{
                                                            this._get_element_by_index(row_id,element_id).style.border_color = `rgba(${col.rgb.r},${col.rgb.g},${col.rgb.b},${col.rgb.a})`;
                                                            this.forceUpdate()
                                                       }}
                                                       onChangeComplete={()=>{this.forceUpdate()}}
                                                  >
                                                  </ChromePicker>
                                                  </Popover>}
                                                  >
                                                  <Button variant={'light'} className='ele_pop_bdy_col_butt'>
                                                       <div className='ele_pop_bdy_col_butt_col' style={{backgroundColor:this._get_element_by_index(row_id,element_id).style.border_color!==null?this._get_element_by_index(row_id,element_id).style.border_color:'#fff'}}></div>
                                                       {this._get_element_by_index(row_id,element_id).style.border_color}
                                                  </Button>
                                                  </OverlayTrigger>     
                                   
                                   </div>
                              </Accordion.Collapse>
                              </Accordion>                                  
                              <Accordion className='ele_men_acrd_main_cont'>
                                   <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main'>
                                        <div className='_ele_acrd_header_main_cont'>
                                        <svg  className='_ele_acrd_header_main_cont_left_ico'  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z"/></svg>
                                        <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                        Alignment 
                                        </div>
                                   </Accordion.Toggle>
                              <Accordion.Collapse eventKey="0">
                                   <div className='ele_menu_bdy_main_cont'>
                                        <div className='ele_pop_bdy_opt_main_cont'>
                                        <div className='ele_pop_bdy_txt'>Vertically center</div>        
                                        <input className='ele_pop_bdy_chck_cont' checked={this._get_element_by_index(row_id,element_id).style.vertical_center} type='checkbox' onClick={
                                             (e)=>{this._get_element_by_index(row_id,element_id).style.vertical_center=!this._get_element_by_index(row_id,element_id).style.vertical_center
                                                  this.forceUpdate();
                                             }
                                        }></input>
                                        </div>

                                        <ToggleButtonGroup name='txt_algn_rad_ele_pop' type="radio" defaultValue={this._get_element_by_index(row_id,element_id).style.text_align} className="mb-2"
                                        onChange={(val)=>{
                                             this._get_element_by_index(row_id,element_id).style.text_align =  val;
                                             this.forceUpdate();
                                        }}
                                        >
                                        <ToggleButton value={'start'} className='txt_algn_rad_ele_pop_butt'>Left</ToggleButton>
                                        <ToggleButton value={'center'} className='txt_algn_rad_ele_pop_butt'>Center</ToggleButton>
                                        <ToggleButton value={'end'} className='txt_algn_rad_ele_pop_butt'>Right </ToggleButton>
                                        </ToggleButtonGroup>
                                   </div>
                              </Accordion.Collapse>
                              </Accordion>
                              <Accordion className='ele_men_acrd_main_cont'>
                                   <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main'>
                                        <div className='_ele_acrd_header_main_cont'>
                                        <svg className='_ele_acrd_header_main_cont_left_ico' xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"/></g><g><g/><polygon points="13,6.99 16,6.99 12,3 8,6.99 11,6.99 11,17.01 8,17.01 12,21 16,17.01 13,17.01"/></g></svg>
                                        <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                        Width and Height 
                                        </div>
                                   </Accordion.Toggle>
                              <Accordion.Collapse eventKey="0">
                                   <div className='ele_menu_bdy_main_cont'>
                                   <div className='ele_pop_bdy_txt'>Width</div>    
                                             <div className='ele_pop_bdy_slid_cont'>
                                             {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.element_width),0,900,(val)=>{this._get_element_by_index(row_id,element_id).style.element_width = val;})}
                                             </div>

                                             <div className='ele_pop_bdy_txt'>Height</div>    
                                             <div className='ele_pop_bdy_slid_cont'>
                                             {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.element_height),0,900,(val)=>{this._get_element_by_index(row_id,element_id).style.element_height = val;})}
                                             </div>
                                   </div>
                              </Accordion.Collapse>
                              </Accordion>
                              <Accordion className='ele_men_acrd_main_cont'>
                                   <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main'>
                                        <div className='_ele_acrd_header_main_cont'>
                                        <svg className='_ele_acrd_header_main_cont_left_ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H3V8h2v4h2V8h2v4h2V8h2v4h2V8h2v4h2V8h2v8z"/></svg>
                                        <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                             Margin
                                        </div>
                                   </Accordion.Toggle>
                              <Accordion.Collapse eventKey="0">
                                   <div className='ele_menu_bdy_main_cont'>
                                        <div className='ele_pop_bdy_txt'>Margin left</div>    
                                                  <div className='ele_pop_bdy_slid_cont'>
                                                  {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.margin_left),0,900,(val)=>{this._get_element_by_index(row_id,element_id).style.margin_left = val;})}
                                                  </div>

                                                  <div className='ele_pop_bdy_txt'>Margin right</div>    
                                                  <div className='ele_pop_bdy_slid_cont'>
                                                  {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.margin_right),0,900,(val)=>{this._get_element_by_index(row_id,element_id).style.margin_right = val;})}
                                                  </div>


                                        <div className='ele_pop_bdy_txt'>Margin top</div>    
                                        <div className='ele_pop_bdy_slid_cont'>
                                        {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.margin_top),0,900,(val)=>{this._get_element_by_index(row_id,element_id).style.margin_top = val;})}
                                        </div>
                                        <div className='ele_pop_bdy_txt'>Margin bottom</div>    
                                        <div className='ele_pop_bdy_slid_cont'>
                                        {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.margin_bottom),0,900,(val)=>{this._get_element_by_index(row_id,element_id).style.margin_bottom = val;})}
                                        </div>
                                   </div>
                              </Accordion.Collapse>
                              </Accordion>
                              <Accordion className='ele_men_acrd_main_cont'>
                                   <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main'>
                                        <div className='_ele_acrd_header_main_cont'>
                                        <svg className='_ele_acrd_header_main_cont_left_ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18 9v4H6V9H4v6h16V9z"/></svg>
                                        <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                             Padding
                                        </div>
                                   </Accordion.Toggle>
                              <Accordion.Collapse eventKey="0">
                                   <div className='ele_menu_bdy_main_cont'>
                                        
                                   <div className='ele_pop_bdy_txt'>Padding left</div>    
                                   <div className='ele_pop_bdy_slid_cont'>
                                   {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.padding_left),0,900,(val)=>{this._get_element_by_index(row_id,element_id).style.padding_left = val;})}
                                   </div>
                                   <div className='ele_pop_bdy_txt'>Padding right</div>    
                                   <div className='ele_pop_bdy_slid_cont'>
                                        {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.padding_right),0,900,(val)=>{this._get_element_by_index(row_id,element_id).style.padding_right = val;})}
                                   </div>

                                   <div className='ele_pop_bdy_txt'>Padding top</div>    
                                   <div className='ele_pop_bdy_slid_cont'>
                                   {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.padding_top),0,900,(val)=>{this._get_element_by_index(row_id,element_id).style.padding_top = val;})}
                                   </div>
                                   <div className='ele_pop_bdy_txt'>Padding bottom</div>    
                                   <div className='ele_pop_bdy_slid_cont'>
                                   {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.padding_bottom),0,900,(val)=>{this._get_element_by_index(row_id,element_id).style.padding_bottom = val;})}
                                   </div>
                                   </div>
                              </Accordion.Collapse>
                              </Accordion>
                                   </div>
                         </div>
               </div>);}
               else{
                    return(<div>Fault Menu</div>)
               }
     }
     _render_link_menu(element_id,row_id){
          if(this._get_element_by_index(row_id,element_id)!==false){ 
               return(
               <div className='ele_pop_main_bdy'>
                         <div className='pop_txt_head_main_cont'>
                                   <div className='pop_txt_head_txt'>Link</div>
                                        <div className='pop_txt_head_rght_cont'>
                                        <div className='pop_txt_head_rght_cont_swt'>
                                        <input type="checkbox" checked={this._get_element_by_index(row_id,element_id).enabled} id="switch" onChange={(e)=>{    
                                             this._get_element_by_index(row_id,element_id).enabled = !(this._get_element_by_index(row_id,element_id).enabled)
                                             this.forceUpdate();
                                        }} />
                                        <label for="switch" className='ele_pop_elem_lab'>Toggle</label>
                                        </div>
                                        <div className='pop_txt_head_rght_cont_del_swt'>
                                                  <button className='pop_txt_head_rght_cont_del_swt_butt'
                                                   onClick={()=>{
                                                       this._get_element_by_index(row_id,element_id).deleted = true;
                                                       this._add_notification("Text element deleted","danger",1000);
                                                       this._set_selec_element_id(-1)
                                                       //$('.popover_txt_class').hide();
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
                         <div>
                         <div className='ele_menu_bdy_main_cont'>
                                   <div className='ele_pop_bdy_txt'>Url</div>
                                             <input  
                                                  type='url'
                                             placeholder='Text Value' 
                                             className='ele_lnk_tit_pop_cont' 
                                             value={this._get_element_by_index(row_id,element_id).element_url!==undefined?this._get_element_by_index(row_id,element_id).element_url:"undefined"}
                                             onChange={(e)=>{
                                                  this._get_element_by_index(row_id,element_id).element_url  = e.target.value;
                                                  this.forceUpdate();
                                             }} />

                                             <div className='ele_pop_bdy_txt'>Title</div>
                                             <input  
                                                  type='text'
                                             placeholder='Text Value' 
                                             className='ele_lnk_tit_pop_cont' 
                                             value={this._get_element_by_index(row_id,element_id).data!==undefined?this._get_element_by_index(row_id,element_id).data:"undefined"}
                                             onChange={(e)=>{
                                                  this._get_element_by_index(row_id,element_id).data  = e.target.value;
                                                  this.forceUpdate();
                                             }} />
                              </div>
                              <Accordion className='ele_men_acrd_main_cont'>
                                   <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main'>
                                        <div className='_ele_acrd_header_main_cont'>
                                        <svg className='_ele_acrd_header_main_cont_left_ico' xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M5 17v2h14v-2H5zm4.5-4.2h5l.9 2.2h2.1L12.75 4h-1.5L6.5 15h2.1l.9-2.2zM12 5.98L13.87 11h-3.74L12 5.98z"/></svg>
                                        <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                             Font
                                        </div>
                                   </Accordion.Toggle>
                              <Accordion.Collapse eventKey="0">
                                   <div className='ele_menu_bdy_main_cont'>
                                             <DropdownButton variant={'light'} id="font_choice_drop_menu" title={this._get_element_by_index(row_id,element_id).style.font_family}>
                                                  {this._draw_font_family(element_id,row_id)}
                                             </DropdownButton>
                                             <div className='ele_pop_bdy_txt'>Font Size</div>    
                                                  <div className='ele_pop_bdy_slid_cont'>
                                                  {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.font_size),0,100,(val)=>{this._get_element_by_index(row_id,element_id).style.font_size = val;})}
                                             </div>
                                   
                                             <div className='ele_pop_bdy_txt'>Font weight</div>    
                                                  <div className='ele_pop_bdy_slid_cont'>
                                                  {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.font_weight),0,900,(val)=>{this._get_element_by_index(row_id,element_id).style.font_weight = val;})}
                                             </div>
                                                  <div className='ele_pop_bdy_txt'>Text Color</div>
                                                       <OverlayTrigger
                                                       trigger="click"
                                                       placement="left"
                                                       rootClose={true}
                                                       overlay={<Popover id="popover-basic"  className='element_color_pick_popover'    backdropClassName="backdrop">
                                                       <ChromePicker
                                                            color={this._get_element_by_index(row_id,element_id).style.text_color}
                                                            onChange={(col)=>{
                                                                 this._get_element_by_index(row_id,element_id).style.text_color = `rgba(${col.rgb.r},${col.rgb.g},${col.rgb.b},${col.rgb.a})`;
                                                                 
                                                                 this.forceUpdate()
                                                            }}
                                                            onChangeComplete={()=>{this.forceUpdate()}}
                                                       >
                                                       </ChromePicker>
                                                       </Popover>}
                                                       >
                                                       <Button variant={'light'} className='ele_pop_bdy_col_butt'>
                                                            <div className='ele_pop_bdy_col_butt_col' style={{backgroundColor:this._get_element_by_index(row_id,element_id).style.text_color!==null?this._get_element_by_index(row_id,element_id).style.text_color:'#fff'}}></div>
                                                            {this._get_element_by_index(row_id,element_id).style.text_color}
                                                       </Button>
                                                       </OverlayTrigger>
                                   
                                   </div>
                              </Accordion.Collapse>
                              </Accordion>
                              <Accordion className='ele_men_acrd_main_cont'>
                                   <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main'>
                                        <div className='_ele_acrd_header_main_cont'>
                                        <svg   className='_ele_acrd_header_main_cont_left_ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z"/></svg>
                                        <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                        Background 
                                        </div>
                                   </Accordion.Toggle>
                              <Accordion.Collapse eventKey="0">
                                   <div className='ele_menu_bdy_main_cont'>
                                   <div className='ele_pop_bdy_opt_main_cont'>
                                   <div className='ele_pop_bdy_txt'>Box shadow</div>        
                                   <input className='ele_pop_bdy_chck_cont' checked={this._get_element_by_index(row_id,element_id).style.box_shadow_enable} type='checkbox' onClick={
                                        (e)=>{this._get_element_by_index(row_id,element_id).style.box_shadow_enable=!this._get_element_by_index(row_id,element_id).style.box_shadow_enable
                                             this.forceUpdate();
                                        }
                                   }></input>
                                   </div>

                                   <div className='ele_pop_bdy_txt'>Box shadow</div>
                                   <div className='ele_pop_box_shad_main_cont'>

                                        <div className='ele_pop_box_shad_main_cont_row'>
                                        <div className='ele_pop_box_shad_main_txt_main_cont'>
                                        <div className='ele_pop_box_shad_main_txt_main_cont_lab'>X</div>
                                        <input type='text' className='ele_pop_box_shad_main_txt' value={this._get_element_by_index(row_id,element_id).style.box_shadow_x}
                                        onChange={(e)=>{
                                             this._get_element_by_index(row_id,element_id).style.box_shadow_x = e.target.value
                                             this.forceUpdate();
                                        }}
                                        ></input>
                                        </div>
                                        <div className='ele_pop_box_shad_main_txt_main_cont'>
                                        <div className='ele_pop_box_shad_main_txt_main_cont_lab'>Y</div>
                                        <input type='text' className='ele_pop_box_shad_main_txt' value={this._get_element_by_index(row_id,element_id).style.box_shadow_y}
                                        onChange={(e)=>{
                                             this._get_element_by_index(row_id,element_id).style.box_shadow_y = e.target.value
                                             this.forceUpdate();
                                        }}></input>
                                        </div>
                                        </div>

                                        <div className='ele_pop_box_shad_main_cont_row'>
                                        <div className='ele_pop_box_shad_main_txt_main_cont'>
                                        <div className='ele_pop_box_shad_main_txt_main_cont_lab'>Blur</div>
                                        <input type='text' className='ele_pop_box_shad_main_txt' value={this._get_element_by_index(row_id,element_id).style.box_shadow_blur}
                                        onChange={(e)=>{
                                             this._get_element_by_index(row_id,element_id).style.box_shadow_blur = e.target.value
                                             this.forceUpdate();
                                        }}></input>
                                        </div>

                                        <div className='ele_pop_box_shad_main_txt_main_cont'>
                                        <div className='ele_pop_box_shad_main_txt_main_cont_lab'>Spread</div>
                                        <input type='text' className='ele_pop_box_shad_main_txt' value={this._get_element_by_index(row_id,element_id).style.box_shadow_spread}
                                        onChange={(e)=>{
                                             this._get_element_by_index(row_id,element_id).style.box_shadow_spread = e.target.value
                                             this.forceUpdate();
                                        }}></input>
                                        </div>
                                        </div>
                                        <div className='ele_pop_bdy_txt'>Shadow Color</div>
                                        <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={<Popover id="popover-basic"  className='element_color_pick_popover'    backdropClassName="backdrop">
                                             <ChromePicker
                                                  color={this._get_element_by_index(row_id,element_id).style.box_shadow_color}
                                                  onChange={(col)=>{                                             
                                                       this._get_element_by_index(row_id,element_id).style.box_shadow_color = `rgba(${col.rgb.r},${col.rgb.g},${col.rgb.b},${col.rgb.a})`;
                                                       this.forceUpdate()
                                        }}
                                        onChangeComplete={()=>{this.forceUpdate()}}
                                   >
                                   </ChromePicker>
                                   </Popover>}
                                   >
                                   <Button variant={'light'} className='ele_pop_bdy_col_butt'>
                                        <div className='ele_pop_bdy_col_butt_col' style={{backgroundColor: this._get_element_by_index(row_id,element_id).style.box_shadow_color!==null? this._get_element_by_index(row_id,element_id).style.box_shadow_color:'#fff'}}></div>
                                        {this._get_element_by_index(row_id,element_id).style.box_shadow_color===undefined?'none':this._get_element_by_index(row_id,element_id).style.box_shadow_color}
                                   </Button>
                                   </OverlayTrigger>
                                   </div>

                                   <div className='ele_pop_bdy_txt'>Background Color</div>
                                   <OverlayTrigger
                                   trigger="click"
                                   placement="left"
                                   rootClose={true}
                                   overlay={<Popover id="popover-basic"  className='element_color_pick_popover'    backdropClassName="backdrop">
                                   <ChromePicker
                                        color={this._get_element_by_index(row_id,element_id).style.back_color}
                                        onChange={(col)=>{
                                             
                                             this._get_element_by_index(row_id,element_id).style.back_color = `rgba(${col.rgb.r},${col.rgb.g},${col.rgb.b},${col.rgb.a})`;

                                             this.forceUpdate()
                                        }}
                                        onChangeComplete={()=>{this.forceUpdate()}}
                                   >
                                   </ChromePicker>
                                   </Popover>}
                                   >
                                   <Button variant={'light'} className='ele_pop_bdy_col_butt'>
                                        <div className='ele_pop_bdy_col_butt_col' style={{backgroundColor:this._get_element_by_index(row_id,element_id).style.back_color!==null?this._get_element_by_index(row_id,element_id).style.back_color:'#fff'}}></div>
                                        {this._get_element_by_index(row_id,element_id).style.back_color===undefined?'none':this._get_element_by_index(row_id,element_id).style.back_color}
                                   </Button>
                                   </OverlayTrigger>
                                        
                                   
                                   </div>
                              </Accordion.Collapse>
                              </Accordion>
                              <Accordion className='ele_men_acrd_main_cont'>
                                   <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main' >
                                        <div className='_ele_acrd_header_main_cont'>
                                        <svg className='_ele_acrd_header_main_cont_left_ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M15 21h2v-2h-2v2zm4 0h2v-2h-2v2zM7 21h2v-2H7v2zm4 0h2v-2h-2v2zm8-4h2v-2h-2v2zm0-4h2v-2h-2v2zM3 3v18h2V5h16V3H3zm16 6h2V7h-2v2z"/></svg>
                                        <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                        Border 
                                        <div className='_ele_acrd_menu_chck_main_cont'>
                                             <input type='checkbox' className='_ele_acrd_menu_chck' checked={this._get_element_by_index(row_id,element_id).style.bordered}
                                        onClick={(e)=>{
                                             this._get_element_by_index(row_id,element_id).style.bordered = !this._get_element_by_index(row_id,element_id).style.bordered
                                             this.forceUpdate();
                                        }}
                                        ></input></div></div>
                                   </Accordion.Toggle>
                              <Accordion.Collapse eventKey="0">
                                   <div className='ele_menu_bdy_main_cont'>
                                             <div className='ele_pop_bdy_txt'>Border width</div>    
                                             <div className='ele_pop_bdy_slid_cont'>
                                             {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.border_width),0,100,(val)=>{this._get_element_by_index(row_id,element_id).style.border_width = val;})}
                                             </div>
                                             
                                             <div className='ele_pop_bdy_txt'>Border raidus</div>    
                                             <div className='ele_pop_bdy_slid_cont'>
                                             {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.border_radius),0,100,(val)=>{this._get_element_by_index(row_id,element_id).style.border_radius = val;})}
                                             </div>

                                             <div className='ele_pop_bdy_txt'>Border Color</div>
                                                  <OverlayTrigger
                                                  trigger="click"
                                                  placement="left"
                                                  rootClose={true}
                                                  overlay={<Popover id="popover-basic"  className='element_color_pick_popover'    backdropClassName="backdrop">
                                                  <ChromePicker
                                                       color={this._get_element_by_index(row_id,element_id).style.border_color}
                                                       onChange={(col)=>{
                                                            this._get_element_by_index(row_id,element_id).style.border_color = `rgba(${col.rgb.r},${col.rgb.g},${col.rgb.b},${col.rgb.a})`;
                                                            this.forceUpdate()
                                                       }}
                                                       onChangeComplete={()=>{this.forceUpdate()}}
                                                  >
                                                  </ChromePicker>
                                                  </Popover>}
                                                  >
                                                  <Button variant={'light'} className='ele_pop_bdy_col_butt'>
                                                       <div className='ele_pop_bdy_col_butt_col' style={{backgroundColor:this._get_element_by_index(row_id,element_id).style.border_color!==null?this._get_element_by_index(row_id,element_id).style.border_color:'#fff'}}></div>
                                                       {this._get_element_by_index(row_id,element_id).style.border_color}
                                                  </Button>
                                                  </OverlayTrigger>     
                                   
                                   </div>
                              </Accordion.Collapse>
                              </Accordion>                                  
                              <Accordion className='ele_men_acrd_main_cont'>
                                   <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main'>
                                        <div className='_ele_acrd_header_main_cont'>
                                        <svg  className='_ele_acrd_header_main_cont_left_ico'  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z"/></svg>
                                        <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                        Alignment 
                                        </div>
                                   </Accordion.Toggle>
                              <Accordion.Collapse eventKey="0">
                                   <div className='ele_menu_bdy_main_cont'>
                                        <div className='ele_pop_bdy_opt_main_cont'>
                                        <div className='ele_pop_bdy_txt'>Vertically center</div>        
                                        <input className='ele_pop_bdy_chck_cont' checked={this._get_element_by_index(row_id,element_id).style.vertical_center} type='checkbox' onClick={
                                             (e)=>{this._get_element_by_index(row_id,element_id).style.vertical_center=!this._get_element_by_index(row_id,element_id).style.vertical_center
                                                  this.forceUpdate();
                                             }
                                        }></input>
                                        </div>

                                        <ToggleButtonGroup name='txt_algn_rad_ele_pop' type="radio" defaultValue={this._get_element_by_index(row_id,element_id).style.text_align} className="mb-2"
                                        onChange={(val)=>{
                                             this._get_element_by_index(row_id,element_id).style.text_align =  val;
                                             this.forceUpdate();
                                        }}
                                        >
                                        <ToggleButton value={'start'} className='txt_algn_rad_ele_pop_butt'>Left</ToggleButton>
                                        <ToggleButton value={'center'} className='txt_algn_rad_ele_pop_butt'>Center</ToggleButton>
                                        <ToggleButton value={'end'} className='txt_algn_rad_ele_pop_butt'>Right </ToggleButton>
                                        </ToggleButtonGroup>
                                   </div>
                              </Accordion.Collapse>
                              </Accordion>
                              <Accordion className='ele_men_acrd_main_cont'>
                                   <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main'>
                                        <div className='_ele_acrd_header_main_cont'>
                                        <svg className='_ele_acrd_header_main_cont_left_ico' xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"/></g><g><g/><polygon points="13,6.99 16,6.99 12,3 8,6.99 11,6.99 11,17.01 8,17.01 12,21 16,17.01 13,17.01"/></g></svg>
                                        <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                        Width and Height 
                                        </div>
                                   </Accordion.Toggle>
                              <Accordion.Collapse eventKey="0">
                                   <div className='ele_menu_bdy_main_cont'>
                                   <div className='ele_pop_bdy_txt'>Width</div>    
                                             <div className='ele_pop_bdy_slid_cont'>
                                             {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.element_width),0,900,(val)=>{this._get_element_by_index(row_id,element_id).style.element_width = val;})}
                                             </div>

                                             <div className='ele_pop_bdy_txt'>Height</div>    
                                             <div className='ele_pop_bdy_slid_cont'>
                                             {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.element_height),0,900,(val)=>{this._get_element_by_index(row_id,element_id).style.element_height = val;})}
                                             </div>
                                   </div>
                              </Accordion.Collapse>
                              </Accordion>
                              <Accordion className='ele_men_acrd_main_cont'>
                                   <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main'>
                                        <div className='_ele_acrd_header_main_cont'>
                                        <svg className='_ele_acrd_header_main_cont_left_ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H3V8h2v4h2V8h2v4h2V8h2v4h2V8h2v4h2V8h2v8z"/></svg>
                                        <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                             Margin
                                        </div>
                                   </Accordion.Toggle>
                              <Accordion.Collapse eventKey="0">
                                   <div className='ele_menu_bdy_main_cont'>
                                        <div className='ele_pop_bdy_txt'>Margin left</div>    
                                                  <div className='ele_pop_bdy_slid_cont'>
                                                  {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.margin_left),0,900,(val)=>{this._get_element_by_index(row_id,element_id).style.margin_left = val;})}
                                                  </div>

                                                  <div className='ele_pop_bdy_txt'>Margin right</div>    
                                                  <div className='ele_pop_bdy_slid_cont'>
                                                  {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.margin_right),0,900,(val)=>{this._get_element_by_index(row_id,element_id).style.margin_right = val;})}
                                                  </div>


                                        <div className='ele_pop_bdy_txt'>Margin top</div>    
                                        <div className='ele_pop_bdy_slid_cont'>
                                        {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.margin_top),0,900,(val)=>{this._get_element_by_index(row_id,element_id).style.margin_top = val;})}
                                        </div>
                                        <div className='ele_pop_bdy_txt'>Margin bottom</div>    
                                        <div className='ele_pop_bdy_slid_cont'>
                                        {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.margin_bottom),0,900,(val)=>{this._get_element_by_index(row_id,element_id).style.margin_bottom = val;})}
                                        </div>
                                   </div>
                              </Accordion.Collapse>
                              </Accordion>
                              <Accordion className='ele_men_acrd_main_cont'>
                                   <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main'>
                                        <div className='_ele_acrd_header_main_cont'>
                                        <svg className='_ele_acrd_header_main_cont_left_ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18 9v4H6V9H4v6h16V9z"/></svg>
                                        <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                             Padding
                                        </div>
                                   </Accordion.Toggle>
                              <Accordion.Collapse eventKey="0">
                                   <div className='ele_menu_bdy_main_cont'>
                                        
                                   <div className='ele_pop_bdy_txt'>Padding left</div>    
                                   <div className='ele_pop_bdy_slid_cont'>
                                   {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.padding_left),0,900,(val)=>{this._get_element_by_index(row_id,element_id).style.padding_left = val;})}
                                   </div>
                                   <div className='ele_pop_bdy_txt'>Padding right</div>    
                                   <div className='ele_pop_bdy_slid_cont'>
                                        {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.padding_right),0,900,(val)=>{this._get_element_by_index(row_id,element_id).style.padding_right = val;})}
                                   </div>

                                   <div className='ele_pop_bdy_txt'>Padding top</div>    
                                   <div className='ele_pop_bdy_slid_cont'>
                                   {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.padding_top),0,900,(val)=>{this._get_element_by_index(row_id,element_id).style.padding_top = val;})}
                                   </div>
                                   <div className='ele_pop_bdy_txt'>Padding bottom</div>    
                                   <div className='ele_pop_bdy_slid_cont'>
                                   {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.padding_bottom),0,900,(val)=>{this._get_element_by_index(row_id,element_id).style.padding_bottom = val;})}
                                   </div>
                                   </div>
                              </Accordion.Collapse>
                              </Accordion>
                                   </div>
                         </div>
               </div>);}
               else{
                    return(<div>Fault Menu</div>)
               }
     }
     _render_menu_slider(base_val,min,max,callback){
          let perc = 0;
          return(
          <div className='ele_menu_custom_slider_main_cont'
          style={{
               pointerEvents:_SLIDER_EDIT_BOOl===true?'none':'all'

          }}
          onMouseDown={(e)=>{
               if(_SLIDER_EDIT_BOOl===false){
               _SLIDER_SELECT_BOOl = true;
               this.forceUpdate();
               }
          }} 
          onMouseMove={(e)=>{
               if(_SLIDER_SELECT_BOOl===true){
               e.persist();
               let xOffset = e.nativeEvent.offsetX; 
               let parrentWidth = e.currentTarget.offsetWidth ; 
               let slider_width =  min
               if((xOffset/parrentWidth)>min){
                     slider_width = (xOffset/parrentWidth)*max;
                     perc  =(xOffset/parrentWidth)*100;
               }
               else{
                     slider_width = min
                     perc  = 0;
               }
               callback(parseInt(slider_width.toFixed(0)))
               this.forceUpdate(); }
          }}
          onMouseUp={(e)=>{
               _SLIDER_SELECT_BOOl = false;
               this.forceUpdate();
          }}
          onMouseLeave={(e)=>{
               _SLIDER_SELECT_BOOl = false;
               this.forceUpdate();
          }}
          >
          <div className='ele_menu_custom_slider_val_cont' style={{width:((base_val/max)*100)+'%'}}></div>
          <div className='ele_menu_custom_slider_val_counter'>
                    <div className='ele_menu_custom_slider_val_counter_sub'
                      style={{
                         pointerEvents:_SLIDER_SELECT_BOOl===true?'none':'all',
                    }}
                    >
                    {<input type='text' className='ele_menu_custom_slider_val_counter_edit'
                         style={{
                              pointerEvents:_SLIDER_SELECT_BOOl===true?'none':'all',
                              color:'inherit'
                         }}
                         onFocus={(e)=>{
                              if(_SLIDER_SELECT_BOOl!==true){
                                   _SLIDER_EDIT_BOOl = true
                                   this.forceUpdate();
                              }
                         }}
                         onBlur={(e)=>{
                              _SLIDER_EDIT_BOOl = false
                              this.forceUpdate();
                         }}
                    value={base_val} onChange={(e)=>{
                         if(e.target.value == ""){
                              callback(parseInt(min))
                              this.forceUpdate();
                              return;
                         }
                         if(parseInt(e.target.value)>=min && parseInt(e.target.value)<=max){
                              callback(parseInt(e.target.value))
                         }
                         this.forceUpdate();
                    }} ></input>}
                    </div>
               </div>
          </div>)
     }
     _render_text_menu(element_id,row_id){
          if(this._get_element_by_index(row_id,element_id)!==false){ 
               return(
               <div className='ele_pop_main_bdy'>
                         <div className='pop_txt_head_main_cont'>
                                   <div className='pop_txt_head_txt'>Text</div>
                                        <div className='pop_txt_head_rght_cont'>
                                        <div className='pop_txt_head_rght_cont_swt'>
                                        <input type="checkbox" checked={this._get_element_by_index(row_id,element_id).enabled} id="switch" onChange={(e)=>{    
                                             this._get_element_by_index(row_id,element_id).enabled = !(this._get_element_by_index(row_id,element_id).enabled)
                                             this.forceUpdate();
                                        }} />
                                        <label for="switch" className='ele_pop_elem_lab'>Toggle</label>
                                        </div>
                                        <div className='pop_txt_head_rght_cont_del_swt'>
                                                  <button className='pop_txt_head_rght_cont_del_swt_butt'
                                                   onClick={()=>{
                                                       this._get_element_by_index(row_id,element_id).deleted = true;
                                                       this._add_notification("Text element deleted","danger",1000);
                                                       this._set_selec_element_id(-1)
                                                       //$('.popover_txt_class').hide();
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
                         <div>
                         <div className='ele_menu_bdy_main_cont'>
                              <div className='ele_pop_bdy_txt'>Value</div>
                                   <textarea  
                                        wrap="hard"
                                   placeholder='Text Value' 
                                   className='ele_txt_pop_cont' 
                                   value={this._get_element_by_index(row_id,element_id).data!==undefined?this._get_element_by_index(row_id,element_id).data:"undefined"}
                                   onChange={(e)=>{
                                        this._get_element_by_index(row_id,element_id).data  = e.target.value;
                                        this.forceUpdate();
                                   }} />
                            
                              </div>
                              <Accordion className='ele_men_acrd_main_cont'>
                                   <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main'>
                                        <div className='_ele_acrd_header_main_cont'>
                                        <svg className='_ele_acrd_header_main_cont_left_ico' xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M5 17v2h14v-2H5zm4.5-4.2h5l.9 2.2h2.1L12.75 4h-1.5L6.5 15h2.1l.9-2.2zM12 5.98L13.87 11h-3.74L12 5.98z"/></svg>
                                        <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                             Font
                                        </div>
                                   </Accordion.Toggle>
                              <Accordion.Collapse eventKey="0">
                                   <div className='ele_menu_bdy_main_cont'>
                                             <DropdownButton variant={'light'} id="font_choice_drop_menu" title={this._get_element_by_index(row_id,element_id).style.font_family}>
                                                  {this._draw_font_family(element_id,row_id)}
                                             </DropdownButton>
                                             <div className='ele_pop_bdy_txt'>Font Size</div>    
                                                  <div className='ele_pop_bdy_slid_cont'>
                                                  {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.font_size),0,100,(val)=>{this._get_element_by_index(row_id,element_id).style.font_size = val;})}
                                             </div>
                                   
                                             <div className='ele_pop_bdy_txt'>Font weight</div>    
                                                  <div className='ele_pop_bdy_slid_cont'>
                                                  {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.font_weight),0,900,(val)=>{this._get_element_by_index(row_id,element_id).style.font_weight = val;})}
                                             </div>
                                                  <div className='ele_pop_bdy_txt'>Text Color</div>
                                                       <OverlayTrigger
                                                       trigger="click"
                                                       placement="left"
                                                       rootClose={true}
                                                       overlay={<Popover id="popover-basic"  className='element_color_pick_popover'    backdropClassName="backdrop">
                                                       <ChromePicker
                                                            color={this._get_element_by_index(row_id,element_id).style.text_color}
                                                            onChange={(col)=>{
                                                                 this._get_element_by_index(row_id,element_id).style.text_color = `rgba(${col.rgb.r},${col.rgb.g},${col.rgb.b},${col.rgb.a})`;
                                                                 
                                                                 this.forceUpdate()
                                                            }}
                                                            onChangeComplete={()=>{this.forceUpdate()}}
                                                       >
                                                       </ChromePicker>
                                                       </Popover>}
                                                       >
                                                       <Button variant={'light'} className='ele_pop_bdy_col_butt'>
                                                            <div className='ele_pop_bdy_col_butt_col' style={{backgroundColor:this._get_element_by_index(row_id,element_id).style.text_color!==null?this._get_element_by_index(row_id,element_id).style.text_color:'#fff'}}></div>
                                                            {this._get_element_by_index(row_id,element_id).style.text_color}
                                                       </Button>
                                                       </OverlayTrigger>
                                   
                                   </div>
                              </Accordion.Collapse>
                              </Accordion>
                              <Accordion className='ele_men_acrd_main_cont'>
                                   <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main'>
                                        <div className='_ele_acrd_header_main_cont'>
                                        <svg   className='_ele_acrd_header_main_cont_left_ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z"/></svg>
                                        <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                        Background 
                                        </div>
                                   </Accordion.Toggle>
                              <Accordion.Collapse eventKey="0">
                                   <div className='ele_menu_bdy_main_cont'>
                                   <div className='ele_pop_bdy_opt_main_cont'>
                                   <div className='ele_pop_bdy_txt'>Box shadow</div>        
                                   <input className='ele_pop_bdy_chck_cont' checked={this._get_element_by_index(row_id,element_id).style.box_shadow_enable} type='checkbox' onClick={
                                        (e)=>{this._get_element_by_index(row_id,element_id).style.box_shadow_enable=!this._get_element_by_index(row_id,element_id).style.box_shadow_enable
                                             this.forceUpdate();
                                        }
                                   }></input>
                                   </div>

                                   <div className='ele_pop_bdy_txt'>Box shadow</div>
                                   <div className='ele_pop_box_shad_main_cont'>

                                        <div className='ele_pop_box_shad_main_cont_row'>
                                        <div className='ele_pop_box_shad_main_txt_main_cont'>
                                        <div className='ele_pop_box_shad_main_txt_main_cont_lab'>X</div>
                                        <input type='text' className='ele_pop_box_shad_main_txt' value={this._get_element_by_index(row_id,element_id).style.box_shadow_x}
                                        onChange={(e)=>{
                                             this._get_element_by_index(row_id,element_id).style.box_shadow_x = e.target.value
                                             this.forceUpdate();
                                        }}
                                        ></input>
                                        </div>
                                        <div className='ele_pop_box_shad_main_txt_main_cont'>
                                        <div className='ele_pop_box_shad_main_txt_main_cont_lab'>Y</div>
                                        <input type='text' className='ele_pop_box_shad_main_txt' value={this._get_element_by_index(row_id,element_id).style.box_shadow_y}
                                        onChange={(e)=>{
                                             this._get_element_by_index(row_id,element_id).style.box_shadow_y = e.target.value
                                             this.forceUpdate();
                                        }}></input>
                                        </div>
                                        </div>

                                        <div className='ele_pop_box_shad_main_cont_row'>
                                        <div className='ele_pop_box_shad_main_txt_main_cont'>
                                        <div className='ele_pop_box_shad_main_txt_main_cont_lab'>Blur</div>
                                        <input type='text' className='ele_pop_box_shad_main_txt' value={this._get_element_by_index(row_id,element_id).style.box_shadow_blur}
                                        onChange={(e)=>{
                                             this._get_element_by_index(row_id,element_id).style.box_shadow_blur = e.target.value
                                             this.forceUpdate();
                                        }}></input>
                                        </div>

                                        <div className='ele_pop_box_shad_main_txt_main_cont'>
                                        <div className='ele_pop_box_shad_main_txt_main_cont_lab'>Spread</div>
                                        <input type='text' className='ele_pop_box_shad_main_txt' value={this._get_element_by_index(row_id,element_id).style.box_shadow_spread}
                                        onChange={(e)=>{
                                             this._get_element_by_index(row_id,element_id).style.box_shadow_spread = e.target.value
                                             this.forceUpdate();
                                        }}></input>
                                        </div>
                                        </div>
                                        <div className='ele_pop_bdy_txt'>Shadow Color</div>
                                        <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={<Popover id="popover-basic"  className='element_color_pick_popover'    backdropClassName="backdrop">
                                             <ChromePicker
                                                  color={this._get_element_by_index(row_id,element_id).style.box_shadow_color}
                                                  onChange={(col)=>{                                             
                                                       this._get_element_by_index(row_id,element_id).style.box_shadow_color = `rgba(${col.rgb.r},${col.rgb.g},${col.rgb.b},${col.rgb.a})`;
                                                       this.forceUpdate()
                                        }}
                                        onChangeComplete={()=>{this.forceUpdate()}}
                                   >
                                   </ChromePicker>
                                   </Popover>}
                                   >
                                   <Button variant={'light'} className='ele_pop_bdy_col_butt'>
                                        <div className='ele_pop_bdy_col_butt_col' style={{backgroundColor: this._get_element_by_index(row_id,element_id).style.box_shadow_color!==null? this._get_element_by_index(row_id,element_id).style.box_shadow_color:'#fff'}}></div>
                                        {this._get_element_by_index(row_id,element_id).style.box_shadow_color===undefined?'none':this._get_element_by_index(row_id,element_id).style.box_shadow_color}
                                   </Button>
                                   </OverlayTrigger>
                                   </div>

                                   <div className='ele_pop_bdy_txt'>Background Color</div>
                                   <OverlayTrigger
                                   trigger="click"
                                   placement="left"
                                   rootClose={true}
                                   overlay={<Popover id="popover-basic"  className='element_color_pick_popover'    backdropClassName="backdrop">
                                   <ChromePicker
                                        color={this._get_element_by_index(row_id,element_id).style.back_color}
                                        onChange={(col)=>{
                                             
                                             this._get_element_by_index(row_id,element_id).style.back_color = `rgba(${col.rgb.r},${col.rgb.g},${col.rgb.b},${col.rgb.a})`;

                                             this.forceUpdate()
                                        }}
                                        onChangeComplete={()=>{this.forceUpdate()}}
                                   >
                                   </ChromePicker>
                                   </Popover>}
                                   >
                                   <Button variant={'light'} className='ele_pop_bdy_col_butt'>
                                        <div className='ele_pop_bdy_col_butt_col' style={{backgroundColor:this._get_element_by_index(row_id,element_id).style.back_color!==null?this._get_element_by_index(row_id,element_id).style.back_color:'#fff'}}></div>
                                        {this._get_element_by_index(row_id,element_id).style.back_color===undefined?'none':this._get_element_by_index(row_id,element_id).style.back_color}
                                   </Button>
                                   </OverlayTrigger>
                                        
                                   
                                   </div>
                              </Accordion.Collapse>
                              </Accordion>
                              <Accordion className='ele_men_acrd_main_cont'>
                                   <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main' >
                                        <div className='_ele_acrd_header_main_cont'>
                                        <svg className='_ele_acrd_header_main_cont_left_ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M15 21h2v-2h-2v2zm4 0h2v-2h-2v2zM7 21h2v-2H7v2zm4 0h2v-2h-2v2zm8-4h2v-2h-2v2zm0-4h2v-2h-2v2zM3 3v18h2V5h16V3H3zm16 6h2V7h-2v2z"/></svg>
                                        <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                        Border 
                                        <div className='_ele_acrd_menu_chck_main_cont'>
                                             <input type='checkbox' className='_ele_acrd_menu_chck' checked={this._get_element_by_index(row_id,element_id).style.bordered}
                                        onClick={(e)=>{
                                             this._get_element_by_index(row_id,element_id).style.bordered = !this._get_element_by_index(row_id,element_id).style.bordered
                                             this.forceUpdate();
                                        }}
                                        ></input></div></div>
                                   </Accordion.Toggle>
                              <Accordion.Collapse eventKey="0">
                                   <div className='ele_menu_bdy_main_cont'>
                                             <div className='ele_pop_bdy_txt'>Border width</div>    
                                             <div className='ele_pop_bdy_slid_cont'>
                                             {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.border_width),0,100,(val)=>{this._get_element_by_index(row_id,element_id).style.border_width = val;})}
                                             </div>
                                             
                                             <div className='ele_pop_bdy_txt'>Border raidus</div>    
                                             <div className='ele_pop_bdy_slid_cont'>
                                             {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.border_radius),0,100,(val)=>{this._get_element_by_index(row_id,element_id).style.border_radius = val;})}
                                             </div>

                                             <div className='ele_pop_bdy_txt'>Border Color</div>
                                                  <OverlayTrigger
                                                  trigger="click"
                                                  placement="left"
                                                  rootClose={true}
                                                  overlay={<Popover id="popover-basic"  className='element_color_pick_popover'    backdropClassName="backdrop">
                                                  <ChromePicker
                                                       color={this._get_element_by_index(row_id,element_id).style.border_color}
                                                       onChange={(col)=>{
                                                            this._get_element_by_index(row_id,element_id).style.border_color = `rgba(${col.rgb.r},${col.rgb.g},${col.rgb.b},${col.rgb.a})`;
                                                            this.forceUpdate()
                                                       }}
                                                       onChangeComplete={()=>{this.forceUpdate()}}
                                                  >
                                                  </ChromePicker>
                                                  </Popover>}
                                                  >
                                                  <Button variant={'light'} className='ele_pop_bdy_col_butt'>
                                                       <div className='ele_pop_bdy_col_butt_col' style={{backgroundColor:this._get_element_by_index(row_id,element_id).style.border_color!==null?this._get_element_by_index(row_id,element_id).style.border_color:'#fff'}}></div>
                                                       {this._get_element_by_index(row_id,element_id).style.border_color}
                                                  </Button>
                                                  </OverlayTrigger>     
                                   
                                   </div>
                              </Accordion.Collapse>
                              </Accordion>                                  
                              <Accordion className='ele_men_acrd_main_cont'>
                                   <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main'>
                                        <div className='_ele_acrd_header_main_cont'>
                                        <svg  className='_ele_acrd_header_main_cont_left_ico'  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z"/></svg>
                                        <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                        Alignment 
                                        </div>
                                   </Accordion.Toggle>
                              <Accordion.Collapse eventKey="0">
                                   <div className='ele_menu_bdy_main_cont'>
                                        <div className='ele_pop_bdy_opt_main_cont'>
                                        <div className='ele_pop_bdy_txt'>Vertically center</div>        
                                        <input className='ele_pop_bdy_chck_cont' checked={this._get_element_by_index(row_id,element_id).style.vertical_center} type='checkbox' onClick={
                                             (e)=>{this._get_element_by_index(row_id,element_id).style.vertical_center=!this._get_element_by_index(row_id,element_id).style.vertical_center
                                                  this.forceUpdate();
                                             }
                                        }></input>
                                        </div>

                                        <ToggleButtonGroup name='txt_algn_rad_ele_pop' type="radio" defaultValue={this._get_element_by_index(row_id,element_id).style.text_align} className="mb-2"
                                        onChange={(val)=>{
                                             this._get_element_by_index(row_id,element_id).style.text_align =  val;
                                             this.forceUpdate();
                                        }}
                                        >
                                        <ToggleButton value={'start'} className='txt_algn_rad_ele_pop_butt'>Left</ToggleButton>
                                        <ToggleButton value={'center'} className='txt_algn_rad_ele_pop_butt'>Center</ToggleButton>
                                        <ToggleButton value={'end'} className='txt_algn_rad_ele_pop_butt'>Right </ToggleButton>
                                        </ToggleButtonGroup>
                                   </div>
                              </Accordion.Collapse>
                              </Accordion>
                              <Accordion className='ele_men_acrd_main_cont'>
                                   <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main'>
                                        <div className='_ele_acrd_header_main_cont'>
                                        <svg className='_ele_acrd_header_main_cont_left_ico' xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"/></g><g><g/><polygon points="13,6.99 16,6.99 12,3 8,6.99 11,6.99 11,17.01 8,17.01 12,21 16,17.01 13,17.01"/></g></svg>
                                        <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                        Width and Height 
                                        </div>
                                   </Accordion.Toggle>
                              <Accordion.Collapse eventKey="0">
                                   <div className='ele_menu_bdy_main_cont'>
                                   <div className='ele_pop_bdy_txt'>Width</div>    
                                             <div className='ele_pop_bdy_slid_cont'>
                                             {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.element_width),0,900,(val)=>{this._get_element_by_index(row_id,element_id).style.element_width = val;})}
                                             </div>

                                             <div className='ele_pop_bdy_txt'>Height</div>    
                                             <div className='ele_pop_bdy_slid_cont'>
                                             {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.element_height),0,900,(val)=>{this._get_element_by_index(row_id,element_id).style.element_height = val;})}
                                             </div>
                                   </div>
                              </Accordion.Collapse>
                              </Accordion>
                              <Accordion className='ele_men_acrd_main_cont'>
                                   <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main'>
                                        <div className='_ele_acrd_header_main_cont'>
                                        <svg className='_ele_acrd_header_main_cont_left_ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H3V8h2v4h2V8h2v4h2V8h2v4h2V8h2v4h2V8h2v8z"/></svg>
                                        <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                             Margin
                                        </div>
                                   </Accordion.Toggle>
                              <Accordion.Collapse eventKey="0">
                                   <div className='ele_menu_bdy_main_cont'>
                                        <div className='ele_pop_bdy_txt'>Margin left</div>    
                                                  <div className='ele_pop_bdy_slid_cont'>
                                                  {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.margin_left),0,900,(val)=>{this._get_element_by_index(row_id,element_id).style.margin_left = val;})}
                                                  </div>

                                                  <div className='ele_pop_bdy_txt'>Margin right</div>    
                                                  <div className='ele_pop_bdy_slid_cont'>
                                                  {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.margin_right),0,900,(val)=>{this._get_element_by_index(row_id,element_id).style.margin_right = val;})}
                                                  </div>


                                        <div className='ele_pop_bdy_txt'>Margin top</div>    
                                        <div className='ele_pop_bdy_slid_cont'>
                                        {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.margin_top),0,900,(val)=>{this._get_element_by_index(row_id,element_id).style.margin_top = val;})}
                                        </div>
                                        <div className='ele_pop_bdy_txt'>Margin bottom</div>    
                                        <div className='ele_pop_bdy_slid_cont'>
                                        {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.margin_bottom),0,900,(val)=>{this._get_element_by_index(row_id,element_id).style.margin_bottom = val;})}
                                        </div>
                                   </div>
                              </Accordion.Collapse>
                              </Accordion>
                              <Accordion className='ele_men_acrd_main_cont'>
                                   <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main'>
                                        <div className='_ele_acrd_header_main_cont'>
                                        <svg className='_ele_acrd_header_main_cont_left_ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18 9v4H6V9H4v6h16V9z"/></svg>
                                        <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                             Padding
                                        </div>
                                   </Accordion.Toggle>
                              <Accordion.Collapse eventKey="0">
                                   <div className='ele_menu_bdy_main_cont'>
                                        
                                   <div className='ele_pop_bdy_txt'>Padding left</div>    
                                   <div className='ele_pop_bdy_slid_cont'>
                                   {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.padding_left),0,900,(val)=>{this._get_element_by_index(row_id,element_id).style.padding_left = val;})}
                                   </div>
                                   <div className='ele_pop_bdy_txt'>Padding right</div>    
                                   <div className='ele_pop_bdy_slid_cont'>
                                        {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.padding_right),0,900,(val)=>{this._get_element_by_index(row_id,element_id).style.padding_right = val;})}
                                   </div>

                                   <div className='ele_pop_bdy_txt'>Padding top</div>    
                                   <div className='ele_pop_bdy_slid_cont'>
                                   {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.padding_top),0,900,(val)=>{this._get_element_by_index(row_id,element_id).style.padding_top = val;})}
                                   </div>
                                   <div className='ele_pop_bdy_txt'>Padding bottom</div>    
                                   <div className='ele_pop_bdy_slid_cont'>
                                   {this._render_menu_slider((this._get_element_by_index(row_id,element_id).style.padding_bottom),0,900,(val)=>{this._get_element_by_index(row_id,element_id).style.padding_bottom = val;})}
                                   </div>
                                   </div>
                              </Accordion.Collapse>
                              </Accordion>
                                   </div>
                         </div>
               </div>);}
               else{
                    return(<div>Fault Menu</div>)
               }
     }
     _render_element_menu(){
          
          if(this.state._select_element_id!==null||this.state._select_element_id!==-1||this.state._select_row_id!==null||this.state._select_row_id!==-1){
               switch(this._get_element_by_index(this.state._select_row_id,this.state._select_element_id).element_type_id){
                    case 0:{
                         return(this._render_text_menu(this.state._select_element_id,this.state._select_row_id))
                         break;
                    }
                    case 1:{
                         return(this._render_link_menu(this.state._select_element_id,this.state._select_row_id))
                         break;
                    }
                    case 2:{
                         return(this._render_image_menu(this.state._select_element_id,this.state._select_row_id))
                         break;
                    }
                    case 4:{
                         return(this._render_embeded_menu(this.state._select_element_id,this.state._select_row_id))
                         break;
                    }
                    default:{
                         return(<div>Empty Menu</div>)
                         break;
                    }
               }     
          }
          
     }
     _get_speci_element_class(element_type_id,row_id,indx_id){
          switch(element_type_id){
               case 0:{return(new _Element_Text(row_id,_ELEMENT_ROWS_CORE_ARRAY[row_id]!==undefined?_ELEMENT_ROWS_CORE_ARRAY[row_id].length:0))}
               case 1:{return(new _Element_Link(row_id,_ELEMENT_ROWS_CORE_ARRAY[row_id]!==undefined?_ELEMENT_ROWS_CORE_ARRAY[row_id].length:0))}
               case 2:{return(new _Element_Image(row_id,_ELEMENT_ROWS_CORE_ARRAY[row_id]!==undefined?_ELEMENT_ROWS_CORE_ARRAY[row_id].length:0))}
               case 4:{return(new _Element_Video_Youtube(row_id,_ELEMENT_ROWS_CORE_ARRAY[row_id]!==undefined?_ELEMENT_ROWS_CORE_ARRAY[row_id].length:0))}
               default:{break}     
          }
     }
     _ELEMENT_ADDER_TO_ARRAY(element_type_id)
     {
          //this._set_url_param_selec_id(-1,-1);
         let INSRT_ELEMENT_ID = null;
         let INSRT_ROW_ID =  null;
         if(this.state._adder_type===0){
          INSRT_ELEMENT_ID = _SELECTED_ELEMENT_ID;
          INSRT_ROW_ID = _SELECTED_ELEMENT_ROW_ID;
         }
         else if(this.state._adder_type===1){
          INSRT_ELEMENT_ID = _RIGHT_CLICK_ELEMENT_COLMID;
          INSRT_ROW_ID = _RIGHT_CLICK_ELEMENT_ROWID;
         }
         console.log(INSRT_ELEMENT_ID+" "+INSRT_ROW_ID);
          let insert_id = null;
                    if(INSRT_ELEMENT_ID===undefined||INSRT_ELEMENT_ID===null){
                         
                         let gotElement = this._get_speci_element_class(element_type_id,_ELEMENT_ROWS_CORE_ARRAY.length);
                         _ELEMENT_ROWS_CORE_ARRAY.push(new Array(gotElement));                         
                         //insert_id = [(_ELEMENT_CORE_ARRAY.length-1)]; 
                    }     
                    else{
                         switch(_INSERT_BOOL){
                              case 0:{
                                   let gotElement = this._get_speci_element_class(element_type_id,_ELEMENT_ROWS_CORE_ARRAY.length);
                                   _ELEMENT_ROWS_CORE_ARRAY.splice(parseInt(INSRT_ROW_ID),0,new Array(gotElement));           
                                   //insert_id = _SELECTED_ELEMENT_ID;
                                   break;
                              }
                              case 1:{
                                   let gotElement = this._get_speci_element_class(element_type_id,_ELEMENT_ROWS_CORE_ARRAY.length);
                                   _ELEMENT_ROWS_CORE_ARRAY.splice(parseInt(parseInt(INSRT_ROW_ID)+1),0,new Array(gotElement));           
                                   //insert_id = _SELECTED_ELEMENT_ID+1;
                                   break;
                              }
                              case 2:{
                                   let gotElement = this._get_speci_element_class(element_type_id,_ELEMENT_ROWS_CORE_ARRAY.length);
                                   _ELEMENT_ROWS_CORE_ARRAY[INSRT_ROW_ID].splice(INSRT_ELEMENT_ID,0,gotElement);           
                                   break;
                              }
                              case 3:{
                                   let gotElement = this._get_speci_element_class(element_type_id,_ELEMENT_ROWS_CORE_ARRAY.length);
                                   _ELEMENT_ROWS_CORE_ARRAY[INSRT_ROW_ID].splice(INSRT_ELEMENT_ID+1,0,gotElement);           
                                   //insert_id = _SELECTED_ELEMENT_ID+1;
                                   break;
                              }
                              default:{
                                   //_ELEMENT_CORE_ARRAY.splice(_SELECTED_ELEMENT_ID+1,0,gotElement);
                                   //insert_id = _SELECTED_ELEMENT_ID+1;
                                   break;
                              }
                         }
                    }    
          console.log(`LAND: Element Added | TYPE `+element_type_id+` | SIZE `+_ELEMENT_ROWS_CORE_ARRAY.length);
          this._set_element_count(_ELEMENT_ROWS_CORE_ARRAY.length);
          this._set_elem_mod(false);
          this._calc_element_index_ids();
          // if(insert_id!==null){
          //      this._set_url_param_selec_id(insert_id);     
          // }else{
          //      this._set_url_param_selec_id(-1,-1);     
          // }
          this.forceUpdate();
     }
     _calc_element_index_ids(){
          for(let j = 0 ; j < _ELEMENT_ROWS_CORE_ARRAY.length ; j++){
               for(let l = 0 ; l < _ELEMENT_ROWS_CORE_ARRAY[j].length ; l++){
                    _ELEMENT_ROWS_CORE_ARRAY[j][l].row_id = j
                    _ELEMENT_ROWS_CORE_ARRAY[j][l].element_id = l;
               }
          }
          this.forceUpdate();
          console.log("RECALCULATAED ARRAY");
          //console.log(JSON.stringify(_ELEMENT_ROWS_CORE_ARRAY).toString());
          
     }
    _embeded_element_render_classback(element_indx,row_id,str){
         //this._get_element_by_index(row_id,element_indx).element_render_class_name = str; 
    }
    _set_url_param_selec_id(element_index_id,element_row_id){
     Router.push({query:{ row_id:element_row_id,select_id:element_index_id }},null,{scroll:false,shallow:true});
     this._set_selec_element_id(element_index_id,element_row_id);
     this.forceUpdate();
    }
    _renderer_resize_callback(row_id,element_id,incr_hgt,incr_wdt){
         this._get_element_by_index(row_id,element_id).style.element_width = parseInt(incr_wdt);
         this._get_element_by_index(row_id,element_id).style.element_height = parseInt(incr_hgt);
         this.forceUpdate();
    }
    renderer_add_butt_callback(elem_id,elm_row_id,direc_bool,insrt_type){
     if(insrt_type!==null){
          this._set_adder_type(insrt_type);
          if(insrt_type == 0){
               if(elem_id!==null && direc_bool!==null){
                    _SELECTED_ELEMENT_ID = elem_id;
                    _SELECTED_ELEMENT_ROW_ID = elm_row_id;
               }          
          }
          else if(insrt_type == 1){

          }
     }
     _INSERT_BOOL = direc_bool;
     this._set_elem_mod(true)

     }
     _render_component(){
     RENDER_ELEMENT_ARRAY = [];
     if(_ELEMENT_CORE_ARRAY!==null){
     _ELEMENT_ROWS_CORE_ARRAY.map(
          (row,i)=>{
               let hasAElement = false;
               if(row.length>0){
                    RENDER_ELEMENT_ARRAY.push(
                         <div  className={this.state._select_row_id===i?'element_row_main_cont element_row_main_sec':'element_row_main_cont element_row_main_nonsec'}
                              style={{
                                   maxWidth:this.state._desktop_viewing_mode===true?'900px':'350px'
                              }}
                         >
                                   { row.map((element,j)=>{
                                   if(element.deleted===false){ 
                                             hasAElement = true;
                                             let elementData = new elementRender(element,
                                                  Router.query.row_id,
                                                  Router.query.select_id,)
                                                  ._render_element_overlay(
                                                                           this._set_url_param_selec_id,
                                                                           this.renderer_add_butt_callback,
                                                                           this._renderer_resize_callback,
                                                                           this._embeded_element_render_classback)
                                             return(
                                                  <div className='element_context_menu_trigger' data-colmId={j} data-rowId={i} data-menuId={ELEMENT_OVERLAY_MENU_ID} onContextMenu={menuHandler}>
                                                  {elementData}
                                                  </div>
                                             );
                                        }
               
                                   })}       
                              
                         </div>
                    )
                    if(hasAElement===false){
                         RENDER_ELEMENT_ARRAY.pop();
                    }
               }
               else{
                    return null;
               }
              
              
          }
     );
     }


     // if(_ELEMENT_CORE_ARRAY.length==0){
     //      RENDER_ELEMENT_ARRAY.push(
     //           <div className='_insrt_new_ele_inf_cont'>
     //                <svg className='_insrt_new_ele_inf_cont_ico' viewBox='0 0 512 512'><title>Information Circle</title><path d='M248 64C146.39 64 64 146.39 64 248s82.39 184 184 184 184-82.39 184-184S349.61 64 248 64z' fill='none' stroke='currentColor' stroke-miterlimit='10' stroke-width='32'/><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M220 220h32v116'/><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-miterlimit='10' stroke-width='32' d='M208 340h88'/><path d='M248 130a26 26 0 1026 26 26 26 0 00-26-26z'/></svg>
     //                Add new elements , Go crazy 😄
     //           </div>
     //      )
     // }
     RENDER_ELEMENT_ARRAY.push(new elementRender()._render_foot_element());
     return RENDER_ELEMENT_ARRAY;
     }
     _render_context_menu(){
          return (
               <div>
                    <Menu id={ELEMENT_OVERLAY_BASE_ID} className='element_menu_main_cont' animation={animation.fade}>  
               
                    <Item className='element_menu_item_main_cont' onClick={()=>{
                         this._set_url_param_selec_id(-1,-1);
                         
                    }}>
                   Deselect all
                 </Item>
                 <Separator/>
               <Item className='element_menu_item_main_cont'>
                   Undo
                 </Item>
                 <Item className='element_menu_item_main_cont'>
                   Redo
                 </Item>
                 <Separator />
                 <Item className='element_menu_item_main_cont'>
                   Paste
                 </Item>
               </Menu>
               <Menu id={ELEMENT_OVERLAY_MENU_ID} className='element_menu_main_cont' animation={animation.fade}>  
               <Submenu label="Add"  className='element_menu_item_main_cont element_sub_menu'>
               <Item className='element_menu_item_main_cont' onClick={(event,props,triggerEvent,data)=>{
                    this.renderer_add_butt_callback(0,_RIGHT_CLICK_ELEMENT_ROWID,0,1)
                 }}>
                   + Section above
                 </Item>
                 <Item className='element_menu_item_main_cont' onClick={(event,props,triggerEvent,data)=>{
                    this.renderer_add_butt_callback(0,_RIGHT_CLICK_ELEMENT_ROWID,1,1)
                 }}>
                    + Section below
                 </Item>
                 <Separator className='element_menu_sep_main_cont' />
                 <Item className='element_menu_item_main_cont' onClick={(event,props,triggerEvent,data)=>{
                    this.renderer_add_butt_callback(_RIGHT_CLICK_ELEMENT_COLMID,_RIGHT_CLICK_ELEMENT_ROWID,2,1)
                 }}>
                    + Element to left
                 </Item>
                 <Item  className='element_menu_item_main_cont'  onClick={(event,props,triggerEvent,data)=>{
                    this.renderer_add_butt_callback(_RIGHT_CLICK_ELEMENT_COLMID,_RIGHT_CLICK_ELEMENT_ROWID,3,1)
                 }}>
                    + Element to right
                 </Item >
               </Submenu>
               <Separator />
               <Item className='element_menu_item_main_cont'>
                   Undo
                 </Item>
                 <Item className='element_menu_item_main_cont'>
                   Redo
                 </Item>
                 <Separator />
               <Item className='element_menu_item_main_cont'>
                   Copy
                 </Item>
                 <Item className='element_menu_item_main_cont'>
                   Paste
                 </Item>
                 <Item className='element_menu_item_main_cont'>
                   Duplicate
                 </Item>
                 <Separator />
                 <Item className='element_menu_item_main_cont menu_item_danger'  onClick={()=>{
                                                       this._get_element_by_index(_RIGHT_CLICK_ELEMENT_ROWID,_RIGHT_CLICK_ELEMENT_COLMID).deleted = true;
                                                       this._add_notification("Text element deleted","danger",1000);
                                                       this._set_selec_element_id(-1-1)
                                                       this.forceUpdate();           
                                                  }}>
               Delete
                 </Item>
               </Menu>
             </div>
          )
     }
     _get_page_type_render(element){
          switch(element.element_type_id){
               case 0:{return(renderToString(new elementRender(element)._render_text_element()))}
               case 4:{return("<div>Player</div>")}
               default:{break}
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

          // let up_res = await storeHelper._update_page_data(_SEND_DATA);
          // if(up_res.errBool===false){
          //      this._add_notification("Saved","success",2000);
          //      this._set_unsaved_bool(false);
          // }
          // else{
          //      this._add_notification("Error Occurred","danger",2000);
          // }

          //console.log("SEND DATA"+JSON.stringify(_SEND_DATA));
     }
     _add_noti_cont(){
          
          this._add_notification("TEXT","danger",2000);
          this.forceUpdate();
     }
     async _init_land_user_check(){
          this._set_load_bool(true);
          await firebaseHelp._init_user_check(null,_URLS.login).then((res)=>{
               if(res===true){
                    this._init_land_data(1);          
               }
          }
     );
     }
     _select_render_window(){
          if(this.state._desktop_viewing_mode===true){
               return(   
                    <div className='land_act_creat_main_cont'
                    style={this._set_curr_back()}
                    data-menuId={ELEMENT_OVERLAY_BASE_ID} 
                     onContextMenu={basemenuHandler}
                   
                    >
                             <div className='land_act_creat_main_cont_grd_back'  onMouseDown={(e)=>{
                         if(e.nativeEvent.which==1){
                              this._set_url_param_selec_id(-1,-1)
                         }
                         }
                    }></div>
                         <div className='land_act_creat_main_sub_cont'>
                         
                              {/* <Button className='land_act_gen_butt' onClick={()=>{this._gen_page_code();}}>Save</Button> */}
                                        <div className='land_act_prv_add_bar_cont'>
                                        <div className='land_act_prv_add_bar_cir_cont'>
                                        <div  className='land_act_prv_add_bar_cir '></div>
                                        <div  className='land_act_prv_add_bar_cir '></div>
                                        <div  className='land_act_prv_add_bar_cir '></div>
                                        </div>
                                        <div className='land_act_prv_add_bar'>
                                             <svg className='land_act_prv_add_ico' viewBox='0 0 512 512'><title>Lock Closed</title><path d='M336 208v-95a80 80 0 00-160 0v95' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/><rect x='96' y='208' width='320' height='272' rx='48' ry='48' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/></svg>                                             
                                             <a className='land_act_prv_add_lnk' href={process.env.NEXT_PUBLIC_HOST+'api/view?q='+_VIEW_ID}>
                                             {process.env.NEXT_PUBLIC_HOST+'api/view?q='+_VIEW_ID}
                                             </a>
                                        </div>
                                        <button className='land_act_prv_add_cpy_butt'>
                                             <svg className='land_act_prv_add_cpy' viewBox='0 0 512 512'><title>Create</title><path d='M384 224v184a40 40 0 01-40 40H104a40 40 0 01-40-40V168a40 40 0 0140-40h167.48' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/><path d='M459.94 53.25a16.06 16.06 0 00-23.22-.56L424.35 65a8 8 0 000 11.31l11.34 11.32a8 8 0 0011.34 0l12.06-12c6.1-6.09 6.67-16.01.85-22.38zM399.34 90L218.82 270.2a9 9 0 00-2.31 3.93L208.16 299a3.91 3.91 0 004.86 4.86l24.85-8.35a9 9 0 003.93-2.31L422 112.66a9 9 0 000-12.66l-9.95-10a9 9 0 00-12.71 0z'/></svg>
                                        </button>

                                        <button className='land_act_prv_add_cpy_butt'
                                        onClick={()=>{
                                             this.copytoClip(process.env.NEXT_PUBLIC_HOST+'api/view?q='+_VIEW_ID);
                                             this._add_notification("Link copied to clipboard","success",1000);
                                        }}
                                        ><svg className='land_act_prv_add_cpy' viewBox='0 0 512 512'><title>Copy</title><rect x='128' y='128' width='336' height='336' rx='57' ry='57' fill='none' stroke='currentColor' stroke-linejoin='round' stroke-width='32'/><path d='M383.5 128l.5-24a56.16 56.16 0 00-56-56H112a64.19 64.19 0 00-64 64v216a56.16 56.16 0 0056 56h24' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/></svg></button>

                                        <button className='land_act_prv_add_cpy_butt'>
                                             <svg className='land_act_prv_add_cpy' viewBox='0 0 512 512'><title>Share</title><path d='M336 192h40a40 40 0 0140 40v192a40 40 0 01-40 40H136a40 40 0 01-40-40V232a40 40 0 0140-40h40M336 128l-80-80-80 80M256 321V48' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/></svg>
                                        </button>
                                        
                              </div>
                                        
                         <div className='land_act_creat_sub_cont'>                                 
                                   {this._render_component()}
                                   {this._render_context_menu()}
                         </div>
                         </div>
                    </div>);
          }
          else if(this.state._desktop_viewing_mode===false){
               return(
                    <div className='land_act_creat_main_cont_mobile_main_cont'>
                     <div className='land_act_creat_main_cont_mobile'
                    style={this._set_curr_back()}
                    >
                                   <div className='land_act_creat_main_cont_grd_back' onMouseDown={()=>this._set_url_param_selec_id(-1)}></div>
                                   <div className='land_act_creat_main_sub_cont'>

                                        {/* <Button className='land_act_gen_butt' onClick={()=>{this._gen_page_code();}}>Save</Button> */}
                                                  <div className='land_act_prv_add_bar_cont_mobile'>
                                                  <div className='land_act_prv_add_bar_mobile'>
                                                       <svg className='land_act_prv_add_ico' viewBox='0 0 512 512'><title>Lock Closed</title><path d='M336 208v-95a80 80 0 00-160 0v95' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/><rect x='96' y='208' width='320' height='272' rx='48' ry='48' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/></svg>                                             
                                                       <a className='land_act_prv_add_lnk' href={process.env.NEXT_PUBLIC_HOST+'api/view?q='+_VIEW_ID}>
                                                       {process.env.NEXT_PUBLIC_HOST+'api/view?q='+_VIEW_ID}
                                                       </a>
                                                  </div>

                                        </div>
                                                  
                                   <div className='land_act_creat_sub_cont_mobile '>         
                                           
                                             {this._render_component()}
                                             
                                   </div>
                                   </div>
                              </div>
                    </div>
               )
          }
     }
     _render_layer_menu_component(){
          
          let layer_menu_data = [];
          for(let i = 0 ; i < _ELEMENT_ROWS_CORE_ARRAY.length;i++){
                    let layer_row_element_data = [];
                    for(let j = 0 ; j < _ELEMENT_ROWS_CORE_ARRAY[i].length ; j++){
                         if(_ELEMENT_ROWS_CORE_ARRAY[i][j].deleted===false){
                              layer_row_element_data.push(
                                   <div data-colmId={j} data-rowId={i} data-menuId={ELEMENT_OVERLAY_MENU_ID} onContextMenu={menuHandler} className={`element_layer_menu_acord_body_cont ${(this.state._select_element_id == j )&&( this.state._select_row_id == i )?'layer_acrd_selected':undefined}`}
                                   onMouseDown={(e)=>{
                                        this._set_url_param_selec_id(j,i);
                                   }}
                                   >
                                        {_ELEMENT_ROWS_CORE_ARRAY[i][j].element_name + " "+(j+1)}
                                        <div className={`element_layer_menu_acord_visi_cont`} 
                                                onClick={(e)=>{
                                                 this._get_element_by_index(i,j).enabled = !(this._get_element_by_index(i,j).enabled)
                                                 this.forceUpdate();
                                        }} >
                                             {
                                                   this._get_element_by_index(i,j).enabled===true?
                                                   <svg className={`element_layer_menu_acord_visi_cont_ico`} viewBox='0 0 512 512'><title>Eye</title><path d='M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 00-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 000-17.47C428.89 172.28 347.8 112 255.66 112z' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/><circle cx='256' cy='256' r='80' fill='none' stroke='currentColor' stroke-miterlimit='10' stroke-width='32'/></svg>
                                                   :
                                                  <svg  className={`element_layer_menu_acord_visi_cont_ico`}  viewBox='0 0 512 512'><title>Eye Off</title><path d='M432 448a15.92 15.92 0 01-11.31-4.69l-352-352a16 16 0 0122.62-22.62l352 352A16 16 0 01432 448zM255.66 384c-41.49 0-81.5-12.28-118.92-36.5-34.07-22-64.74-53.51-88.7-91v-.08c19.94-28.57 41.78-52.73 65.24-72.21a2 2 0 00.14-2.94L93.5 161.38a2 2 0 00-2.71-.12c-24.92 21-48.05 46.76-69.08 76.92a31.92 31.92 0 00-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416a239.13 239.13 0 0075.8-12.58 2 2 0 00.77-3.31l-21.58-21.58a4 4 0 00-3.83-1 204.8 204.8 0 01-51.16 6.47zM490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96a227.34 227.34 0 00-74.89 12.83 2 2 0 00-.75 3.31l21.55 21.55a4 4 0 003.88 1 192.82 192.82 0 0150.21-6.69c40.69 0 80.58 12.43 118.55 37 34.71 22.4 65.74 53.88 89.76 91a.13.13 0 010 .16 310.72 310.72 0 01-64.12 72.73 2 2 0 00-.15 2.95l19.9 19.89a2 2 0 002.7.13 343.49 343.49 0 0068.64-78.48 32.2 32.2 0 00-.1-34.78z'/><path d='M256 160a95.88 95.88 0 00-21.37 2.4 2 2 0 00-1 3.38l112.59 112.56a2 2 0 003.38-1A96 96 0 00256 160zM165.78 233.66a2 2 0 00-3.38 1 96 96 0 00115 115 2 2 0 001-3.38z'/></svg>
                                             }
                                             
                                        </div>
                                   </div>
                              )
                         }
                    }
                    if(layer_row_element_data.length>0){
                         layer_menu_data.push(
                              <Accordion className='ele_men_acrd_main_cont'>
                                        <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main'>
                                             <div className='_ele_acrd_header_main_cont'>
                                             <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                                  {'Section '+(i+1)}
                                             </div>
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="0">
                                             <div className='element_layer_menu_acord_body_main_cont'>
                                                  {layer_row_element_data}
                                             </div>
                                        </Accordion.Collapse>
                              </Accordion>
                    );
                    }
                    
          }
          return(layer_menu_data);
     }
     _render_layer_menu(){
          if(this.state._show_layer_menu){
               return(
                    <div className='element_layer_menu_main_cont'>
                              <div className='element_layer_menu_head_main_cont'>
                                   Elements
                                   <div className='element_layer_menu_close_main_cont'>
                                        <button className='element_layer_menu_close_butt' onClick={()=>{
                                             this._set_layer_menu_visi(false);
                                        }}>
                                             <svg className='element_layer_menu_close_butt_ico' viewBox='0 0 512 512'><title>Close</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M368 368L144 144M368 144L144 368'/></svg>
                                        </button>
                                   </div>
                              </div>
                              <div className='element_layer_menu_body_main_cont'>
                                   {this._render_layer_menu_component()}
                              </div>
                    </div>)
          }
          else{
               return(null)
          }
     }
     _render_init_template_menu(){
               return(
                    <Modal
                              show={this.state._temp_select_mod_show}
                              onHide={()=>{this._set_temp_mod_show(false)}}
                              backdrop="static"
                              keyboard={false}
                              size="lg"
                              aria-labelledby="contained-modal-title-vcenter"
                              centered                        
                              >       
                              <div className='template_selection_main_cont'>
                                   <div className='template_selection_head_main_cont'>
                                        SELECT A TEMPLATE
                                   </div>
                                   <div className='template_selection_selec_main_cont'>
                                        <div className='template_selection_selec_main_cont_row'>
                                        <div className='template_1_main_cont' onClick={(e)=>{
                                             this._set_template_id(1);
                                             this._set_temp_mod_show(false);
                                        }}>
                                             <div className='template_1_main_cont_thumbnail'>
                                                  <svg className='template_1_main_cont_thumbnail_ico' viewBox='0 0 512 512'><title>Add Circle</title><path d='M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z' fill='none' stroke='currentColor' stroke-miterlimit='10' stroke-width='32'/><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M256 176v160M336 256H176'/></svg>
                                             </div>
                                             <div className='template_1_main_cont_tit'>
                                                       Blank template
                                             </div>
                                        </div>
                                        
                                        </div>                                       
                                   </div>    
                              </div>                  
                    </Modal>  
               )
     }
     componentDidMount(){  
          this._init_land_user_check();   
          if(this.state._select_template_id===0){
               this._set_temp_mod_show(true);
          }
          
     }
     componentDidUpdate(){

          // this._update_preview_wind();
      }
     render(){               
     return(
          this.state.loading===true?
          <div>
               <LoaderHelper/>     
               {this._render_notif()}
          </div>:
          <div className='lander_base_main_cont' 
               tabIndex={0} 
               onContextMenu={(e)=>{
                         e.preventDefault();
               }}
               onKeyDown={(e)=>{
               switch(e.key){
                    case 'Escape':{
                         this._set_url_param_selec_id(-1,-1);
                         break;
                    }    
                    case 'Delete':{

                         break;
                    }
                    default:{
                         break;
                    }
               }
          }}
          >
              
               <title>{process.env.APP_NAME}</title>
               {this._element_add_modal()}
               <div className='land_act_head_main_cont'>
                        

                    <div className='land_act_head_tit_cont'> 
                              
                              <Dropdown>
                              <Dropdown.Toggle as={CustomToggle}  id="land_act_head_logo_drop_togg">
                                   <div className='land_act_head_tit_cont_logo_cont'>
                                   <div className='land_act_head_tit_cont_logo'/>
                                      {/* {process.env.APP_NAME}  */}
                                   <svg className='land_act_head_tit_cont_logo_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                   </div>
                              </Dropdown.Toggle>
                              <Dropdown.Menu className='land_act_head_tit_cont_logo_menu'>
                              <Dropdown.Item as="button">Save</Dropdown.Item>
                              <Dropdown.Divider />
                              <Dropdown.Item as="button">Undo</Dropdown.Item>
                              <Dropdown.Item as="button">Redo</Dropdown.Item>
                              <Dropdown.Divider />
                              <Dropdown.Item as="button">Import</Dropdown.Item>
                              <Dropdown.Item as="button">Export</Dropdown.Item>
                              <Dropdown.Divider />
                              <Dropdown.Item as="button">Prefrences</Dropdown.Item>
                              <Dropdown.Item as="button">Template setting</Dropdown.Item>
                              <Dropdown.Divider />
                              <Dropdown.Item as="button">Help</Dropdown.Item>
                              </Dropdown.Menu>
                         </Dropdown>
                
                    
                    </div>  
                         
                    <div className='land_act_head_cent_main_cont'>
                              
                              <div className='land_act_head_cent_link_cont'>
                                   <a href='#' className='land_act_head_cent_link_selec'>
                                        <svg className='land_act_head_cent_link_selec_ico' viewBox='0 0 512 512'><title>Brush</title><path d='M452.37 59.63h0a40.49 40.49 0 00-57.26 0L184 294.74c23.08 4.7 46.12 27.29 49.26 49.26l219.11-227.11a40.49 40.49 0 000-57.26zM138 336c-29.88 0-54 24.5-54 54.86 0 23.95-20.88 36.57-36 36.57C64.56 449.74 92.82 464 120 464c39.78 0 72-32.73 72-73.14 0-30.36-24.12-54.86-54-54.86z' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/></svg>
                                        Editor</a>
                                   </div>
                              <div className='land_act_head_cent_link_cont'>
                                   <a href='#' className='land_act_head_cent_link'>
                                   <svg  className='land_act_head_cent_link_ico' viewBox='0 0 512 512'><title>Analytics</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M344 280l88-88M232 216l64 64M80 320l104-104'/><circle cx='456' cy='168' r='24' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/><circle cx='320' cy='304' r='24' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/><circle cx='208' cy='192' r='24' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/><circle cx='56' cy='344' r='24' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/></svg>
                                   Analytics</a></div>
                              <div className='land_act_head_cent_link_cont'>
                                   <a href='#' className='land_act_head_cent_link'>
                                        <svg className='land_act_head_cent_link_ico' viewBox='0 0 512 512'><title>Play</title><path d='M112 111v290c0 17.44 17 28.52 31 20.16l247.9-148.37c12.12-7.25 12.12-26.33 0-33.58L143 90.84c-14-8.36-31 2.72-31 20.16z' fill='none' stroke='currentColor' stroke-miterlimit='10' stroke-width='32'/></svg>
                                        Preview</a></div>
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
              
                    <div className='land_act_main_bdy_left_main'>
                                        <div>
                                        <button className='land_act_main_bdy_left_add_butt' onClick={()=>{this._set_elem_mod(true)}}>+</button>
                                              <div className='land_left_bdy_butt_main_cont'>
                                                       <div className='land_left_bdy_butt_main_tit_cont'>
                                                                 <div className='land_left_bdy_butt_main_tit_cont_arrow'></div>
                                                                 Save
                                                       </div>
                                                       <button className='land_act_back_cust_butt'>
                                                            <svg className='land_act_back_cust_butt_ico_save' viewBox='0 0 512 512'><title>Save</title><path d='M380.93 57.37A32 32 0 00358.3 48H94.22A46.21 46.21 0 0048 94.22v323.56A46.21 46.21 0 0094.22 464h323.56A46.36 46.36 0 00464 417.78V153.7a32 32 0 00-9.37-22.63zM256 416a64 64 0 1164-64 63.92 63.92 0 01-64 64zm48-224H112a16 16 0 01-16-16v-64a16 16 0 0116-16h192a16 16 0 0116 16v64a16 16 0 01-16 16z' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/></svg>
                                                       </button>
                                                  </div>

                                                  <div className='land_left_bdy_butt_main_cont'>
                                                       <div className='land_left_bdy_butt_main_tit_cont'>
                                                                 <div className='land_left_bdy_butt_main_tit_cont_arrow'></div>
                                                                 Page background
                                                       </div>
                                                            <OverlayTrigger trigger="click" placement="right" overlay={ 
                                                            <Popover id="popover-basic"  className='popover_back_class' backdropClassName="backdrop">
                                                            <div className='popover_back_class_main_cont'>
                                                                 <div className='popover_back_class_main_cont_tit'>Background</div>
                                                            <Dropdown>
                                                                      <Dropdown.Toggle variant="light" id="popover_back_class_selec_butt">
                                                                      {this._get_back_type() }
                                                                      </Dropdown.Toggle>
                                                                      <Dropdown.Menu className='popover_back_class_selec_menu'>
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
                                                                      <Dropdown.Item as="button"
                                                                           onClick={()=>{
                                                                           _BACK_DATA.back_type = 2;
                                                                           this.forceUpdate();
                                                                           }}
                                                                      >Image</Dropdown.Item>
                                                                      </Dropdown.Menu>
                                                                      </Dropdown>
                                                                      <div className='popover_back_class_main_pick_cont'>
                                                                           {this._get_back_picker()}
                                                                      </div>
                                                            </div>
                                                            </Popover>} rootClose={true}>
                                                                 <button className='land_act_back_cust_butt'>
                                                                 <svg className='land_act_back_cust_butt_ico' viewBox='0 0 512 512'><title>Color Palette</title><path d='M430.11 347.9c-6.6-6.1-16.3-7.6-24.6-9-11.5-1.9-15.9-4-22.6-10-14.3-12.7-14.3-31.1 0-43.8l30.3-26.9c46.4-41 46.4-108.2 0-149.2-34.2-30.1-80.1-45-127.8-45-55.7 0-113.9 20.3-158.8 60.1-83.5 73.8-83.5 194.7 0 268.5 41.5 36.7 97.5 55 152.9 55.4h1.7c55.4 0 110-17.9 148.8-52.4 14.4-12.7 11.99-36.6.1-47.7z' fill='none' stroke='currentColor' stroke-miterlimit='10' stroke-width='32'/><circle cx='144' cy='208' r='32'/><circle cx='152' cy='311' r='32'/><circle cx='224' cy='144' r='32'/><circle cx='256' cy='367' r='48'/><circle cx='328' cy='144' r='32'/></svg>
                                                                 </button>
                                                            </OverlayTrigger>
                                                       </div>
                                        
                                        {/* <div className='land_left_bdy_butt_main_cont'>
                                             <div className='land_left_bdy_butt_main_tit_cont'>
                                                       <div className='land_left_bdy_butt_main_tit_cont_arrow'></div>
                                                       Page Settings
                                             </div>
                                             <button className='land_act_back_cust_butt'>
                                                  <svg className='land_act_back_cust_butt_ico'  viewBox='0 0 512 512'><title>Hammer</title><path d='M277.42 247a24.68 24.68 0 00-4.08-5.47L255 223.44a21.63 21.63 0 00-6.56-4.57 20.93 20.93 0 00-23.28 4.27c-6.36 6.26-18 17.68-39 38.43C146 301.3 71.43 367.89 37.71 396.29a16 16 0 00-1.09 23.54l39 39.43a16.13 16.13 0 0023.67-.89c29.24-34.37 96.3-109 136-148.23 20.39-20.06 31.82-31.58 38.29-37.94a21.76 21.76 0 003.84-25.2zM478.43 201l-34.31-34a5.44 5.44 0 00-4-1.59 5.59 5.59 0 00-4 1.59h0a11.41 11.41 0 01-9.55 3.27c-4.48-.49-9.25-1.88-12.33-4.86-7-6.86 1.09-20.36-5.07-29a242.88 242.88 0 00-23.08-26.72c-7.06-7-34.81-33.47-81.55-52.53a123.79 123.79 0 00-47-9.24c-26.35 0-46.61 11.76-54 18.51-5.88 5.32-12 13.77-12 13.77a91.29 91.29 0 0110.81-3.2 79.53 79.53 0 0123.28-1.49C241.19 76.8 259.94 84.1 270 92c16.21 13 23.18 30.39 24.27 52.83.8 16.69-15.23 37.76-30.44 54.94a7.85 7.85 0 00.4 10.83l21.24 21.23a8 8 0 0011.14.1c13.93-13.51 31.09-28.47 40.82-34.46s17.58-7.68 21.35-8.09a35.71 35.71 0 0121.3 4.62 13.65 13.65 0 013.08 2.38c6.46 6.56 6.07 17.28-.5 23.74l-2 1.89a5.5 5.5 0 000 7.84l34.31 34a5.5 5.5 0 004 1.58 5.65 5.65 0 004-1.58L478.43 209a5.82 5.82 0 000-8z' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/></svg>
                                             </button>
                                        </div>
                                         */}
                                        <div className='land_left_bdy_butt_main_cont'>
                                             <div className='land_left_bdy_butt_main_tit_cont'>
                                                       <div className='land_left_bdy_butt_main_tit_cont_arrow'></div>
                                                       Layers
                                             </div>
                                             <button className='land_act_back_cust_butt' onClick={()=>{
                                                  this._set_layer_menu_visi(!this.state._show_layer_menu);
                                             }}>
                                                  <svg className='land_act_back_cust_butt_ico' viewBox='0 0 512 512'><title>Layers</title><path d='M434.8 137.65l-149.36-68.1c-16.19-7.4-42.69-7.4-58.88 0L77.3 137.65c-17.6 8-17.6 21.09 0 29.09l148 67.5c16.89 7.7 44.69 7.7 61.58 0l148-67.5c17.52-8 17.52-21.1-.08-29.09zM160 308.52l-82.7 37.11c-17.6 8-17.6 21.1 0 29.1l148 67.5c16.89 7.69 44.69 7.69 61.58 0l148-67.5c17.6-8 17.6-21.1 0-29.1l-79.94-38.47' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/><path d='M160 204.48l-82.8 37.16c-17.6 8-17.6 21.1 0 29.1l148 67.49c16.89 7.7 44.69 7.7 61.58 0l148-67.49c17.7-8 17.7-21.1.1-29.1L352 204.48' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/></svg>
                                             </button>
                                        </div>
                                       
                                        <div className='land_left_bdy_butt_main_cont'>
                                             <div className='land_left_bdy_butt_main_tit_cont'>
                                                       <div className='land_left_bdy_butt_main_tit_cont_arrow'></div>
                                                       Undo
                                             </div>
                                             <button className='land_act_back_cust_butt'>
                                                   <svg className='land_act_back_cust_butt_ico' viewBox='0 0 512 512'><title>Arrow Redo</title><path d='M448 256L272 88v96C103.57 184 64 304.77 64 424c48.61-62.24 91.6-96 208-96v96z' fill='none' stroke='currentColor' stroke-linejoin='round' stroke-width='32'/></svg>
                                             </button>
                                        </div>

                                        <div className='land_left_bdy_butt_main_cont'>
                                             <div className='land_left_bdy_butt_main_tit_cont'>
                                                       <div className='land_left_bdy_butt_main_tit_cont_arrow'></div>
                                                       Redo
                                             </div>
                                             <button className='land_act_back_cust_butt'>
                                                       <svg className='land_act_back_cust_butt_ico' viewBox='0 0 512 512'><title>Arrow Undo</title><path d='M240 424v-96c116.4 0 159.39 33.76 208 96 0-119.23-39.57-240-208-240V88L64 256z' fill='none' stroke='currentColor' stroke-linejoin='round' stroke-width='32'/></svg>
                                             </button>
                                        </div>


                                        <div className='land_left_bdy_butt_main_cont'>
                                             <div className='land_left_bdy_butt_main_tit_cont'>
                                                       <div className='land_left_bdy_butt_main_tit_cont_arrow'></div>
                                                       {  this.state._desktop_viewing_mode===true?'Desktop Mode':'Phone Mode'}
                                             </div>
                                             <button className='land_act_back_cust_butt' onClick={()=>{
                                                  this._set_viewing_mode(!this.state._desktop_viewing_mode);
                                             }}>
                                                       {
                                                       this.state._desktop_viewing_mode===true?
                                                  <svg className='land_act_back_cust_butt_ico'  viewBox='0 0 512 512'><title>Desktop</title><rect x='32' y='64' width='448' height='320' rx='32' ry='32' fill='none' stroke='currentColor' stroke-linejoin='round' stroke-width='32'/><path stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M304 448l-8-64h-80l-8 64h96z'/><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M368 448H144'/><path d='M32 304v48a32.09 32.09 0 0032 32h384a32.09 32.09 0 0032-32v-48zm224 64a16 16 0 1116-16 16 16 0 01-16 16z'/></svg>
                                                  :<svg className='land_act_back_cust_butt_ico'  viewBox='0 0 512 512'><title>Phone Portrait</title><rect x='128' y='16' width='256' height='480' rx='48' ry='48' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/><path d='M176 16h24a8 8 0 018 8h0a16 16 0 0016 16h64a16 16 0 0016-16h0a8 8 0 018-8h24' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/></svg>
                                                       }
                                             </button>
                                        </div>

                                                  <OverlayTrigger trigger="click" placement="right" overlay={ 
                                                            <Popover id="popover-basic"  className='popover_back_class' backdropClassName="backdrop">
                                                            <div className='popover_back_class_main_cont'>
                                                                 <div className='popover_back_class_main_cont_tit'>System Information</div>
                                                                      <div className='popover_info_class_data_main_cont'>
                                                                                <div className='popover_info_class_data_tit'>Build Version</div>
                                                                                <div className='popover_info_class_data_data'>{process.env.DEV_VERSION}</div>
                                                                      </div>
                                                                      <div className='popover_info_class_data_main_cont'>
                                                                                <div className='popover_info_class_data_tit'>Build Variant</div>
                                                                                <div className='popover_info_class_data_data'>{process.env.DEV_VARIANT}</div>
                                                                      </div>
                                                                      <div className='popover_info_class_data_main_cont'>
                                                                                <div className='popover_info_class_data_tit'>System Status</div>
                                                                                <div className='popover_info_class_data_data'>
                                                                                <div className={process.env.DEV_SYSTEM_STATUS===true?'login_act_foot_sys_indi':'login_act_foot_sys_indi_non'}></div>    
                                                                                </div>
                                                                      </div>
                                                            </div>
                                                            </Popover>} rootClose={true}>
                                                                      <button className='land_act_back_cust_butt'>
                                                                      <svg className='land_act_back_cust_butt_ico' viewBox='0 0 512 512'><title>Information Circle</title><path d='M248 64C146.39 64 64 146.39 64 248s82.39 184 184 184 184-82.39 184-184S349.61 64 248 64z' fill='none' stroke='currentColor' stroke-miterlimit='10' stroke-width='32'/><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M220 220h32v116'/><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-miterlimit='10' stroke-width='32' d='M208 340h88'/><path d='M248 130a26 26 0 1026 26 26 26 0 00-26-26z'/></svg>
                                                                      </button>
                                                  </OverlayTrigger>

                                        </div>
                    </div>
                    {this._render_layer_menu()}
                    {this._select_render_window()}

                    {this.state._select_element_id>=0 && ((typeof this.state._select_element_id) == 'number') ?
                    <Resizable
                                        maxWidth={400}
                                        boundsByDirection={true}
                                        top={false}
                                        bottom={false}
                                        right={false}
                                        minWidth={250}
                                        style={{
                                             position:'fixed',
                                             top:0,
                                             right:0,
                                             height:'100%',
                                             paddingTop:'56px',
                                           }}
                                        
                                        defaultSize={{
                                             width: this.state._edit_menu_width,
                                             height:'100%'
                                        }}
                                        >
                    <div className='land_act_main_bdy_right_main'>
                              {this.state._select_element_id>=0 && ((typeof this.state._select_element_id) == 'number') ?
                                                  <div className='land_act_main_bdy_right_sub'>
                                                       {/* <div className='land_act_main_bdy_right_sub_resizer'></div> */}
                                                       {this._render_element_menu()}
                                                  </div>
                                   :undefined}
                    </div>
                    </Resizable>:undefined
                    }
               </div>            
               {this._render_notif()}
               {this._render_init_template_menu()}
        </div>
     );
}
}


class FeedbackComp extends React.Component{
     constructor(props){
          super(props)
          this.state={
               feedData:'',
               errCode:0,
               errMessage:'',
               radioValue:0,
               emojiArray:[
               { name: '😶', value: '1' },
               { name: '😛', value: '2' },
               { name: '😨', value: '3' },
               { name: '😘', value: '4' },
               { name: '😍', value: '5' },]
          }
          this._set_emoji_value = this._set_emoji_value.bind(this);
          this._set_err_state = this._set_err_state.bind(this);
          this._set_feed_mess = this._set_feed_mess.bind(this);
          this.send_req  = this.send_req.bind(this);
     }

     _set_err_state(code,mess){
          this.setState({errCode:code,errMessage:mess})
     }

     _set_feed_mess(e){
          this.setState({feedData:e.target.value})
     }

     async send_req(){
          if(this.state.feedData.length>0){
               if(this.state.radioValue!==0){
                    this._set_err_state(0);       
                    const SEND_DATA = {
                         UID:cookies.get('accessToken'),
                         mess:this.state.feedData,
                         satisfaction:this.state.radioValue
                    }
                    let feed_res = await storeHelper._send_feedback_data(SEND_DATA);
                    console.log('\n\n\n FEED RES\n'+JSON.stringify(feed_res));
                    if(feed_res.errBool===false){
                         this._set_err_state(2,"Thank you :)");       
                    }else{
                         this._set_err_state(1,"Request failed");       
                    }
                    
               }
               else{
                    this._set_err_state(1,'Select any reaction')         
               }
          }
          else{
               this._set_err_state(1,'Write any message')    
          }
     }

     _set_emoji_value(val){
          this.setState({radioValue:val});
     }

     feedBackPop(){
          return(
                <Popover id="popover-basic" className='feed_back_pop_main_cont'>
                         <div>

                          <div className='feed_back_pop_tit_cont'>Feeback</div>
                         <textarea
                         placeholder='Please tell us any feedback/suggestions or bugs, your opinion matters to us.'
                         value={this.state.feedData}
                         onChange={this._set_feed_mess}
                         className='feed_back_pop_tit_txt_ara'
                         />
                         <div className='feed_back_pop_feed_emo_main_cont'>
                         <ButtonGroup className='feed_back_pop_feed_emo' toggle>
                              {this.state.emojiArray.map((radio, idx) => (
                                   <ToggleButton  
                                   key={idx}
                                   type="radio"
                                   variant="light"
                                   name="radio"
                                   value={this.state.radioValue}
                                   checked={this.state.radioValue === radio.value}
                                   onChange={(e) => {this._set_emoji_value(e.currentTarget.value)}}
                                   >
                                   {radio.name}
                                   </ToggleButton>
                              ))}
                              </ButtonGroup>
                         </div>
                         <div className='feed_back_err_main_cont'>{this.state.errCode===1?this.state.errMessage:<span></span>}</div>
                         <div className='feed_back_succ_main_cont'>{this.state.errCode===2?this.state.errMessage:<span></span>}</div>
                         <Button variant={'primary'} className='feed_back_sub_butt' onClick={this.send_req}>Send</Button>
                     </div>
               </Popover>
        )
     }

     render(){
          return(
               <div className='feed_back_main_cont'>
               <OverlayTrigger trigger="click" rootClose={true} target={this} placement="bottom" overlay={this.feedBackPop()}>
               <Button variant={'outline-dark'}  className='feed_back_main_butt'>Feedback</Button>
               </OverlayTrigger>     
               </div>
          )
     }

}