import React, { ReactChild } from 'react';
import  STLYE_COMP from './elementStyleComp';
import type{ELEMENT_TYPE} from './elementTypeId';



export default class elementComp {
     SELECTOR_TYPE:string = 'ELEMENT';
     BASE_ID:number=null;
     TYPE_ID:ELEMENT_TYPE = null; 
     ROW_ID:number=null;
     COLUMN_ID:number = null;
     DELETED:boolean = false;
     ENABLED:boolean = true;
     INNER_DATA:any  = "Undefined";
     URL_DATA:string = "";
     NAME = null;
     _STYLE:(typeof STLYE_COMP)|any|null = null; 
     image_data =null;
     image_tumb_url:string = null;
     image_data_url:string =  null;
     imageKitFileId:string = null;
     image_size:number=null;

     constructor(type_id:ELEMENT_TYPE|null,row_id:number|null,colm_id:number|null,base_id:number|null){
          this.TYPE_ID = type_id;
          this.ROW_ID = row_id;
          this.COLUMN_ID = colm_id;
          this.BASE_ID = base_id; 
          this.STYLE = {
               margin:0,
               element_width:320,
               element_height:70,     
               margin_top:0,
               margin_bottom:0,
               margin_left:0,
               margin_right:0,
               padding_right:0,
               padding_left:12,
               padding_top:20,
               padding_bottom:20,
               padding:0,
               border_radius:0,
               border_width:2,
               bordered:false,
               font_family:'Poppins',
               border_color:'#000',
               back_color:'#fff',
               text_color:'#000',
               font_size:17,
               font_weight:500,
               bold:false,
               italic:false,
               underline:false,
               text_align:'start',
               image_width:'100',
               image_height:'100',
               vertical_center:false,   
               box_shadow_enable:false,
               box_shadow_x:0,
               box_shadow_y:0,
               box_shadow_blur:0,
               box_shadow_spread:0,
               box_shadow_color:'#fff',
               slider:'10',
          }
          ;
          this.setElementInitData();
     }

     setElementInitData(){
          
          switch(this.TYPE_ID){
               case 0:{
                    this.NAME = "Text";
                    this.INNER_DATA = "Lorem Ipsum"
                    break;
               }
               case 1:{
                    this.NAME = "Link";
                    break;
               }
               case 2:{
                    this.NAME = "Image";
                    break;
               }
               case 4:{
                    this.NAME = "Embeded";
                    break;
               }
               default:{
                    this.NAME = "Fault element";
                    break;
               }
          }
     }

     setElementData(data:any){
          if(data!==null){this.INNER_DATA = data;}
     }

     getName():string{
          return this.NAME;
     }

     getStyle():(typeof STLYE_COMP){
          return this.STYLE;
     }
     set STYLE(value){
          this._STYLE = value;
     }
     get STYLE(){
          return this._STYLE;
     }

}



