import elementComp from './elementComp';
import STLYE_COMP from './elementStyleComp';




export default class selectionComp {
     BASE_ID:number= null;
     ELEMENT_ARRAY: Array<elementComp> = [];
     STYLE:typeof STLYE_COMP =STLYE_COMP ;
     ENABLED:boolean = true;
      DELETED:boolean = false;
     constructor(base_id:number){
               this.BASE_ID = base_id;
     }

     
     getElementArray():Array<elementComp>{
          return this.ELEMENT_ARRAY;
     }
     getStyle():(typeof STLYE_COMP){
          return this.STYLE;
     }
}