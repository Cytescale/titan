import React, { useState,useEffect,Suspense } from 'react';
import { renderToString } from 'react-dom/server';
import firebaseHelper from '../../../util/firebase_helper';
import firestoreHelper from '../../../util/firestore_helper';
import {Alert,Button,Dropdown,Modal,OverlayTrigger,Tooltip,Popover,Tabs,Tab,DropdownButton,ToggleButton,ButtonGroup,ToggleButtonGroup } from 'react-bootstrap';
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
import EditMenu from './landEditMenu';

const cookies  = new Cookies();
const storeHelper = new firestoreHelper(cookies.get('accessToken'));

   
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (<a href="" ref={ref} onClick={(e) => { e.preventDefault();onClick(e);}}>{children}</a>));


var _ELEMENT_CORE_ARRAY = [];
var  RENDER_ELEMENT_ARRAY = [];
var _PAGE_ID = null;
var _VIEW_ID = null;
var _PAGE_CODE = '';
var _GEN_CODE ='';
var _PRIVEW_GEN_CODE = '';
var _BACK_DATA = null;
var _SELECTED_ELEMENT_ID=undefined;
var _INSERT_BOOL = 1;

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
     margin_top:12,
     margin_bottom:0,
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
     back_color:'null',
     text_color:'#000',
     font_size:17,
     font_weight:500,
     bold:false,
     italic:false,
     underline:false,
     text_align:'start',
     image_width:'100',
     image_height:'100',
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
          this.solid_color = '#F4FFFD';
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
     constructor(in_style,index_id){
          this.deleted = false;
          this.enabled = true;
          this.element_type_id = 4;
          this.element_id = index_id,
          this.data ='';
          this.element_render_class_name = ''
          this.style = Object.assign({},STLYE_ELEMENT_TEXT,in_style);
     }
    
}
class _Element_Link{
     constructor(in_style){
          this.deleted = false;
          this.enabled = true;
          this.element_type_id = 1;
          this.element_url = '';
          this.element_id =_ELEMENT_CORE_ARRAY.length,
          this.data ="Placeholder Link";
          this.style = Object.assign({},STLYE_ELEMENT_TEXT,in_style);
     }
     
}
class _Element_Image{
     constructor(in_style){
          this.deleted = false;
          this.enabled = true;
          this.element_type_id = 2;
          this.element_id =_ELEMENT_CORE_ARRAY.length;
          this.image_data = null;
          this.style = Object.assign({},STLYE_ELEMENT_TEXT,in_style);
     }
}
class _Element_Text{
     constructor(in_style){
          this.deleted = false;
          this.enabled = true;
          this.element_type_id = 0;
          this.element_id =_ELEMENT_CORE_ARRAY.length;
          this.data = "Lorem Ipsum";
          this.style = Object.assign({},STLYE_ELEMENT_TEXT,in_style);
     }
     
  
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
               _select_element_id:-1,
               _add_elem_mod_show:false,
               _txt_pop_shw:false,
               _edit_menu_x : 100,
               _edit_menu_y : 100,
               _edit_menu_old_x:0,
               _edit_menu_old_y:0,
          }
         
          this._set_load_bool = this._set_load_bool.bind(this);
          this._set_txt_pop_show = this._set_txt_pop_show.bind(this);
          this._set_elem_mod = this._set_elem_mod.bind(this);
          this._set_dname = this._set_dname.bind(this);
          this._add_element_count = this._add_element_count.bind(this);
          this._set_element_count = this._set_element_count.bind(this);
          this._get_popover = this._get_popover.bind(this);
          this._get_page_type_render = this._get_page_type_render.bind(this);
          this._set_unsaved_bool = this._set_unsaved_bool.bind(this);     
          this._add_noti_cont = this._add_noti_cont.bind(this);
          this._get_back_type = this._get_back_type.bind(this);
          this._popover_back_overlay = this._popover_back_overlay.bind(this);
          this._get_back_picker = this._get_back_picker.bind(this);
          this._set_curr_back = this._set_curr_back.bind(this);
          this.renderer_add_butt_callback = this.renderer_add_butt_callback.bind(this);
          this._ELEMENT_ADDER_TO_ARRAY = this._ELEMENT_ADDER_TO_ARRAY.bind(this);
          this._set_url_param_selec_id = this._set_url_param_selec_id.bind(this);
          this._set_selec_element_id = this._set_selec_element_id.bind(this);
          this._set_menu_x_y_posi = this._set_menu_x_y_posi.bind(this);
          this.noti_pool = [];     

     }

     copytoClip(txt){
          copy(txt);  
     }
     _set_selec_element_id(val){
          this.setState({_select_element_id:val})
     }
     _set_menu_x_y_posi(x,y,old_x,old_y){
          this.setState({
               _edit_menu_x : x,
               _edit_menu_y : y,
               _edit_menu_old_x:old_x,
               _edit_menu_old_y:old_y,
          })
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
     _popover_back_overlay(){
          return(
               <Popover id="popover-basic"  className='popover_back_class'    backdropClassName="backdrop"
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
               </Popover>
          )
     }
     _popover_img_overlay(element_id){
          if(_ELEMENT_CORE_ARRAY[element_id]!==undefined&&_ELEMENT_CORE_ARRAY[element_id]!==null){
               return(          
                    <Popover id="popover-basic" className='popover_txt_class'>
                    <div className='ele_pop_main_bdy'>
                              <div className='pop_txt_head_main_cont'>
                                        <div className='pop_txt_head_txt'>Image</div>
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
                              <Tab eventKey="text" title="Image">
                              <div>
                               
                                             <div>
                                                            <ImageUploading
                                                                 multiple={false}
                                                                 value={_ELEMENT_CORE_ARRAY[element_id].image_data}
                                                                 onChange={(imageList,addUpdateIndex)=>{
                                                                      _ELEMENT_CORE_ARRAY[element_id].image_data = imageList;
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
                                                                      {_ELEMENT_CORE_ARRAY[element_id].image_data===null?<Button variant={'primary'} className='upload__image-wrapper_butt' onClick={onImageUpload}>Upload</Button>:undefined}
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
                                                       {_ELEMENT_CORE_ARRAY[element_id].image_data!==null?
                                                       <div>
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

                                                                 <div className='ele_pop_bdy_txt'>Image width</div>    
                                                                 <div className='ele_pop_bdy_slid_cont'>
                                                                      <div className='ele_pop_bdy_slid_hold'>
                                                                      <Slider
                                                                      orientation="horizontal"
                                                                      tooltip={false}
                                                                      value={_ELEMENT_CORE_ARRAY[element_id].style.image_width}
                                                                      onChange={(val) =>{
                                                                           _ELEMENT_CORE_ARRAY[element_id].style.image_width =val;   
                                                                           this.forceUpdate();
                                                                      }}
                                                                      />
                                                                      </div>
                                                                 <input type='text' className='ele_bdy_pop_sld_txt_fld' value={  _ELEMENT_CORE_ARRAY[element_id].style.image_width}
                                                                 onChange={(e)=>{
                                                                      _ELEMENT_CORE_ARRAY[element_id].style.image_width =e.target.value;   
                                                                      this.forceUpdate();
                                                                 }}
                                                                 />
                                                                 </div>   
                                                                      <div className='ele_pop_bdy_txt'>Image alignment</div>        
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
                                                                 
                                                            </div>:undefined}
                                        </div>
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
     _draw_font_family(element_id){
          let res = []
               FONT_FAMILY_NAMES.map((e,ind)=>{
                 res.push(<Dropdown.Item as="button" onClick={()=>{
                    _ELEMENT_CORE_ARRAY[element_id].style.font_family = e;
                    this.forceUpdate();
                 }}>{e}</Dropdown.Item>);
               })
          return res;
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
                                     <DropdownButton variant={'light'} id="font_choice_drop_menu" title={_ELEMENT_CORE_ARRAY[element_id].style.font_family}>
                                        {this._draw_font_family(element_id)}
                                     </DropdownButton>

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
                                   <div className='ele_pop_bdy_txt'>Font weight</div>    
                                   <div className='ele_pop_bdy_slid_cont'>
                                   <div className='ele_pop_bdy_slid_hold'>
                                   <Slider
                                   orientation="horizontal"
                                   max='900' 
                                   tooltip={false}
                                   value={_ELEMENT_CORE_ARRAY[element_id].style.font_weight}
                                   onChange={(val) =>{
                                        _ELEMENT_CORE_ARRAY[element_id].style.font_weight =val;   
                                        this.forceUpdate();
                                   }}
                                   />
                                   </div>
                                   <input type='text' className='ele_bdy_pop_sld_txt_fld' value={_ELEMENT_CORE_ARRAY[element_id].style.font_weight}
                                   onChange={(e)=>{
                                   _ELEMENT_CORE_ARRAY[element_id].style.font_weight = e.target.value;   
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
                                                            this._add_notification("Link element deleted","danger",1000);
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
                                   <div className='pop_txt_head_txt'>Embeded</div>
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
                                                       this._add_notification("Emeded element deleted","danger",1000);
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
                         <Tab eventKey="text" title="Data">
                         <div>
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
                                   </div>
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


     _ELEMENT_ADDER_TO_ARRAY(element_type_id)
     {
          let insert_id = null;
          let gotElement = this._get_speci_element_class(element_type_id);
                    if(_SELECTED_ELEMENT_ID===undefined||_SELECTED_ELEMENT_ID===null){
                         _ELEMENT_CORE_ARRAY.push(gotElement);
                         insert_id = (_ELEMENT_CORE_ARRAY.length-1); 
                    }     
                    else{
                         switch(_INSERT_BOOL){
                              case 0:{
                                   _ELEMENT_CORE_ARRAY.splice(_SELECTED_ELEMENT_ID,0,gotElement);
                                   insert_id = _SELECTED_ELEMENT_ID;
                                   break;
                              }
                              case 1:{
                                   _ELEMENT_CORE_ARRAY.splice(_SELECTED_ELEMENT_ID+1,0,gotElement);
                                   insert_id = _SELECTED_ELEMENT_ID+1;
                                   break;
                              }
                              default:{
                                   _ELEMENT_CORE_ARRAY.splice(_SELECTED_ELEMENT_ID+1,0,gotElement);
                                   insert_id = _SELECTED_ELEMENT_ID+1;
                                   break;
                              }
                         }
                    }    
          console.log(`LAND: Element Added | TYPE `+element_type_id+` | SIZE `+_ELEMENT_CORE_ARRAY.length);
          this._set_element_count(_ELEMENT_CORE_ARRAY.length);
          this._set_elem_mod(false);
          this._calc_element_index_ids();
          if(insert_id!==null){
               this._set_url_param_selec_id(insert_id);     
          }else{
               this._set_url_param_selec_id(-1);     
          }
          this.forceUpdate();
     }

     _calc_element_index_ids(){
          for(let j = 0 ; j < _ELEMENT_CORE_ARRAY.length ; j++){
               _ELEMENT_CORE_ARRAY[j].element_id = j
          }
     }

     _get_speci_element_class(element_type_id){
          switch(element_type_id){
               case 0:{return(new _Element_Text())}
               case 1:{return(new _Element_Link())}
               case 2:{return(new _Element_Image())}
               case 4:{return(new _Element_Video_Youtube())}
               default:{break}     
          }
     }
        
    _get_popover(element_type_id,ele_id){
     switch(element_type_id){
          case 0:{return(this._popover_txt_overlay(ele_id))}
          case 1:{return(this._popover_lnk_overlay(ele_id))}
          case 2:{return(this._popover_img_overlay(ele_id))}
          case 4:{return(this._popover_vid_ytube_overlay(ele_id))}
          default:{break}
          }
    }

    _embeded_element_render_classback(element_indx,str){
         _ELEMENT_CORE_ARRAY[element_indx].element_render_class_name = str; 
    }

    _set_url_param_selec_id(element_index_id){
     Router.push({query:{ select_id:element_index_id }},null,{scroll:false,shallow:true});
     this._set_selec_element_id(element_index_id);
     this.forceUpdate();
    }


    renderer_add_butt_callback(elem_id,direc_bool){
     if(elem_id!==null && direc_bool!==null){
          _SELECTED_ELEMENT_ID = elem_id;
          _INSERT_BOOL = direc_bool;
          this._set_elem_mod(true)
     }
}

     _render_component(){
          RENDER_ELEMENT_ARRAY = [];
       ///RENDER_ELEMENT_ARRAY.push(new elementRender()._render_profile_element());
          if(_ELEMENT_CORE_ARRAY!==null){
          _ELEMENT_CORE_ARRAY.map(
               (element,index)=>{
                         if(element.deleted===false){ 
                              RENDER_ELEMENT_ARRAY.push(
                                   new elementRender(element,
                                        Router.query.select_id,
                                        this._get_popover(element.element_type_id,element.element_id))
                                        ._render_element_overlay(this._set_url_param_selec_id,
                                                                 this.renderer_add_butt_callback,
                                                                 this._embeded_element_render_classback));
                         }
               }
          );
          }
          if(_ELEMENT_CORE_ARRAY.length==0){
               RENDER_ELEMENT_ARRAY.push(
                    <div className='_insrt_new_ele_inf_cont'>
                         <svg className='_insrt_new_ele_inf_cont_ico' viewBox='0 0 512 512'><title>Information Circle</title><path d='M248 64C146.39 64 64 146.39 64 248s82.39 184 184 184 184-82.39 184-184S349.61 64 248 64z' fill='none' stroke='currentColor' stroke-miterlimit='10' stroke-width='32'/><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M220 220h32v116'/><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-miterlimit='10' stroke-width='32' d='M208 340h88'/><path d='M248 130a26 26 0 1026 26 26 26 0 00-26-26z'/></svg>
                         Add new elements , Go crazy 😄
                    </div>
               )
          }
          RENDER_ELEMENT_ARRAY.push(new elementRender()._render_foot_element());
          return RENDER_ELEMENT_ARRAY;
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
     componentDidUpdate(){
          
         // this._update_preview_wind();
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

  

     componentDidMount(){  
          this._init_land_user_check();   
          
     }

     render(){               
     return(
          this.state.loading===true?
          <div>
               <LoaderHelper/>     
               {this._render_notif()}
          </div>:
          <div>
               <title>{process.env.APP_NAME}</title>
               
               <div className='land_act_head_main_cont'>
                    {this._element_add_modal()}
                    <div className='land_act_head_tit_cont'> <div className='land_act_head_tit_cont_logo'/>{process.env.APP_NAME} 
                    {/* <div className='land_act_head_save_cont' style={{
                         color:this.state.isUnSaved===true?'#F6BC4F':'#A9EB9F',
                         borderColor:this.state.isUnSaved===true?'#F6BC4F':'#A9EB9F',
                    }}>{this.state.isUnSaved===true?'Unsaved':'Saved'}</div> */}
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
                                  <Button variant={'primary'} className='land_act_head_rght_main_save_butt'>Save</Button>
                              </div>
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
                                        <button className='land_act_main_bdy_left_add_butt' onClick={()=>{this._set_elem_mod(true)}}>+</button>
                                        <OverlayTrigger placement="right"  rootClose={true} delay={{ show: 200, hide: 100 }} overlay={(props)=>(<Tooltip id="button-tooltip" {...props}>Background</Tooltip>)}>
                                             <div>
                                                  <OverlayTrigger trigger="click" placement="right" overlay={this._popover_back_overlay} rootClose={true}>
                                                       <button className='land_act_back_cust_butt'>
                                                       <svg className='land_act_back_cust_butt_ico' viewBox='0 0 512 512'><title>Color Palette</title><path d='M430.11 347.9c-6.6-6.1-16.3-7.6-24.6-9-11.5-1.9-15.9-4-22.6-10-14.3-12.7-14.3-31.1 0-43.8l30.3-26.9c46.4-41 46.4-108.2 0-149.2-34.2-30.1-80.1-45-127.8-45-55.7 0-113.9 20.3-158.8 60.1-83.5 73.8-83.5 194.7 0 268.5 41.5 36.7 97.5 55 152.9 55.4h1.7c55.4 0 110-17.9 148.8-52.4 14.4-12.7 11.99-36.6.1-47.7z' fill='none' stroke='currentColor' stroke-miterlimit='10' stroke-width='32'/><circle cx='144' cy='208' r='32'/><circle cx='152' cy='311' r='32'/><circle cx='224' cy='144' r='32'/><circle cx='256' cy='367' r='48'/><circle cx='328' cy='144' r='32'/></svg>
                                                       </button>
                                                  </OverlayTrigger>
                                             </div>
                                        </OverlayTrigger>

                                        <OverlayTrigger placement="right"  rootClose={true} delay={{ show: 200, hide:100 }} overlay={(props)=>(<Tooltip id="button-tooltip" {...props}>Page settings</Tooltip>)}>
                                        <button className='land_act_back_cust_butt'>
                                             <svg className='land_act_back_cust_butt_ico'  viewBox='0 0 512 512'><title>Hammer</title><path d='M277.42 247a24.68 24.68 0 00-4.08-5.47L255 223.44a21.63 21.63 0 00-6.56-4.57 20.93 20.93 0 00-23.28 4.27c-6.36 6.26-18 17.68-39 38.43C146 301.3 71.43 367.89 37.71 396.29a16 16 0 00-1.09 23.54l39 39.43a16.13 16.13 0 0023.67-.89c29.24-34.37 96.3-109 136-148.23 20.39-20.06 31.82-31.58 38.29-37.94a21.76 21.76 0 003.84-25.2zM478.43 201l-34.31-34a5.44 5.44 0 00-4-1.59 5.59 5.59 0 00-4 1.59h0a11.41 11.41 0 01-9.55 3.27c-4.48-.49-9.25-1.88-12.33-4.86-7-6.86 1.09-20.36-5.07-29a242.88 242.88 0 00-23.08-26.72c-7.06-7-34.81-33.47-81.55-52.53a123.79 123.79 0 00-47-9.24c-26.35 0-46.61 11.76-54 18.51-5.88 5.32-12 13.77-12 13.77a91.29 91.29 0 0110.81-3.2 79.53 79.53 0 0123.28-1.49C241.19 76.8 259.94 84.1 270 92c16.21 13 23.18 30.39 24.27 52.83.8 16.69-15.23 37.76-30.44 54.94a7.85 7.85 0 00.4 10.83l21.24 21.23a8 8 0 0011.14.1c13.93-13.51 31.09-28.47 40.82-34.46s17.58-7.68 21.35-8.09a35.71 35.71 0 0121.3 4.62 13.65 13.65 0 013.08 2.38c6.46 6.56 6.07 17.28-.5 23.74l-2 1.89a5.5 5.5 0 000 7.84l34.31 34a5.5 5.5 0 004 1.58 5.65 5.65 0 004-1.58L478.43 209a5.82 5.82 0 000-8z' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/></svg>
                                        </button>
                                        </OverlayTrigger>
                                        <OverlayTrigger placement="right"  rootClose={true} delay={{ show: 200, hide:100 }} overlay={(props)=>(<Tooltip id="button-tooltip" {...props}>Information</Tooltip>)}>
                                        <button className='land_act_back_cust_butt'>
                                             <svg className='land_act_back_cust_butt_ico' viewBox='0 0 512 512'><title>Information Circle</title><path d='M248 64C146.39 64 64 146.39 64 248s82.39 184 184 184 184-82.39 184-184S349.61 64 248 64z' fill='none' stroke='currentColor' stroke-miterlimit='10' stroke-width='32'/><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M220 220h32v116'/><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-miterlimit='10' stroke-width='32' d='M208 340h88'/><path d='M248 130a26 26 0 1026 26 26 26 0 00-26-26z'/></svg>
                                        </button>
                                        </OverlayTrigger>
                    
                    </div>
                    

                    <div className='land_act_creat_main_cont'
                    style={this._set_curr_back()}
                    >
                             <div className='land_act_creat_main_cont_grd_back' onMouseDown={()=>this._set_url_param_selec_id(-1)}></div>
                         <div className='land_act_creat_main_sub_cont'>

                              {/* <Button className='land_act_gen_butt' onClick={()=>{this._gen_page_code();}}>Save</Button> */}
                                        <div className='land_act_prv_add_bar_cont'>
                                        <div className='land_act_prv_add_bar_cir_cont'>
                                        <div  className='land_act_prv_add_bar_cir'></div>
                                        <div  className='land_act_prv_add_bar_cir'></div>
                                        <div  className='land_act_prv_add_bar_cir'></div>
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
                         </div>
                         </div>
                         {    
                              //this.state._select_element_id>=0?<EditMenu selectId={this.state._select_element_id} />:undefined
                          }    
                    </div>
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
               <Button variant={'outline-light'}  className='feed_back_main_butt'>Feedback</Button>
               </OverlayTrigger>     
               </div>
          )
     }

}