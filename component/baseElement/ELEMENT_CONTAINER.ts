import elementSkelton  from "../baseComp/elementSket";
export default class ELEMENT_CONTAINER extends elementSkelton{
     CHILD_ELEMENTS = [];
     constructor(){
          super('Container',1);
          this.setPropMenu(true,true,true,true,true,true)
     }
}