import elementSkelton  from "../baseComp/elementSket";
import ELEMENT_TEXT from "./ELEMENT_TEXT";
import ELEMENT_IMAGE from "./ELEMENT_IMAGE";


export default class ELEMENT_CONTAINER extends elementSkelton{
     CHILD_ELEMENTS:Array<this|ELEMENT_TEXT|ELEMENT_IMAGE|null> = [];
     constructor(base_id:number|string|any,
                 x:number|null,
                 y:number|null,
                 lay_id:number|null,
                 ){
          super('Container',1);
          this.setPropMenu(true,true,true,true,true,true)
          this.ELEMENT_STYLE.getCompStyle().position.position = 'absolute';
          this.ELEMENT_STYLE.getCompStyle().body.dimen.setDimen(
               {
               x_type:0,
               y_type:0,
               x:200,
               y:200,
          });
          base_id?this.IDS.BASE_ID=base_id:null;
          lay_id?this.ELEMENT_LAYER_COUNT=lay_id:null;
          x?this.ELEMENT_STYLE.getCompStyle().position.left.getDimen().val_px=x:null;
          y?this.ELEMENT_STYLE.getCompStyle().position.top.getDimen().val_px=y:null;
          this.BOOLS.PARENTABLE = true;
          
     }
     getChildElements():Array<this|ELEMENT_TEXT|ELEMENT_IMAGE|null>{
          return this.CHILD_ELEMENTS;
     }
}