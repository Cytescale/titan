import elementComp from './elementComp';
import STLYE_COMP from './elementStyleComp';




export default class selectionComp {
     BASE_ID:number= null;
     ELEMENT_ARRAY: Array<elementComp> = [];
     STYLE:typeof STLYE_COMP =STLYE_COMP ;
     ENABLED:boolean = true;
      DELETED:boolean = false;
     SECTION_STLYE:any|null = null; 

     constructor(base_id:number){
               this.BASE_ID = base_id;
               this.SECTION_STLYE = {
                    section_height:'300',
                    section_width:'100',                    
               }
     }

     
     getElementArray():Array<elementComp>{
          return this.ELEMENT_ARRAY;
     }
     getStyle():(typeof STLYE_COMP){
          return this.STYLE;
     }
}