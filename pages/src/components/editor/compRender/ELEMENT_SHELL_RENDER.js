import React from "react";
export default class ELEMENT_SHELL_RENDER extends React.Component{
          /*
               elementData
               isSection
               sectionData
          */
         PROBAL_ATTACH_PARTNER = null;
          constructor(props){
               super(props);  
               this.state={
                    resizing:false,
                    moving:false,
                    resizing_direc:null,
                    mouse_x:null,
                    mouse_y:null,
                    start_posi_top:null,
                    start_posi_left:null,
                    start_width:null,
                    start_height:null,
                    start_mouse_x:null,
                    start_mouse_y:null,
                    probabl_attach:null,
               }
               this.setresizing = this.setresizing.bind(this);
               this.onMouseDown = this.onMouseDown.bind(this);
               this.onMouseUp = this.onMouseUp.bind(this);
               this.onGlobalMouseMove = this.onGlobalMouseMove.bind(this);
               this.onGlobalMouseUp = this.onGlobalMouseUp.bind(this);
               this.setInitPosi = this.setInitPosi.bind(this);
               this._render_shell = this._render_shell.bind(this);
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
          setInitPosi(x,y){
               this.setState({
                    start_mouse_x:x,
                    start_mouse_y:y,
               })
          }



          attachToParent(){ 
               let el =  this.props.elementData;
               if(this.PROBAL_ATTACH_PARTNER){                    
                         el.IDS.PARENT_ID = this.props.sectionData.getChildElements()[this.PROBAL_ATTACH_PARTNER].IDS.BASE_ID;
                         console.log( el.IDS.BASE_ID +" -> "+this.props.sectionData.getChildElements()[this.PROBAL_ATTACH_PARTNER].IDS.BASE_ID);                                    
                         this.props.websiteHelper?this.props.websiteHelper.addNode(this.props.sectionData.getChildElements()[this.PROBAL_ATTACH_PARTNER].IDS.BASE_ID,el.IDS.BASE_ID):null;
                         this.props.updateHandler();
               }                              
               this.PROBAL_ATTACH_PARTNER= null;
          }
          removeAttachLabel(){
               if(this.PROBAL_ATTACH_PARTNER){
                    this.props.sectionData.getChildElements()[this.PROBAL_ATTACH_PARTNER].BOOLS.PROBAL_ATTACH = false
               }
          }
          onClick(e){

          }

          onMouseDown(e,str){
               this.setresizing(true);
               this.setresizing_direc(str);
               this.setInitPosi(e.clientX,e.clientY);
               this.setInitStartPosi(
                    this.props.elementData.getStyleComp().position.left.getDimen().val_px,
                    this.props.elementData.getStyleComp().position.top.getDimen().val_px)    
               this.setInitSize(
                    this.props.elementData.getStyleComp().body.dimen.getDimen().x,
                    this.props.elementData.getStyleComp().body.dimen.getDimen().y)      
               
          }

          onMouseMoveDown(e){
               this.setmoving(true);
               this.setInitPosi(e.clientX,e.clientY);
               this.setInitStartPosi(
                    this.props.elementData.getStyleComp().position.left.getDimen().val_px,
                    this.props.elementData.getStyleComp().position.top.getDimen().val_px)    
          }

          onGlobalMouseMove(e){ 
               ///console.log(e);
               this.setState({mouse_x: e.clientX, mouse_y: e.clientY});
          }
          onMouseUp(e){
               this.setresizing(false);
               this.setmoving(false);
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
               this.setInitPosi(null,null);
               this.setInitSize(null,null);
               this.setresizing_direc(null);
               this.setInitStartPosi(null,null);
               this.removeAttachLabel();
               this.attachToParent();
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
                         let scData = this.props.sectionData;
                         if(this.props.isSection == false){
                              for(let i = (scData.getChildElements().length-1);i>=0;i--){
                                   // if(this.props.currentLayerId){if(i==this.props.currentLayerId){continue;}}           
                                   if(el.IDS.BASE_ID===scData.getChildElements()[i].IDS.BASE_ID){continue;}
                                                  if(  (this.state.mouse_x >= 
                                                       scData.getChildElements()[i].getStyleComp().position.left.getDimen().val_px 
                                                       &&
                                                       this.state.mouse_x <=
                                                       (scData.getChildElements()[i].getStyleComp().position.left.getDimen().val_px 
                                                       + scData.getChildElements()[i].getStyleComp().body.dimen.getDimen().x)
                                                       )
                                                       &&
                                                       (
                                                            this.state.mouse_y>= 
                                                            (scData.getChildElements()[i].getStyleComp().position.top.getDimen().val_px 
                                                            +56)
                                                            &&
                                                            this.state.mouse_y <=
                                                            (scData.getChildElements()[i].getStyleComp().position.top.getDimen().val_px 
                                                            + scData.getChildElements()[i].getStyleComp().body.dimen.getDimen().y
                                                            + 56)
                                                       ))    
                                                       {
                                                            scData.getChildElements()[i].BOOLS.PROBAL_ATTACH = true;
                                                            this.PROBAL_ATTACH_PARTNER = i;                                                            
                                                            break;
                                                       }
                                                       else{
                                                            this.PROBAL_ATTACH_PARTNER = null;
                                                            scData.getChildElements()[i].BOOLS.PROBAL_ATTACH = false;
                                                       }                                 
                                   }
                    }
          }
     }




          _move_childs(mx,my){
               if(this.props.sectionData){
                    let scData = this.props.sectionData;
                    if(this.props.isSection == false){
                         for(let i = 0;i >(scData.getChildElements().length);i++){
                              

                         }
                    }
               }
          }

          _free_movement(el){
               let movY =  this.state.mouse_y -  this.state.start_mouse_y;
               let movX =  this.state.mouse_x -  this.state.start_mouse_x;
               let initXPosi = this.state.start_posi_left?this.state.start_posi_left:0;
               let initYPosi = this.state.start_posi_top?this.state.start_posi_top:0;
               let calcLeft = initXPosi + movX;
               let calcTop = initYPosi + movY;
               el.getStyleComp().position.left.getDimen().val_px = calcLeft;
               el.getStyleComp().position.top.getDimen().val_px = calcTop;
               this._move_childs(movX,movY)
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
                    
                    this.props.onChangeSize?this.props.onChangeSize():null;
               }     
               if(this.state.moving===true){
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
                         <div  className='ele_shell_move_cont'  onMouseDown={(e)=>{this.onMouseMoveDown(e)}} />
                    )
               }     
          }
          _render_margin_line(el){
               if(this.state.moving===true){
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
               if(!this.state.resizing){
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
          _render_proble_attach(el){
               if(!this.props.isSection){
                    if(el.BOOLS.PROBAL_ATTACH == true){
                         return(
                              <div className='ele_shell_attc_indi_cont'>
                                   <div className='ele_shell_attc_indi_txt'>Attach</div>
                                        
                              </div>
                         )}
                    else{
                         return null;
                    }
               }
          }
          _calc_percent_dimen(el,par){
                    
          }
          _render_shell(){
               let el = this.props.elementData;
               this._movement();
               if(el){
                    return(
                      <div>  
                     {this._render_margin_line(el)}
                     {this._render_name_indicator(el)}
                     {this._render_size_indicator(el)}
                      <div style={{
                           overflow:'hidden',
                           position:el.getStyleComp().position.position,
                           opacity:this.state.moving==true?0.5:el.getStyleComp().body.back_color.getColor().alpha,
                           border:'1px solid #0E98FF',
                           backgroundColor:el.getStyleComp().body.back_color.getColor().colorStr,
                           top:el.getStyleComp().position.top.getDimen().val_px+'px',
                           left:el.getStyleComp().position.left.getDimen().val_px+'px',
                           right:el.getStyleComp().position.right.getDimen().val_px+'px',
                           bottom:el.getStyleComp().position.bottom.getDimen().val_px+'px',
                           height:el.getStyleComp().body.dimen.getYdimen(),
                           width:el.getStyleComp().body.dimen.getXdimen(),
                           marginLeft:el.getStyleComp().margin.margin_left.getDimen().val_px+'px',
                           marginLeft:el.getStyleComp().margin.margin_right.getDimen().val_px+'px',
                           zIndex:this.state.moving==true?99999:el.getStyleComp().body.z_index,
                           
                      }}
                      onMouseDown={this.onClick}
                      >
                         {this._render_proble_attach(el)}
                         {this._render_possible_mover(el)}
                         <div className='ele_shell_rez_lines_cont'>
                              {this._render_possible_resizers(el)}
                         </div>    
                          {this.props.children}
                      </div>   
                      </div>
                    );
               }else{return(<div>Empt</div>);}
          }

          componentDidMount(){
               document.addEventListener('mousemove',this.onGlobalMouseMove);
               document.addEventListener('mouseup', this.onGlobalMouseUp);
               console.log(this.props.sectionData);
          }

          componentWillUnmount(){
               document.removeEventListener('mousemove', this.onGlobalMouseMove);
               document.removeEventListener('mouseup', this.onGlobalMouseUp);

          }
          render(){return(<div>{this._render_shell()}</div>)}

}
