import elementSkelton  from "../baseComp/elementSket";
export default class ELEMENT_TEXT extends elementSkelton{
     TEXT_DATA_STRING = 'EMPTY';
     TEXT_DATA_RAW = null;
     URL_LINK = null;
     constructor(){
          super('Text',2);
          this.setPropMenu(true,true,true,true,true,true)
          this.getStyleComp().body.dimen.setDimen(
               {
               x_type:0,
               y_type:0,
               x:200,
               y:200,
          });
     }

     
}