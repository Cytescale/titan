import React from "react";
import ELEMENT_SHELL_RENDER from "./ELEMENT_SHELL_RENDER";
import ELEMENT_TEXT from "../../../../../component/baseElement/ELEMENT_TEXT";
export default class ELEMENT_SECTION_RENDER extends React.Component{
          /*
               websiteHelper
               updateHandler
               sectionData
          */
          constructor(props){
               super(props);
               
          }

          _render_section(){
               let el = this.props.sectionData;
               let elm = new ELEMENT_TEXT();               
               if(el){
                    return(
                    <ELEMENT_SHELL_RENDER elementData={this.props.sectionData} onChangeSize={()=>{
                         
                        }}>
                      <div style={{
                           backgroundColor:el.getStyleComp().body.back_color.getColor().colorStr,
                           width:'100%',
                           height:'100%',
                           zIndex:el.getStyleComp().body.z_index,
                      }}>
                           <ELEMENT_SHELL_RENDER elementData={elm}>
                              <div class='test_cont_move' style={{  
                                   width:'100%',
                                   height:'100%',
                                   }}>
                                   {elm.TEXT_DATA_STRING}
                              </div>
                           </ELEMENT_SHELL_RENDER>
                           <div class='test_cont'>
                           </div> 
                      </div>   
                      </ELEMENT_SHELL_RENDER>
                    );
               }else{return(<div>Empt</div>);}
          }

          render(){return(<div>{this._render_section()}</div>)}

}