import compDimen from "./compDimen";
import compColor from "./compColor";
import baseDimen from "./baseDimen";
export default class compStyle {
     STYLE = null;
     constructor(){
          this.STYLE = {
               position:{
                    position:'relative',
                    top:new baseDimen(),
                    bottom:new baseDimen(),
                    left:new baseDimen(),
                    right:new baseDimen(),
                    x_global:new baseDimen(),
                    y_global:new baseDimen(),
                    x_relative:new baseDimen(),
                    y_relative:new baseDimen(),
               },
               old_position:{
                    position:'relative',
                    top:new baseDimen(),
                    bottom:new baseDimen(),
                    left:new baseDimen(),
                    right:new baseDimen(),
                    x_global:new baseDimen(),
                    y_global:new baseDimen(),
               },
               stick:{
                    top:false,
                    left:false,
                    right:false,
                    bottom:false,
               },
               margin:{
                    margin:new baseDimen(),
                    margin_top:new baseDimen(),
                    margin_bottom:new baseDimen(),
                    margin_left:new baseDimen(),
                    margin_right:new baseDimen(),
               },
               padding:{
                    padding:new baseDimen(),
                    padding_right:new baseDimen(),
                    padding_left:new baseDimen(),
                    padding_top:new baseDimen(),
                    padding_bottom:new baseDimen(),
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
                    text_align:'left',
                    vertical_center:false,   
               },
               body:{
                    dimen:new compDimen(),
                    back_color:new compColor(),
                    display:'block',
                    overflow:'show',
                    z_index:30,
               },    
               slider:'10',
          }
     }
     getCompStyle(){
          return this.STYLE;
     }
     setCompStyle(val){
          val?this.STYLE=Object.assign({},this.STYLE,val):null;
     }
}