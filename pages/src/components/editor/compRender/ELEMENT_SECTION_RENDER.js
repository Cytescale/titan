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
               
          }
          _render_section_childs(el){
               if(el){
                    let childs = el.CHILD_ELEMENTS.map((elm,ind)=>{
                         return(
                              <ELEMENT_SHELL_RENDER isSection={false} currentLayerId={elm.IDS.BASE_ID} sectionData={this.props.sectionData} elementData={elm}>
                                   Container {elm.IDS.BASE_ID}     
                              </ELEMENT_SHELL_RENDER>
                         )
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
                    <ELEMENT_SHELL_RENDER isSection={true} elementData={this.props.sectionData}>
                         {this._render_section_childs(el)}
                      </ELEMENT_SHELL_RENDER>
                    );
               }else{return(<div>Empt</div>);}
          }

          render(){return(<div>{this._render_section()}</div>)}

}