import React, { useState,useEffect,Suspense } from 'react';
import firebaseHelper from '../../../util/firebase_helper';
import firestoreHelper from '../../../util/firestore_helper';
import {Accordion,Alert,Button,Dropdown,Modal,OverlayTrigger,Tooltip,Popover,Tabs,Tab,DropdownButton,ToggleButton,ButtonGroup,ToggleButtonGroup } from 'react-bootstrap';
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
import ElementMenu from '../components/editor/elementMenu';
import fileExport from '../../../util/file_export';
const BrowserFS = require('browserfs')


import {
     Menu,
     Item,
     Separator,
     Submenu,
     contextMenu ,
     animation
   } from "react-contexify";



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

const ELEMENT_OVERLAY_MENU_ID = "element-overlay-menu";
const ELEMENT_OVERLAY_BASE_ID = "element-base-menu";
const firebaseHelp = new firebaseHelper();
var fileExt = new fileExport();

export default class LandAct extends React.Component{
     
     constructor(props){
          super(props);            
          this.state={
               loading:false,
               isUnSaved:false,
               dname:"Not done..",
               _temp_select_mod_show:false,
               _show_layer_menu:false,
               _select_element_id:-1,
               _select_row_id:-1,
               _select_type_id:-1,
               _context_select_row_id:-1,
               _context_select_colm_id:-1,
               _add_elem_mod_show:false,
               _desktop_viewing_mode: true,
               _adder_type:0,
               _website_component :  new websiteComp()
          }
         
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
          this.menuHandler = this.menuHandler.bind(this);
          this.basemenuHandler = this.basemenuHandler.bind(this);
          this.elementMenuUpdate = this.elementMenuUpdate.bind(this);
          
          
          this.noti_pool = [];     
          fileExt._set_website_comp(this.state._website_component);
     }
     /*////////////////////////////////////STATES SETTERS SECTION ///////////////////////////////////////////////////*/
     _set_context_select(val,row_id){
          this.setState({
               _context_select_row_id:row_id,
               _context_select_colm_id:val,
               _select_type_id:2
               })
     }
     _set_temp_mod_show(bool){
          this.setState({_temp_select_mod_show:bool});
     }
     _set_website_component(){
          this.setState({_website_component:websiteComponent})
     }
     _set_temp_mod_show(bool){
          this.setState({_temp_select_mod_show:bool});
     }
     _set_layer_menu_visi(bool){
          this.setState({_show_layer_menu:bool})
     }   
     _set_adder_type(val){
          this.setState({_adder_type:val});
     } 
     _set_website_component(){
          this.setState({_website_component:websiteComponent})
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
          await firebaseHelp._init_user_check(null,_URLS.login).then((res)=>{
               if(res===true){
                    this._init_land_data(1);          
               }
          }
     );
     }
     /*///////////////////////////////////////////////////////////////////////////////////////*/
   

     /*////////////////////////////////////WEBSITE BACKGROUND SECTION ///////////////////////////////////////////////////*/
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
                 <Separator className='element_menu_sep_main_cont' />
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
                         
                              {/* <Button className='land_act_gen_butt' onClick={()=>{this._gen_page_code();}}>Save</Button> */}
                                        <div className='land_act_prv_add_bar_cont'>
                                        <div className='land_act_prv_add_bar_cir_cont'>
                                        <div  className='land_act_prv_add_bar_cir '></div>
                                        <div  className='land_act_prv_add_bar_cir '></div>
                                        <div  className='land_act_prv_add_bar_cir '></div>
                                        </div>
                                        <div className='land_act_prv_add_bar'>
                                             <svg className='land_act_prv_add_ico' viewBox='0 0 512 512'><title>Lock Closed</title><path d='M336 208v-95a80 80 0 00-160 0v95' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/><rect x='96' y='208' width='320' height='272' rx='48' ry='48' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/></svg>                                             
                                             <a className='land_act_prv_add_lnk' href={process.env.NEXT_PUBLIC_HOST+'api/view?q='+this.state._website_component.VIEW_ID}>
                                             {process.env.NEXT_PUBLIC_HOST+'api/view?q='+this.state._website_component.VIEW_ID}
                                             </a>
                                        </div>
                                        <button className='land_act_prv_add_cpy_butt'>
                                             <svg className='land_act_prv_add_cpy' viewBox='0 0 512 512'><title>Create</title><path d='M384 224v184a40 40 0 01-40 40H104a40 40 0 01-40-40V168a40 40 0 0140-40h167.48' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/><path d='M459.94 53.25a16.06 16.06 0 00-23.22-.56L424.35 65a8 8 0 000 11.31l11.34 11.32a8 8 0 0011.34 0l12.06-12c6.1-6.09 6.67-16.01.85-22.38zM399.34 90L218.82 270.2a9 9 0 00-2.31 3.93L208.16 299a3.91 3.91 0 004.86 4.86l24.85-8.35a9 9 0 003.93-2.31L422 112.66a9 9 0 000-12.66l-9.95-10a9 9 0 00-12.71 0z'/></svg>
                                        </button>

                                        <button className='land_act_prv_add_cpy_butt'
                                        onClick={()=>{
                                             this.copytoClip(process.env.NEXT_PUBLIC_HOST+'api/view?q='+this.state._website_component.VIEW_ID);
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

     /*////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

       /*////////////////////////////////////UTILS SECTION ///////////////////////////////////////////////////*/
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

     /*//////////////////////////////////////////////////////////////////////////////////////////////////////////////*/   

     /*////////////////////////////////////COMPONENT SECTION ///////////////////////////////////////////////////*/

     componentDidMount(){  
          this._init_land_user_check();   
          this._set_browserfs_configure();
          
     }
     elementMenuUpdate(){
          this.forceUpdate();
     }
     componentDidUpdate(){
          
      }
      /*//////////////////////////////////////////////////////////////////////////////////////////////////////*/
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
                              <Dropdown.Item as="button" onClick={()=>{
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
                              <Dropdown.Divider />
                              <Dropdown.Item as="button">Prefrences</Dropdown.Item>
                              <Dropdown.Item as="button">Template setting</Dropdown.Item>
                              <Dropdown.Divider />
                              <Dropdown.Item as="button">Help</Dropdown.Item>
                              </Dropdown.Menu>
                         </Dropdown>
                
                    
                    </div>  

                    <div className='land_act_head_cent_main_cont'>
                              
                              <div className='land_act_head_cent_main_cont_wb_name_cont'>
                                        <input value={this.state._website_component.NAME}  
                                        className='land_act_head_cent_main_cont_wb_name_fld' 
                                        autoCorrect={false}
                                        autoCapitalize={true}
                                        autoComplete={false} />
                              </div>

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
                    <ElementMenu
                     websiteComponent={this.state._website_component}
                     rowId={this.state._select_row_id}
                     columnId={this.state._select_element_id}
                     selectTypeId={null}
                     addNotification={this._add_notification}
                     updateEditor={this.elementMenuUpdate}
                    />
               </div>            
               {this._render_notif()}
               {this._render_init_template_menu()}
        </div>
     );
}
}

