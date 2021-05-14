import React from "react";
import { Resizable } from "re-resizable";
import Embed from 'react-embed';
var tslib_1 = require("tslib");



export default class elementRenderer extends React.Component{
     constructor(props){
          super(props);
          this.state = {
               websiteComp:this.props.websiteComp,
          }
     }


     /*   currentSelectTypeId
          currentSelectRowId
          currentSelectColmId
          overlayMenuId
          contextMenuHandler
          resizeCallback
          selectCallback
          elementRenderCallback
     
     */

     _render_elemenet(i,j,element){
               let isSelected = false;
               this.props.currentSelectRowId==i && this.props.currentSelectColmId==j?isSelected=true:null;
               return(
                    <div className='overlay_build_lines'
                    >
                               {/* <div className='overlay_build_line_1'  style={{visibility:isSelected===true?'visible':'hidden'}}></div>
                              <div className='overlay_build_line_2' style={{visibility:isSelected===true?'visible':'hidden'}}></div> */}
                                <Resizable
                                             
                                             className='ele_main_resizer_main_cont'
                                             maxWidth={900}
                                             enable={{
                                                   top:isSelected==true?true:false, 
                                                   right:isSelected==true?true:false,
                                                   bottom:isSelected==true?true:false, 
                                                   left:isSelected==true?true:false, 
                                                   topRight:isSelected==true?true:false, 
                                                   bottomRight:isSelected==true?true:false, 
                                                   bottomLeft:isSelected==true?true:false, 
                                                   topLeft:isSelected==true?true:false }
                                             }
                                             data-colmId={j} 
                                             data-rowId={i} 
                                             data-menuId={this.props.overlayMenuId} 
                                             onContextMenu={this.props.contextMenuHandler}
                                             boundsByDirection={false}
                                             minWidth={100}
                                             size={{ width: element.STYLE.element_width+'px', height:element.STYLE.element_height+'px' }}
                                             style={{
                                                  position:'relative',
                                                  top:0,
                                                  right:0,
                                                  height:'100%', 
                                                  opacity:element.ENABLED===true?1:0.5,
                                                  marginTop:element.STYLE.margin_top,
                                                  marginBottom:element.STYLE.margin_bottom,
                                                  marginLeft:element.STYLE.margin_left,
                                                  marginRight:element.STYLE.margin_right,
                                                }}
                                             
                                             defaultSize={{
                                                  width: element.STYLE.element_width+'px',
                                                  height:element.STYLE.element_height+'px'
                                             }}
                                             onResize={(e, direction, ref, d) => {
                                                  this.props.resizeCallback(element.ROW_ID,element.COLUMN_ID,ref.style.height,ref.style.width);
                                                }}
                                             >
                              <div className='overlay_add_butt_cont'>
                              </div>
                              <div  className="_page_element_main_bdy" id={'_page_element_spci_'+element.TYPE_ID} 
                                                  onMouseDown={(e)=>{
                                                       if(e.nativeEvent.which==1){
                                                       if(isSelected===true){this.props.selectCallback(-1,-1,-1)
                                                       }else{this.props.selectCallback(element.COLUMN_ID,element.ROW_ID,1);}}
                                                  }}
                                                  >
                                                          <div
                                                  style={
                                                       {
                                                            overflow:'hidden',
                                                            width:'100%',
                                                            height:'100%',
                                                            textAlign:element.STYLE.text_align,
                                                            borderStyle:element.STYLE.bordered===true?'solid':'none',
                                                            borderWidth:element.STYLE.border_width,
                                                            borderColor:element.STYLE.border_color,
                                                            padding:element.STYLE.padding+"px",
                                                            paddingTop:element.STYLE.padding_top,
                                                            paddingBottom:element.STYLE.padding_bottom,
                                                            paddingRight:element.STYLE.padding_right,
                                                            paddingLeft:element.STYLE.padding_left,
                                                            margin:element.STYLE.margin+"px",
                                                            fontFamily:element.STYLE.font_family,
                                                            textDecoration:element.STYLE.underline===true?'underline':'none',
                                                            fontSize:element.STYLE.font_size+"px",
                                                            fontWeight:element.STYLE.font_weight,
                                                            color:element.STYLE.text_color,
                                                            display:element.STYLE.vertical_center==true?'flex':'block',
                                                            alignItems:element.STYLE.vertical_center==true?'center':'stretch',
                                                            boxShadow:element.STYLE.box_shadow_enable===true?`${element.STYLE.box_shadow_x}px  ${element.STYLE.box_shadow_y}px  ${element.STYLE.box_shadow_blur}px  ${element.STYLE.box_shadow_spread}px ${element.STYLE.box_shadow_color}`:'0px 0px 0px 0px #fff',                                                            
                                                            backgroundColor:element.STYLE.back_color,
                                                            borderRadius:element.STYLE.border_radius+"px",
                                                            whiteSpace:'pre',
                                                       }
                                                  }
                                                  className='_page_element_text_class'
                                                  >
                                                       <div style={{pointerEvents:'none'}}>
                                                       {this._inner_data_selector(element)}
                                                       </div>
                                                  </div>
                                                  <div className={isSelected==true?"_page_element_overlay":"_page_element_overlay_non"} >
                                                       <div className={` ${isSelected==true?'_page_element_overlay_rect':'_page_element_overlay_rect_non'} _overlay_page_top_left`}></div>
                                                       <div className={` ${isSelected==true?'_page_element_overlay_rect':'_page_element_overlay_rect_non'} _page_element_overlay_rect _overlay_page_top_right`}></div>
                                                       <div className={`${isSelected==true?'_page_element_overlay_rect':'_page_element_overlay_rect_non'} _page_element_overlay_rect _overlay_page_bottom_left`}></div>
                                                       <div className={`${isSelected==true?'_page_element_overlay_rect':'_page_element_overlay_rect_non'} _page_element_overlay_rect _overlay_page_bottom_right`}></div>
                                                  </div>
                              </div>
                              </Resizable>
                    </div>
               )
     }

     _inner_data_selector(element){
          switch(element.TYPE_ID){
               case 0:{
                    return(this._text_inner_data(element))
               }
               case 1:{
                    return(this._link_inner_data(element))
               }
               case 2:{
                    return(this._image_inner_data(element))
               }
               case 4:{
                    return(this._embeded_inner_data(element))
               }
               default:{
                    return(<div>Wrong type id : Failed element render</div>)
                    break;
               }
          }

     }

     _text_inner_data(element){
          return(
               <div className='_page_element_inner_data_main_cont'>
                    {element.INNER_DATA}
               </div>
          )
     }

     _link_inner_data(element){
          return(
               <div className='_page_element_inner_data_main_cont'>
                     <a href={element.URL_DATA!==null?element.URL_DATA:'#'}>
                         {element.INNER_DATA}
                    </a>
               </div>
          )
     }

     _image_inner_data(element){
          return(
               <div className='_page_element_inner_data_main_cont'>
                    {element.image_data!==null?element.image_data.map((image, index) => 
                         {
                              return(<img src={image['data_url']}
                              style={{
                              width:element.STYLE.image_width+"%",
                              height:element.STYLE.image_height+"%",
                              borderRadius:element.STYLE.border_radius+"px",
                              }}
                         ></img>
                         )}):element.image_data_url!==null?
                         <div>
                         <img src={element.image_data_url}
                                                       style={{
                                                       width:element.STYLE.image_width+"%",
                                                       height:element.STYLE.image_height+"%",
                                                       borderRadius:element.STYLE.border_radius+"px",
                                                       }}
                         ></img>
                         </div>:
                         <div>Image element</div>}
               </div>
          )
     }
     // _image_inner_data(element){
     //      return(
     //           <div className='_page_element_inner_data_main_cont'>
     //                {element.image_data_url!==null?
     //                     <img src={element.image_data_url}
     //                          style={{
     //                          width:element.STYLE.image_width+"%",
     //                          height:element.STYLE.image_height+"%",
     //                          borderRadius:element.STYLE.border_radius+"px",
     //                          }}
     //                     />
     //                     :<div>Image element</div>}
     //           </div>
     //      )
     // }

     _embeded_inner_data(element){
          return(
               <div className='_page_element_inner_data_main_cont'>
                   {element.INNER_DATA.length>0?
                         <Embed url={element.INNER_DATA} 
                         className='_page_element_vid_class'
                         children={{child:true}}
                         render={
                              (Block, id, props, state)=>{          

                                        var renderVoid = function (error) { return props.renderVoid(props, state, error); };
                                        return (React.createElement(Block, tslib_1.__assign({}, state.url, { id: id, width: props.width, isDark: props.isDark, renderWrap: props.renderWrap, renderVoid: renderVoid })));
                              }
                         }
                         renderVoid={(_b)=>{
                              
                              return(<div className='_page_element_vid_empt_class'>False embeded url</div>)
                         }}
                         renderWrap={(_a)=>{          
                              
                              
                              return(_a)}}
                         />:
                         <div className='_page_element_vid_empt_class'>Enter embeded link</div>}
               </div>
          )
     }

     renderEditor(){
          if(this.props.websiteComp && this.props.websiteComp!==undefined){
          let RENDER_EDITOR_ARRAY = [];
          for(let i = 0 ; i < this.props.websiteComp.getSectionArray().length;i++){
               let hasAElement = false;
               if(this.props.websiteComp.getSectionArray()[i].getElementArray().length>0){
               RENDER_EDITOR_ARRAY.push( 
               <div  className={this.props.currentSelectRowId===i?'element_row_main_cont element_row_main_sec':'element_row_main_cont element_row_main_nonsec'}
               style={{
                    pointerEvents:'none'
               }}
               >
                    {
                         this.props.websiteComp.getSectionArray()[i].getElementArray().map((ele,j)=>{
                              let got_elem = this.props.websiteComp.getSectionArray()[i].getElementArray()[j];
                              if(got_elem.DELETED===false){
                              hasAElement=true;
                              return(<div style={{
                                   pointerEvents:'all'
                              }}>    
                                            {this._render_elemenet(i,j,got_elem)}              
                                   </div>)}
                         })
                    }

               </div>)
                    if(hasAElement==false){
                         RENDER_EDITOR_ARRAY.pop();
                    }
               }
               else{
                    return null;
               }
               
          }
          return RENDER_EDITOR_ARRAY;}
          else{
               return(<div>Empty Render</div>)
          }
     }

     render(){

          return(this.renderEditor());
     }

}    