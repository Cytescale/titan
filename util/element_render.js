import React, { useState,useEffect  } from 'react';

import { Button,Dropdown,Modal,OverlayTrigger,Popover } from 'react-bootstrap';
import Embed from 'react-embed';



export default class elementRender{
     constructor(element,overlay){
          this.element = element;
          this.overlay = overlay;
     }

     _update_element(new_element){
          this.element = new_element;
     }
     _get_type_element(){
          switch(this.element.element_type_id){
               case 0:{
                    return(this._render_text_element(this.element))
                   
               }
               case 4:{
                    return(this._render_vid_yout_element(this.element))
               }
               default:{
                    break;
               }
          }


     }

     _render_element_overlay(){
          
          return(
               <OverlayTrigger 
               trigger="click" 
               placement="right"
               rootClose={true} 
               overlay={this.overlay}
               >
                     <div className="_page_element_main_bdy" >
                        <div className="_page_element_main_bdy" style={{opacity:this.element.enabled===true?1:0.6,}}>
                              <div className="_page_element_head_main_body">
                                   <div className="_page_element_head_left_bdy">
                                        Title
                                   </div>
                                   <div className="_page_element_head_rgt_bdy">

                                   </div>
                              </div>  
                                   <div>
                                        {this._get_type_element(this.element)}
                                        <div className="_page_element_overlay" ></div>
                                   </div>
                              </div>
                    </div>
               </OverlayTrigger>
          )
     }
     _render_vid_yout_element(){
          return(
                         <div 
                         style={
                              {
                                   margin:this.element.style.margin+"px",
                                   padding:this.element.style.padding+"px",
                                   fontSize:this.element.style.font_size+"px",
                                   backgroundColor:this.element.style.back_color,
                              }
                         }
                         className='_page_element_text_class'
                         >
                         {this.element.data.length>0?<Embed url={this.element.data} className='_page_element_vid_class'/>:<div className='_page_element_vid_empt_class'>Enter video player url</div>}    
                         </div>
              
          );
     }

     _render_text_element(){ 
                    return(
                              <div 
                                                  style={
                                                       {
                                                            textAlign:this.element.style.text_align,
                                                            borderStyle:this.element.style.bordered===true?'solid':'none',
                                                            borderWidth:this.element.style.border_width,
                                                            borderColor:this.element.style.border_color,
                                                            paddingTop:this.element.style.padding_top,
                                                            paddingBottom:this.element.style.padding_bottom,
                                                            paddingRight:this.element.style.padding_right,
                                                            paddingLeft:this.element.style.padding_left,
                                                            marginTop:this.element.style.margin_top,
                                                            marginBottom:this.element.style.margin_bottom,
                                                            textDecoration:this.element.style.underline===true?'underline':'none',
                                                            margin:this.element.style.margin+"px",
                                                            padding:this.element.style.padding+"px",
                                                            fontSize:this.element.style.font_size+"px",
                                                            color:this.element.style.text_color,
                                                            backgroundColor:this.element.style.back_color,
                                                            borderRadius:this.element.style.border_radius+"px",
                                                            whiteSpace:'pre',
                                                       }
                                                  }
                                                  className='_page_element_text_class'
                                                  >{this.element.data}
                                                  </div>
                       );
     }

     _render_foot_element(){
                    return(
                         <div className='_page_element_main_bdy'>
                         <div className="_page_element_head_main_body">
                        <div className="_page_element_head_left_bdy">
                             Footer
                        </div>
                        <div className="_page_element_head_rgt_bdy">
                      
                        </div>
                        </div>
                             <div>
                                       <div 
                                       className='_page_element_footer_main_bdy'
                                       >     
                                        Made with ♥️ by Titan
                                       </div>
                             <div className="_page_element_overlay" ></div>
                             </div>
                   </div>
                    );
     }
     _foot_code(){
          return(
                             
                                        <div 
                                       className='_page_element_footer_main_bdy'
                                       >     
                                        Made with ♥️ by Titan
                                       </div>
                             
          )
     }
     _render_profile_element(){
                    return(
                         <div className='_page_element_main_bdy'>
                               <div className="_page_element_head_main_body">
                              <div className="_page_element_head_left_bdy">
                                   Profile
                              </div>
                              <div className="_page_element_head_rgt_bdy">
                            
                              </div>
                              </div>
                                   <div>
                                             <div 
                                             className='_page_element_profile_main_bdy'
                                             >
                                                  <div  className='_page_element_profile_pic_bdy'>
                                                  <img src='http://simpleicon.com/wp-content/uploads/account.png' 
                                                  className='_page_element_profile_pic_bdy_ico'></img>                                   
                                                  </div>
                                                  <div className='_page_element_profile_pic_bdy'>
                                                       <div className='_page_element_profile_nam_bdy'>
                                                            Name placeholder
                                                       </div>
                                                  </div>
                                                  <div className='_page_element_profile_abut_bdy'>
                                                       <div className='_page_element_profile_abt_bdy'>
                                                            About placeholder line
                                                       </div>
                                                  </div>
          
                                             </div>
                                   <div className="_page_element_overlay" ></div>
                                   </div>
                         </div>
                    )
     }
}

