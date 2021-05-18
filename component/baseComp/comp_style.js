import compDimen from "./compDimen";
import compColor from "./compColor";
export default class compStyle {
     STYLE = null;
     constructor(){
          this.STYLE = {
               position:{
                    type:'px',
                    top:0,
                    bottom:0,
                    left:0,
                    right:0,
                    x_global:0,
                    y_global:0,
                    x_relative:0,
                    y_relative:0,
               },
               margin:{
                    type:'px',
                    margin:0,
                    margin_top:0,
                    margin_bottom:0,
                    margin_left:0,
                    margin_right:0,
               },
               padding:{
                    type:'px',
                    padding:0,
                    padding_right:0,
                    padding_left:12,
                    padding_top:20,
                    padding_bottom:20,
               },
               border:{
                    bordered:false,
                    border_radius:0,
                    border_width:2,
                    border_color:new compColor(),
               },
               boxshadow:{
                    box_shadow_enable:false,
                    box_shadow_x:0,
                    box_shadow_y:0,
                    box_shadow_blur:0,
                    box_shadow_spread:0,
                    box_shadow_color:new compColor(),
               },
               text:{
                    text_color:new compColor(),
                    line_height:10,
                    font_family:'Poppins',
                    font_size:17,
                    font_weight:500,
                    bold:false,
                    italic:false,
                    underline:false,
                    text_align:'start',
                    vertical_center:false,   
               },
               body:{
                    dimen:new compDimen(),
                    back_color:new compColor(),
               },    
               slider:'10',
          }
     }
     getCompStyle(){
          return this.STYLE();
     }
     setCompStyle(val){
          val?this.STYLE=val:null;
     }
}