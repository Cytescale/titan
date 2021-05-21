import ELEMENT_WEBSITE from "../baseContainer/ELEMENT_WEBSITE";
import ELEMENT_SECTION from "../baseContainer/ELEMENT_SECTION";
import ELEMENT_CONTAINER from "../baseElement/ELEMENT_CONTAINER";
export default class editorCompHelper{
     WEBSITE_COMP:ELEMENT_WEBSITE  = null;
     constructor(){
          this.WEBSITE_COMP = new ELEMENT_WEBSITE();
          this.addSection(null,null);
          this.getWebsiteComp().getSectionStack()[0].getChildElements().push(new ELEMENT_CONTAINER(1,100,200))
          this.getWebsiteComp().getSectionStack()[0].getChildElements().push(new ELEMENT_CONTAINER(2,300,400))
          this.getWebsiteComp().getSectionStack()[0].getChildElements().push(new ELEMENT_CONTAINER(3,300,200))
          this.getWebsiteComp().getSectionStack()[0].getChildElements().push(new ELEMENT_CONTAINER(4,700,200))
          this.getWebsiteComp().getSectionStack()[0].getChildElements().push(new ELEMENT_CONTAINER(5,200,600))
          
     }

     addSection(stack_id:number|null,direc:number|null){
          if(stack_id){
               this.getWebsiteComp().getSectionStack().splice((direc?stack_id+direc:stack_id),0,new ELEMENT_SECTION(stack_id)); 
          }else{
               this.getWebsiteComp().getSectionStack().push(new ELEMENT_SECTION(null))
          }    
     }
     // public Node findNode(Node n, String s) {
     //      if (n.name == s) {
     //          return n;
     //      } else {
     //          for (Node child: n.children.values()) {
     //              Node result = findNode(child, s);
     //              if (result != null) {
     //                  return result;
     //              }
     //          }
     //      }
     //      return null;
     //  }
     findNode(elem,base_id){
          if(elem.IDS.BASE_ID === base_id){
               return elem;
          }
          else{
               if(elem.BOOLS.PARENTABLE == true){
                    if(elem.getChildElements()){
                       if(elem.getChildElements().length>0){
                         elem.getChildElements().map((el,ind)=>{
                              let res = this.findNode(el,base_id);
                              if(res!=null){
                                   return res;
                              }
                         })
                       }  
                    }
               }
          }
          return null;
     }
     findSpecificParent(PARENT_BASE_ID,CHILD_BASE_ID){
          let res = this.findNode(this.getWebsiteComp().getSectionStack()[0],PARENT_BASE_ID);
          if(res){
               
               res.getC
          }
     }
     ifNodeExist(base_id){
          let res = this.findNode(this.getWebsiteComp().getSectionStack()[0],base_id);
          return(res?true:false);
     }

     addNode(PARENT_ID,BASE_ID){

     }    

     getWebsiteComp():ELEMENT_WEBSITE{
          return this.WEBSITE_COMP;
     }
     setWebsiteComp(val){
          val?this.WEBSITE_COMP=val:null;
     }


}