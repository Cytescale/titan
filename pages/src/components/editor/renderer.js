import React from "react";
import ELEMENT_SECTION_RENDER from "./compRender/ELEMENT_SECTION_RENDER";
export default class Renderer extends React.Component{
          /*
               websiteHelper
               updateHandler
          */
          constructor(props){
               super(props); 
               this._renderSectionStack = this._renderSectionStack.bind(this);
          }

          _renderSectionStack(){
               let sectionStackCode = this.props.websiteHelper?this.props.websiteHelper.getWebsiteComp().getSectionStack().map((el,id)=>{
                    return(el?<ELEMENT_SECTION_RENDER 
                         {...this.props}
                         isSection={el.BOOLS.IS_SECTION} 
                         sectionData={el.BOOLS.IS_SECTION==true?el:null} 
                         currentLayerId={el.IDS.BASE_ID}  
                         elementData={el}
                         />:<div>Empt</div>)
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