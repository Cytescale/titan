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
     findNode(elem,base_id,path){
          if(elem.IDS.BASE_ID == base_id){
               return {
                    ELEMENT:elem,
                    PATH:path
               };
          }
          else{
               if(elem.BOOLS.PARENTABLE == true){
                    if(elem.getChildElements()){
                       if(elem.getChildElements().length>0){
                         for(let i:number = 0 ; i < elem.getChildElements().length ; i++){
                              let res = this.findNode(elem.getChildElements()[i],base_id,path);
                              if(res){
                                   path.push(i);
                                   return  {
                                        ELEMENT:res.ELEMENT,
                                        PATH:path,     
                                   };
                              }
                         }
                       }  
                    }
               }
          }
          return null;
     }
     findInParent(PARENT_BASE_ID,CHILD_BASE_ID){
          let res = this.findNode(this.getWebsiteComp().getSectionStack()[0],PARENT_BASE_ID,[]);
          if(res){
               let fnRes = this.findNode(res.ELEMENT,CHILD_BASE_ID,res.PATH);
               if(fnRes){
                    return {
                         PARENT_ELEMENT:res,
                         FOUND_ELEMENT:fnRes,
                         FOUND:true,
                         PATH:null,
                    };
               }else{
                    return {
                         PARENT_ELEMENT:res.ELEMENT,
                         FOUND_ELEMENT:false,
                         FOUND:false,
                         PATH:res.PATH,
                    };
               }

          }else{
               return null;
          }
     }

     getNode(elem,child_index){          
          if(elem.BOOLS.PARENTABLE){
               let res  = elem.getChildElements()[child_index];
               if(res){
                    return res;
               }else{
                    return null;
               }
          }
          return null;
     }

     travel(base_elem,path){
          let z = 0;
          let currNode = base_elem;
          while(z<path.length){
                currNode = this.getNode(currNode,z);
          }    
          return currNode;
     }
     

     deleteNode(CHILD_ID){
          let pr  = this.findInParent(0,CHILD_ID);
          console.log(pr);
          if(pr){
               if(pr.FOUND===true){
                         for(let i = 0 ; i < pr.PARENT_ELEMENT.ELEMENT.getChildElements().length;i++){
                              if(pr.PARENT_ELEMENT.ELEMENT.getChildElements()[i].IDS.BASE_ID === CHILD_ID){
                                   pr.PARENT_ELEMENT.ELEMENT.getChildElements().splice(1,1);
                                   return true;
                                   break;
                              }
                         }
                         return false;
               }
          }
          return null;
     }    

     deleteFromParent(PARENT_ELEM,CHILD_ELEM){
          for(let i = 0 ; i < PARENT_ELEM.getChildElements().length;i++){
               if(PARENT_ELEM.getChildElements()[i].IDS.BASE_ID === CHILD_ELEM.IDS.BASE_ID){
                    PARENT_ELEM.getChildElements().splice(1,1);
                    return true;
                    break;
               }
          }
          return false;
     }

     addNode(PARENT_ID,BASE_ID){
          let po = this.findInParent(PARENT_ID,BASE_ID);
          console.log(po);
          if(!po){
               console.log("PARENT NO EXIST"); 
          }
          else{
               
              if(po.FOUND == true){
               console.log("EXIST"); 
              }else{
                    let res = this.findInParent(0,BASE_ID);
                    if(res){
                              if(this.deleteFromParent(res.PARENT_ELEMENT.ELEMENT,res.FOUND_ELEMENT.ELEMENT)){
                                   po.PARENT_ELEMENT.getChildElements().push(res.FOUND_ELEMENT.ELEMENT);
                                   console.log("ADDED");
                              }
                              else{
                                   console.log("ELEMENT NOT DELETED");    
                              }
                         }
              }
          }
     }    

     findMouseUnderElement(mouse_x,mouse_y){
               
     }

     getWebsiteComp():ELEMENT_WEBSITE{
          return this.WEBSITE_COMP;
     }
     setWebsiteComp(val){
          val?this.WEBSITE_COMP=val:null;
     }


}