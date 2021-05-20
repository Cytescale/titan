import sectionComp from './sectionComp';
import elementComp from './elementComp';
import backgrounClass from './website_background';
import type{ELEMENT_TYPE} from './elementTypeId';

export default class websiteComp {
     NAME:string = "Website"
     TEMPLATE_ID:number = null;
     PAGE_ID:number = null;
     ENABLED:boolean = true;
     DELETED:boolean = false;
     SECTION_ARRAY:Array<sectionComp>= [];
     PAGE_CODE:string = "null";
     VIEW_ID:string = null;
     DIMENSION:Array<number> = [900,null];
     ELEMENT_COUNT:number=0;
     WEBSITE_VALIDITY_ID:number = 1001;
     BACKGROUND_DATA:any  = new backgrounClass(); 
     DISPLAY_SCALE:number = 100; 


     SECTION_ARR:Array<any> = [];

     editorCompHelp = null;

     constructor(){
          
     }

     addElement(element_type_id:ELEMENT_TYPE|null,row_id:number|null,colm_id:number|null,insert_direction:number|null,callback:Function|null):boolean{     
          if(row_id==null){
               let sc:sectionComp = new sectionComp(this.SECTION_ARRAY.length)
               sc.getElementArray().push(new elementComp(element_type_id,this.getSectionArray().length,0,0));
               this.getSectionArray().push(sc);               
          }     
          else{
               switch(insert_direction){
                    case 0:{
                         let sc:sectionComp = new sectionComp(this.getSectionArray().length)
                         sc.getElementArray().push(new elementComp(element_type_id,row_id,this.getSectionArray()[row_id].getElementArray().length,0));
                         this.getSectionArray().splice((row_id),0,sc);     
                         
                         break;
                    }
                    case 1:{
                         let sc:sectionComp = new sectionComp(this.getSectionArray().length)
                         sc.getElementArray().push(new elementComp(element_type_id,row_id,this.getSectionArray()[row_id].getElementArray().length,0));
                         this.getSectionArray().splice((row_id+1),0,sc);
                         break;
                    }
                    case 2:{
                         let ec:elementComp = new elementComp(element_type_id,row_id,this.getSectionArray()[row_id].getElementArray().length,0);
                         this.getSectionArray()[row_id].getElementArray().splice(colm_id,0,ec);
                         break;
                    }
                    case 3:{
                         let ec:elementComp = new elementComp(element_type_id,row_id,this.getSectionArray()[row_id].getElementArray().length,0);
                         this.getSectionArray()[row_id].getElementArray().splice((colm_id+1),0,ec);
                         break;
                    }
                    default:{
                         console.log("WEBSITE COMP element addtion error");
                         return false;
                         break;
                    }
               }
          }
          this.  recalcElementIds();
          callback?callback():null;
          
          return true;
     }

     deleteSection(row_id:number,callback:Function|null):boolean{
          this.getSectionArray()[row_id].DELETED = true;
          callback?callback():null;
          return true;
     }

     deleteElement(row_id:number,colm_id:number,callback:Function|null):boolean{
          this.getSectionArray()[row_id].getElementArray()[colm_id].DELETED = true;
          callback?callback():null;
          return true;
     }

     recalcElementIds(){
          let z = 0;
          this.ELEMENT_COUNT = 0;
          for(let i = 0 ; i < this.getSectionArray().length;i++){
               for(let j = 0 ; j < this.getSectionArray()[i].getElementArray().length ; j++){          
                    this.ELEMENT_COUNT++;
                    this.getSectionArray()[i].getElementArray()[j].COLUMN_ID = j;
                    this.getSectionArray()[i].getElementArray()[j].ROW_ID = i;
                    this.getSectionArray()[i].getElementArray()[j].BASE_ID=z;
                     z++;
               }
          }
          console.log("WEBSITE COMP: ids recalculatedw with count "+this.ELEMENT_COUNT);

     }

     incrScale(){
          if(this.DISPLAY_SCALE<=90){
               this.DISPLAY_SCALE = this.DISPLAY_SCALE+10;
          }
     }

     decrScale(){
          if(this.DISPLAY_SCALE>=20){
               this.DISPLAY_SCALE = this.DISPLAY_SCALE-10;
          }
     }
     


     consoleSectionArray(){
          for(let i = 0 ; i < this.getSectionArray().length;i++){
               for(let j = 0 ; j < this.getSectionArray()[i].getElementArray().length ; j++){
                    console.log("ELEMENT TYPE "+this.getSectionArray()[i].getElementArray()[j].TYPE_ID);
               }
          }
     }

     getSectionArray():Array<sectionComp>{
          return this.SECTION_ARRAY;
     }


}


