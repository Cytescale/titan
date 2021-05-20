import compStyle from "../baseComp/comp_style";
import ELEMENT_SECTION from "./ELEMENT_SECTION";
import { ID_TYPES ,ELEMENT_BOOL_TYPES,ELEMENT_MENU_TYPES} from "../baseComp/typesDefs";


export default class ELEMENT_WEBSITE{
     ELEMENT_STYLE:compStyle = null;
     IDS:Partial<ID_TYPES>={
          PARENT_ID : 0,
     }
     ELEMENT_PROP_MENU:Partial<ELEMENT_MENU_TYPES>={
          position:false,
          padding:false,     
          margin:false,
          background:true,
          border:false,
          dimension:false,
     }
     ELEMENT_NAME:string = "Website";
     ELEMENT_LAYER_COUNT:number = 0;
     SECTION_STACK:Array<ELEMENT_SECTION> = [];
     constructor(){
          this.ELEMENT_STYLE = new compStyle();       
          this.ELEMENT_STYLE.STYLE.body.dimen.setDimen(
               {    x_type:2,
                    y_type:2,
                    yvp:100,
                    xvp:100});
          console.log("NEW WEBSITE COMPONENT CREATED");
     }

     getSectionStack():Array<ELEMENT_SECTION>{
          return this.SECTION_STACK;
     }    
     setSectionStack(val:Array<ELEMENT_SECTION>){
          val?this.SECTION_STACK=val:null;
     }

}