import React from "react";
import {Accordion,Alert,Button,Dropdown,Modal,Nav,OverlayTrigger,Tooltip,Popover,Tabs,Tab,DropdownButton,ToggleButton,ButtonGroup,ToggleButtonGroup ,Row,Col } from 'react-bootstrap';
import { Resizable } from "re-resizable";
import {ChromePicker} from 'react-color'
import FONT_FAMILY_NAMES from '../../../../util/fontFamily';
import ImageUploading from 'react-images-uploading';

var _SLIDER_EDIT_BOOl = false;
var _SLIDER_SELECT_BOOl = false;


export default class elementMenu extends React.Component{
     constructor(props){
          super(props);
          this.state={
               _edit_menu_width:270,

          }
          this._render_element_menu = this._render_element_menu.bind(this);
     }

      /*
          websiteComponent
          rowId
          columnId
          selectTypeId
          updateEditor
          addNotification
          saveIndi  
     */


       

         

          _add_notification(txt,type,dura){
               this.props.addNotification(txt,type,dura);
          }
          _get_element_by_index(i,j){
                    if(this.props.websiteComponent.getSectionArray()[i].getElementArray()[j]!==undefined){
                         return(this.props.websiteComponent.getSectionArray()[i].getElementArray()[j]);
                    }
                    else{
                         return false;
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
                     this.props.updateEditor();
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
                     this.props.updateEditor(); }
               }}
               onMouseUp={(e)=>{
                    _SLIDER_SELECT_BOOl = false;
                     this.props.updateEditor();
               }}
               onMouseLeave={(e)=>{
                    _SLIDER_SELECT_BOOl = false;
                     this.props.updateEditor();
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
                                         this.props.updateEditor();
                                   }
                              }}
                              onBlur={(e)=>{
                                   _SLIDER_EDIT_BOOl = false
                                    this.props.updateEditor();
                              }}
                         value={base_val} onChange={(e)=>{
                              if(e.target.value == ""){
                                   callback(parseInt(min))
                                    this.props.updateEditor();
                                   return;
                              }
                              if(parseInt(e.target.value)>=min && parseInt(e.target.value)<=max){
                                   callback(parseInt(e.target.value))
                              }
                               this.props.updateEditor();
                         }} ></input>}
                         </div>
                    </div>
               </div>)
          }
          _render_element_menu(){
               
                    if(this.props.columnId!==null||this.props.columnId!==-1||this.props.rowId!==null||this.state._select_row_id!==-1){
                         let got_elem =this._get_element_by_index(this.props.rowId,this.props.columnId); 
                         switch(got_elem.TYPE_ID){
                              case 0:{
                                   return(this._render_text_menu(got_elem))
                                   break;
                              }
                              case 1:{
                                   return(this._render_link_menu(got_elem))
                                   break;
                              }
                              case 2:{
                                   return(this._render_image_menu(got_elem))
                                   break;
                              }
                              case 4:{
                                   return(this._render_embeded_menu(got_elem))
                                   break;
                              }
                              default:{
                                   return(<div>Empty Menu</div>)
                                   break;
                              }
                         }     
                    }
                    
          }
          _draw_font_family(element){
               let res = []
                    FONT_FAMILY_NAMES.map((e,ind)=>{
                      res.push(<Dropdown.Item as="button" onClick={()=>{
                         element.STYLE.font_family = e;
                          this.props.updateEditor();
                      }}>{e}</Dropdown.Item>);
                    })
               
               return res;
          }

          _render_embeded_menu(element){
               if(element!==false){ 
                    return(
                    <div className='ele_pop_main_bdy'>
                              <div className='pop_txt_head_main_cont'>
                                        <div className='pop_txt_head_txt'>Embeded</div>
                                             <div className='pop_txt_head_rght_cont'>
                                             <div className='pop_txt_head_rght_cont_swt'>
                                             <input type="checkbox" checked={element.ENABLED} id="switch" onChange={(e)=>{    
                                                  element.ENABLED = !(element.ENABLED)
                                                   this.props.updateEditor();
                                             }} />
                                             <label for="switch" className='ele_pop_elem_lab'>Toggle</label>
                                             </div>
                                             <div className='pop_txt_head_rght_cont_del_swt'>
                                                       <button className='pop_txt_head_rght_cont_del_swt_butt'
                                                        onClick={()=>{
                                                            element.DELETED = true;
                                                            this._add_notification("Text element deleted","danger",1000);
                                                            
                                                             this.props.updateEditor();           
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
                                             value={element.INNER_DATA}
                                             onChange={(e)=>{
                                                  element.INNER_DATA = e.target.value;
                                                   this.props.updateEditor();
                                             }} />          
                                             </div>
                                   </div>    
                                   <Accordion className='ele_men_acrd_main_cont'>
                                        <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main'>
                                             <div className='_ele_acrd_header_main_cont'>
                                             <svg   className='_ele_acrd_header_main_cont_left_ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z"/></svg>
                                             <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                             Background 
                                             </div>
                                        </Accordion.Toggle>
                                   <Accordion.Collapse eventKey="0">
                                        <div className='ele_menu_bdy_main_cont'>
                                        <div className='ele_pop_bdy_opt_main_cont'>
                                        <div className='ele_pop_bdy_txt'>Box shadow</div>        
                                        <input className='ele_pop_bdy_chck_cont' checked={element.STYLE.box_shadow_enable} type='checkbox' onClick={
                                             (e)=>{element.STYLE.box_shadow_enable=!element.STYLE.box_shadow_enable
                                                   this.props.updateEditor();
                                             }
                                        }></input>
                                        </div>
     
                                        <div className='ele_pop_bdy_txt'>Box shadow</div>
                                        <div className='ele_pop_box_shad_main_cont'>
     
                                             <div className='ele_pop_box_shad_main_cont_row'>
                                             <div className='ele_pop_box_shad_main_txt_main_cont'>
                                             <div className='ele_pop_box_shad_main_txt_main_cont_lab'>X</div>
                                             <input type='text' className='ele_pop_box_shad_main_txt' value={element.STYLE.box_shadow_x}
                                             onChange={(e)=>{
                                                  element.STYLE.box_shadow_x = e.target.value
                                                   this.props.updateEditor();
                                             }}
                                             ></input>
                                             </div>
                                             <div className='ele_pop_box_shad_main_txt_main_cont'>
                                             <div className='ele_pop_box_shad_main_txt_main_cont_lab'>Y</div>
                                             <input type='text' className='ele_pop_box_shad_main_txt' value={element.STYLE.box_shadow_y}
                                             onChange={(e)=>{
                                                  element.STYLE.box_shadow_y = e.target.value
                                                   this.props.updateEditor();
                                             }}></input>
                                             </div>
                                             </div>
     
                                             <div className='ele_pop_box_shad_main_cont_row'>
                                             <div className='ele_pop_box_shad_main_txt_main_cont'>
                                             <div className='ele_pop_box_shad_main_txt_main_cont_lab'>Blur</div>
                                             <input type='text' className='ele_pop_box_shad_main_txt' value={element.STYLE.box_shadow_blur}
                                             onChange={(e)=>{
                                                  element.STYLE.box_shadow_blur = e.target.value
                                                   this.props.updateEditor();
                                             }}></input>
                                             </div>
     
                                             <div className='ele_pop_box_shad_main_txt_main_cont'>
                                             <div className='ele_pop_box_shad_main_txt_main_cont_lab'>Spread</div>
                                             <input type='text' className='ele_pop_box_shad_main_txt' value={element.STYLE.box_shadow_spread}
                                             onChange={(e)=>{
                                                  element.STYLE.box_shadow_spread = e.target.value
                                                   this.props.updateEditor();
                                             }}></input>
                                             </div>
                                             </div>
                                             <div className='ele_pop_bdy_txt'>Shadow Color</div>
                                             <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={<Popover id="popover-basic"  className='element_color_pick_popover'    backdropClassName="backdrop">
                                                  <ChromePicker
                                                       color={element.STYLE.box_shadow_color}
                                                       onChange={(col)=>{                                             
                                                            element.STYLE.box_shadow_color = `rgba(${col.rgb.r},${col.rgb.g},${col.rgb.b},${col.rgb.a})`;
                                                             this.props.updateEditor()
                                             }}
                                             onChangeComplete={()=>{ this.props.updateEditor()}}
                                        >
                                        </ChromePicker>
                                        </Popover>}
                                        >
                                        <Button variant={'light'} className='ele_pop_bdy_col_butt'>
                                             <div className='ele_pop_bdy_col_butt_col' style={{backgroundColor: element.STYLE.box_shadow_color!==null? element.STYLE.box_shadow_color:'#fff'}}></div>
                                             {element.STYLE.box_shadow_color===undefined?'none':element.STYLE.box_shadow_color}
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
                                             color={element.STYLE.back_color}
                                             onChange={(col)=>{
                                                  
                                                  element.STYLE.back_color = `rgba(${col.rgb.r},${col.rgb.g},${col.rgb.b},${col.rgb.a})`;
     
                                                   this.props.updateEditor()
                                             }}
                                             onChangeComplete={()=>{ this.props.updateEditor()}}
                                        >
                                        </ChromePicker>
                                        </Popover>}
                                        >
                                        <Button variant={'light'} className='ele_pop_bdy_col_butt'>
                                             <div className='ele_pop_bdy_col_butt_col' style={{backgroundColor:element.STYLE.back_color!==null?element.STYLE.back_color:'#fff'}}></div>
                                             {element.STYLE.back_color===undefined?'none':element.STYLE.back_color}
                                        </Button>
                                        </OverlayTrigger>
                                             
                                        
                                        </div>
                                   </Accordion.Collapse>
                                   </Accordion>
                                   <Accordion className='ele_men_acrd_main_cont'>
                                        <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main' >
                                             <div className='_ele_acrd_header_main_cont'>
                                             <svg className='_ele_acrd_header_main_cont_left_ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M15 21h2v-2h-2v2zm4 0h2v-2h-2v2zM7 21h2v-2H7v2zm4 0h2v-2h-2v2zm8-4h2v-2h-2v2zm0-4h2v-2h-2v2zM3 3v18h2V5h16V3H3zm16 6h2V7h-2v2z"/></svg>
                                             <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                             Border 
                                             <div className='_ele_acrd_menu_chck_main_cont'>
                                                  <input type='checkbox' className='_ele_acrd_menu_chck' checked={element.STYLE.bordered}
                                             onClick={(e)=>{
                                                  element.STYLE.bordered = !element.STYLE.bordered
                                                   this.props.updateEditor();
                                             }}
                                             ></input></div></div>
                                        </Accordion.Toggle>
                                   <Accordion.Collapse eventKey="0">
                                        <div className='ele_menu_bdy_main_cont'>
                                                  <div className='ele_pop_bdy_txt'>Border width</div>    
                                                  <div className='ele_pop_bdy_slid_cont'>
                                                  {this._render_menu_slider((element.STYLE.border_width),0,100,(val)=>{element.STYLE.border_width = val;})}
                                                  </div>
                                                  
                                                  <div className='ele_pop_bdy_txt'>Border raidus</div>    
                                                  <div className='ele_pop_bdy_slid_cont'>
                                                  {this._render_menu_slider((element.STYLE.border_radius),0,100,(val)=>{element.STYLE.border_radius = val;})}
                                                  </div>
     
                                                  <div className='ele_pop_bdy_txt'>Border Color</div>
                                                       <OverlayTrigger
                                                       trigger="click"
                                                       placement="left"
                                                       rootClose={true}
                                                       overlay={<Popover id="popover-basic"  className='element_color_pick_popover'    backdropClassName="backdrop">
                                                       <ChromePicker
                                                            color={element.STYLE.border_color}
                                                            onChange={(col)=>{
                                                                 element.STYLE.border_color = `rgba(${col.rgb.r},${col.rgb.g},${col.rgb.b},${col.rgb.a})`;
                                                                  this.props.updateEditor()
                                                            }}
                                                            onChangeComplete={()=>{ this.props.updateEditor()}}
                                                       >
                                                       </ChromePicker>
                                                       </Popover>}
                                                       >
                                                       <Button variant={'light'} className='ele_pop_bdy_col_butt'>
                                                            <div className='ele_pop_bdy_col_butt_col' style={{backgroundColor:element.STYLE.border_color!==null?element.STYLE.border_color:'#fff'}}></div>
                                                            {element.STYLE.border_color}
                                                       </Button>
                                                       </OverlayTrigger>     
                                        
                                        </div>
                                   </Accordion.Collapse>
                                   </Accordion>                                  
                                   <Accordion className='ele_men_acrd_main_cont'>
                                        <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main'>
                                             <div className='_ele_acrd_header_main_cont'>
                                             <svg  className='_ele_acrd_header_main_cont_left_ico'  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z"/></svg>
                                             <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                             Alignment 
                                             </div>
                                        </Accordion.Toggle>
                                   <Accordion.Collapse eventKey="0">
                                        <div className='ele_menu_bdy_main_cont'>
                                             <div className='ele_pop_bdy_opt_main_cont'>
                                             <div className='ele_pop_bdy_txt'>Vertically center</div>        
                                             <input className='ele_pop_bdy_chck_cont' checked={element.STYLE.vertical_center} type='checkbox' onClick={
                                                  (e)=>{element.STYLE.vertical_center=!element.STYLE.vertical_center
                                                        this.props.updateEditor();
                                                  }
                                             }></input>
                                             </div>
     
                                             <ToggleButtonGroup name='txt_algn_rad_ele_pop' type="radio" defaultValue={element.STYLE.text_align} className="mb-2"
                                             onChange={(val)=>{
                                                  element.STYLE.text_align =  val;
                                                   this.props.updateEditor();
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
                                             <svg className='_ele_acrd_header_main_cont_left_ico' xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><g><rect fill="none" height="24" width="24"/></g><g><g/><polygon points="13,6.99 16,6.99 12,3 8,6.99 11,6.99 11,17.01 8,17.01 12,21 16,17.01 13,17.01"/></g></svg>
                                             <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                             Width and Height 
                                             </div>
                                        </Accordion.Toggle>
                                   <Accordion.Collapse eventKey="0">
                                        <div className='ele_menu_bdy_main_cont'>
                                        <div className='ele_pop_bdy_txt'>Width</div>    
                                                  <div className='ele_pop_bdy_slid_cont'>
                                                  {this._render_menu_slider((element.STYLE.element_width),0,900,(val)=>{element.STYLE.element_width = val;})}
                                                  </div>
     
                                                  <div className='ele_pop_bdy_txt'>Height</div>    
                                                  <div className='ele_pop_bdy_slid_cont'>
                                                  {this._render_menu_slider((element.STYLE.element_height),0,900,(val)=>{element.STYLE.element_height = val;})}
                                                  </div>
                                        </div>
                                   </Accordion.Collapse>
                                   </Accordion>
                                   <Accordion className='ele_men_acrd_main_cont'>
                                        <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main'>
                                             <div className='_ele_acrd_header_main_cont'>
                                             <svg className='_ele_acrd_header_main_cont_left_ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H3V8h2v4h2V8h2v4h2V8h2v4h2V8h2v4h2V8h2v8z"/></svg>
                                             <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                                  Margin
                                             </div>
                                        </Accordion.Toggle>
                                   <Accordion.Collapse eventKey="0">
                                        <div className='ele_menu_bdy_main_cont'>
                                             <div className='ele_pop_bdy_txt'>Margin left</div>    
                                                       <div className='ele_pop_bdy_slid_cont'>
                                                       {this._render_menu_slider((element.STYLE.margin_left),0,900,(val)=>{element.STYLE.margin_left = val;})}
                                                       </div>
     
                                                       <div className='ele_pop_bdy_txt'>Margin right</div>    
                                                       <div className='ele_pop_bdy_slid_cont'>
                                                       {this._render_menu_slider((element.STYLE.margin_right),0,900,(val)=>{element.STYLE.margin_right = val;})}
                                                       </div>
     
     
                                             <div className='ele_pop_bdy_txt'>Margin top</div>    
                                             <div className='ele_pop_bdy_slid_cont'>
                                             {this._render_menu_slider((element.STYLE.margin_top),0,900,(val)=>{element.STYLE.margin_top = val;})}
                                             </div>
                                             <div className='ele_pop_bdy_txt'>Margin bottom</div>    
                                             <div className='ele_pop_bdy_slid_cont'>
                                             {this._render_menu_slider((element.STYLE.margin_bottom),0,900,(val)=>{element.STYLE.margin_bottom = val;})}
                                             </div>
                                        </div>
                                   </Accordion.Collapse>
                                   </Accordion>
                                   <Accordion className='ele_men_acrd_main_cont'>
                                        <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main'>
                                             <div className='_ele_acrd_header_main_cont'>
                                             <svg className='_ele_acrd_header_main_cont_left_ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18 9v4H6V9H4v6h16V9z"/></svg>
                                             <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                                  Padding
                                             </div>
                                        </Accordion.Toggle>
                                   <Accordion.Collapse eventKey="0">
                                        <div className='ele_menu_bdy_main_cont'>
                                             
                                        <div className='ele_pop_bdy_txt'>Padding left</div>    
                                        <div className='ele_pop_bdy_slid_cont'>
                                        {this._render_menu_slider((element.STYLE.padding_left),0,900,(val)=>{element.STYLE.padding_left = val;})}
                                        </div>
                                        <div className='ele_pop_bdy_txt'>Padding right</div>    
                                        <div className='ele_pop_bdy_slid_cont'>
                                             {this._render_menu_slider((element.STYLE.padding_right),0,900,(val)=>{element.STYLE.padding_right = val;})}
                                        </div>
     
                                        <div className='ele_pop_bdy_txt'>Padding top</div>    
                                        <div className='ele_pop_bdy_slid_cont'>
                                        {this._render_menu_slider((element.STYLE.padding_top),0,900,(val)=>{element.STYLE.padding_top = val;})}
                                        </div>
                                        <div className='ele_pop_bdy_txt'>Padding bottom</div>    
                                        <div className='ele_pop_bdy_slid_cont'>
                                        {this._render_menu_slider((element.STYLE.padding_bottom),0,900,(val)=>{element.STYLE.padding_bottom = val;})}
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

          _render_text_menu(element){
               if(element!==false){ 
                    return(
                    <div className='ele_pop_main_bdy'>
                              <div className='pop_txt_head_main_cont'>
                                        <div className='pop_txt_main_head_txt'>Text</div>
                                             <div className='pop_txt_head_rght_cont'>
                                             <div className='pop_txt_head_rght_cont_swt'>
                                             <input type="checkbox" checked={element.ENABLED} id="switch" onChange={(e)=>{    
                                                  element.ENABLED = !(element.ENABLED)
                                                   this.props.updateEditor();
                                             }} />
                                             <label for="switch" className='ele_pop_elem_lab'>Toggle</label>
                                             </div>
                                             <div className='pop_txt_head_rght_cont_del_swt'>
                                                       <button className='pop_txt_head_rght_cont_del_swt_butt'
                                                        onClick={()=>{
                                                            element.DELETED = true;
                                                            this._add_notification("Text element deleted","danger",1000);
                                                            
                                                            //$('.popover_txt_class').hide();
                                                             this.props.updateEditor();           
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
                                        value={element.INNER_DATA?element.INNER_DATA:"undefined"}
                                        onChange={(e)=>{
                                             element.INNER_DATA  = e.target.value;
                                              this.props.updateEditor();
                                        }} />
                                 
                                   </div>
                                   <Accordion className='ele_men_acrd_main_cont'>
                                        <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main'>
                                             <div className='_ele_acrd_header_main_cont'>
                                             <svg className='_ele_acrd_header_main_cont_left_ico'  height="36px" viewBox="0 0 24 24" width="36px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M5 17v2h14v-2H5zm4.5-4.2h5l.9 2.2h2.1L12.75 4h-1.5L6.5 15h2.1l.9-2.2zM12 5.98L13.87 11h-3.74L12 5.98z"/></svg>
                                             <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                                  Font
                                             </div>
                                        </Accordion.Toggle>
                                   <Accordion.Collapse eventKey="0">
                                        <div className='ele_menu_bdy_main_cont'>
                                                  <DropdownButton variant={'light'} id="font_choice_drop_menu" title={element.STYLE.font_family}>
                                                       {this._draw_font_family(element)}
                                                  </DropdownButton>
                                                  <div className='ele_pop_bdy_txt'>Font</div>    

                                                  <div className='ele_pop_box_shad_main_cont_row'>
                                                            <div className='ele_pop_box_shad_main_txt_main_cont'>
                                                            <div className='ele_pop_box_shad_main_txt_main_cont_lab'>Size</div>
                                                            <input type='text' className='ele_pop_box_shad_main_txt' value={element.STYLE.font_size}
                                                            onChange={(e)=>{
                                                                 element.STYLE.font_size = e.target.value
                                                                 this.props.updateEditor();
                                                            }}
                                                            ></input>
                                                            </div>
                                                            <div className='ele_pop_box_shad_main_txt_main_cont'>
                                                            <div className='ele_pop_box_shad_main_txt_main_cont_lab'>Weight</div>
                                                            <input type='text' className='ele_pop_box_shad_main_txt' value={element.STYLE.font_weight}
                                                            onChange={(e)=>{
                                                                 element.STYLE.font_weight = e.target.value
                                                                 this.props.updateEditor();
                                                            }}></input>
                                                            </div>
                                                  </div>
                                                  
                                                       <div className='ele_pop_bdy_txt'>Text Color</div>
                                                            <OverlayTrigger
                                                            trigger="click"
                                                            placement="left"
                                                            rootClose={true}
                                                            overlay={<Popover id="popover-basic"  className='element_color_pick_popover'    backdropClassName="backdrop">
                                                            <ChromePicker
                                                                 color={element.STYLE.text_color}
                                                                 onChange={(col)=>{
                                                                      element.STYLE.text_color = `rgba(${col.rgb.r},${col.rgb.g},${col.rgb.b},${col.rgb.a})`;
                                                                      
                                                                       this.props.updateEditor();
                                                                 }}
                                                                 onChangeComplete={()=>{ this.props.updateEditor();}}
                                                            >
                                                            </ChromePicker>
                                                            </Popover>}
                                                            >
                                                            <Button variant={'light'} className='ele_pop_bdy_col_butt'>
                                                                 <div className='ele_pop_bdy_col_butt_col' style={{backgroundColor:element.STYLE.text_color!==null?element.STYLE.text_color:'#fff'}}></div>
                                                                 {element.STYLE.text_color}
                                                            </Button>
                                                            </OverlayTrigger>
                                        
                                        </div>
                                   </Accordion.Collapse>
                                   </Accordion>
                                   <Accordion className='ele_men_acrd_main_cont'>
                                        <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main'>
                                             <div className='_ele_acrd_header_main_cont'>
                                             <svg   className='_ele_acrd_header_main_cont_left_ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z" fill='currentColor'/></svg>
                                             <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                             Background 
                                             </div>
                                        </Accordion.Toggle>
                                   <Accordion.Collapse eventKey="0">
                                        <div className='ele_menu_bdy_main_cont'>
                                        <div className='ele_pop_bdy_opt_main_cont'>
                                        <div className='ele_pop_bdy_txt'>Box shadow</div>        
                                        <input className='ele_pop_bdy_chck_cont' checked={element.STYLE.box_shadow_enable} type='checkbox' onClick={
                                             (e)=>{element.STYLE.box_shadow_enable=!element.STYLE.box_shadow_enable
                                                   this.props.updateEditor();
                                             }
                                        }></input>
                                        </div>
                                             
                                        <div className='ele_pop_bdy_txt'>Box shadow</div>
                                        <div className='ele_pop_box_shad_main_cont'>
     
                                             <div className='ele_pop_box_shad_main_cont_row'>
                                             <div className='ele_pop_box_shad_main_txt_main_cont'>
                                             <div className='ele_pop_box_shad_main_txt_main_cont_lab'>X</div>
                                             <input type='text' className='ele_pop_box_shad_main_txt' value={element.STYLE.box_shadow_x}
                                             onChange={(e)=>{
                                                  element.STYLE.box_shadow_x = e.target.value
                                                   this.props.updateEditor();
                                             }}
                                             ></input>
                                             </div>
                                             <div className='ele_pop_box_shad_main_txt_main_cont'>
                                             <div className='ele_pop_box_shad_main_txt_main_cont_lab'>Y</div>
                                             <input type='text' className='ele_pop_box_shad_main_txt' value={element.STYLE.box_shadow_y}
                                             onChange={(e)=>{
                                                  element.STYLE.box_shadow_y = e.target.value
                                                   this.props.updateEditor();
                                             }}></input>
                                             </div>
                                             </div>
     
                                             <div className='ele_pop_box_shad_main_cont_row'>
                                             <div className='ele_pop_box_shad_main_txt_main_cont'>
                                             <div className='ele_pop_box_shad_main_txt_main_cont_lab'>Blur</div>
                                             <input type='text' className='ele_pop_box_shad_main_txt' value={element.STYLE.box_shadow_blur}
                                             onChange={(e)=>{
                                                  element.STYLE.box_shadow_blur = e.target.value
                                                   this.props.updateEditor();
                                             }}></input>
                                             </div>
     
                                             <div className='ele_pop_box_shad_main_txt_main_cont'>
                                             <div className='ele_pop_box_shad_main_txt_main_cont_lab'>Spread</div>
                                             <input type='text' className='ele_pop_box_shad_main_txt' value={element.STYLE.box_shadow_spread}
                                             onChange={(e)=>{
                                                  element.STYLE.box_shadow_spread = e.target.value
                                                   this.props.updateEditor();
                                             }}></input>
                                             </div>
                                             </div>
                                             <div className='ele_pop_bdy_txt'>Shadow Color</div>
                                             <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={<Popover id="popover-basic"  className='element_color_pick_popover'    backdropClassName="backdrop">
                                                  <ChromePicker
                                                       color={element.STYLE.box_shadow_color}
                                                       onChange={(col)=>{                                             
                                                            element.STYLE.box_shadow_color = `rgba(${col.rgb.r},${col.rgb.g},${col.rgb.b},${col.rgb.a})`;
                                                             this.props.updateEditor();
                                             }}
                                             onChangeComplete={()=>{ this.props.updateEditor();}}
                                        >
                                        </ChromePicker>
                                        </Popover>}
                                        >
                                        <Button variant={'light'} className='ele_pop_bdy_col_butt'>
                                             <div className='ele_pop_bdy_col_butt_col' style={{backgroundColor: element.STYLE.box_shadow_color!==null? element.STYLE.box_shadow_color:'#fff'}}></div>
                                             {element.STYLE.box_shadow_color===undefined?'none':element.STYLE.box_shadow_color}
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
                                             color={element.STYLE.back_color}
                                             onChange={(col)=>{
                                                  
                                                  element.STYLE.back_color = `rgba(${col.rgb.r},${col.rgb.g},${col.rgb.b},${col.rgb.a})`;
     
                                                   this.props.updateEditor();
                                             }}
                                             onChangeComplete={()=>{ this.props.updateEditor();}}
                                        >
                                        </ChromePicker>
                                        </Popover>}
                                        >
                                        <Button variant={'light'} className='ele_pop_bdy_col_butt'>
                                             <div className='ele_pop_bdy_col_butt_col' style={{backgroundColor:element.STYLE.back_color!==null?element.STYLE.back_color:'#fff'}}></div>
                                             {element.STYLE.back_color===undefined?'none':element.STYLE.back_color}
                                        </Button>
                                        </OverlayTrigger>
                                             
                                        
                                        </div>
                                   </Accordion.Collapse>
                                   </Accordion>
                                   <Accordion className='ele_men_acrd_main_cont'>
                                        <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main' >
                                             <div className='_ele_acrd_header_main_cont'>
                                             <svg className='_ele_acrd_header_main_cont_left_ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"  fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M15 21h2v-2h-2v2zm4 0h2v-2h-2v2zM7 21h2v-2H7v2zm4 0h2v-2h-2v2zm8-4h2v-2h-2v2zm0-4h2v-2h-2v2zM3 3v18h2V5h16V3H3zm16 6h2V7h-2v2z"/></svg>
                                             <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                             Border 
                                             <div className='_ele_acrd_menu_chck_main_cont'>
                                                  <input type='checkbox'  className='_ele_acrd_menu_chck' checked={element.STYLE.bordered}
                                             onClick={(e)=>{
                                                  element.STYLE.bordered = !element.STYLE.bordered
                                                   this.props.updateEditor();
                                             }}
                                             ></input></div></div>
                                        </Accordion.Toggle>
                                   <Accordion.Collapse eventKey="0">
                                        <div className='ele_menu_bdy_main_cont'>
                                                  <div className='ele_pop_bdy_txt'>Border width</div>    
                                                  <div className='ele_pop_bdy_slid_cont'>
                                                  {this._render_menu_slider((element.STYLE.border_width),0,100,(val)=>{element.STYLE.border_width = val;})}
                                                  </div>
                                                  
                                                  <div className='ele_pop_bdy_txt'>Border raidus</div>    
                                                  <div className='ele_pop_bdy_slid_cont'>
                                                  {this._render_menu_slider((element.STYLE.border_radius),0,360,(val)=>{element.STYLE.border_radius = val;})}
                                                  </div>
     
                                                  <div className='ele_pop_bdy_txt'>Border Color</div>
                                                       <OverlayTrigger
                                                       trigger="click"
                                                       placement="left"
                                                       rootClose={true}
                                                       overlay={<Popover id="popover-basic"  className='element_color_pick_popover'    backdropClassName="backdrop">
                                                       <ChromePicker
                                                            color={element.STYLE.border_color}
                                                            onChange={(col)=>{
                                                                 element.STYLE.border_color = `rgba(${col.rgb.r},${col.rgb.g},${col.rgb.b},${col.rgb.a})`;
                                                                  this.props.updateEditor();
                                                            }}
                                                            onChangeComplete={()=>{ this.props.updateEditor();}}
                                                       >
                                                       </ChromePicker>
                                                       </Popover>}
                                                       >
                                                       <Button variant={'light'} className='ele_pop_bdy_col_butt'>
                                                            <div className='ele_pop_bdy_col_butt_col' style={{backgroundColor:element.STYLE.border_color!==null?element.STYLE.border_color:'#fff'}}></div>
                                                            {element.STYLE.border_color}
                                                       </Button>
                                                       </OverlayTrigger>     
                                        
                                        </div>
                                   </Accordion.Collapse>
                                   </Accordion>                                  
                                   <Accordion className='ele_men_acrd_main_cont'>
                                        <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main'>
                                             <div className='_ele_acrd_header_main_cont'>
                                             <svg  className='_ele_acrd_header_main_cont_left_ico'  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z"/></svg>
                                             <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                             Alignment 
                                             </div>
                                        </Accordion.Toggle>
                                   <Accordion.Collapse eventKey="0">
                                        <div className='ele_menu_bdy_main_cont'>
                                             <div className='ele_pop_bdy_opt_main_cont'>
                                             <div className='ele_pop_bdy_txt'>Vertically center</div>        
                                             <input className='ele_pop_bdy_chck_cont' checked={element.STYLE.vertical_center} type='checkbox' onClick={
                                                  (e)=>{element.STYLE.vertical_center=!element.STYLE.vertical_center
                                                        this.props.updateEditor();
                                                  }
                                             }></input>
                                             </div>
     
                                             <ToggleButtonGroup name='txt_algn_rad_ele_pop' type="radio" defaultValue={element.STYLE.text_align} className="mb-2"
                                             onChange={(val)=>{
                                                  element.STYLE.text_align =  val;
                                                   this.props.updateEditor();
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
                                             <svg className='_ele_acrd_header_main_cont_left_ico' xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><g><rect fill="none" height="24" width="24"/></g><g><g/><polygon points="13,6.99 16,6.99 12,3 8,6.99 11,6.99 11,17.01 8,17.01 12,21 16,17.01 13,17.01"/></g></svg>
                                             <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                             Width and Height 
                                             </div>
                                        </Accordion.Toggle>
                                   <Accordion.Collapse eventKey="0">
                                        <div className='ele_menu_bdy_main_cont'>
                                        <div className='ele_pop_bdy_txt'>Width</div>    
                                                  <div className='ele_pop_bdy_slid_cont'>
                                                  {this._render_menu_slider((element.STYLE.element_width),0,900,(val)=>{element.STYLE.element_width = val;})}
                                                  </div>
     
                                                  <div className='ele_pop_bdy_txt'>Height</div>    
                                                  <div className='ele_pop_bdy_slid_cont'>
                                                  {this._render_menu_slider((element.STYLE.element_height),0,900,(val)=>{element.STYLE.element_height = val;})}
                                                  </div>
                                        </div>
                                   </Accordion.Collapse>
                                   </Accordion>
                                   <Accordion className='ele_men_acrd_main_cont'>
                                        <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main'>
                                             <div className='_ele_acrd_header_main_cont'>
                                             <svg className='_ele_acrd_header_main_cont_left_ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H3V8h2v4h2V8h2v4h2V8h2v4h2V8h2v4h2V8h2v8z"/></svg>
                                             <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                                  Margin
                                             </div>
                                        </Accordion.Toggle>
                                   <Accordion.Collapse eventKey="0">
                                        <div className='ele_menu_bdy_main_cont'>
                                             <div className='ele_pop_bdy_txt'>Margin left</div>    
                                                       <div className='ele_pop_bdy_slid_cont'>
                                                       {this._render_menu_slider((element.STYLE.margin_left),0,900,(val)=>{element.STYLE.margin_left = val;})}
                                                       </div>
     
                                                       <div className='ele_pop_bdy_txt'>Margin right</div>    
                                                       <div className='ele_pop_bdy_slid_cont'>
                                                       {this._render_menu_slider((element.STYLE.margin_right),0,900,(val)=>{element.STYLE.margin_right = val;})}
                                                       </div>
     
     
                                             <div className='ele_pop_bdy_txt'>Margin top</div>    
                                             <div className='ele_pop_bdy_slid_cont'>
                                             {this._render_menu_slider((element.STYLE.margin_top),0,900,(val)=>{element.STYLE.margin_top = val;})}
                                             </div>
                                             <div className='ele_pop_bdy_txt'>Margin bottom</div>    
                                             <div className='ele_pop_bdy_slid_cont'>
                                             {this._render_menu_slider((element.STYLE.margin_bottom),0,900,(val)=>{element.STYLE.margin_bottom = val;})}
                                             </div>
                                        </div>
                                   </Accordion.Collapse>
                                   </Accordion>
                                   <Accordion className='ele_men_acrd_main_cont'>
                                        <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main'>
                                             <div className='_ele_acrd_header_main_cont'>
                                             <svg className='_ele_acrd_header_main_cont_left_ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18 9v4H6V9H4v6h16V9z"/></svg>
                                             <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                                  Padding
                                             </div>
                                        </Accordion.Toggle>
                                   <Accordion.Collapse eventKey="0">
                                        <div className='ele_menu_bdy_main_cont'>
                                             
                                        <div className='ele_pop_bdy_txt'>Padding left</div>    
                                        <div className='ele_pop_bdy_slid_cont'>
                                        {this._render_menu_slider((element.STYLE.padding_left),0,900,(val)=>{element.STYLE.padding_left = val;})}
                                        </div>
                                        <div className='ele_pop_bdy_txt'>Padding right</div>    
                                        <div className='ele_pop_bdy_slid_cont'>
                                             {this._render_menu_slider((element.STYLE.padding_right),0,900,(val)=>{element.STYLE.padding_right = val;})}
                                        </div>
     
                                        <div className='ele_pop_bdy_txt'>Padding top</div>    
                                        <div className='ele_pop_bdy_slid_cont'>
                                        {this._render_menu_slider((element.STYLE.padding_top),0,900,(val)=>{element.STYLE.padding_top = val;})}
                                        </div>
                                        <div className='ele_pop_bdy_txt'>Padding bottom</div>    
                                        <div className='ele_pop_bdy_slid_cont'>
                                        {this._render_menu_slider((element.STYLE.padding_bottom),0,900,(val)=>{element.STYLE.padding_bottom = val;})}
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

          _render_image_menu(element){
               if(element!==false){ 
                    return(
                    <div className='ele_pop_main_bdy'>
                              <div className='pop_txt_head_main_cont'>
                                        <div className='pop_txt_head_txt'>Image</div>
                                             <div className='pop_txt_head_rght_cont'>
                                             <div className='pop_txt_head_rght_cont_swt'>
                                             <input type="checkbox" checked={element.ENABLED} id="switch" onChange={(e)=>{    
                                                  element.enabled = !(element.ENABLED)
                                                  this.props.updateEditor();
                                             }} />
                                             <label for="switch" className='ele_pop_elem_lab'>Toggle</label>
                                             </div>
                                             <div className='pop_txt_head_rght_cont_del_swt'>
                                                       <button className='pop_txt_head_rght_cont_del_swt_butt'
                                                        onClick={()=>{
                                                            element.DELETED = true;
                                                            this._add_notification("Text element deleted","danger",1000);
                                                            
                                                            //$('.popover_txt_class').hide();
                                                            this.props.updateEditor();           
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
                                                                 value={element.image_data}
                                                                 onChange={(imageList,addUpdateIndex)=>{
                                                                      element.image_data = imageList;
                                                                      // this._image_upload(imageList[0]);
                                                                      this.props.updateEditor(); 
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
                                                                      {element.image_data===null?<Button variant={'primary'} className='upload__image-wrapper_butt' onClick={onImageUpload}>Upload</Button>:undefined}
                                                                      {imageList.map((image, index) => (
                                                                      <div key={index} className="image-item">
                                                                           <img src={image['data_url']} className='image_img' alt="" width="100" />
                                                                           <div className="image-item__btn-wrapper">
                                                                           <Button variant={'primary'} className='image-item__btn-wrapper_butt'  onClick={() => onImageUpdate(index)}>Update</Button>
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
                                             <svg   className='_ele_acrd_header_main_cont_left_ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z"/></svg>
                                             <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                             Background 
                                             </div>
                                        </Accordion.Toggle>
                                   <Accordion.Collapse eventKey="0">
                                        <div className='ele_menu_bdy_main_cont'>
                                        <div className='ele_pop_bdy_opt_main_cont'>
                                        <div className='ele_pop_bdy_txt'>Box shadow</div>        
                                        <input className='ele_pop_bdy_chck_cont' checked={element.STYLE.box_shadow_enable} type='checkbox' onClick={
                                             (e)=>{element.STYLE.box_shadow_enable=!element.STYLE.box_shadow_enable
                                                  this.props.updateEditor();
                                             }
                                        }></input>
                                        </div>
     
                                        <div className='ele_pop_bdy_txt'>Box shadow</div>
                                        <div className='ele_pop_box_shad_main_cont'>
     
                                             <div className='ele_pop_box_shad_main_cont_row'>
                                             <div className='ele_pop_box_shad_main_txt_main_cont'>
                                             <div className='ele_pop_box_shad_main_txt_main_cont_lab'>X</div>
                                             <input type='text' className='ele_pop_box_shad_main_txt' value={element.STYLE.box_shadow_x}
                                             onChange={(e)=>{
                                                  element.STYLE.box_shadow_x = e.target.value
                                                  this.props.updateEditor();
                                             }}
                                             ></input>
                                             </div>
                                             <div className='ele_pop_box_shad_main_txt_main_cont'>
                                             <div className='ele_pop_box_shad_main_txt_main_cont_lab'>Y</div>
                                             <input type='text' className='ele_pop_box_shad_main_txt' value={element.STYLE.box_shadow_y}
                                             onChange={(e)=>{
                                                  element.STYLE.box_shadow_y = e.target.value
                                                  this.props.updateEditor();
                                             }}></input>
                                             </div>
                                             </div>
     
                                             <div className='ele_pop_box_shad_main_cont_row'>
                                             <div className='ele_pop_box_shad_main_txt_main_cont'>
                                             <div className='ele_pop_box_shad_main_txt_main_cont_lab'>Blur</div>
                                             <input type='text' className='ele_pop_box_shad_main_txt' value={element.STYLE.box_shadow_blur}
                                             onChange={(e)=>{
                                                  element.STYLE.box_shadow_blur = e.target.value
                                                  this.props.updateEditor();
                                             }}></input>
                                             </div>
     
                                             <div className='ele_pop_box_shad_main_txt_main_cont'>
                                             <div className='ele_pop_box_shad_main_txt_main_cont_lab'>Spread</div>
                                             <input type='text' className='ele_pop_box_shad_main_txt' value={element.STYLE.box_shadow_spread}
                                             onChange={(e)=>{
                                                  element.STYLE.box_shadow_spread = e.target.value
                                                  this.props.updateEditor();
                                             }}></input>
                                             </div>
                                             </div>
                                             <div className='ele_pop_bdy_txt'>Shadow Color</div>
                                             <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={<Popover id="popover-basic"  className='element_color_pick_popover'    backdropClassName="backdrop">
                                                  <ChromePicker
                                                       color={element.STYLE.box_shadow_color}
                                                       onChange={(col)=>{                                             
                                                            element.STYLE.box_shadow_color = `rgba(${col.rgb.r},${col.rgb.g},${col.rgb.b},${col.rgb.a})`;
                                                            this.props.updateEditor()
                                             }}
                                             onChangeComplete={()=>{this.props.updateEditor()}}
                                        >
                                        </ChromePicker>
                                        </Popover>}
                                        >
                                        <Button variant={'light'} className='ele_pop_bdy_col_butt'>
                                             <div className='ele_pop_bdy_col_butt_col' style={{backgroundColor: element.STYLE.box_shadow_color!==null? element.STYLE.box_shadow_color:'#fff'}}></div>
                                             {element.STYLE.box_shadow_color===undefined?'none':element.STYLE.box_shadow_color}
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
                                             color={element.STYLE.back_color}
                                             onChange={(col)=>{
                                                  
                                                  element.STYLE.back_color = `rgba(${col.rgb.r},${col.rgb.g},${col.rgb.b},${col.rgb.a})`;
     
                                                  this.props.updateEditor()
                                             }}
                                             onChangeComplete={()=>{this.props.updateEditor()}}
                                        >
                                        </ChromePicker>
                                        </Popover>}
                                        >
                                        <Button variant={'light'} className='ele_pop_bdy_col_butt'>
                                             <div className='ele_pop_bdy_col_butt_col' style={{backgroundColor:element.STYLE.back_color!==null?element.STYLE.back_color:'#fff'}}></div>
                                             {element.STYLE.back_color===undefined?'none':element.STYLE.back_color}
                                        </Button>
                                        </OverlayTrigger>
                                             
                                        
                                        </div>
                                   </Accordion.Collapse>
                                   </Accordion>
                                   <Accordion className='ele_men_acrd_main_cont'>
                                        <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main' >
                                             <div className='_ele_acrd_header_main_cont'>
                                             <svg className='_ele_acrd_header_main_cont_left_ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M15 21h2v-2h-2v2zm4 0h2v-2h-2v2zM7 21h2v-2H7v2zm4 0h2v-2h-2v2zm8-4h2v-2h-2v2zm0-4h2v-2h-2v2zM3 3v18h2V5h16V3H3zm16 6h2V7h-2v2z"/></svg>
                                             <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                             Border 
                                             <div className='_ele_acrd_menu_chck_main_cont'>
                                                  <input type='checkbox' className='_ele_acrd_menu_chck' checked={element.STYLE.bordered}
                                             onClick={(e)=>{
                                                  element.STYLE.bordered = !element.STYLE.bordered
                                                  this.props.updateEditor();
                                             }}
                                             ></input></div></div>
                                        </Accordion.Toggle>
                                   <Accordion.Collapse eventKey="0">
                                        <div className='ele_menu_bdy_main_cont'>
                                                  <div className='ele_pop_bdy_txt'>Border width</div>    
                                                  <div className='ele_pop_bdy_slid_cont'>
                                                  {this._render_menu_slider((element.STYLE.border_width),0,100,(val)=>{element.STYLE.border_width = val;})}
                                                  </div>
                                                  
                                                  <div className='ele_pop_bdy_txt'>Border raidus</div>    
                                                  <div className='ele_pop_bdy_slid_cont'>
                                                  {this._render_menu_slider((element.STYLE.border_radius),0,100,(val)=>{element.STYLE.border_radius = val;})}
                                                  </div>
     
                                                  <div className='ele_pop_bdy_txt'>Border Color</div>
                                                       <OverlayTrigger
                                                       trigger="click"
                                                       placement="left"
                                                       rootClose={true}
                                                       overlay={<Popover id="popover-basic"  className='element_color_pick_popover'    backdropClassName="backdrop">
                                                       <ChromePicker
                                                            color={element.STYLE.border_color}
                                                            onChange={(col)=>{
                                                                 element.STYLE.border_color = `rgba(${col.rgb.r},${col.rgb.g},${col.rgb.b},${col.rgb.a})`;
                                                                 this.props.updateEditor()
                                                            }}
                                                            onChangeComplete={()=>{this.props.updateEditor()}}
                                                       >
                                                       </ChromePicker>
                                                       </Popover>}
                                                       >
                                                       <Button variant={'light'} className='ele_pop_bdy_col_butt'>
                                                            <div className='ele_pop_bdy_col_butt_col' style={{backgroundColor:element.STYLE.border_color!==null?element.STYLE.border_color:'#fff'}}></div>
                                                            {element.STYLE.border_color}
                                                       </Button>
                                                       </OverlayTrigger>     
                                        
                                        </div>
                                   </Accordion.Collapse>
                                   </Accordion>                                  
                                   <Accordion className='ele_men_acrd_main_cont'>
                                        <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main'>
                                             <div className='_ele_acrd_header_main_cont'>
                                             <svg  className='_ele_acrd_header_main_cont_left_ico'  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z"/></svg>
                                             <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                             Alignment 
                                             </div>
                                        </Accordion.Toggle>
                                   <Accordion.Collapse eventKey="0">
                                        <div className='ele_menu_bdy_main_cont'>
                                             <div className='ele_pop_bdy_opt_main_cont'>
                                             <div className='ele_pop_bdy_txt'>Vertically center</div>        
                                             <input className='ele_pop_bdy_chck_cont' checked={element.STYLE.vertical_center} type='checkbox' onClick={
                                                  (e)=>{element.STYLE.vertical_center=!element.STYLE.vertical_center
                                                       this.props.updateEditor();
                                                  }
                                             }></input>
                                             </div>
     
                                             <ToggleButtonGroup name='txt_algn_rad_ele_pop' type="radio" defaultValue={element.STYLE.text_align} className="mb-2"
                                             onChange={(val)=>{
                                                  element.STYLE.text_align =  val;
                                                  this.props.updateEditor();
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
                                             <svg className='_ele_acrd_header_main_cont_left_ico' xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><g><rect fill="none" height="24" width="24"/></g><g><g/><polygon points="13,6.99 16,6.99 12,3 8,6.99 11,6.99 11,17.01 8,17.01 12,21 16,17.01 13,17.01"/></g></svg>
                                             <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                             Width and Height 
                                             </div>
                                        </Accordion.Toggle>
                                   <Accordion.Collapse eventKey="0">
                                        <div className='ele_menu_bdy_main_cont'>
                                        <div className='ele_pop_bdy_txt'>Width</div>    
                                                  <div className='ele_pop_bdy_slid_cont'>
                                                  {this._render_menu_slider((element.STYLE.element_width),0,900,(val)=>{element.STYLE.element_width = val;})}
                                                  </div>
     
                                                  <div className='ele_pop_bdy_txt'>Height</div>    
                                                  <div className='ele_pop_bdy_slid_cont'>
                                                  {this._render_menu_slider((element.STYLE.element_height),0,900,(val)=>{element.STYLE.element_height = val;})}
                                                  </div>
                                        </div>
                                   </Accordion.Collapse>
                                   </Accordion>
                                   <Accordion className='ele_men_acrd_main_cont'>
                                        <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main'>
                                             <div className='_ele_acrd_header_main_cont'>
                                             <svg className='_ele_acrd_header_main_cont_left_ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H3V8h2v4h2V8h2v4h2V8h2v4h2V8h2v4h2V8h2v8z"/></svg>
                                             <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                                  Margin
                                             </div>
                                        </Accordion.Toggle>
                                   <Accordion.Collapse eventKey="0">
                                        <div className='ele_menu_bdy_main_cont'>
                                             <div className='ele_pop_bdy_txt'>Margin left</div>    
                                                       <div className='ele_pop_bdy_slid_cont'>
                                                       {this._render_menu_slider((element.STYLE.margin_left),0,900,(val)=>{element.STYLE.margin_left = val;})}
                                                       </div>
     
                                                       <div className='ele_pop_bdy_txt'>Margin right</div>    
                                                       <div className='ele_pop_bdy_slid_cont'>
                                                       {this._render_menu_slider((element.STYLE.margin_right),0,900,(val)=>{element.STYLE.margin_right = val;})}
                                                       </div>
     
     
                                             <div className='ele_pop_bdy_txt'>Margin top</div>    
                                             <div className='ele_pop_bdy_slid_cont'>
                                             {this._render_menu_slider((element.STYLE.margin_top),0,900,(val)=>{element.STYLE.margin_top = val;})}
                                             </div>
                                             <div className='ele_pop_bdy_txt'>Margin bottom</div>    
                                             <div className='ele_pop_bdy_slid_cont'>
                                             {this._render_menu_slider((element.STYLE.margin_bottom),0,900,(val)=>{element.STYLE.margin_bottom = val;})}
                                             </div>
                                        </div>
                                   </Accordion.Collapse>
                                   </Accordion>
                                   <Accordion className='ele_men_acrd_main_cont'>
                                        <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main'>
                                             <div className='_ele_acrd_header_main_cont'>
                                             <svg className='_ele_acrd_header_main_cont_left_ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18 9v4H6V9H4v6h16V9z"/></svg>
                                             <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                                  Padding
                                             </div>
                                        </Accordion.Toggle>
                                   <Accordion.Collapse eventKey="0">
                                        <div className='ele_menu_bdy_main_cont'>
                                             
                                        <div className='ele_pop_bdy_txt'>Padding left</div>    
                                        <div className='ele_pop_bdy_slid_cont'>
                                        {this._render_menu_slider((element.STYLE.padding_left),0,900,(val)=>{element.STYLE.padding_left = val;})}
                                        </div>
                                        <div className='ele_pop_bdy_txt'>Padding right</div>    
                                        <div className='ele_pop_bdy_slid_cont'>
                                             {this._render_menu_slider((element.STYLE.padding_right),0,900,(val)=>{element.STYLE.padding_right = val;})}
                                        </div>
     
                                        <div className='ele_pop_bdy_txt'>Padding top</div>    
                                        <div className='ele_pop_bdy_slid_cont'>
                                        {this._render_menu_slider((element.STYLE.padding_top),0,900,(val)=>{element.STYLE.padding_top = val;})}
                                        </div>
                                        <div className='ele_pop_bdy_txt'>Padding bottom</div>    
                                        <div className='ele_pop_bdy_slid_cont'>
                                        {this._render_menu_slider((element.STYLE.padding_bottom),0,900,(val)=>{element.STYLE.padding_bottom = val;})}
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

          _render_link_menu(element){
               if(element!==false){ 
                    return(
                    <div className='ele_pop_main_bdy'>
                              <div className='pop_txt_head_main_cont'>
                                        <div className='pop_txt_head_txt'>Link</div>
                                             <div className='pop_txt_head_rght_cont'>
                                             <div className='pop_txt_head_rght_cont_swt'>
                                             <input type="checkbox" checked={element.ENABLED} id="switch" onChange={(e)=>{    
                                                  element.ENABLED = !(element.ENABLED)
                                                  this.props.updateEditor();
                                             }} />
                                             <label for="switch" className='ele_pop_elem_lab'>Toggle</label>
                                             </div>
                                             <div className='pop_txt_head_rght_cont_del_swt'>
                                                       <button className='pop_txt_head_rght_cont_del_swt_butt'
                                                        onClick={()=>{
                                                            element.DELETED = true;
                                                            this._add_notification("Text element deleted","danger",1000);
                                                            
                                                            //$('.popover_txt_class').hide();
                                                            this.props.updateEditor();           
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
                                                  value={element.element_url!==undefined?element.element_url:"undefined"}
                                                  onChange={(e)=>{
                                                       element.element_url  = e.target.value;
                                                       this.props.updateEditor();
                                                  }} />
     
                                                  <div className='ele_pop_bdy_txt'>Title</div>
                                                  <input  
                                                       type='text'
                                                  placeholder='Text Value' 
                                                  className='ele_lnk_tit_pop_cont' 
                                                  value={element.INNER_DATA!==undefined?element.INNER_DATA:"undefined"}
                                                  onChange={(e)=>{
                                                       element.INNER_DATA  = e.target.value;
                                                       this.props.updateEditor();
                                                  }} />
                                   </div>
                                   <Accordion className='ele_men_acrd_main_cont'>
                                        <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main'>
                                             <div className='_ele_acrd_header_main_cont'>
                                             <svg className='_ele_acrd_header_main_cont_left_ico' xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M5 17v2h14v-2H5zm4.5-4.2h5l.9 2.2h2.1L12.75 4h-1.5L6.5 15h2.1l.9-2.2zM12 5.98L13.87 11h-3.74L12 5.98z"/></svg>
                                             <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                                  Font
                                             </div>
                                        </Accordion.Toggle>
                                   <Accordion.Collapse eventKey="0">
                                        <div className='ele_menu_bdy_main_cont'>
                                                  <DropdownButton variant={'light'} id="font_choice_drop_menu" title={element.STYLE.font_family}>
                                                       {this._draw_font_family(element)}
                                                  </DropdownButton>
                                                  <div className='ele_pop_bdy_txt'>Font Size</div>    
                                                       <div className='ele_pop_bdy_slid_cont'>
                                                       {this._render_menu_slider((element.STYLE.font_size),0,100,(val)=>{element.STYLE.font_size = val;})}
                                                  </div>
                                        
                                                  <div className='ele_pop_bdy_txt'>Font weight</div>    
                                                       <div className='ele_pop_bdy_slid_cont'>
                                                       {this._render_menu_slider((element.STYLE.font_weight),0,900,(val)=>{element.STYLE.font_weight = val;})}
                                                  </div>
                                                       <div className='ele_pop_bdy_txt'>Text Color</div>
                                                            <OverlayTrigger
                                                            trigger="click"
                                                            placement="left"
                                                            rootClose={true}
                                                            overlay={<Popover id="popover-basic"  className='element_color_pick_popover'    backdropClassName="backdrop">
                                                            <ChromePicker
                                                                 color={element.STYLE.text_color}
                                                                 onChange={(col)=>{
                                                                      element.STYLE.text_color = `rgba(${col.rgb.r},${col.rgb.g},${col.rgb.b},${col.rgb.a})`;
                                                                      
                                                                      this.props.updateEditor()
                                                                 }}
                                                                 onChangeComplete={()=>{this.props.updateEditor()}}
                                                            >
                                                            </ChromePicker>
                                                            </Popover>}
                                                            >
                                                            <Button variant={'light'} className='ele_pop_bdy_col_butt'>
                                                                 <div className='ele_pop_bdy_col_butt_col' style={{backgroundColor:element.STYLE.text_color!==null?element.STYLE.text_color:'#fff'}}></div>
                                                                 {element.STYLE.text_color}
                                                            </Button>
                                                            </OverlayTrigger>
                                        
                                        </div>
                                   </Accordion.Collapse>
                                   </Accordion>
                                   <Accordion className='ele_men_acrd_main_cont'>
                                        <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main'>
                                             <div className='_ele_acrd_header_main_cont'>
                                             <svg   className='_ele_acrd_header_main_cont_left_ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z"/></svg>
                                             <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                             Background 
                                             </div>
                                        </Accordion.Toggle>
                                   <Accordion.Collapse eventKey="0">
                                        <div className='ele_menu_bdy_main_cont'>
                                        <div className='ele_pop_bdy_opt_main_cont'>
                                        <div className='ele_pop_bdy_txt'>Box shadow</div>        
                                        <input className='ele_pop_bdy_chck_cont' checked={element.STYLE.box_shadow_enable} type='checkbox' onClick={
                                             (e)=>{element.STYLE.box_shadow_enable=!element.STYLE.box_shadow_enable
                                                  this.props.updateEditor();
                                             }
                                        }></input>
                                        </div>
     
                                        <div className='ele_pop_bdy_txt'>Box shadow</div>
                                        <div className='ele_pop_box_shad_main_cont'>
     
                                             <div className='ele_pop_box_shad_main_cont_row'>
                                             <div className='ele_pop_box_shad_main_txt_main_cont'>
                                             <div className='ele_pop_box_shad_main_txt_main_cont_lab'>X</div>
                                             <input type='text' className='ele_pop_box_shad_main_txt' value={element.STYLE.box_shadow_x}
                                             onChange={(e)=>{
                                                  element.STYLE.box_shadow_x = e.target.value
                                                  this.props.updateEditor();
                                             }}
                                             ></input>
                                             </div>
                                             <div className='ele_pop_box_shad_main_txt_main_cont'>
                                             <div className='ele_pop_box_shad_main_txt_main_cont_lab'>Y</div>
                                             <input type='text' className='ele_pop_box_shad_main_txt' value={element.STYLE.box_shadow_y}
                                             onChange={(e)=>{
                                                  element.STYLE.box_shadow_y = e.target.value
                                                  this.props.updateEditor();
                                             }}></input>
                                             </div>
                                             </div>
     
                                             <div className='ele_pop_box_shad_main_cont_row'>
                                             <div className='ele_pop_box_shad_main_txt_main_cont'>
                                             <div className='ele_pop_box_shad_main_txt_main_cont_lab'>Blur</div>
                                             <input type='text' className='ele_pop_box_shad_main_txt' value={element.STYLE.box_shadow_blur}
                                             onChange={(e)=>{
                                                  element.STYLE.box_shadow_blur = e.target.value
                                                  this.props.updateEditor();
                                             }}></input>
                                             </div>
     
                                             <div className='ele_pop_box_shad_main_txt_main_cont'>
                                             <div className='ele_pop_box_shad_main_txt_main_cont_lab'>Spread</div>
                                             <input type='text' className='ele_pop_box_shad_main_txt' value={element.STYLE.box_shadow_spread}
                                             onChange={(e)=>{
                                                  element.STYLE.box_shadow_spread = e.target.value
                                                  this.props.updateEditor();
                                             }}></input>
                                             </div>
                                             </div>
                                             <div className='ele_pop_bdy_txt'>Shadow Color</div>
                                             <OverlayTrigger trigger="click" placement="left" rootClose={true} overlay={<Popover id="popover-basic"  className='element_color_pick_popover'    backdropClassName="backdrop">
                                                  <ChromePicker
                                                       color={element.STYLE.box_shadow_color}
                                                       onChange={(col)=>{                                             
                                                            element.STYLE.box_shadow_color = `rgba(${col.rgb.r},${col.rgb.g},${col.rgb.b},${col.rgb.a})`;
                                                            this.props.updateEditor()
                                             }}
                                             onChangeComplete={()=>{this.props.updateEditor()}}
                                        >
                                        </ChromePicker>
                                        </Popover>}
                                        >
                                        <Button variant={'light'} className='ele_pop_bdy_col_butt'>
                                             <div className='ele_pop_bdy_col_butt_col' style={{backgroundColor: element.STYLE.box_shadow_color!==null? element.STYLE.box_shadow_color:'#fff'}}></div>
                                             {element.STYLE.box_shadow_color===undefined?'none':element.STYLE.box_shadow_color}
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
                                             color={element.STYLE.back_color}
                                             onChange={(col)=>{
                                                  
                                                  element.STYLE.back_color = `rgba(${col.rgb.r},${col.rgb.g},${col.rgb.b},${col.rgb.a})`;
     
                                                  this.props.updateEditor()
                                             }}
                                             onChangeComplete={()=>{this.props.updateEditor()}}
                                        >
                                        </ChromePicker>
                                        </Popover>}
                                        >
                                        <Button variant={'light'} className='ele_pop_bdy_col_butt'>
                                             <div className='ele_pop_bdy_col_butt_col' style={{backgroundColor:element.STYLE.back_color!==null?element.STYLE.back_color:'#fff'}}></div>
                                             {element.STYLE.back_color===undefined?'none':element.STYLE.back_color}
                                        </Button>
                                        </OverlayTrigger>
                                             
                                        
                                        </div>
                                   </Accordion.Collapse>
                                   </Accordion>
                                   <Accordion className='ele_men_acrd_main_cont'>
                                        <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main' >
                                             <div className='_ele_acrd_header_main_cont'>
                                             <svg className='_ele_acrd_header_main_cont_left_ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M15 21h2v-2h-2v2zm4 0h2v-2h-2v2zM7 21h2v-2H7v2zm4 0h2v-2h-2v2zm8-4h2v-2h-2v2zm0-4h2v-2h-2v2zM3 3v18h2V5h16V3H3zm16 6h2V7h-2v2z"/></svg>
                                             <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                             Border 
                                             <div className='_ele_acrd_menu_chck_main_cont'>
                                                  <input type='checkbox' className='_ele_acrd_menu_chck' checked={element.STYLE.bordered}
                                             onClick={(e)=>{
                                                  element.STYLE.bordered = !element.STYLE.bordered
                                                  this.props.updateEditor();
                                             }}
                                             ></input></div></div>
                                        </Accordion.Toggle>
                                   <Accordion.Collapse eventKey="0">
                                        <div className='ele_menu_bdy_main_cont'>
                                                  <div className='ele_pop_bdy_txt'>Border width</div>    
                                                  <div className='ele_pop_bdy_slid_cont'>
                                                  {this._render_menu_slider((element.STYLE.border_width),0,100,(val)=>{element.STYLE.border_width = val;})}
                                                  </div>
                                                  
                                                  <div className='ele_pop_bdy_txt'>Border raidus</div>    
                                                  <div className='ele_pop_bdy_slid_cont'>
                                                  {this._render_menu_slider((element.STYLE.border_radius),0,100,(val)=>{element.STYLE.border_radius = val;})}
                                                  </div>
     
                                                  <div className='ele_pop_bdy_txt'>Border Color</div>
                                                       <OverlayTrigger
                                                       trigger="click"
                                                       placement="left"
                                                       rootClose={true}
                                                       overlay={<Popover id="popover-basic"  className='element_color_pick_popover'    backdropClassName="backdrop">
                                                       <ChromePicker
                                                            color={element.STYLE.border_color}
                                                            onChange={(col)=>{
                                                                 element.STYLE.border_color = `rgba(${col.rgb.r},${col.rgb.g},${col.rgb.b},${col.rgb.a})`;
                                                                 this.props.updateEditor()
                                                            }}
                                                            onChangeComplete={()=>{this.props.updateEditor()}}
                                                       >
                                                       </ChromePicker>
                                                       </Popover>}
                                                       >
                                                       <Button variant={'light'} className='ele_pop_bdy_col_butt'>
                                                            <div className='ele_pop_bdy_col_butt_col' style={{backgroundColor:element.STYLE.border_color!==null?element.STYLE.border_color:'#fff'}}></div>
                                                            {element.STYLE.border_color}
                                                       </Button>
                                                       </OverlayTrigger>     
                                        
                                        </div>
                                   </Accordion.Collapse>
                                   </Accordion>                                  
                                   <Accordion className='ele_men_acrd_main_cont'>
                                        <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main'>
                                             <div className='_ele_acrd_header_main_cont'>
                                             <svg  className='_ele_acrd_header_main_cont_left_ico'  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z"/></svg>
                                             <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                             Alignment 
                                             </div>
                                        </Accordion.Toggle>
                                   <Accordion.Collapse eventKey="0">
                                        <div className='ele_menu_bdy_main_cont'>
                                             <div className='ele_pop_bdy_opt_main_cont'>
                                             <div className='ele_pop_bdy_txt'>Vertically center</div>        
                                             <input className='ele_pop_bdy_chck_cont' checked={element.STYLE.vertical_center} type='checkbox' onClick={
                                                  (e)=>{element.STYLE.vertical_center=!element.STYLE.vertical_center
                                                       this.props.updateEditor();
                                                  }
                                             }></input>
                                             </div>
     
                                             <ToggleButtonGroup name='txt_algn_rad_ele_pop' type="radio" defaultValue={element.STYLE.text_align} className="mb-2"
                                             onChange={(val)=>{
                                                  element.STYLE.text_align =  val;
                                                  this.props.updateEditor();
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
                                             <svg className='_ele_acrd_header_main_cont_left_ico' xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><g><rect fill="none" height="24" width="24"/></g><g><g/><polygon points="13,6.99 16,6.99 12,3 8,6.99 11,6.99 11,17.01 8,17.01 12,21 16,17.01 13,17.01"/></g></svg>
                                             <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                             Width and Height 
                                             </div>
                                        </Accordion.Toggle>
                                   <Accordion.Collapse eventKey="0">
                                        <div className='ele_menu_bdy_main_cont'>
                                        <div className='ele_pop_bdy_txt'>Width</div>    
                                                  <div className='ele_pop_bdy_slid_cont'>
                                                  {this._render_menu_slider((element.STYLE.element_width),0,900,(val)=>{element.STYLE.element_width = val;})}
                                                  </div>
     
                                                  <div className='ele_pop_bdy_txt'>Height</div>    
                                                  <div className='ele_pop_bdy_slid_cont'>
                                                  {this._render_menu_slider((element.STYLE.element_height),0,900,(val)=>{element.STYLE.element_height = val;})}
                                                  </div>
                                        </div>
                                   </Accordion.Collapse>
                                   </Accordion>
                                   <Accordion className='ele_men_acrd_main_cont'>
                                        <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main'>
                                             <div className='_ele_acrd_header_main_cont'>
                                             <svg className='_ele_acrd_header_main_cont_left_ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H3V8h2v4h2V8h2v4h2V8h2v4h2V8h2v4h2V8h2v8z"/></svg>
                                             <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                                  Margin
                                             </div>
                                        </Accordion.Toggle>
                                   <Accordion.Collapse eventKey="0">
                                        <div className='ele_menu_bdy_main_cont'>
                                             <div className='ele_pop_bdy_txt'>Margin left</div>    
                                                       <div className='ele_pop_bdy_slid_cont'>
                                                       {this._render_menu_slider((element.STYLE.margin_left),0,900,(val)=>{element.STYLE.margin_left = val;})}
                                                       </div>
     
                                                       <div className='ele_pop_bdy_txt'>Margin right</div>    
                                                       <div className='ele_pop_bdy_slid_cont'>
                                                       {this._render_menu_slider((element.STYLE.margin_right),0,900,(val)=>{element.STYLE.margin_right = val;})}
                                                       </div>
     
     
                                             <div className='ele_pop_bdy_txt'>Margin top</div>    
                                             <div className='ele_pop_bdy_slid_cont'>
                                             {this._render_menu_slider((element.STYLE.margin_top),0,900,(val)=>{element.STYLE.margin_top = val;})}
                                             </div>
                                             <div className='ele_pop_bdy_txt'>Margin bottom</div>    
                                             <div className='ele_pop_bdy_slid_cont'>
                                             {this._render_menu_slider((element.STYLE.margin_bottom),0,900,(val)=>{element.STYLE.margin_bottom = val;})}
                                             </div>
                                        </div>
                                   </Accordion.Collapse>
                                   </Accordion>
                                   <Accordion className='ele_men_acrd_main_cont'>
                                        <Accordion.Toggle  eventKey="0" className='_ele_acrd_header_main'>
                                             <div className='_ele_acrd_header_main_cont'>
                                             <svg className='_ele_acrd_header_main_cont_left_ico' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18 9v4H6V9H4v6h16V9z"/></svg>
                                             <svg className='_ele_acrd_header_main_cont_ico' viewBox='0 0 512 512'><title>Chevron Down</title><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='48' d='M112 184l144 144 144-144'/></svg>
                                                  Padding
                                             </div>
                                        </Accordion.Toggle>
                                   <Accordion.Collapse eventKey="0">
                                        <div className='ele_menu_bdy_main_cont'>
                                             
                                        <div className='ele_pop_bdy_txt'>Padding left</div>    
                                        <div className='ele_pop_bdy_slid_cont'>
                                        {this._render_menu_slider((element.STYLE.padding_left),0,900,(val)=>{element.STYLE.padding_left = val;})}
                                        </div>
                                        <div className='ele_pop_bdy_txt'>Padding right</div>    
                                        <div className='ele_pop_bdy_slid_cont'>
                                             {this._render_menu_slider((element.STYLE.padding_right),0,900,(val)=>{element.STYLE.padding_right = val;})}
                                        </div>
     
                                        <div className='ele_pop_bdy_txt'>Padding top</div>    
                                        <div className='ele_pop_bdy_slid_cont'>
                                        {this._render_menu_slider((element.STYLE.padding_top),0,900,(val)=>{element.STYLE.padding_top = val;})}
                                        </div>
                                        <div className='ele_pop_bdy_txt'>Padding bottom</div>    
                                        <div className='ele_pop_bdy_slid_cont'>
                                        {this._render_menu_slider((element.STYLE.padding_bottom),0,900,(val)=>{element.STYLE.padding_bottom = val;})}
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

     componentDidUpdate(){
         
     }

     renderBaseMenu(){
          return(
               <Resizable
               maxWidth={400}
               boundsByDirection={true}
               top={false}
               bottom={false}
               right={false}
               minWidth={250}
               style={{
                    
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
               {this.props.columnId>=0 && ((typeof this.props.columnId) == 'number') ?
                              <div className='land_act_main_bdy_right_sub'>
                                   {this._render_element_menu()}
                              </div>
                          :undefined}
               </div>
               
               
               
               </Resizable>
          );
     }
   

     render(){
          return(
               <div>
                    <div className='land_act_rgt_main_bdy_cont'>
                    <div className='land_act_rgt_main_cont'>
                              <div className='land_act_rgt_bottom_outer_main_cont'>
                              <div className='land_act_sav_indi_main_cont'>
                                   <div className='land_act_sav_indi_cont'>
                                            {this.props.saveIndi?this.props.saveIndi():undefined}
                                   </div>    
                              </div>
                              <div className='land_act_sav_width_main_cont'>
                                        {this.props.websiteComponent?`${this.props.websiteComponent.DIMENSION[0]}Px`:undefined}
                              </div>
                              <div className='land_act_rgt_outer_main_cont'>
                                   <button className='land_act_rgt_outer_main_cont_butt' onClick={()=>{
                                        this.props.websiteComponent.decrScale();
                                        this.props.updateEditor();
                                   }}>
                                        -
                                   </button>
                                   <input disabled type='text' className='land_act_rgt_outer_main_cont_fld' value={`${this.props.websiteComponent?this.props.websiteComponent.DISPLAY_SCALE:undefined}%`}>
                                   </input>
                                   <button className='land_act_rgt_outer_main_cont_butt'
                                    onClick={()=>{
                                        this.props.websiteComponent.incrScale();
                                        this.props.updateEditor();
                                   }}>
                                        +
                                   </button>
                                  
                              </div>
                              </div>
                    </div>
                   {this.props.columnId>=0 && ((typeof this.props.columnId) == 'number') ?this.renderBaseMenu():undefined}
                   </div>
               </div>
          )
     }

}

// <div className="land_act_main_bdy_right_both_menu_main_body_cont">
// <Tab.Container id="land_act_main_bdy_right_both_menu_main">
// <Row className='land_act_main_bdy_right_inner_menu_main_row_cont'>
// <Col className='land_act_main_bdy_right_inner_menu_main_cont_selec'>
//      <Nav variant="pills" className="flex-column">
//      <Nav.Item bsPrefix='nav-item right_pane_nav_item' className="land_act_main_bdy_right_inner_menu_main_cont_selec_pill_butt">
//           <Nav.Link eventKey="first" bsPrefix='nav-link right_pane_nav'>     
//           <svg className='land_act_main_bdy_right_inner_menu_main_cont_ico' height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 18c0 .55.45 1 1 1h5v-2H4c-.55 0-1 .45-1 1zM3 6c0 .55.45 1 1 1h9V5H4c-.55 0-1 .45-1 1zm10 14v-1h7c.55 0 1-.45 1-1s-.45-1-1-1h-7v-1c0-.55-.45-1-1-1s-1 .45-1 1v4c0 .55.45 1 1 1s1-.45 1-1zM7 10v1H4c-.55 0-1 .45-1 1s.45 1 1 1h3v1c0 .55.45 1 1 1s1-.45 1-1v-4c0-.55-.45-1-1-1s-1 .45-1 1zm14 2c0-.55-.45-1-1-1h-9v2h9c.55 0 1-.45 1-1zm-5-3c.55 0 1-.45 1-1V7h3c.55 0 1-.45 1-1s-.45-1-1-1h-3V4c0-.55-.45-1-1-1s-1 .45-1 1v4c0 .55.45 1 1 1z"/></svg>
//           </Nav.Link>
//      </Nav.Item>
//      {this.props.columnId>=0 && ((typeof this.props.columnId) == 'number') ?
//      <Nav.Item  className="land_act_main_bdy_right_inner_menu_main_cont_selec_pill_butt">
//           <Nav.Link eventKey="second" bsPrefix='nav-link right_pane_nav'>
//           <svg className='land_act_main_bdy_right_inner_menu_main_cont_ico' height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 18c0 .55.45 1 1 1h5v-2H4c-.55 0-1 .45-1 1zM3 6c0 .55.45 1 1 1h9V5H4c-.55 0-1 .45-1 1zm10 14v-1h7c.55 0 1-.45 1-1s-.45-1-1-1h-7v-1c0-.55-.45-1-1-1s-1 .45-1 1v4c0 .55.45 1 1 1s1-.45 1-1zM7 10v1H4c-.55 0-1 .45-1 1s.45 1 1 1h3v1c0 .55.45 1 1 1s1-.45 1-1v-4c0-.55-.45-1-1-1s-1 .45-1 1zm14 2c0-.55-.45-1-1-1h-9v2h9c.55 0 1-.45 1-1zm-5-3c.55 0 1-.45 1-1V7h3c.55 0 1-.45 1-1s-.45-1-1-1h-3V4c0-.55-.45-1-1-1s-1 .45-1 1v4c0 .55.45 1 1 1z"/></svg>
//           </Nav.Link>
//      </Nav.Item>:undefined
//      }
//      </Nav>
// </Col>
// <Col className='land_act_main_bdy_right_inner_menu_main_cont'>
//      <Tab.Content>
//      <Tab.Pane eventKey="first">
//           <div className='land_act_main_bdy_right_inner_menu_main_inner_cont'>
//           Up there
//           </div>
//      </Tab.Pane>
//      <Tab.Pane eventKey="second">
//           <div className='land_act_main_bdy_right_inner_menu_main_inner_cont'>
//                {this.props.columnId>=0 && ((typeof this.props.columnId) == 'number') ?this.renderBaseMenu():undefined}
//           </div>
//      </Tab.Pane>
//      </Tab.Content>
// </Col>
// </Row>
// </Tab.Container>
// </div>