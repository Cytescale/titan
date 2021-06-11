import React from "react";
import ELEMENT_SHELL_RENDER from "./ELEMENT_SHELL_RENDER";
import ELEMENT_TEXT from "../../../../../component/baseElement/ELEMENT_TEXT";
import ELEMENT_CONTAINER from "../../../../../component/baseElement/ELEMENT_CONTAINER";
export default class ELEMENT_SECTION_RENDER extends React.Component{
          /*
               websiteHelper
               updateHandler
               sectionData
          */
          probal_attach_base_id = null;

          constructor(props){
               super(props);
               this.state={
                    moving_base_id:null,
                    moving_bool:false,
                    start_mouse_x:0,
                    start_mouse_y:0,
                    old_layer_cont:0,

               }
               this._render_section_childs = this._render_section_childs.bind(this);
               this._set_moving_bool = this._set_moving_bool.bind(this);     
               this._setInitMousePosi = this._setInitMousePosi.bind(this);    
               this._setMovingBaseId = this._setMovingBaseId.bind(this);
               this._setold_layer_cont = this._setold_layer_cont.bind(this);
               this._doprobal_attach_base_id = this._doprobal_attach_base_id.bind(this);
          }
          _setold_layer_cont(val){
               this.setState({old_layer_cont:val});
          }
          _doprobal_attach_base_id(val){
               this.probal_attach_base_id = val
          }
          _set_moving_bool(bool){
               this.setState({moving_bool:bool});
          }
          _setMovingBaseId(val){
               this.setState({moving_base_id:val})
          }
          _setInitMousePosi(x,y){
               this.setState({
                    start_mouse_x:x,
                    start_mouse_y:y,
               })
          }
          _render_section_childs(el){
               if(el){
                    let childs = el.getChildElements().map((elm,ind)=>{
                         if(elm.BOOLS.PARENTABLE == true){
                              return(
                                   <ELEMENT_SHELL_RENDER {...this.props}  
                                   isSection={false}
                                    setMovingBool={this._set_moving_bool}
                                    isMoving={this.state.moving_base_id?elm.IDS.BASE_ID===this.state.moving_base_id?this.state.moving_bool:null:null} 
                                    setLayerCount={this._setold_layer_cont}
                                    getOldLayerCount={this.state.old_layer_cont}
                                    setMovingBaseId={this._setMovingBaseId}
                                    setMousePosi={this._setInitMousePosi}
                                    mouseStartX={this.state.start_mouse_x}
                                    mouseStartY={this.state.start_mouse_y}
                                    setAttachBaseId={this._doprobal_attach_base_id}
                                    getAttachBaseId={this.probal_attach_base_id}
                                    sectionData={this.props.sectionData}
                                    currentLayerId={elm.IDS.BASE_ID}  
                                    elementData={elm}>
                                        <div className='ele_container_main_cont' style={{
                                             position:'absolute',
                                             pointerEvents:'none',
                                        }}>Container {elm.IDS.BASE_ID}     </div>
                                        {this._render_section_childs(elm)}
                                   </ELEMENT_SHELL_RENDER>
                              )     
                         }
                         else{
                              return <div>NON Container ELEMENT</div>
                         }
                    });
                    return childs;
               }
               else{
                    return <div>Empt</div>
               }
          }

          _render_section(){
               let el = this.props.sectionData;
               //console.log(el);
               if(el){
                    return(                    
                         <ELEMENT_SHELL_RENDER {...this.props}  
                         isSection={true}  
                         setMovingBool={this._set_moving_bool}
                         isMoving={null} 
                         setMovingBaseId={this._setMovingBaseId}
                          sectionData={el}
                          setMousePosi={this._setInitMousePosi}
                          mouseStartX={this.state.start_mouse_x}
                          setLayerCount={this._setold_layer_cont}
                          getOldLayerCount={this.state.old_layer_cont}
                          mouseStartY={this.state.start_mouse_y}
                          setAttachBaseId={this._doprobal_attach_base_id}
                          getAttachBaseId={this.probal_attach_base_id}
                          startPosiLeft={null}
                          startPosiTop={null} 
                          currentLayerId={el.IDS.BASE_ID}  
                          elementData={el}>
                              {this._render_section_childs(el)}
                         </ELEMENT_SHELL_RENDER>
                    );
               }else{return(<div>Empt</div>);}
          }

          render(){return(<div>{this._render_section()}</div>)}

}