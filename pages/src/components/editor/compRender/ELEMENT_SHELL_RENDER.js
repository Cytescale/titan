import React from "react";
export default class ELEMENT_SHELL_RENDER extends React.Component{
          /*
               elementData
               isSection
               sectionData
          */
         CLICK_TIMES = 0;
         PROBAL_ATTACH_PARTNER = null;
          constructor(props){
               super(props);  
               this.state={
                    resizing:false,
                    moving:false,
                    resizing_direc:null,
                    mouse_x:null,
                    mouse_y:null,
                    start_global_x:null,
                    start_global_y:null,
                    start_posi_top:null,
                    start_posi_left:null,
                    start_width:null,
                    start_height:null,
                    start_mouse_x:null,
                    start_mouse_y:null,
                    probabl_attach:null,
                    hover_bool:false,
                    ACTIVE:false,
               }
               this.ELEMENTREF = React.createRef();
               this.setresizing = this.setresizing.bind(this);
               this.onMouseDown = this.onMouseDown.bind(this);
               this.onMouseUp = this.onMouseUp.bind(this);
               this.onMouseOver = this.onMouseOver.bind(this);
               this.onGlobalMouseMove = this.onGlobalMouseMove.bind(this);
               this.onGlobalMouseUp = this.onGlobalMouseUp.bind(this);
               this.setInitPosi = this.setInitPosi.bind(this);
               this._render_shell = this._render_shell.bind(this);
               this.setGlobalPosi = this.setGlobalPosi.bind(this);
               this.onClick = this.onClick.bind(this);
          }
          setprobabl_attach(val){
               this.setState({probabl_attach:val});
          }
          setresizing(bool){
               this.setState({resizing:bool});
          }
          
          setmoving(bool){
               this.setState({moving:bool});
          }
          setresizing_direc(str){
               this.setState({resizing_direc:str});
          }
          setInitStartPosi(x,y){
               this.setState({start_posi_left:x,start_posi_top:y})
          }
          setInitSize(x,y){
               this.setState({start_width:x,start_height:y})
          }

          setGlobalPosi(x,y){
               this.setState({start_global_x:x,start_global_y:y})
          }

          setInitPosi(x,y){
               this.setState({
                    start_mouse_x:x,
                    start_mouse_y:y,
               })
          }

          setACTIVE(val){
               this.setState({ACTIVE:val});
          }


          sethover_bool(bool){
               this.setState({hover_bool:bool})
          }

          getSelectable(el){
               if(this.props.selectedElementBaseId===el.IDS.BASE_ID
                  ||this.props.selectedElementBaseId===el.IDS.PARENT_ID
                  || el.IDS.PARENT_ID===0){
                       return true;
               }
               else{
                    return false;
               }
               return null;
          }


          attachToParent(){ 
               let el =  this.props.elementData;
               if(this.PROBAL_ATTACH_PARTNER){                    
                         console.log( el.IDS.BASE_ID +" -> "+this.PROBAL_ATTACH_PARTNER);                                    
                         this.props.websiteHelper?this.props.websiteHelper.addNode(this.PROBAL_ATTACH_PARTNER,el.IDS.BASE_ID):null;
                         this.props.setSelectedElement(el.IDS.BASE_ID);
                         this.props.updateHandler();
               }                              
               this.PROBAL_ATTACH_PARTNER= null;
          }
          removeAttachLabel(){
               if(this.PROBAL_ATTACH_PARTNER){
                    //this.props.sectionData.getChildElements()[this.PROBAL_ATTACH_PARTNER].BOOLS.PROBAL_ATTACH = false
               }
          }
          onClick(e){
               this.props.setSelectedElement(this.props.elementData.IDS.BASE_ID);
               //console.log(this.props.elementData.IDS.BASE_ID);
          }

          onMouseDown(e,str){
               
               this.setresizing(true);
               this.setresizing_direc(str);
               this.setInitPosi(e.clientX,e.clientY);
               this.setGlobalPosi(
                    this.props.elementData.getStyleComp().position.x_global.getDimen().val_px,
                    this.props.elementData.getStyleComp().position.y_global.getDimen().val_px
               )
               this.setInitStartPosi(
                    this.props.elementData.getStyleComp().position.left.getDimen().val_px,
                    this.props.elementData.getStyleComp().position.top.getDimen().val_px)    
               

               this.setInitSize(
                    this.props.elementData.getStyleComp().body.dimen.getDimen().x,
                    this.props.elementData.getStyleComp().body.dimen.getDimen().y)      

          }

          onMouseMoveDown(e){
               //this.props.setSelectedElement(this.props.elementData.IDS.BASE_ID);
               
               
               this.props.setMovingBool(true);
               this.props.setMovingBaseId(this.props.elementData.IDS.BASE_ID);
               this.props.elementData.getStyleComp().old_position.left.getDimen().val_px = this.props.elementData.getStyleComp().position.left.getDimen().val_px;
               this.props.elementData.getStyleComp().old_position.top.getDimen().val_px = this.props.elementData.getStyleComp().position.top.getDimen().val_px;
               this.props.elementData.getStyleComp().old_position.x_global.getDimen().val_px = this.props.elementData.getStyleComp().position.x_global.getDimen().val_px;
               this.props.elementData.getStyleComp().old_position.y_global.getDimen().val_px = this.props.elementData.getStyleComp().position.y_global.getDimen().val_px;
               this.props.setMousePosi(e.clientX,e.clientY);
               this.props.setLayerCount(this.props.elementData.ELEMENT_LAYER_COUNT);

               this.setmoving(true);
               this.setInitPosi(e.clientX,e.clientY);
               
               this.setGlobalPosi(
                    this.props.elementData.getStyleComp().position.x_global.getDimen().val_px,
                    this.props.elementData.getStyleComp().position.y_global.getDimen().val_px)
               this.setInitStartPosi(
                    this.props.elementData.getStyleComp().position.left.getDimen().val_px,
                    this.props.elementData.getStyleComp().position.top.getDimen().val_px);


               if( this.props.elementData.IDS.PARENT_ID!==0){
                    this.props.websiteHelper.moveToRoot(
                         this.props.elementData.IDS.BASE_ID,
                         this.props.mouseStartX,
                         this.props.mouseStartY
                         );
               }
                    
          }

          onGlobalMouseMove(e){ 
               ///console.log(e);
               this.setState({mouse_x: e.clientX, mouse_y: e.clientY});
          }
          onMouseUp(e){
               this.setresizing(false);
               this.setmoving(false);

               this.props.setMovingBool(false);
               this.props.setMovingBaseId(null);
               this.props.setMousePosi(null,null);
               this.props.setLayerCount(null);
               this.props.setAttachBaseId(null);
               
               this.setInitPosi(null,null);
               this.setInitSize(null,null);
               this.setresizing_direc(null);
               this.setInitStartPosi(null,null);
               
               this.removeAttachLabel();
               this.attachToParent();
               
          }
          onGlobalMouseUp(e){
               this.setresizing(false);
               this.setmoving(false);
               
               this.props.setMovingBool(false);
               this.props.setMovingBaseId(null);
               this.props.setMousePosi(null,null);
               this.props.setLayerCount(null);
               this.props.setAttachBaseId(null);

               this.setInitPosi(null,null);
               this.setInitSize(null,null);
               this.setresizing_direc(null);
               this.setInitStartPosi(null,null);
               
               this.removeAttachLabel();
               this.attachToParent();
          }


          onMouseOver(e){
               console.log("MOUSE OVER"+this.props.elementData.IDS.BASE_ID);
          }

          


          _setElemeGlobalCords(el){
               let elm = document.getElementById(`ELEMENT-SHELL-${this.props.elementData.IDS.BASE_ID}`)
               let domRect = elm.getBoundingClientRect();
               el.getStyleComp().position.x_global.getDimen().val_px = parseInt(domRect.x);
               el.getStyleComp().position.y_global.getDimen().val_px = parseInt(domRect.y);               
          }

          _movement_y_bottom(el){
               let movY =  this.state.mouse_y -  this.state.start_mouse_y;
               let initDimen = this.state.start_height?this.state.start_height:0;
               let calcHeight = initDimen + movY;
               el.getStyleComp().body.dimen.getDimen().y = calcHeight;
           
          }
          _movement_y_top(el){
               let movY =  this.state.start_mouse_y - this.state.mouse_y;
               let initDimen = this.state.start_height?this.state.start_height:0;
               let calcHeight = initDimen + movY;
               el.getStyleComp().body.dimen.getDimen().y = calcHeight;
               el.getStyleComp().position.top.getDimen().val_px =  (this.state.start_posi_top + this.state.start_height)-calcHeight ;
            
          }
          _movement_x_right(el){
               let movX =  this.state.mouse_x -  this.state.start_mouse_x;
               let initDimen = this.state.start_width?this.state.start_width:0;
               let calcWidth = initDimen + movX;
               el.getStyleComp().body.dimen.getDimen().x = calcWidth;
               
          }
          _movement_x_left(el){
               let movX =     this.state.start_mouse_x - this.state.mouse_x;
               let initDimen = this.state.start_width?this.state.start_width:0;
               let calcWidth = initDimen + movX;
               el.getStyleComp().body.dimen.getDimen().x = calcWidth;
               el.getStyleComp().position.left.getDimen().val_px =  (this.state.start_posi_left + this.state.start_width)-calcWidth ;
               
          }


          _get_under_mouse(el){
               if(this.props.sectionData!==null){
                         if(this.props.isSection == false){
                              let gotBaseId = this.props.websiteHelper.findMouseUnderElement(el.IDS.BASE_ID,this.state.mouse_x,this.state.mouse_y);
                              if(gotBaseId){
                                   this.PROBAL_ATTACH_PARTNER = gotBaseId;  
                                   this.props.setAttachBaseId(gotBaseId);
                              }
                              else{
                                   this.PROBAL_ATTACH_PARTNER = null;
                                   this.props.setAttachBaseId(null);
                              }
                    }
          }
     }

          _free_movement(el){
               let movY =  this.state.mouse_y -  this.props.mouseStartY;
               let movX =  this.state.mouse_x -  this.props.mouseStartX;
               let initXPosi = el.getStyleComp().old_position.x_global.getDimen().val_px?el.getStyleComp().old_position.x_global.getDimen().val_px:0;
               let initYPosi = el.getStyleComp().old_position.y_global.getDimen().val_px?(el.getStyleComp().old_position.y_global.getDimen().val_px-56):0;
               let calcLeft = initXPosi + movX -1;
               let calcTop = initYPosi + movY;
               el.getStyleComp().position.left.getDimen().val_px = calcLeft;
               el.getStyleComp().position.top.getDimen().val_px = calcTop;
               let elm = document.getElementById(`ELEMENT-SHELL-${this.props.elementData.IDS.BASE_ID}`)
               let domRect = elm.getBoundingClientRect();
               el.getStyleComp().position.x_global.getDimen().val_px = parseInt(domRect.x);
               el.getStyleComp().position.y_global.getDimen().val_px = parseInt(domRect.y);               
               this._get_under_mouse(el);
          }
          _movement(){
               let el = this.props.elementData;
               if(this.state.resizing===true){
                    switch(this.state.resizing_direc){
                         case 'BOTTOM':{

                              this._movement_y_bottom(el);
                              break;
                         }
                         case 'RIGHT':{
                              this._movement_x_right(el);
                              break;
                         }
                         case 'LEFT':{
                              this._movement_x_left(el);
                              break;
                         }
                         case 'TOP':{
                              this._movement_y_top(el);
                              break;
                         }
                         default:{
                              console.log("RESIZE FALSE DIREC");
                              break;
                         }
                    }
                    
                    this._setElemeGlobalCords(el);
                    this.props.onChangeSize?this.props.onChangeSize():null;
               }     
              
                    if(this.props.isMoving===true ){
                         this._free_movement(el);
                    }
          }
          _render_possible_resizers(el){
               let res = [];
               if(el.BOOLS.RESIZE_MODES.TOP==true){
                    res.push( <div 
                         className='ele_shell_rez_lines res_line_top' 
                         onMouseDown={(e)=>{this.onMouseDown(e,"TOP")}}
                         onMouseUp={this.onMouseUp}
                         onMouseMove={this.onMouseMove}     
                         >

                         <div className='ele_shell_rez_box res_box_top' >
                              <div className='ele_shell_rez_box_cont'></div>
                         </div>
                         </div>);
               }
               if(el.BOOLS.RESIZE_MODES.BOTTOM==true){
                    res.push( <div 
                         className='ele_shell_rez_lines res_line_bottom' 
                         onMouseDown={(e)=>{this.onMouseDown(e,"BOTTOM")}}
                         onMouseUp={this.onMouseUp}
                         onMouseMove={this.onMouseMove}     
                         >
                              <div className='ele_shell_rez_box res_box_bottom' >
                              <div className='ele_shell_rez_box_cont'></div>
                              </div>
                         </div>);
               }if(el.BOOLS.RESIZE_MODES.RIGHT==true){
                    res.push(  <div 
                         className='ele_shell_rez_lines res_line_right' 
                         onMouseDown={(e)=>{this.onMouseDown(e,"RIGHT")}}
                         onMouseUp={this.onMouseUp}
                         onMouseMove={this.onMouseMove}     
                         >
                              <div className='ele_shell_rez_box res_box_right' >
                              <div className='ele_shell_rez_box_cont'></div>
                              </div>
                         </div>);
               }
               if(el.BOOLS.RESIZE_MODES.LEFT==true){
                    res.push(  <div 
                         className='ele_shell_rez_lines res_line_left' 
                         onMouseDown={(e)=>{this.onMouseDown(e,"LEFT")}}
                         onMouseUp={this.onMouseUp}    
                         >
                              <div className='ele_shell_rez_box res_box_left' >
                              <div className='ele_shell_rez_box_cont'></div>
                              </div>
                         </div>);
               }
               return res;
          }
          _render_possible_mover(el){
               if(el.BOOLS.MOVEABLE==true){
                    return(
                         <div  className='ele_shell_move_cont' style={{
                         
                         }}  onClick={this.onClick} onMouseDown={(e)=>{
                              this.onMouseMoveDown(e);
                         }}/>
                    )
               }     
          }
          _render_margin_line(el){
               if(this.props.isMoving===false){
                    return(
                         <div className='ele_shell_margin_lines_main_cont'> 
                         {this._render_margin_line_top(el)}
                         {this._render_margin_line_left(el)}
                         </div>
                    )
               }else{
                    return null;
               }
          }
          _render_margin_line_top(el){
               let hgt = el.getStyleComp().position.top.getDimen().val_px+'px';
               let lft = (el.getStyleComp().position.left.getDimen().val_px +  (el.getStyleComp().body.dimen.getDimen().x/2))+'px';
               return(
                    <div className='ele_shell_margin_lines_top_cont' style={{height:hgt,left:lft,}}>
                         <div className='ele_shell_margin_lines_top_val_cont'>{hgt}</div>
                    </div>
               )
          }
          _render_margin_line_left(el){
               let wdt = el.getStyleComp().position.left.getDimen().val_px+'px';
               let tp = (el.getStyleComp().position.top.getDimen().val_px +  (el.getStyleComp().body.dimen.getDimen().y/2))+'px';
               return(
                    <div className='ele_shell_margin_lines_left_cont' style={{width:wdt,top:tp,}}>
                         <div className='ele_shell_margin_lines_left_val_cont'>{wdt}</div>
                    </div>
               )
          }
          _render_name_indicator(el){
               let xPosi = (el.getStyleComp().position.left.getDimen().val_px )+'px';
               let yPosi = (el.getStyleComp().position.top.getDimen().val_px - 32)+'px';
               if(!this.state.resizing && this.props.selectedElementBaseId===el.IDS.BASE_ID){
                    return(
                         <div className='ele_shell_siz_indi_main_cont' 
                              style={{
                                   zIndex:this.state.moving==true?99999:el.getStyleComp().body.z_index,
                                   top:yPosi,
                                   left:xPosi,
                              }}
                         >    
                         {el.ELEMENT_NAME}
                         </div>
                    )
               }
               else{
                    return null;
               }
          }
          _render_size_indicator(el){
               let xPosi = (el.getStyleComp().position.left.getDimen().val_px)+'px';
               let yPosi = (el.getStyleComp().position.top.getDimen().val_px - 32)+'px';
               if(this.state.resizing){
                    return(
                         <div className='ele_shell_siz_indi_main_cont' 
                              style={{
                                   top:yPosi,
                                   left:xPosi,
                              }}
                         >    
                         W: {el.getStyleComp().body.dimen.getDimen().x} <span className='ele_shell_siz_indi_main_cont-space'  />H: {el.getStyleComp().body.dimen.getDimen().y} 
                         </div>
                    )
               }
               else{
                    return null;
               }
          }
       
          _calc_percent_dimen(el,par){
                    
          }


          _get_fixed_x_val(el){
               let val = 0 ;
               let diff = this.state.start_mouse_x - this.state.start_global_x;
               val = this.state.mouse_x - diff;
               return val;
               
          }
          _get_fixed_y_val(el){
               let val = 0 ;
               let diff = this.state.start_mouse_y - this.state.start_global_y;
               val = this.state.mouse_y - diff;
               return val;
          }

          _render_shell(){
               let el = this.props.elementData;
               this.props.getAttachBaseId?console.log(this.props.getAttachBaseId ):null;
               this._movement();
               if(el){
                    return(
                      <div>  
                     {this._render_margin_line(el)}
                     {this._render_name_indicator(el)}
                     {this._render_size_indicator(el)}
                      <div
                
                      id={`ELEMENT-SHELL-${el.IDS.BASE_ID}`}
                      className={`
                      ELEMENT_SHELL_CLASS 
                      ${this.props.selectedElementBaseId===el.IDS.BASE_ID?'SHELL_SELECTED':'SHELL_NOT_SELECTED'}
                      `}
                      style={{
                           border: this.props.getAttachBaseId === el.IDS.BASE_ID?'1px solid red':null,
                           position:el.getStyleComp().position.position,
                           opacity:this.state.moving==true?0.8:el.getStyleComp().body.back_color.getColor().alpha,
                           backgroundColor:el.getStyleComp().body.back_color.getColor().colorStr,
                           left:el.getStyleComp().position.left.getDimen().val_px+'px',
                           top:el.getStyleComp().position.top.getDimen().val_px+'px',
                           right:el.getStyleComp().position.right.getDimen().val_px+'px',
                           bottom:el.getStyleComp().position.bottom.getDimen().val_px+'px',
                           height:el.getStyleComp().body.dimen.getYdimen(),
                           width:el.getStyleComp().body.dimen.getXdimen(),
                           marginLeft:el.getStyleComp().margin.margin_left.getDimen().val_px+'px',
                           marginLeft:el.getStyleComp().margin.margin_right.getDimen().val_px+'px',
                           zIndex:this.state.moving==true?99999:el.getStyleComp().body.z_index,
                           pointerEvents:true?'all':'none',
                           overflow:'hidden'
                      }}
                         
                      >
                         {true?this._render_possible_mover(el):null}
                         {
                          this.props.selectedElementBaseId===el.IDS.BASE_ID||el.IDS.BASE_ID === 0?
                         <div className='ele_shell_rez_lines_cont'>{this._render_possible_resizers(el)}</div>
                         :null}
                         {this.props.children}
                      </div>   
                      </div>
                    );
               }else{return(<div>Empt</div>);}
          }

          componentDidMount(){
               document.addEventListener('mousemove',this.onGlobalMouseMove);
               document.addEventListener('mouseup', this.onGlobalMouseUp);
               let elm = document.getElementById(`ELEMENT-SHELL-${this.props.elementData.IDS.BASE_ID}`)
               let domRect = elm.getBoundingClientRect();
               this.props.elementData.getStyleComp().position.x_global.getDimen().val_px = parseInt(domRect.x);
               this.props.elementData.getStyleComp().position.y_global.getDimen().val_px = parseInt(domRect.y);
               
          }

          componentDidUpdate(){
               document.addEventListener('mousemove',this.onGlobalMouseMove);
               document.addEventListener('mouseup', this.onGlobalMouseUp);
               let elm = document.getElementById(`ELEMENT-SHELL-${this.props.elementData.IDS.BASE_ID}`)
               let domRect = elm.getBoundingClientRect();
               this.props.elementData.getStyleComp().position.x_global.getDimen().val_px = parseInt(domRect.x);
               this.props.elementData.getStyleComp().position.y_global.getDimen().val_px = parseInt(domRect.y);
          }
          

          componentWillUnmount(){
               document.removeEventListener('mousemove', this.onGlobalMouseMove);
               document.removeEventListener('mouseup', this.onGlobalMouseUp);

          }
          render(){return(<div>{this._render_shell()}</div>)}

}
