import compStyle from "../baseComp/comp_style";
import ELEMENT_CONTAINER from "../baseElement/ELEMENT_CONTAINER";
import ELEMENT_TEXT from "../baseElement/ELEMENT_TEXT";
import ELEMENT_IMAGE from "../baseElement/ELEMENT_IMAGE"
import { ID_TYPES ,ELEMENT_BOOL_TYPES,ELEMENT_MENU_TYPES} from "../baseComp/typesDefs";

export default class ELEMENT_SECTION {
     ELEMENT_STYLE:compStyle = null;
     
     
     IDS:Partial<ID_TYPES>={
          STACK_ID:null,
          BASE_ID:0,
          SECTION_ID: null, 
          PARENT_ID : null,
     }
     BOOLS:Partial<ELEMENT_BOOL_TYPES>={
          MOVEABLE : false,
          DELETED :false,
          EDITABLE : true,
          ENABLED : true,
          RESIZEABLE : true,
          SELECTABLE:true,
          RESIZE_MODES:{
               TOP:false,
               LEFT:false,
               RIGHT:false,
               BOTTOM:true,
          }
     }
     ELEMENT_PROP_MENU:Partial<ELEMENT_MENU_TYPES>={
          position:false,
          padding:true,     
          margin:false,
          background:true,
          border:false,
          dimension:true,
     }
     ELEMENT_CLASSNAME:string = null;
     ELEMENT_NAME:string = "Section";
     ELEMENT_LAYER_COUNT:number = 1;
     CHILD_ELEMENTS:Array<ELEMENT_CONTAINER|ELEMENT_TEXT|ELEMENT_IMAGE|null> = []
     constructor(STACK_ID:number){
          this.ELEMENT_STYLE = new compStyle();       
          this.ELEMENT_STYLE.STYLE.body.dimen.setDimen(
               {x_type:2,
               y_type:2,
               yvp:90,
               xvp:100,
          });

          

          STACK_ID?this.IDS.STACK_ID=STACK_ID:null;
     }

     getChildElements():Array<ELEMENT_CONTAINER|ELEMENT_TEXT|ELEMENT_IMAGE|null>{
          return this.CHILD_ELEMENTS;
     }

     getStyleComp():compStyle{
          return this.ELEMENT_STYLE.getCompStyle();
     }

}