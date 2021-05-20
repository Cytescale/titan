import React from "react";
import ELEMENT_SECTION_RENDER from "./compRender/ELEMENT_SECTION_RENDER";
export default class Renderer extends React.Component{
          /*
               websiteHelper
               updateHandler
          */
          constructor(props){
               super(props); 
          }

          _renderSectionStack(){
               let sectionStackCode = this.props.websiteHelper?this.props.websiteHelper.getWebsiteComp().getSectionStack().map((el,id)=>{
                    return(el?<ELEMENT_SECTION_RENDER {...this.props} sectionData={el}/>:<div>Empt</div>)
               }):null;
               return sectionStackCode; 
          }
          render(){
               return(
                    <div>
                         {this._renderSectionStack()}
                    </div>
               )
          }

}