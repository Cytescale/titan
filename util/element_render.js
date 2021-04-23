"use strict";
import React from 'react';
import { Button,Dropdown,Modal,OverlayTrigger,Popover } from 'react-bootstrap';
import Embed from 'react-embed';
import Router from 'next/router'
import { isElementAccessExpression } from 'typescript';
var tslib_1 = require("tslib");

export default class elementRender{
     constructor(element,selec_id){
          this.element = element;
          if(this.element!==undefined){
          if(selec_id == this.element.element_id){
               this.isSelected = true;
          }
          else{
               this.isSelected = false;
          }}
     }

     _update_element(new_element){
          this.element = new_element;
     }
     _get_type_element(callback){
          switch(this.element.element_type_id){
               case 0:{
                    return(this._render_text_element(callback))
               }
               case 1:{
                    return(this._render_link_element(callback))
               }
               case 2:{
                    return(this._render_image_element(callback))
               }
               case 4:{
                    return(this._render_vid_yout_element(callback))
               }
               default:{
                    break;
               }
          }


     }

  

     _render_element_overlay(set_selec_callback,add_butt_callback,callback){
          return(
               <div className='overlay_build_lines'>
                          <div className='overlay_build_line_1'  style={{visibility:this.isSelected===true?'visible':'hidden'}}></div>
                         <div className='overlay_build_line_2' style={{visibility:this.isSelected===true?'visible':'hidden'}}></div>
               <div className='overlay_trig_cont'
               style={{
                    opacity:this.element.enabled===true?1:0.5
               }}
               >
                         <div className='overlay_add_butt_cont'>
                                   <button className="_page_element_overlay_add_top" style={{
                                        opacity:this.isSelected==true?1:0,
                                        visibility:this.isSelected===true?'visible':'hidden',

                                   }} 
                                   onClick={()=>add_butt_callback(this.element.element_id,0)}>+ Add Above</button>
                                   <button className="_page_element_overlay_add_bottom" style={{
                                        opacity:this.isSelected==true?1:0,
                                        visibility:this.isSelected===true?'visible':'hidden',
                                   }}  onClick={()=>add_butt_callback(this.element.element_id,1)}>+ Add Below</button>
                         </div>
                         <div  className="_page_element_main_bdy" id={'_page_element_spci_'+this.element.element_id} 
                                             onMouseDown={()=>{
                                                  if(this.isSelected===true){set_selec_callback(-1)
                                                  }else{set_selec_callback(this.element.element_id);}
                                             }}
                                             >
                                             {this._get_type_element(callback)}
                                             <div className={this.isSelected==true?"_page_element_overlay":"_page_element_overlay_non"} ></div>
                         </div>
               </div>
               </div>
          )
     }

     _render_vid_yout_element(callback){
          return(
                         <div style={
                              {
                                   overflow:'hidden',
                                   textAlign:this.element.style.text_align,
                                   borderStyle:this.element.style.bordered===true?'solid':'none',
                                   borderWidth:this.element.style.border_width,
                                   borderColor:this.element.style.border_color,
                                   padding:this.element.style.padding+"px",
                                   paddingTop:this.element.style.padding_top,
                                   paddingBottom:this.element.style.padding_bottom,
                                   paddingRight:this.element.style.padding_right,
                                   paddingLeft:this.element.style.padding_left,
                                   margin:this.element.style.margin+"px",
                                   marginTop:this.element.style.margin_top,
                                   marginBottom:this.element.style.margin_bottom,
                                   fontSize:this.element.style.font_size+"px",
                                   borderRadius:this.element.style.border_radius+"px",
                                   whiteSpace:'pre',
                              }
                         }
                         id={`_page_element_embd_id_`+this.element.element_id}
                         className='_page_element_text_class'
                         >
                         {this.element.data.length>0?
                         <Embed url={this.element.data} 
                         className='_page_element_vid_class'
                         children={{child:true}}
                         render={
                              (Block, id, props, state)=>{          
                                        console.log(JSON.stringify(Block)+"\n\n"+JSON.stringify(props))
                                        var renderVoid = function (error) { return props.renderVoid(props, state, error); };
                                        return (React.createElement(Block, tslib_1.__assign({}, state.url, { id: id, width: props.width, isDark: props.isDark, renderWrap: props.renderWrap, renderVoid: renderVoid })));
                              }
                         }
                         renderVoid={(_b)=>{
                              console.log(_b);
                              return(<div className='_page_element_vid_empt_class'>False embeded url</div>)
                         }}
                         renderWrap={(_a)=>{          
                              callback(this.element.element_id,`_page_element_embd_id_`+this.element.element_id)
                              console.log("\n\n"+JSON.stringify(_a.props)+"\n\n");
                              return(_a)}}
                         />:
                         <div className='_page_element_vid_empt_class'>Enter embeded link</div>}
                         </div>
          );
     }
     _render_link_element(callback){
          return(
               <a href={this.element.element_url!==null?this.element.element_url:'#'}>
               <div
               style={
                    {
                         overflow:'hidden',
                         fontFamily:this.element.style.font_family,
                         textAlign:this.element.style.text_align,
                         borderStyle:this.element.style.bordered===true?'solid':'none',
                         borderWidth:this.element.style.border_width,
                         borderColor:this.element.style.border_color,
                         padding:this.element.style.padding+"px",
                         paddingTop:this.element.style.padding_top,
                         paddingBottom:this.element.style.padding_bottom,
                         paddingRight:this.element.style.padding_right,
                         paddingLeft:this.element.style.padding_left,
                         margin:this.element.style.margin+"px",
                         marginTop:this.element.style.margin_top,
                         marginBottom:this.element.style.margin_bottom,
                         fontSize:this.element.style.font_size+"px",
                         color:this.element.style.text_color,
                         backgroundColor:this.element.style.back_color,
                         borderRadius:this.element.style.border_radius+"px",
                         whiteSpace:'pre',
                    }
               }
               className='_page_element_text_class'
               >

                    {this.element.data}

               </div>
               </a>
               );
     }

     _render_image_element(callback){
          return(
               <div
            
               style={
                    {
                         overflow:'hidden',
                         textAlign:this.element.style.text_align,
                         borderStyle:this.element.style.bordered===true?'solid':'none',
                         borderWidth:this.element.style.border_width,
                         borderColor:this.element.style.border_color,
                         padding:this.element.style.padding+"px",
                         paddingTop:this.element.style.padding_top,
                         paddingBottom:this.element.style.padding_bottom,
                         paddingRight:this.element.style.padding_right,
                         paddingLeft:this.element.style.padding_left,
                         margin:this.element.style.margin+"px",
                         marginTop:this.element.style.margin_top,
                         marginBottom:this.element.style.margin_bottom,
                         textDecoration:this.element.style.underline===true?'underline':'none',
                         fontSize:this.element.style.font_size+"px",
                         fontWeight:this.element.style.font_weight,
                         color:this.element.style.text_color,
                         backgroundColor:this.element.image_data===null?this.element.style.back_color:undefined,
                         //borderRadius:this.element.style.border_radius+"px",
                         whiteSpace:'pre',
                    }
               }
               className='_page_element_text_class'
               >
                 {this.element.image_data!==null?this.element.image_data.map((image, index) => (
                                                  <img src={image['data_url']}
                                                  style={{
                                                       width:this.element.style.image_width+"%",
                                                       height:this.element.style.image_height+"%",
                                                       borderRadius:this.element.style.border_radius+"px",

                                                  }}
                                                  ></img>
                                                  )):<div>Image element</div>}
               </div>
);
     }

     _render_text_element(callback){
                    return(

                                                  <div
                                                  style={
                                                       {
                                                            overflow:'hidden',
                                                            textAlign:this.element.style.text_align,
                                                            borderStyle:this.element.style.bordered===true?'solid':'none',
                                                            borderWidth:this.element.style.border_width,
                                                            borderColor:this.element.style.border_color,
                                                            padding:this.element.style.padding+"px",
                                                            paddingTop:this.element.style.padding_top,
                                                            paddingBottom:this.element.style.padding_bottom,
                                                            paddingRight:this.element.style.padding_right,
                                                            paddingLeft:this.element.style.padding_left,
                                                            margin:this.element.style.margin+"px",
                                                            fontFamily:this.element.style.font_family,
                                                            marginTop:this.element.style.margin_top,
                                                            marginBottom:this.element.style.margin_bottom,
                                                            textDecoration:this.element.style.underline===true?'underline':'none',
                                                            fontSize:this.element.style.font_size+"px",
                                                            fontWeight:this.element.style.font_weight,
                                                            color:this.element.style.text_color,
                                                            backgroundColor:this.element.style.back_color,
                                                            borderRadius:this.element.style.border_radius+"px",
                                                            whiteSpace:'pre',
                                                       }
                                                  }
                                                  className='_page_element_text_class'
                                                  >

                                                       {this.element.data}

                                                  </div>
                       );
     }

     _render_foot_element(){
                    return(
                         <div className='_page_element_main_bdy'>
                         {/* <div className="_page_element_head_main_body">
                        <div className="_page_element_head_left_bdy">
                             Footer
                        </div>
                        <div className="_page_element_head_rgt_bdy">

                        </div>
                        </div> */}
                             <div>
                                       <div
                                       className='_page_element_footer_main_bdy'
                                       >
                                        Made with ♥️ by Titan
                                       </div>

                             </div>
                   </div>
                    );
     }
     _render_profile_element(){
                    return(
                         <div className='_page_element_main_bdy'>
                                   <div>
                                             <div
                                             className='_page_element_profile_main_bdy'
                                             >


                                                  <div className='_page_element_profile_txt_main_cont'>
                                                  <div className='_page_element_profile_nam_bdy'>
                                                            Hola,
                                                  </div>
                                                  <div className='_page_element_profile_abut_bdy'>
                                                            This is NameHolder
                                                  </div>
                                                  <div className='_page_element_profile_sub_line_bdy'>
                                                            The creator
                                                  </div>
                                                  </div>


                                                  <div  className='_page_element_profile_pic_bdy'>
                                                  <img src='http://simpleicon.com/wp-content/uploads/account.png'
                                                  className='_page_element_profile_pic_bdy_ico'></img>
                                                  </div>

                                             </div>
                                   <div className="_page_element_overlay" ></div>
                                   </div>
                         </div>
                    )
     }
}

