import React, { useRef,useState,useEffect,Suspense } from 'react';
import firebaseHelper from '../../../util/firebase_helper';
import firestoreHelper from '../../../util/firestore_helper';
import {Accordion,Alert,Button,Dropdown,Modal,OverlayTrigger,Tooltip,Popover,Tabs,Tab,DropdownButton,ToggleButton,ButtonGroup,ToggleButtonGroup, Spinner } from 'react-bootstrap';

import LoaderHelper from '../loader_helper';
import $ from 'jquery';
import copy from "copy-to-clipboard";  
import ImageUploading from 'react-images-uploading';
import  _, { concat, repeat } from 'lodash';
import Cookies from 'universal-cookie';
import {ChromePicker} from 'react-color'
import _URLS from '../../../util/website_urls';
import Router from 'next/router';
import FeedbackComp from '../feeback/index';  
import ElementRenderer from '../components/editor/elementRenderer';
import websiteComp  from '../../../component/websiteComp';
import sectionComp from  '../../../component/sectionComp';
import elementComp from '../../../component/elementComp';
import ElementMenu from '../components/editor/elementMenu';
import {GlobalStylesLight,GlobalStylesDark} from '../../../util/themes/editor_themes';

const BrowserFS = require('browserfs')

var _SLIDER_EDIT_BOOl = false;
var _SLIDER_SELECT_BOOl = false;
import {
     Menu,
     Item,
     Separator,
     Submenu,
     contextMenu ,
     animation
   } from "react-contexify";
import { transform } from 'typescript';



const cookies  = new Cookies();
const storeHelper = new firestoreHelper(cookies.get('accessToken'));

   
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (<a href="" ref={ref} onClick={(e) => { e.preventDefault();onClick(e);}}>{children}</a>));

var _BACK_DATA = null;
var _INSERT_BOOL = 1;



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
          this.solid_color = '#f1f1f1';
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

const ELEMENT_OVERLAY_MENU_ID = "element-overlay-menu";
const ELEMENT_OVERLAY_BASE_ID = "element-base-menu";
const firebaseHelp = new firebaseHelper();

let EDITOR_THEME = 'DARK';


import editorCompHelper from '../../../component/helpers/editorCompHelper';
import Renderer from '../components/editor/renderer';



export default class LandAct extends React.Component{
     TEMP_WEBSITE_DATA = null;     
     SAVE_STATE = false;
     constructor(props){
          super(props);            
          this.state={
               loading:true,
               loading_prog:0,
               template_loading:false,
               _issaving:false,
               _issaved:false,
               dname:"Not done..",
               _temp_select_mod_show:false,
               _show_layer_menu:false,
               _show_pref_menu:false,
               _select_element_id:-1,
               _select_row_id:-1,
               _select_type_id:-1,
               _context_select_row_id:-1,
               _context_select_colm_id:-1,
               _add_elem_mod_show:false,
               _desktop_viewing_mode: true,
               _adder_type:0,
               _website_component : null,
               editorHelperComp:new editorCompHelper(),
          }
          this.fileUpload = React.createRef();

          this._add_notification = this._add_notification.bind(this);
          this._set_load_bool = this._set_load_bool.bind(this);
          this._set_elem_mod = this._set_elem_mod.bind(this);  
          this._set_unsaved_bool = this._set_unsaved_bool.bind(this);     
          this._get_back_type = this._get_back_type.bind(this);
          this._get_back_picker = this._get_back_picker.bind(this);
          this._set_curr_back = this._set_curr_back.bind(this);
          this.renderer_add_butt_callback = this.renderer_add_butt_callback.bind(this);
          this._ELEMENT_ADDER_TO_ARRAY = this._ELEMENT_ADDER_TO_ARRAY.bind(this);
          this._set_url_param_selec_id = this._set_url_param_selec_id.bind(this);
          this._set_selec_element_id = this._set_selec_element_id.bind(this);
          this._renderer_resize_callback = this._renderer_resize_callback.bind(this);
          this._set_viewing_mode = this._set_viewing_mode.bind(this);
          this._set_adder_type  =this._set_adder_type.bind(this);
          this._set_layer_menu_visi = this._set_layer_menu_visi.bind(this);
          this._set_temp_mod_show = this._set_temp_mod_show.bind(this);
          this._get_website_component = this._get_website_component.bind(this);
          this._set_website_component = this._set_website_component.bind(this);
          this._set_context_select= this._set_context_select.bind(this);
          this.handleFileImport = this.handleFileImport.bind(this);
          this.menuHandler = this.menuHandler.bind(this);
          this.basemenuHandler = this.basemenuHandler.bind(this);
          this.elementMenuUpdate = this.elementMenuUpdate.bind(this);
          this.websiteNameChangeHandler = this.websiteNameChangeHandler.bind(this);
          this._set_template_loading = this._set_template_loading.bind(this);
          this._set_loading_prog = this._set_loading_prog.bind(this);
          this._website_component_save = this._website_component_save.bind(this);
          this._set_issaving_bool = this._set_issaving_bool.bind(this);
          this._set_issave_bool = this._set_issave_bool.bind(this);
          this._render_save_indi = this._render_save_indi.bind(this);
          this.stateUpdateHandler =this.stateUpdateHandler.bind(this);
          this.noti_pool = [];     
     }
     /*////////////////////////////////////STATES SETTERS SECTION ///////////////////////////////////////////////////*/
     _set_issaving_bool(bool){
          this.setState({_issaving:bool})
     }
     _set_issave_bool(bool){
          this.setState({_issaved:bool})
     }
     _set_show_pref_menu(bool){
          this.setState({_show_pref_menu:bool})
     }
     _set_context_select(val,row_id){
          this.setState({
               _context_select_row_id:row_id,
               _context_select_colm_id:val,
               _select_type_id:2
               })
     }
     _set_loading_prog(val){
          this.setState({loading_prog:val});
     }
     _set_template_loading(bool){
          this.setState({template_loading:bool})
     }
     _set_temp_mod_show(bool){
          this.setState({_temp_select_mod_show:bool});
     }
     _set_website_component(val){
          this.setState({_website_component:val})
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
     _set_selec_element_id(val,row_id){
          this.setState({_select_element_id:val,
                         _select_row_id:row_id,
                         _select_type_id:1
                         })
     }
     _set_unsaved_bool(bool){
          this.setState({isUnSaved:bool});
     }
     _set_load_bool(bool){
          this.setState({loading:bool});
     }
     _set_elem_mod(bool){
          this.setState({_add_elem_mod_show:bool})
          if(bool===false){
               _INSERT_BOOL = 1;
          }
     }
     /*//////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
     
     /*////////////////////////////////////CONTEXT MENU SECTION ///////////////////////////////////////////////////*/
     menuHandler(e){
          let colmId = e.currentTarget.getAttribute("data-colmid");
          let rowId = e.currentTarget.getAttribute("data-rowId");
          let menuId = e.currentTarget.getAttribute("data-menuId")
          this._set_context_select(colmId,rowId);
          contextMenu.show({
            id: menuId,
            event: e
          });
        }
     basemenuHandler(e){
          let menuId = e.currentTarget.getAttribute("data-menuId")
          contextMenu.show({
            id: menuId,
            event: e
          });
        }
     /*/////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
     _get_website_component(){this.state._website_component;}
     copytoClip(txt){
          copy(txt);  
     }
     /*////////////////////////////////////NOTICATION SECTION ///////////////////////////////////////////////////*/
     
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
     /*/////////////////////////////////////////////////////////////////////////////////////////////////////////*/
     
     
     /*////////////////////////////////////INITAL DATA LOAD SECTION ///////////////////////////////////////////////////*/
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
                                   if(this.state._website_component){
                                        if(res.page_data!==null){ 
                                        console.log('LAND: Page data load success');
                                        this.state._website_component.PAGE_ID = res.page_id;
                                        this.state._website_component.VIEW_ID = res.page_data._VISIT_CODE;
                                        this.forceUpdate();
                                        }
                                        else{
                                             console.log('LAND: Page data load failure');
                                             this._add_notification('Page data failure','danger',5000);
                                        }
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
     async _init_land_user_check(){
          this._set_load_bool(true);
          _BACK_DATA = new backgrounClass();
          this._set_loading_prog(40);
          await firebaseHelp._init_user_check(null,_URLS.login).then((res)=>{
               if(res===true){
                    this._set_loading_prog(60);
                    storeHelper._get_base_page_data().then((r)=>{
                         console.log("LAND: init website load success");
                         this._set_loading_prog(100);
                         this._set_load_bool(false);
                         if(!r.page_data){
                              this._set_website_component(null);
                         }
                         else{
                              if(r.page_data._PAGE_CORE_ARRAY !== null && r.page_data._PAGE_CORE_ARRAY !== 'null'){
                                   const foundData = JSON.parse(r.page_data._PAGE_CORE_ARRAY);
                                   if(foundData.WEBSITE_VALIDITY_ID == 1001){
                                        this.TEMP_WEBSITE_DATA = JSON.stringify(foundData);
                                        let dw = this.parseLoadData(foundData);
                                        if(dw){
                                             this._set_website_component(dw);
                                        }
                                   }
                              }
                         }
                    });
                    if(this.state._website_component===null){
                         //this._set_temp_mod_show(true);
                    }
               }
          }
     )
     }
     /*///////////////////////////////////////////////////////////////////////////////////////*/
   

     /*////////////////////////////////////WEBSITE BACKGROUND SECTION ///////////////////////////////////////////////////*/
     _set_curr_back(){
          let set_style = {}
          if(this.state._website_component){
          let _BACK_DATA_CURR  = this.state._website_component.BACKGROUND_DATA;
          if(_BACK_DATA_CURR!==null){
               switch(_BACK_DATA_CURR.back_type){
                    case 0:{
                         set_style = {
                              backgroundColor:_BACK_DATA_CURR.solid_color,
                         }
                         break;
                    }
                    case 1:{
                         let linerString = 'linear-gradient('+_BACK_DATA_CURR.grad_deg+'deg , ';
                         _BACK_DATA_CURR.colors_array.map((e,ind)=>{
                              let tr = e ;
                              if(ind !== (_BACK_DATA_CURR.colors_array.length-1)){
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
                         if(_BACK_DATA_CURR.back_image!==null){
                         let linerString = 'url("';
                         _BACK_DATA_CURR.back_image.map((e,ind)=>{
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
                         set_style = _BACK_DATA_CURR.default_value
                         break;
                    }
               }
          }
          }
          return set_style;
     }
     _get_back_type(){
          if(this.state._website_component){
               let _BACK_DATA_CURR  = this.state._website_component.BACKGROUND_DATA;
          if(_BACK_DATA_CURR!==null){
          switch(_BACK_DATA_CURR.back_type){
               case 0:{return 'Solid'}
               case 1:{return 'Linear gradient'}
               case 2:{return 'Image'}
               default:{return 'Loading'}
          }}}
     }
     _draw_linear_grad_tab(){
          if(this.state._website_component){
               let _BACK_DATA_CURR  = this.state._website_component.BACKGROUND_DATA;
               if(_BACK_DATA_CURR!==null){
                    let res = [];
                    _BACK_DATA_CURR.colors_array.map((e,ind)=>{
                         res.push(<Dropdown.Item as="button" onClick={()=>{
                              _BACK_DATA_CURR.selec_color = ind
                              this.forceUpdate();
                         }}>Color {(ind+1)}</Dropdown.Item>)
                    })
                    return res;          
          
               }}
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

     _get_back_picker(){
          if(this.state._website_component){
          let _BACK_DATA_CURR  = this.state._website_component.BACKGROUND_DATA;
          if(_BACK_DATA_CURR!==null){
               switch(_BACK_DATA_CURR.back_type){
                    case 0:{return (
                         <div>
                                                            <OverlayTrigger
                                                            trigger="click"
                                                            placement="right"
                                                            rootClose={true}
                                                            overlay={<Popover id="popover-basic"  className='element_color_pick_popover'    backdropClassName="backdrop">
                                                            <ChromePicker
                                                                 color={_BACK_DATA_CURR.solid_color}
                                                                 onChange={(col)=>{
                                                                      _BACK_DATA_CURR.solid_color = col.hex;
                                                                       this.forceUpdate();
                                                                 }}
                                                                 onChangeComplete={()=>{ this.forceUpdate();}}
                                                            >
                                                            </ChromePicker>
                                                            </Popover>}
                                                            >
                                                            <Button variant={'light'} className='ele_pop_bdy_col_butt'>
                                                                 <div className='ele_pop_bdy_col_butt_col' style={{backgroundColor:_BACK_DATA_CURR.solid_color!==null?_BACK_DATA_CURR.solid_color:'#fff'}}></div>
                                                                 {_BACK_DATA_CURR.solid_color}
                                                            </Button>
                                                            </OverlayTrigger>
                    
                    </div>)}
                    case 1:{return (
                         <div>
                              <div className='ele_pop_hr_div_class'></div>
                              <Button variant={'primary'} 
                                   className='popover_back_class_add_butt'
                                   onClick={()=>{
                                        _BACK_DATA_CURR.colors_array.push('#e0e0e0');
                                   console.log("BACK COLOR ADDED FOR SIZE"+_BACK_DATA_CURR.colors_array.length)
                                   this.forceUpdate();
                              }}>Add Color +</Button>
                              <Dropdown>
                              <Dropdown.Toggle variant="primary"  className='popover_back_class_add_butt' id="popover_back_class_color_selec_butt">
                              Color {_BACK_DATA_CURR.selec_color}
                              </Dropdown.Toggle>
                                   <Dropdown.Menu>
                                   {this._draw_linear_grad_tab()}
                                   </Dropdown.Menu>
                              </Dropdown>
                              <div className='ele_pop_hr_div_class'></div>
                              <div className='ele_pop_bdy_txt'>Gradient angle</div>    
                                        <div className='ele_pop_bdy_slid_cont'>
                                        <div className='ele_pop_bdy_slid_hold'>
                                       {this._render_menu_slider(_BACK_DATA_CURR.grad_deg,0,360,(val)=>{_BACK_DATA_CURR.grad_deg = val;})}
                                        </div>
                                        </div>
                                        
                                                             <OverlayTrigger
                                                            trigger="click"
                                                            placement="right"
                                                            rootClose={true}
                                                            overlay={<Popover id="popover-basic"  className='element_color_pick_popover'    backdropClassName="backdrop">
                                                            <ChromePicker
                                                                 color={_BACK_DATA_CURR.colors_array[_BACK_DATA_CURR.selec_color]}
                                                                 onChange={(col)=>{
                                                                      _BACK_DATA_CURR.colors_array[_BACK_DATA_CURR.selec_color] = col.hex;
                                                                       this.forceUpdate();
                                                                 }}
                                                                 onChangeComplete={()=>{ this.forceUpdate();}}
                                                            >
                                                            </ChromePicker>
                                                            </Popover>}
                                                            >
                                                            <Button variant={'light'} className='ele_pop_bdy_col_butt'>
                                                                 <div className='ele_pop_bdy_col_butt_col' style={{backgroundColor:_BACK_DATA_CURR.colors_array[_BACK_DATA_CURR.selec_color]!==null?_BACK_DATA_CURR.colors_array[_BACK_DATA_CURR.selec_color]:'#fff'}}></div>
                                                                 {_BACK_DATA_CURR.colors_array[_BACK_DATA_CURR.selec_color]}
                                                            </Button>
                                        </OverlayTrigger>
                                        <div className='ele_pop_hr_div_class'></div>
                              <Button variant='danger' className='popover_back_class_add_butt left_pane_back_del_butt'  id='popover_back_class_color_selec_butt' onClick={()=>{
                                   if(_BACK_DATA_CURR.colors_array.length>=3){
                                        _BACK_DATA_CURR.colors_array.splice((_BACK_DATA_CURR.colors_array.length-1),1);
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
               }}}
               
     }
     /*////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
     
     
     /*////////////////////////////////////RENDERERS SECTION ///////////////////////////////////////////////////*/
     _render_component(){
          if(this.state._website_component && this.state._website_component!==undefined ){
          return <ElementRenderer 
          websiteComp={this.state._website_component}   
          currentSelectTypeId={null}
          currentSelectRowId={this.state._select_row_id}
          currentSelectColmId={this.state._select_element_id}
          overlayMenuId={ELEMENT_OVERLAY_MENU_ID}
          contextMenuHandler={this.menuHandler}
          resizeCallback={this._renderer_resize_callback}
          selectCallback={  this._set_url_param_selec_id}
          elementRenderCallback={null}
          />;
          }
          else{
               return(<div>Empty Outer render</div>)
          }
     }
     // _render_component(){
     //      return(this.state.editorHelperComp? <Renderer
     //      websiteHelper={this.state.editorHelperComp}
     //      updateHandler={this.stateUpdateHandler}
     //      />:<div>Empty Outer render</div>)
     // }
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
                    this.renderer_add_butt_callback(0,this.state._context_select_row_id,0,1)
                 }}>
                   + Section above
                 </Item>
                 <Item className='element_menu_item_main_cont' onClick={(event,props,triggerEvent,data)=>{
                    this.renderer_add_butt_callback(0,this.state._context_select_row_id,1,1)
                 }}>
                    + Section below
                 </Item>

                 <Item className='element_menu_item_main_cont' onClick={(event,props,triggerEvent,data)=>{
                    this.renderer_add_butt_callback(this.state._context_select_colm_id,this.state._context_select_row_id,2,1)
                 }}>
                    + Element to left
                 </Item>
                 <Item  className='element_menu_item_main_cont'  onClick={(event,props,triggerEvent,data)=>{
                    this.renderer_add_butt_callback(this.state._context_select_colm_id,this.state._context_select_row_id,3,1)
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
                                                       this._get_element_by_index(this.state._context_select_row_id,this.state._context_select_colm_id).DELETED = true;
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
     _render_layer_menu_component(){
          
          let layer_menu_data = [];
          for(let i = 0 ; i < this.state._website_component.getSectionArray().length;i++){
                    let layer_row_element_data = [];
                    for(let j = 0 ; j < this.state._website_component.getSectionArray()[i].getElementArray().length ; j++){
                         if(this.state._website_component.getSectionArray()[i].getElementArray()[j].DELETED===false){
                              layer_row_element_data.push(
                                   <div data-colmId={j} data-rowId={i} data-menuId={ELEMENT_OVERLAY_MENU_ID} onContextMenu={this.menuHandler} className={`element_layer_menu_acord_body_cont ${(this.state._select_element_id == j )&&( this.state._select_row_id == i )?'layer_acrd_selected':undefined}`}
                                   onMouseDown={(e)=>{
                                        this._set_url_param_selec_id(j,i);
                                   }}
                                   >
                                        {this.state._website_component.getSectionArray()[i].getElementArray()[j].NAME + " "+(j+1)}
                                        <div className={`element_layer_menu_acord_visi_cont`} 
                                                onClick={(e)=>{
                                                 this._get_element_by_index(i,j).ENABLED = !(this._get_element_by_index(i,j).ENABLED)
                                                 this.forceUpdate();
                                        }} >
                                             {
                                                   this._get_element_by_index(i,j).ENABLED===true?
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
     _render_current_website_template(){
          if(this.state._website_component!==null){
               return(
                    <div className='template_1_main_cont' onClick={(e)=>{
                         this._set_temp_mod_show(false);
                    }}>
                         <div className='template_1_main_cont_thumbnail'>
          
                         </div>
                         <div className='template_1_main_cont_tit'>
                                   Current website
                         </div>
                    </div>);
          }
          else{
               return(<div className='template_1_main_cont_no_web'>No current websites</div>)
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
                              className='land_act_elem_add_cont_bdy_main'
                              aria-labelledby="contained-modal-title-vcenter"
                              centered                        
                              >   
                              <div className='template_selection_main_outer_cont'>
                                   
                              <div className='template_selection_main_cont'>
                                   <div className='template_selection_head_main_cont'>
                                        Select Template
                                   </div>
                                   {/* <div className='template_selection_head_main_srch_cont'>
                                        <input type='text' className='template_selection_head_main_srch_fld' placeholder='Search'></input>
                                   </div> */}
                                   <div className='template_selection_selec_main_cont'>
                                   <div className='template_selection_selec_main_cont_row_main_cont'>
                                                  <div className='template_selection_selec_main_cont_row_tit'>Your Page</div>
                                                            <div className='template_selection_selec_main_cont_row'>
                                                                      {this._render_current_website_template()}
                                                            </div>          
                                                  </div>
                                        <div className='template_selection_selec_main_cont_row_main_cont'>
                                             <div className='template_selection_selec_main_cont_row_tit'>Basic Template</div>
                                             <div className='template_selection_selec_main_cont_row'

                                             >
                                                       <div className='template_1_main_cont' onClick={(e)=>{
                                                            this._set_temp_mod_show(false);
                                                            this._set_website_component(new websiteComp())
                                                       }}>
                                                            <div className='template_1_main_cont_thumbnail'>
                                                                 <svg className='template_1_main_cont_thumbnail_ico' viewBox='0 0 512 512'><title>Add Circle</title><path d='M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z' fill='none' stroke='currentColor' stroke-miterlimit='10' stroke-width='32'/><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M256 176v160M336 256H176'/></svg>
                                                            </div>
                                                            <div className='template_1_main_cont_tit'>
                                                                      Blank template
                                                            </div>
                                                       </div>
                                                       <div className='template_1_main_cont' onClick={(e)=>{
                                                            this._set_template_loading(true);
                                                            this.loadTemplate(1);
                                                            
                                                       }}>
                                                            <div className='template_1_main_cont_thumbnail'>
                                                                 
                                                            </div>
                                                            <div className='template_1_main_cont_tit'>
                                                                      Default template
                                                            </div>
                                                       </div>
                                             
                                             </div>
                                        </div>                                       
                                   </div>    
                              </div>
                                   <div className='template_selection_main_outer_loading' style={{visibility:this.state.template_loading==true?'visible':'hidden'}} >Loading..</div>
                              </div>                      
                    </Modal>  
      
               )
     }
     _select_render_window(){
          if(this.state._desktop_viewing_mode===true){
               return(   
                    <div className='land_act_creat_main_cont'
                    style={this._set_curr_back()}
                    data-menuId={ELEMENT_OVERLAY_BASE_ID} 
                     onContextMenu={this.basemenuHandler}
                    >
                             <div className='land_act_creat_main_cont_grd_back'  onMouseDown={(e)=>{
                         if(e.nativeEvent.which==1){
                              this._set_url_param_selec_id(-1,-1)
                         }
                         }
                    }></div>
                         <div className='land_act_creat_main_sub_cont'>
                                        {/* <div className='land_act_prv_add_bar_cont_outer'>
                                             <div className='land_act_prv_add_bar_cont'>
                                             <div className='land_act_prv_add_bar'>
                                                  <div className='land_act_prv_add_ico_cont'>
                                                  <svg className='land_act_prv_add_ico' viewBox='0 0 512 512'><title>Lock Closed</title><path d='M336 208v-95a80 80 0 00-160 0v95' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/><rect x='96' y='208' width='320' height='272' rx='48' ry='48' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/></svg>                                             
                                                  </div>
                                                  <a className='land_act_prv_add_lnk' href={this.state._website_component?process.env.NEXT_PUBLIC_HOST+'api/view?q='+this.state._website_component.VIEW_ID:null}>
                                                  {this.state._website_component?process.env.NEXT_PUBLIC_HOST+'api/view?q='+this.state._website_component.VIEW_ID:null}
                                                  </a>
                                             </div>
                                             <button className='land_act_prv_add_cpy_butt'
                                             onClick={()=>{
                                                  this.copytoClip(this.state._website_component?process.env.NEXT_PUBLIC_HOST+'api/view?q='+this.state._website_component.VIEW_ID:null);
                                                  this._add_notification("Link copied to clipboard","success",1000);
                                             }}
                                             ><svg className='land_act_prv_add_cpy' viewBox='0 0 512 512'><title>Copy</title><rect x='128' y='128' width='336' height='336' rx='57' ry='57' fill='none' stroke='currentColor' stroke-linejoin='round' stroke-width='32'/><path d='M383.5 128l.5-24a56.16 56.16 0 00-56-56H112a64.19 64.19 0 00-64 64v216a56.16 56.16 0 0056 56h24' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/></svg></button>

                                             <div className='land_act_prv_add_play_butt_cont'>
                                             <button className='land_act_prv_add_play_butt'>
                                                  <svg className='land_act_prv_add_play_ico' viewBox='0 0 512 512'><title>Play</title><path d='M112 111v290c0 17.44 17 28.52 31 20.16l247.9-148.37c12.12-7.25 12.12-26.33 0-33.58L143 90.84c-14-8.36-31 2.72-31 20.16z' fill='none' stroke='currentColor' stroke-miterlimit='10' stroke-width='32'/></svg>
                                             </button>
                                             </div>
                                             </div>    
                                   </div> */}
                                
                         <div className='land_act_creat_sub_cont'
                              style={{
                                   transform:this.state._website_component?`scale(${this.state._website_component.DISPLAY_SCALE/100,this.state._website_component.DISPLAY_SCALE/100})`:undefined,
                              }
                              }
                         >                
                                   {this._render_component()}
                                  
                         </div>
                         {this._render_context_menu()}
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
                                                       <a className='land_act_prv_add_lnk' href={process.env.NEXT_PUBLIC_HOST+'api/view?q='+this.state._website_component.VIEW_ID}>
                                                       {process.env.NEXT_PUBLIC_HOST+'api/view?q='+this.state._website_component.VIEW_ID}
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
    

     _render_background_menu(){
          return(
               <div className='land_left_bdy_butt_main_cont head_round_butt_cont'>
               <OverlayTrigger trigger="click" placement="bottom" className='land_left_bdy_butt_main_cont_over' overlay={ 
                    <Popover id="popover-basic"  className='popover_back_class' bsPrefix='left_cont_pop_cont' backdropClassName="backdrop">
                    <div className='popover_back_class_main_cont'>
                         <div className='popover_back_class_main_cont_tit'>Page Tunner</div>
                         <Accordion className='ele_men_acrd_main_cont'>
                         <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main'>
                              <div className='_ele_acrd_header_main_cont'>
                              {/* <svg className='_ele_acrd_header_main_cont_left_ico' height="36px" viewBox="0 0 24 24" width="36px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M5 17v2h14v-2H5zm4.5-4.2h5l.9 2.2h2.1L12.75 4h-1.5L6.5 15h2.1l.9-2.2zM12 5.98L13.87 11h-3.74L12 5.98z"/></svg> */}
                              <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                   Background
                              </div>
                         </Accordion.Toggle>
                              <Accordion.Collapse eventKey="0" className='pop_acrd_main_cont'>
                                   <div className='ele_menu_bdy_main_cont'>
                                   <div className='ele_pop_bdy_txt'>Background type</div>    
                              <Dropdown>
                              <Dropdown.Toggle variant="light" id="popover_back_class_selec_butt">
                              {this._get_back_type() }
                              </Dropdown.Toggle>
                              <Dropdown.Menu className='popover_back_class_selec_menu'>
                              <Dropdown.Item as="button" onClick={()=>{
                                   if(this.state._website_component){
                                        this.state._website_component.BACKGROUND_DATA.back_type = 0;
                                        this.forceUpdate();
                                   }
                                   }}>Solid</Dropdown.Item>
                              <Dropdown.Item as="button"
                                   onClick={()=>{
                                        if(this.state._website_component){
                                             console.log("HIT HIT");
                                             this.state._website_component.BACKGROUND_DATA.back_type = 1;
                                             this.forceUpdate();
                                        }
                                   }}
                              >Linear Gradient</Dropdown.Item>
                              {/* <Dropdown.Item as="button"
                                   onClick={()=>{
                                        if(this.state.websiteComponent){
                                             this.state.websiteComponent.BACKGROUND_DATA.back_type = 2;
                                             this.forceUpdate();
                                        }
                                   }}
                              >Image</Dropdown.Item> */}
                              </Dropdown.Menu>
                              </Dropdown>
                              <div className='popover_back_class_main_pick_cont'>
                                   {this._get_back_picker()}
                              </div>
                    </div>
               </Accordion.Collapse>
          </Accordion>
          
         
     </div>
     </Popover>} rootClose={false}>
          <button className='land_act_back_cust_butt head_round_top_butt'>
           <svg className='land_act_back_cust_butt_ico' height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 18c0 .55.45 1 1 1h5v-2H4c-.55 0-1 .45-1 1zM3 6c0 .55.45 1 1 1h9V5H4c-.55 0-1 .45-1 1zm10 14v-1h7c.55 0 1-.45 1-1s-.45-1-1-1h-7v-1c0-.55-.45-1-1-1s-1 .45-1 1v4c0 .55.45 1 1 1s1-.45 1-1zM7 10v1H4c-.55 0-1 .45-1 1s.45 1 1 1h3v1c0 .55.45 1 1 1s1-.45 1-1v-4c0-.55-.45-1-1-1s-1 .45-1 1zm14 2c0-.55-.45-1-1-1h-9v2h9c.55 0 1-.45 1-1zm-5-3c.55 0 1-.45 1-1V7h3c.55 0 1-.45 1-1s-.45-1-1-1h-3V4c0-.55-.45-1-1-1s-1 .45-1 1v4c0 .55.45 1 1 1z"/></svg>
          </button>
     </OverlayTrigger>
     </div>);
     }

     _render_save_indi(){
          return(this.state._issaving===true?<div className='land_act_save_indi indi_isaving'>Saving <Spinner animation="border" className='land_act_save_indi_spin'/></div>:this.SAVE_STATE===true?<div className='land_act_save_indi indi_saved'>Saved</div>:<div className='land_act_save_indi indi_unsaved'>Unsaved</div>
          )
     }

     _render_theme_selec_button(){
          return(
              <>  
               <Dropdown as={ButtonGroup}>
               <Dropdown.Toggle className="theme_drop_togg_butt">
                    {EDITOR_THEME.toLowerCase()}    
                    <svg className='theme_drop_togg_butt_ico' height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z"/></svg>
               </Dropdown.Toggle>
               <Dropdown.Menu className="super-colors">
                    <Dropdown.Item eventKey="1" as='button' onClick={()=>{EDITOR_THEME = 'DARK'; this.forceUpdate()}}>Dark</Dropdown.Item>
                    <Dropdown.Item eventKey="2" onClick={()=>{EDITOR_THEME = 'LIGHT'; this.forceUpdate()}}>Light</Dropdown.Item>
               </Dropdown.Menu>
               </Dropdown>{' '}
              </>
          )
     }

     _render_aprop_theme(){
          switch(EDITOR_THEME){
               case 'DARK':{
                    return(<GlobalStylesDark/>)
                    break;
               }
               case 'LIGHT':{
                    return(<GlobalStylesLight/>)
                    break;
               }
               default:{
                    return(<GlobalStylesDark/>)
                    break;
               }
          }
     }

     /*////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

       /*////////////////////////////////////UTILS SECTION ///////////////////////////////////////////////////*/
     
     async _website_component_save(){
          let temp_save_data_str = JSON.stringify(this.state._website_component)
          let temp_save_data = JSON.parse(temp_save_data_str);
          let succPass = 0;
          let failElementIndx = [];
          if(this.state._website_component){
               this._set_issaving_bool(true);
               console.log("Save start at init count "+temp_save_data.ELEMENT_COUNT);
               for(let i = 0 ; i < temp_save_data.SECTION_ARRAY.length ; i++){
                    for(let j = 0 ; j < temp_save_data.SECTION_ARRAY[i].ELEMENT_ARRAY.length ; j++){
                         if(!temp_save_data.SECTION_ARRAY[i].ELEMENT_ARRAY[j].DELETED){
                              if(parseInt(temp_save_data.SECTION_ARRAY[i].ELEMENT_ARRAY[j].TYPE_ID) === 2){
                                   if(temp_save_data.SECTION_ARRAY[i].ELEMENT_ARRAY[j].image_data){
                                        console.log("Imaeg upload init");
                                        let res = await storeHelper._image_upload(temp_save_data.SECTION_ARRAY[i].ELEMENT_ARRAY[j].image_data[0]);
                                        if(res.fileId){
                                             temp_save_data.SECTION_ARRAY[i].ELEMENT_ARRAY[j].image_tumb_url = res.thumbnailUrl
                                             temp_save_data.SECTION_ARRAY[i].ELEMENT_ARRAY[j].imageKitFileId = res.fileId;
                                             temp_save_data.SECTION_ARRAY[i].ELEMENT_ARRAY[j].image_data_url = res.url;
                                             temp_save_data.SECTION_ARRAY[i].ELEMENT_ARRAY[j].image_data = null;
                                             succPass++;     
                                             this.state._website_component.getSectionArray()[i].getElementArray()[j].image_data = null;
                                             this.state._website_component.getSectionArray()[i].getElementArray()[j].image_tumb_url = res.thumbnailUrl
                                             this.state._website_component.getSectionArray()[i].getElementArray()[j].imageKitFileId = res.fileId;
                                             this.state._website_component.getSectionArray()[i].getElementArray()[j].image_data_url = res.url;
                                        }
                                        else{
                                             failElementIndx.push([i,j]);           
                                        }
                                   }
                              }else{

                                   succPass++;
                              }
                         }
                         else{

                         }
                    }
               }    
               let pageUpateRes = await storeHelper._update_page_data({
                     UID:cookies.get('accessToken'),
                    _ELEMENT_COUNT:temp_save_data.ELEMENT_COUNT,
                    _PAGE_CORE_ARRAY:JSON.stringify(temp_save_data),
                    _PAGE_CORE_CODE:'null',
               });
               if(pageUpateRes.errBool === false){
                    console.log("Save end at success count"+succPass);          
                    this.SAVE_STATE = true;
                    this.TEMP_WEBSITE_DATA = JSON.stringify(temp_save_data);
                    this._set_issave_bool(true);
               }
               else{
                    console.log("Save end at failuer count"+succPass);     
                    this.SAVE_STATE = false;
                    this._set_issave_bool(false);
               }
               this._set_issaving_bool(false);
          }
     }
     _element_add_modal() {
          return (
            <Modal
               show={this.state._add_elem_mod_show}
               onHide={()=>{this._set_elem_mod(false)}}
               size="sm"
               className='land_act_elem_add_cont_bdy_main'
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
         if(this.state._select_type_id==2){
          this.state._website_component.addElement(element_type_id,this.state._context_select_row_id,this.state._context_select_colm_id,_INSERT_BOOL)
         }
         else{
          this.state._website_component.addElement(element_type_id,null,null,_INSERT_BOOL)
         }
         this.state._website_component.recalcElementIds();
          console.log(`LAND: Element Added  `);
          this._set_elem_mod(false);
     }
     _set_url_param_selec_id(element_index_id,element_row_id,selec_type_id){
     Router.push({query:{ row_id:element_row_id,select_id:element_index_id}},null,{scroll:false,shallow:true});
     this._set_selec_element_id(element_index_id,element_row_id,selec_type_id);
    }
     _get_element_by_index(i,j){
     if(this.state._website_component.getSectionArray()[i].getElementArray()[j]!==undefined){
          return(this.state._website_component.getSectionArray()[i].getElementArray()[j]);
     }
     else{
          return false;
     }
     }
     _renderer_resize_callback(row_id,element_id,incr_hgt,incr_wdt){
          this._get_element_by_index(row_id,element_id).STYLE.element_width = parseInt(incr_wdt);
          this._get_element_by_index(row_id,element_id).STYLE.element_height = parseInt(incr_hgt);
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
     async _browserfs_callback(e){
          if (e) {
               console.log("FILEEXPORT: File exporting configured fail");  
               throw e
          }
          console.log("FILEEXPORT: File exporting configured success");
          window.fs = window.require('fs')
     }
     _set_browserfs_configure(){
          BrowserFS.install(window)
          BrowserFS.configure(
          {
          fs: 'LocalStorage'
          },
          (e)=>{this._browserfs_callback(e)}
          )
     }
     parseLoadData(dataParse){
          let tw = Object.assign(new websiteComp,dataParse);
          for(let i = 0 ; i < dataParse.SECTION_ARRAY.length;i++){
               tw.getSectionArray()[i] = Object.assign(new sectionComp,dataParse.SECTION_ARRAY[i]);
               for(let j = 0 ; j < dataParse.SECTION_ARRAY[i].ELEMENT_ARRAY.length ; j++){
                    tw.getSectionArray()[i].getElementArray()[j] = Object.assign(new elementComp,dataParse.SECTION_ARRAY[i].ELEMENT_ARRAY[j]);
               }
          }
          return tw;
     }
     handleFileImport(evt){
          let dataParse = JSON.parse(evt.target.result)
          if(dataParse){
               let dw = this.parseLoadData(dataParse);
               if(dw)
               {this._set_website_component(dw);}
          }
     }
     async loadTemplate(int){          
          let resu = await storeHelper._get_template(int);
          if(resu){
               let dw = this.parseLoadData(JSON.parse(resu.data));
               if(dw)
               {
                    this._set_website_component(dw);
                    this._set_template_loading(false);
                    this._set_temp_mod_show(false);
               
                    return true;
               }
               else{
                    return false;
               }
          }
     }
     /*//////////////////////////////////////////////////////////////////////////////////////////////////////////////*/   

     /*////////////////////////////////////COMPONENT SECTION ///////////////////////////////////////////////////*/

     componentDidMount(){  
          this._set_loading_prog(20);
          this._init_land_user_check();   
          this._set_browserfs_configure();
          // window.addEventListener('beforeunload',(e)=>{
          //      e.preventDefault();
          //      if(this.SAVE_STATE===true){
          //           return;
          //      }
          //      else{
          //           e.returnValue  = '';
          //      }
               
               
          // });
     }
     elementMenuUpdate(){
          this.forceUpdate();
     }

     stateUpdateHandler(){
          this.forceUpdate();
     }
     
     updateSaveState(){
          if(_.isEqual(JSON.stringify(this.state._website_component),this.TEMP_WEBSITE_DATA)==true){
               this.SAVE_STATE = true;
               return;   
          }
          else{
               this.SAVE_STATE = false;
               return;   
          }
     }

     componentDidUpdate(){
               this.updateSaveState();
               // console.log(this.TEMP_WEBSITE_DATA);     
               //  console.log(this.state._website_component);
               //console.log(_.isEqual(JSON.stringify(this.state._website_component),this.TEMP_WEBSITE_DATA));
               
            

      }
      /*//////////////////////////////////////////////////////////////////////////////////////////////////////*/
 

        /*////////////////////////////////////UI SECTION ///////////////////////////////////////////////////*/

      websiteNameChangeHandler(e){
          if(this.state._website_component){
               this.state._website_component.NAME = e.target.value;
               this.forceUpdate();
          }      
     
      }


        ////////////////////////////////////////////////////////////////////////////////////////////////////////////

     
      render(){               
     return(
          this.state.loading===true?
          <div>
               <LoaderHelper prog={this.state.loading_prog} />     
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
               {this._render_aprop_theme()}
               <title>{process.env.APP_NAME}</title>
               <head><meta charset="utf-8" /></head>
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
                              <Dropdown.Menu className='land_act_head_tit_cont_logo_menu' >
                              <Dropdown.Item as="button" className='land_act_head_tit_cont_logo_menu_butt'>Save</Dropdown.Item>
                              
                              <Dropdown.Item as="button" className='land_act_head_tit_cont_logo_menu_butt'>Undo</Dropdown.Item>
                              <Dropdown.Item as="button" className='land_act_head_tit_cont_logo_menu_butt'>Redo</Dropdown.Item>
                              
                              <Dropdown.Item as="button" className='land_act_head_tit_cont_logo_menu_butt' onClick={()=>{
                                          let element = document.createElement('input');
                                          element.setAttribute('type','file');
                                          element.setAttribute('multiple',"false");
                                          element.setAttribute('accept',"application/json")
                                          element.addEventListener('change',(e)=>{
                                             var files = e.target.files;
                                             var reader = new FileReader();
                                             reader.readAsText(files[0], "UTF-8");
                                             reader.onload = this.handleFileImport;
                                          })
                                          element.click();
                              }}>
                                   Import     
                              </Dropdown.Item>
                              <Dropdown.Item as="button" className='land_act_head_tit_cont_logo_menu_butt' onClick={()=>{
                                              if(this.state._website_component){
                                              const expt_name = "titan_export.json";
                                              var str = JSON.stringify(this.state._website_component);
                                              var dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(str);
                                              let element = document.createElement('a');
                                              element.setAttribute('href',dataUri);
                                              element.setAttribute('download',expt_name);
                                              element.style.display = 'none';
                                              element.click();
                                              this._add_notification("File exported","success",1000);
                                              }
                                              else{
                                                   console.log("LAND: File export error Null file");
                                              }
                              }}>Export</Dropdown.Item>
                              
                              <Dropdown.Item as="button" className='land_act_head_tit_cont_logo_menu_butt'>Prefrences</Dropdown.Item>
                              <Dropdown.Item as="button" className='land_act_head_tit_cont_logo_menu_butt'>Template setting</Dropdown.Item>
                              
                              <Dropdown.Item as="button" className='land_act_head_tit_cont_logo_menu_butt'>Help</Dropdown.Item>
                              </Dropdown.Menu>
                         </Dropdown>
                              
                         <div className='land_act_head_main_left_butt_cont'>
                         <button className='theme_drop_togg_butt head_butt_white' onClick={()=>{this._set_elem_mod(true)}}>
                                             Add Element
                                             <svg className='theme_drop_togg_butt_ico' viewBox='0 0 512 512'><title>Add</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M256 112v288M400 256H112'/></svg>
                                   </button>
                                        
                         </div>
                         <div className='land_act_head_main_left_butt_cont'>
                                                    {this._render_background_menu()}
                         </div>
                         <div className='land_act_head_main_left_butt_cont'>
                                                             <button className='land_act_back_cust_butt head_round_top_butt' onClick={()=>{
                                                                 this._set_layer_menu_visi(!this.state._show_layer_menu);
                                                            }}>
                                                                 <svg className='land_act_back_cust_butt_ico' height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12.6 18.06c-.36.28-.87.28-1.23 0l-6.15-4.78c-.36-.28-.86-.28-1.22 0-.51.4-.51 1.17 0 1.57l6.76 5.26c.72.56 1.73.56 2.46 0l6.76-5.26c.51-.4.51-1.17 0-1.57l-.01-.01c-.36-.28-.86-.28-1.22 0l-6.15 4.79zm.63-3.02l6.76-5.26c.51-.4.51-1.18 0-1.58l-6.76-5.26c-.72-.56-1.73-.56-2.46 0L4.01 8.21c-.51.4-.51 1.18 0 1.58l6.76 5.26c.72.56 1.74.56 2.46-.01z"/></svg>
                                                                 
                                                            </button>
                         </div>
                                        <div className='land_act_head_main_left_butt_cont'>
                                        <OverlayTrigger trigger="click" placement="bottom" overlay={ 
                                                                           <Popover id="popover-basic"  className='popover_back_class' bsPrefix='left_cont_pop_cont'  backdropClassName="backdrop">
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
                                                                                     <button className='land_act_back_cust_butt head_round_top_butt'>
                                                                                     <svg className='land_act_back_cust_butt_ico' viewBox='0 0 512 512'><title>Information Circle</title><path d='M248 64C146.39 64 64 146.39 64 248s82.39 184 184 184 184-82.39 184-184S349.61 64 248 64z' fill='none' stroke='currentColor' stroke-miterlimit='10' stroke-width='32'/><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M220 220h32v116'/><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-miterlimit='10' stroke-width='32' d='M208 340h88'/><path d='M248 130a26 26 0 1026 26 26 26 0 00-26-26z'  fill='currentColor'/></svg>
                                                                                     </button>
                                                                 </OverlayTrigger>
                                        </div>
                    
                    </div>  

                    <div className='land_act_head_cent_main_cont'>
                              
                              <div className='land_act_head_cent_main_cont_wb_name_cont'>
                                        Project Titan
                              </div>

                    </div>               
                    <div className='land_act_head_rght_main_cont'>
                              <div className='land_act_head_rght_feed_butt_cont'>
                                  <FeedbackComp/> 
                              </div>
                              <div className='land_act_head_rght_feed_butt_cont'>
                              {this._render_theme_selec_button()}
                              </div>
                              <div className='land_act_head_rght_feed_butt_cont'>
                              <button className='theme_drop_togg_butt head_butt_blue' onClick={this._website_component_save}> 
                                             Save
                                             <svg  className='theme_drop_togg_butt_ico' height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M17.59 3.59c-.38-.38-.89-.59-1.42-.59H5c-1.11 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7.83c0-.53-.21-1.04-.59-1.41l-2.82-2.83zM12 19c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm1-10H7c-1.1 0-2-.9-2-2s.9-2 2-2h6c1.1 0 2 .9 2 2s-.9 2-2 2z"/></svg>
                                        </button>
                              </div>

                              {/* <div className='land_act_head_rght_feed_butt_cont'>
                              <Dropdown>
                              <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                   <img src='http://simpleicon.com/wp-content/uploads/account.png' className='land_act_head_rght_acc_img'></img>                                   
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                              <div className='land_act_head_nam_txt'>{this.state.dname}</div>
                              <Dropdown.Item as="button" onClick={firebaseHelp._firebaseGoogleSignOutInit}>Sign Out</Dropdown.Item>
                              </Dropdown.Menu>
                              </Dropdown>
                              </div> */}
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
                                                       <button className='land_act_back_cust_butt' onClick={this._website_component_save}>
                                                            <svg  className='land_act_back_cust_butt_ico_save' height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M17.59 3.59c-.38-.38-.89-.59-1.42-.59H5c-1.11 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7.83c0-.53-.21-1.04-.59-1.41l-2.82-2.83zM12 19c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm1-10H7c-1.1 0-2-.9-2-2s.9-2 2-2h6c1.1 0 2 .9 2 2s-.9 2-2 2z"/></svg>
                                                            
                                                       </button>
                                                  </div>
                                                                          
                                                                 {/* {this._render_background_menu()}; */}
                                                       <div className='land_left_bdy_butt_main_cont'>
                                                            <div className='land_left_bdy_butt_main_tit_cont'>
                                                                      <div className='land_left_bdy_butt_main_tit_cont_arrow'></div>
                                                                      Layers
                                                            </div>
                                                            <button className='land_act_back_cust_butt' onClick={()=>{
                                                                 this._set_layer_menu_visi(!this.state._show_layer_menu);
                                                            }}>
                                                                 <svg className='land_act_back_cust_butt_ico' height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12.6 18.06c-.36.28-.87.28-1.23 0l-6.15-4.78c-.36-.28-.86-.28-1.22 0-.51.4-.51 1.17 0 1.57l6.76 5.26c.72.56 1.73.56 2.46 0l6.76-5.26c.51-.4.51-1.17 0-1.57l-.01-.01c-.36-.28-.86-.28-1.22 0l-6.15 4.79zm.63-3.02l6.76-5.26c.51-.4.51-1.18 0-1.58l-6.76-5.26c-.72-.56-1.73-.56-2.46 0L4.01 8.21c-.51.4-.51 1.18 0 1.58l6.76 5.26c.72.56 1.74.56 2.46-.01z"/></svg>
                                                                 
                                                            </button>
                                                       </div>
                                                  
                                                       <div className='land_left_bdy_butt_main_cont'>
                                                            <div className='land_left_bdy_butt_main_tit_cont'>
                                                                      <div className='land_left_bdy_butt_main_tit_cont_arrow'></div>
                                                                      Undo
                                                            </div>
                                                            <button className='land_act_back_cust_butt'>
                                                                 <svg className='land_act_back_cust_butt_ico'  height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L3.71 8.71C3.08 8.08 2 8.52 2 9.41V15c0 .55.45 1 1 1h5.59c.89 0 1.34-1.08.71-1.71l-1.91-1.91c1.39-1.16 3.16-1.88 5.12-1.88 3.16 0 5.89 1.84 7.19 4.5.27.56.91.84 1.5.64.71-.23 1.07-1.04.75-1.72C20.23 10.42 16.65 8 12.5 8z"/></svg>
                                                            </button>
                                                       </div>

                                                       <div className='land_left_bdy_butt_main_cont'>
                                                            <div className='land_left_bdy_butt_main_tit_cont'>
                                                                      <div className='land_left_bdy_butt_main_tit_cont_arrow'></div>
                                                                      Redo
                                                            </div>
                                                            <button className='land_act_back_cust_butt'>
                                                                 <svg className='land_act_back_cust_butt_ico' height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.16 0-7.74 2.42-9.44 5.93-.32.67.04 1.47.75 1.71.59.2 1.23-.08 1.5-.64 1.3-2.66 4.03-4.5 7.19-4.5 1.95 0 3.73.72 5.12 1.88l-1.91 1.91c-.63.63-.19 1.71.7 1.71H21c.55 0 1-.45 1-1V9.41c0-.89-1.08-1.34-1.71-.71l-1.89 1.9z"/></svg>
                                                                      
                                                            </button>
                                                       </div>

                                        <div className='land_left_bdy_butt_main_cont'>
                                             
                                        </div>

                                                  <OverlayTrigger trigger="click" placement="right" overlay={ 
                                                            <Popover id="popover-basic"  className='popover_back_class' bsPrefix='left_cont_pop_cont'  backdropClassName="backdrop">
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
                                                                      <svg className='land_act_back_cust_butt_ico' viewBox='0 0 512 512'><title>Information Circle</title><path d='M248 64C146.39 64 64 146.39 64 248s82.39 184 184 184 184-82.39 184-184S349.61 64 248 64z' fill='none' stroke='currentColor' stroke-miterlimit='10' stroke-width='32'/><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M220 220h32v116'/><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-miterlimit='10' stroke-width='32' d='M208 340h88'/><path d='M248 130a26 26 0 1026 26 26 26 0 00-26-26z'  fill='currentColor'/></svg>
                                                                      </button>
                                                  </OverlayTrigger>

                                        </div>
                    </div>
                    {this._render_layer_menu()}
                    {this._select_render_window()}
                    <ElementMenu
                     websiteComponent={this.state._website_component}
                     rowId={this.state._select_row_id}
                     columnId={this.state._select_element_id}
                     selectTypeId={null}
                     addNotification={this._add_notification}
                     updateEditor={this.elementMenuUpdate}
                     saveIndi={this._render_save_indi}
                    

                    />
               </div>            
               {this._render_notif()}
               {this._render_init_template_menu()}
        </div>
     );
}
}