import ELEMENT_WEBSITE from "../baseContainer/ELEMENT_WEBSITE";
import ELEMENT_SECTION from "../baseContainer/ELEMENT_SECTION";
import ELEMENT_CONTAINER from "../baseElement/ELEMENT_CONTAINER";
export default class editorCompHelper{
     WEBSITE_COMP:ELEMENT_WEBSITE  = null;

     MOUSE_CORREC_Y = 56;
     MOUSE_CORREC_X = 0;
     
     constructor(){
          this.WEBSITE_COMP = new ELEMENT_WEBSITE();
          this.addSection(null,null);
          this.getWebsiteComp().getSectionStack()[0].getChildElements().push(new ELEMENT_CONTAINER(1,100,200,1))
          this.getWebsiteComp().getSectionStack()[0].getChildElements().push(new ELEMENT_CONTAINER(2,300,400,2))
          this.getWebsiteComp().getSectionStack()[0].getChildElements().push(new ELEMENT_CONTAINER(3,300,200,3))
          this.getWebsiteComp().getSectionStack()[0].getChildElements().push(new ELEMENT_CONTAINER(4,700,200,4))
          this.getWebsiteComp().getSectionStack()[0].getChildElements().push(new ELEMENT_CONTAINER(5,200,600,5))
          
     }

     addSection(stack_id:number|null,direc:number|null){
          if(stack_id){
               this.getWebsiteComp().getSectionStack().splice((direc?stack_id+direc:stack_id),0,new ELEMENT_SECTION(stack_id)); 
          }else{
               this.getWebsiteComp().getSectionStack().push(new ELEMENT_SECTION(null))
          }    
     }
     findNode(elem,base_id,path:Array<any>){
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
                         PARENT_ELEMENT:res,
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
                                   pr.PARENT_ELEMENT.ELEMENT.getChildElements().splice(i,1);
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
                    PARENT_ELEM.getChildElements().splice(i,1);
                    return true;
                    break;
               }
          }
          return false;
     }
     

     getDifferentialCords(PARENT_ELM,CHILD_ELM){
          let prLef  = PARENT_ELM.getStyleComp().position.x_global.getDimen().val_px;
          let prTop  = PARENT_ELM.getStyleComp().position.y_global.getDimen().val_px;
          let chLef  = CHILD_ELM.getStyleComp().position.x_global.getDimen().val_px;
          let chTop  = CHILD_ELM.getStyleComp().position.y_global.getDimen().val_px
          let dl = chLef-prLef;
          let dt = chTop - prTop;
          CHILD_ELM.getStyleComp().position.top.getDimen().val_px = dt;
          CHILD_ELM.getStyleComp().position.left.getDimen().val_px =dl;
     }

     getDifferentialGlobalCords(CHILD_ELM,imx,imy){
          let elm = document.getElementById(`ELEMENT-SHELL-${CHILD_ELM.IDS.BASE_ID}`)
          let domRect = elm.getBoundingClientRect();
          CHILD_ELM.getStyleComp().position.left.getDimen().val_px = CHILD_ELM.getStyleComp().position.x_global.getDimen().val_px;
          CHILD_ELM.getStyleComp().position.top.getDimen().val_px = CHILD_ELM.getStyleComp().position.y_global.getDimen().val_px;
          
     }


     moveToRoot(BASE_ID,imx,imy){
               let res = this.findInParent(0,BASE_ID);
               if(res){
                    let prtNode = this.findInParent(0,res.FOUND_ELEMENT.ELEMENT.IDS.PARENT_ID);
                         if(prtNode){
                              if(this.deleteFromParent(prtNode.FOUND_ELEMENT.ELEMENT,res.FOUND_ELEMENT.ELEMENT)==true){
                                   this.getDifferentialGlobalCords(res.FOUND_ELEMENT.ELEMENT,imx,imy);
                                    res.FOUND_ELEMENT.ELEMENT.ELEMENT_LAYER_COUNT = 99999;
                                   this.getWebsiteComp().getSectionStack()[0].getChildElements().push(res.FOUND_ELEMENT.ELEMENT);
                                   this.sortSectionTree();
                                   res.FOUND_ELEMENT.ELEMENT.IDS.PARENT_ID = 0;
                              }
                              else{
                                   console.log("ELEMENT NOT DELETED");    
                              }
                         }
               }
               else{
                    console.log("ELEMENT NOT FOUND");    
               }
     }

     addNode(PARENT_ID,BASE_ID){
          let po = this.findInParent(PARENT_ID,BASE_ID);
          if(!po){
               console.log("PARENT NO EXIST"); 
          }
          else{
              if(po.FOUND == true){
              }else{
                    let res = this.findInParent(0,BASE_ID);
                    if(res){
                         let prtNode = this.findInParent(0,res.FOUND_ELEMENT.ELEMENT.IDS.PARENT_ID);
                              if(prtNode){
                                   if(this.deleteFromParent(prtNode.FOUND_ELEMENT.ELEMENT,res.FOUND_ELEMENT.ELEMENT)==true){
                                        this.getDifferentialCords(po.PARENT_ELEMENT.ELEMENT,res.FOUND_ELEMENT.ELEMENT);
                                        po.PARENT_ELEMENT.ELEMENT.getChildElements().push(res.FOUND_ELEMENT.ELEMENT);
                                        this.sortSectionTree();
                                        res.FOUND_ELEMENT.ELEMENT.IDS.PARENT_ID = PARENT_ID;
                                   }
                                   else{
                                        console.log("ELEMENT NOT DELETED");    
                                   }
                              }
                         }
              }
          }
     }    
     
     sortChildElementLay(elm){
          if(elm){
               let minInd = null;
               let len = elm.getChildElements().length;
               for(let k = 0 ; k < len ; k++){
                    minInd = k;
                    for(let l = k+1;l<len;l++){
                         if(elm.getChildElements()[l].ELEMENT_LAYER_COUNT < elm.getChildElements()[minInd].ELEMENT_LAYER_COUNT){
                              minInd = l;
                         }
                    }     
                    let temp = elm.getChildElements()[k];
                    elm.getChildElements()[k] = elm.getChildElements()[minInd];
                    elm.getChildElements()[minInd] = temp;
               }
          }
     }

     sortSectionTree(){
          this.rearrangeTree(this.getWebsiteComp().getSectionStack()[0]);
          console.log("TREE SORTED");
     }

     rearrangeTree(PARENT_ELEM){
          this.sortChildElementLay(PARENT_ELEM);
          for(let i = 0 ; i < PARENT_ELEM.getChildElements().length;i++){
               this.rearrangeTree(PARENT_ELEM.getChildElements()[i]);
          }          
          
     }    

     getElementAsLayer(PARENT_ELEMT){

     }

     getGlobalCords(BASE_ELEM,BASE_ID,left,top){
          if(BASE_ELEM.IDS.BASE_ID == BASE_ID){
               return {
                    ELEMENT:BASE_ELEM,
                    LEFT:left,   
                    TOP:top
               };
          }
          else{
               if(BASE_ELEM.BOOLS.PARENTABLE == true){
                    if(BASE_ELEM.getChildElements()){
                       if(BASE_ELEM.getChildElements().length>0){
                         for(let i:number = 0 ; i < BASE_ELEM.getChildElements().length ; i++){              
                              left += BASE_ELEM.getStyleComp().position.left.getDimen().val_px;
                              top += BASE_ELEM.getStyleComp().position.top.getDimen().val_px
                              let res = this.getGlobalCords(BASE_ELEM.getChildElements()[i],BASE_ID,left,top);
                              if(res){
                                   return  {
                                        ELEMENT:res.ELEMENT,
                                        LEFT:res.LEFT,     
                                        TOP:res.TOP
                                   };
                              }
                         }
                       }  
                    }
               }
          }
          return null;
     }

     
     prntClip(PARENT_ID,ans,mx,my){
          if(PARENT_ID===0){
               return ans && true;
          }
          else{     
               let pEl =  this.findNode(this.getWebsiteComp().getSectionStack()[0],PARENT_ID,[]);
               let prntEl = pEl?pEl.ELEMENT:null;
               let pl = prntEl?prntEl.getStyleComp().position.x_global.getDimen().val_px:null;
               let pt = prntEl?prntEl.getStyleComp().position.y_global.getDimen().val_px:null;
               let prtXClip = null;
               if(prntEl){
                    if((mx >pl && mx < pl+ prntEl.getStyleComp().body.dimen.getDimen().x)
                    && 
                    (my > pt && my < pt + prntEl.getStyleComp().body.dimen.getDimen().y)){
                         prtXClip =  true;
                        return(this.prntClip(prntEl.IDS.PARENT_ID,true,mx,my))
                    }
                    else{
                         prtXClip =  false;
                         return false;
                    }
               }

          }
     }


     checkClipping(el,BASE_ID,mx,my){
          let gl = el.getStyleComp().position.x_global.getDimen().val_px;
          let gt = el.getStyleComp().position.y_global.getDimen().val_px;
          let pEl = null;
          if(el.IDS.PARENT_ID!==0){
                pEl = this.findNode(this.getWebsiteComp().getSectionStack()[0],el.IDS.PARENT_ID,[]);
          }
          else{
                pEl = null;
          }

          let prntEl = pEl?pEl.ELEMENT:null;
          let pl = prntEl?prntEl.getStyleComp().position.x_global.getDimen().val_px:null;
          let pt = prntEl?prntEl.getStyleComp().position.y_global.getDimen().val_px:null;
          
          let prtXClip = null;
          if(prntEl){
               prtXClip = this.prntClip(el.IDS.PARENT_ID,true,mx,my) ;
          }
          if(
               (
                    (mx >gl && mx < gl+ el.getStyleComp().body.dimen.getDimen().x)
                    &&
                    (prntEl?prtXClip:true)
               )
          &&
          (
                    (my>gt && my < gt +el.getStyleComp().body.dimen.getDimen().y)
                    &&
                    (prntEl?prtXClip:true)
          )
            
          )   
          {
               return true;
          }
          else{
               return false;
          }  
          return null;
     }

     travelAllNodes(elem,BASE_ID,mx,my){
               if(elem){
                    if(elem.BOOLS.PARENTABLE == true){
                         for(let i = (elem.getChildElements().length-1) ; i >= 0 ; i--){
                              let el = elem.getChildElements()[i]; 
                              if(el.IDS.BASE_ID===BASE_ID){continue;}
                              let res = this.travelAllNodes(el,BASE_ID,mx,my) 
                              if(res){
                                   return res;
                              }
                              if(this.checkClipping(el,BASE_ID,mx,my)===true){
                                   el.BOOLS.PROBAL_ATTACH = true;
                                   return el.IDS.BASE_ID;
                              }else{
                                   el.BOOLS.PROBAL_ATTACH = false;    
                              }
                              
                              
                         }
                    }
                    else{
                         return null;
                    }
               }
               else{
                    return null;
               }
     }

     findMouseUnderElement(BASE_ID,mouse_x,mouse_y){
          let mx = mouse_x;
          let my = mouse_y ;
          let res = this.travelAllNodes( this.getWebsiteComp().getSectionStack()[0],BASE_ID,mx,my);
          if(res){
               return res;
          }
          return null;
     }

     getWebsiteComp():ELEMENT_WEBSITE{
          return this.WEBSITE_COMP;
     }
     setWebsiteComp(val){
          val?this.WEBSITE_COMP=val:null;
     }


}