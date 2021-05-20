import React from "react";
export default class ELEMENT_SHELL_RENDER extends React.Component{
          /*
               elementData
          */
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
               }
               this.setresizing = this.setresizing.bind(this);
               this.onMouseDown = this.onMouseDown.bind(this);
               this.onMouseUp = this.onMouseUp.bind(this);
               this.onGlobalMouseMove = this.onGlobalMouseMove.bind(this);
               this.onGlobalMouseUp = this.onGlobalMouseUp.bind(this);
               this.setInitPosi = this.setInitPosi.bind(this);
               this._render_shell = this._render_shell.bind(this);
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

          onClick(e){
               console.log("CLICK");
          }

          onMouseDown(e,str){
               this.setresizing(true);
               this.setresizing_direc(str);
               this.setInitPosi(e.screenX,e.screenY);
               this.setInitStartPosi(
                    this.props.elementData.getStyleComp().position.left.getDimen().val_px,
                    this.props.elementData.getStyleComp().position.top.getDimen().val_px)    
               this.setInitSize(
                    this.props.elementData.getStyleComp().body.dimen.getDimen().x,
                    this.props.elementData.getStyleComp().body.dimen.getDimen().y)      
          }

          onMouseMoveDown(e){
               this.setmoving(true);
               this.setInitPosi(e.screenX,e.screenY);
               this.setInitStartPosi(
                    this.props.elementData.getStyleComp().position.left.getDimen().val_px,
                    this.props.elementData.getStyleComp().position.top.getDimen().val_px)    
          }

          onGlobalMouseMove(e){ 
               this.setState({mouse_x: e.screenX, mouse_y: e.screenY});
          }
          onMouseUp(e){
               this.setresizing(false);
               this.setmoving(false);
               this.setInitPosi(null,null);
               this.setInitSize(null,null);
               this.setresizing_direc(null);
               this.setInitStartPosi(null,null);
          }
          onGlobalMouseUp(e){
               this.setresizing(false);
               this.setmoving(false);
               this.setInitPosi(null,null);
               this.setInitSize(null,null);
               this.setresizing_direc(null);
               this.setInitStartPosi(null,null);
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
          _free_movement(el){
               let movY =  this.state.mouse_y -  this.state.start_mouse_y;
               let movX =  this.state.mouse_x -  this.state.start_mouse_x;
               let initXPosi = this.state.start_posi_left?this.state.start_posi_left:0;
               let initYPosi = this.state.start_posi_top?this.state.start_posi_top:0;
               let calcLeft = initXPosi + movX;
               let calcTop = initYPosi + movY;
               el.getStyleComp().position.left.getDimen().val_px = calcLeft;
               el.getStyleComp().position.top.getDimen().val_px = calcTop;
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
                         ></div>);
               }
               if(el.BOOLS.RESIZE_MODES.BOTTOM==true){
                    res.push( <div 
                         className='ele_shell_rez_lines res_line_bottom' 
                         onMouseDown={(e)=>{this.onMouseDown(e,"BOTTOM")}}
                         onMouseUp={this.onMouseUp}
                         onMouseMove={this.onMouseMove}     
                         ></div>);
               }if(el.BOOLS.RESIZE_MODES.RIGHT==true){
                    res.push(  <div 
                         className='ele_shell_rez_lines res_line_right' 
                         onMouseDown={(e)=>{this.onMouseDown(e,"RIGHT")}}
                         onMouseUp={this.onMouseUp}
                         onMouseMove={this.onMouseMove}     
                         ></div>);
               }
               if(el.BOOLS.RESIZE_MODES.LEFT==true){
                    res.push(  <div 
                         className='ele_shell_rez_lines res_line_left' 
                         onMouseDown={(e)=>{this.onMouseDown(e,"LEFT")}}
                         onMouseUp={this.onMouseUp}    
                         ></div>);
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
          _render_shell(){
               let el = this.props.elementData;
               this._movement();
               if(el){
                    return(
                      <div style={{
                         overflow:'show',
                           position:'relative',
                           border:'1px solid #0E98FF',
                           top:el.getStyleComp().position.top.getDimen().val_px+'px',
                           left:el.getStyleComp().position.left.getDimen().val_px+'px',
                           right:el.getStyleComp().position.right.getDimen().val_px+'px',
                           bottom:el.getStyleComp().position.bottom.getDimen().val_px+'px',
                           height:el.getStyleComp().body.dimen.getYdimen(),
                           width:el.getStyleComp().body.dimen.getXdimen(),
                           marginLeft:el.getStyleComp().margin.margin_left.getDimen().val_px+'px',
                           marginLeft:el.getStyleComp().margin.margin_right.getDimen().val_px+'px',
                      }}
                      onMouseDown={this.onClick}
                      >
                         {this._render_possible_mover(el)}
                         <div className='ele_shell_rez_lines_cont'>
                              {this._render_possible_resizers(el)}
                         </div>    
                          {this.props.children}
                      </div>   
                    );
               }else{return(<div>Empt</div>);}
          }

          componentDidMount(){
               document.addEventListener('mousemove',this.onGlobalMouseMove);
               document.addEventListener('mouseup', this.onGlobalMouseUp);
          }

          componentWillUnmount(){
               document.removeEventListener('mousemove', this.onGlobalMouseMove);
               document.removeEventListener('mouseup', this.onGlobalMouseUp);

          }
          render(){return(<div>{this._render_shell()}</div>)}

}
