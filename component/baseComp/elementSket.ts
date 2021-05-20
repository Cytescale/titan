import compStyle from "./comp_style";
import { ID_TYPES ,ELEMENT_BOOL_TYPES,ELEMENT_MENU_TYPES} from "../baseComp/typesDefs";


export default class elementSkelton{
     ELEMENT_STYLE:compStyle = null;
     IDS:Partial<ID_TYPES>={
          BASE_ID : null, 
          PARENT_ID : null,
     }
     BOOLS:Partial<ELEMENT_BOOL_TYPES>={
          MOVEABLE : true,
          DELETED :false,
          EDITABLE : true,
          ENABLED : true,
          RESIZE_MODES:{
               TOP:true,
               LEFT:true,
               RIGHT:true,
               BOTTOM:true,
          },
          IS_LINK : false,
     }
     ELEMENT_PROP_MENU:Partial<ELEMENT_MENU_TYPES>={
          position:true,
          padding:true,     
          margin:true,
          background:true,
          border:true,
          dimension:true,
     }
     ELEMENT_CLASSNAME = null;
     ELEMENT_ID = null;
     ELEMENT_TYPE_ID = null;
     ELEMENT_NAME = null;
     ELEMENT_LAYER_COUNT = null;
     constructor(name,type_id){
          this.ELEMENT_NAME = name;
          this.ELEMENT_TYPE_ID = type_id;
          this.ELEMENT_STYLE = new compStyle();
     }
     getStyleComp():compStyle{
          return this.ELEMENT_STYLE.getCompStyle();
     }
     setPropMenu(position,padding,margin,background,border,dimension){
          this.ELEMENT_PROP_MENU ={
               position:position?position:true,
               padding:padding?padding:true,     
               margin:margin?margin:true,
               background:background?background:true,
               border:border?border:true,
               dimension:dimension?dimension:true,
          }
     }

}