import React from "react";
import ELEMENT_SHELL_RENDER from "./ELEMENT_SHELL_RENDER";
import ELEMENT_TEXT from "../../../../../component/baseElement/ELEMENT_TEXT";
import ELEMENT_CONTAINER from "../../../../../component/baseElement/ELEMENT_CONTAINER";
export default class ELEMENT_SECTION_RENDER extends React.Component{
          /*
               websiteHelper
               updateHandler
               sectionData
          */
          constructor(props){
               super(props);
               this._render_section_childs = this._render_section_childs.bind(this);
               
          }
          _render_section_childs(el){
               if(el){
                    let childs = el.getChildElements().map((elm,ind)=>{
                         if(elm.BOOLS.PARENTABLE == true){
                              return(
                                   <ELEMENT_SHELL_RENDER {...this.props}  isSection={false} sectionData={null} currentLayerId={elm.IDS.BASE_ID}  elementData={elm}>
                                        Container {elm.IDS.BASE_ID}     
                                        {this._render_section_childs(elm)}
                                   </ELEMENT_SHELL_RENDER>
                              )     
                         }
                         else{
                              return <div>NON Container ELEMENT</div>
                         }
                    });
                    return childs;
               }
               else{
                    return <div>Empt</div>
               }
          }

          _render_section(){
               let el = this.props.sectionData;
               if(el){
                    return(                    
                         <ELEMENT_SHELL_RENDER {...this.props}  isSection={true} sectionData={el} currentLayerId={el.IDS.BASE_ID}  elementData={el}>
                              {this._render_section_childs(el)}
                         </ELEMENT_SHELL_RENDER>
                    );
               }else{return(<div>Empt</div>);}
          }

          render(){return(<div>{this._render_section()}</div>)}

}