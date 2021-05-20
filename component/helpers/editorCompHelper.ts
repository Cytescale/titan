import ELEMENT_WEBSITE from "../baseContainer/ELEMENT_WEBSITE";
import ELEMENT_SECTION from "../baseContainer/ELEMENT_SECTION";
export default class editorCompHelper{
     WEBSITE_COMP:ELEMENT_WEBSITE  = null;
     constructor(){
          this.WEBSITE_COMP = new ELEMENT_WEBSITE();
          this.addSection(null,null);
          this.addSection(null,null);
          this.addSection(null,null);
          this.addSection(null,null);
      
     }

     addSection(stack_id:number|null,direc:number|null){
          if(stack_id){
               this.getWebsiteComp().getSectionStack().splice((direc?stack_id+direc:stack_id),0,new ELEMENT_SECTION(stack_id)); 
          }else{
               this.getWebsiteComp().getSectionStack().push(new ELEMENT_SECTION(null))
          }
          
     }
     getWebsiteComp():ELEMENT_WEBSITE{
          return this.WEBSITE_COMP;
     }
     setWebsiteComp(val){
          val?this.WEBSITE_COMP=val:null;
     }


}