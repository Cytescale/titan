import React from "react";
import {Accordion,Alert,Button,Dropdown,Modal,Nav,OverlayTrigger,Tooltip,Popover,Tabs,Tab,DropdownButton,ToggleButton,ButtonGroup,ToggleButtonGroup ,Row,Col } from 'react-bootstrap';
import {ChromePicker} from 'react-color'
import {Editor, EditorState,RichUtils,ContentState, convertToRaw,convertFromRaw} from 'draft-js';
import FONT_FAMILY_NAMES from '../../../../util/fontFamily';
import STLYE_COMP from "../../../../component/elementStyleComp";
import draftToHtml from 'draftjs-to-html';

export default class textEditor extends React.Component{
     
     constructor(props){
          super(props);
          if(this.props.element){
          if(this.props.element.TEXT_RAW_DATA){this._contentState = convertFromRaw(this.props.element.TEXT_RAW_DATA);
          }else{this._contentState = ContentState.createFromText('empty');}
          }else{
               this._contentState = ContentState.createFromText('empty');
          }

          this.state={
               editorState: EditorState.createWithContent(this._contentState),
          }
          
          this.handleKeyCommand = this.handleKeyCommand.bind(this);

          this.onChange = (editorState) => {
               this.setState({editorState});
               let rawData = convertToRaw(editorState.getCurrentContent())
               this.props.element.TEXT_RAW_DATA = rawData;
               this.props.updateEditor();
               //console.log(this.props.element.TEXT_RAW_DATA.blocks);
          };
          this.setEditor = (editor) => {
               this.editor = editor;
          };
          this.focusEditor = () => {
               if (this.editor) {
               this.editor.focus();
               }
          };
          this._onBoldClick = this._onBoldClick.bind(this);
          this._set_editorState = this._set_editorState.bind(this);
     }

     _set_editorState(val){
          this.setState({editorState:val});
     }
     _onUnOrdListClick(){
          this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'unordered-list-item'));
        };
     _onCodeClick(){
          this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'code-block'));
        };
     _onBoldClick() {
          this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
          } 
     _onItalicClick() {
               this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
     }  
     _onUnderlineClick() {
          this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
     }  
     _draw_font_family(element){
          let res = []
               FONT_FAMILY_NAMES.map((e,ind)=>{
                 res.push(<Dropdown.Item as="button" onClick={()=>{
                    element.STYLE.font_family = e;
                     this.props.updateEditor();
                 }}>{e}</Dropdown.Item>);
               })
          
          return res;
     }
     _render_bold_butt(){
          var currentStyle = this.state.editorState.getCurrentInlineStyle();
          let bool = currentStyle.has('BOLD')
          return(  
          <button className='typo_main_bdy_cont_butt' style={{
               color:bool===true?'#0E98FF':'var(--right_pane_head_text_color)'
          }} onClick={()=>{this._onBoldClick();}}>
          <svg className='typo_main_bdy_cont_butt_ico' height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H8c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h5.78c2.07 0 3.96-1.69 3.97-3.77.01-1.53-.85-2.84-2.15-3.44zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"/></svg>
          </button>)
     }
     _render_italic_butt(){
          var currentStyle = this.state.editorState.getCurrentInlineStyle();
          let bool = currentStyle.has('ITALIC')
          return(  
          <button className='typo_main_bdy_cont_butt' style={{
               color:bool===true?'#0E98FF':'var(--right_pane_head_text_color)'
          }} onClick={()=>{this._onItalicClick();}}>
          <svg className='typo_main_bdy_cont_butt_ico' height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M10 5.5c0 .83.67 1.5 1.5 1.5h.71l-3.42 8H7.5c-.83 0-1.5.67-1.5 1.5S6.67 18 7.5 18h5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5h-.71l3.42-8h1.29c.83 0 1.5-.67 1.5-1.5S17.33 4 16.5 4h-5c-.83 0-1.5.67-1.5 1.5z"/></svg>
          </button>)
     }
     _render_underline_butt(){
          var currentStyle = this.state.editorState.getCurrentInlineStyle();
          let bool = currentStyle.has('UNDERLINE')
          return(  
          <button className='typo_main_bdy_cont_butt' style={{
               color:bool===true?'#0E98FF':'var(--right_pane_head_text_color)'
          }} onClick={()=>{this._onUnderlineClick();}}>
             <svg className='typo_main_bdy_cont_butt_ico' height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z"/></svg>
          </button>)
     }
     _render_onorder_butt(){
          if(this.state.editorState){
          let selection = this.state.editorState.getSelection();
          let blockType = this.state.editorState
            .getCurrentContent()
            .getBlockForKey(selection.getStartKey())
            .getType();
          return(  
          <button className='typo_main_bdy_cont_butt' style={{
               color:blockType==='unordered-list-item'?'#0E98FF':'var(--right_pane_head_text_color)'
          }} onClick={()=>{this._onUnOrdListClick();}}>
             <svg className='typo_main_bdy_cont_butt_ico' height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"/></svg>
          </button>)}
     }
     _render_code_butt(){
          if(this.state.editorState){
          let selection = this.state.editorState.getSelection();
          let blockType = this.state.editorState
            .getCurrentContent()
            .getBlockForKey(selection.getStartKey())
            .getType();
          return(  
          <button className='typo_main_bdy_cont_butt' style={{
               color:blockType==='code-block'?'#0E98FF':'var(--right_pane_head_text_color)'
          }} onClick={()=>{this._onCodeClick();}}>
               <svg className='typo_main_bdy_cont_butt_ico' height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>
          </button>)}
     }
     _render_typepogra_menu(element){
          return(
               <div className='typo_main_bdy_cont'>
                    <div className='ele_pop_bdy_txt'>Font</div>
                         <div className='typo_main_bdy_cont_row'>
                                                       <OverlayTrigger
                                                       trigger="click"
                                                       placement="left"
                                                       rootClose={true}
                                                       overlay={<Popover id="popover-basic"  className='element_color_pick_popover'    backdropClassName="backdrop">
                                                       <ChromePicker
                                                            color={element.STYLE.text_color}
                                                            onChange={(col)=>{
                                                                 element.STYLE.text_color = `rgba(${col.rgb.r},${col.rgb.g},${col.rgb.b},${col.rgb.a})`;
                                                                 
                                                                  this.props.updateEditor();
                                                            }}
                                                            onChangeComplete={()=>{ this.props.updateEditor();}}
                                                       >
                                                       </ChromePicker>
                                                       </Popover>}
                                                       >
                                                       <Button variant={'light'} className='ele_pop_bdy_col_butt col_butt_small'>
                                                            <div className='ele_pop_bdy_col_butt_col' style={{backgroundColor:element.STYLE.text_color!==null?element.STYLE.text_color:'#fff'}}></div>
                                                       </Button>
                                                       </OverlayTrigger>
                                                       <div className='ele_pop_box_shad_main_txt_main_cont'>
                                                       <div className='ele_pop_box_shad_main_txt_main_cont_lab'>Size</div>
                                                       <input type='text' className='ele_pop_box_shad_main_txt' value={element.STYLE.font_size}
                                                       onChange={(e)=>{
                                                            element.STYLE.font_size = e.target.value
                                                            this.props.updateEditor();
                                                       }}
                                                       ></input>
                                                       </div>
                    </div>
                                        <div className='typo_main_bdy_cont_row'>
                                             <DropdownButton variant={'light'} className='font_choice_drop_menu_class' id="font_choice_drop_menu" title={element.STYLE.font_family}>
                                                  {this._draw_font_family(element)}
                                             </DropdownButton>
                                             <DropdownButton variant={'light'} className='font_choice_drop_menu_class' id="font_choice_drop_menu" title={'Weight'}>
                                                  {this._draw_font_family(element)}
                                             </DropdownButton>
                    </div>

                    <div className='ele_pop_bdy_txt'>Typography</div>
                    <div className='typo_main_bdy_cont_row'>
                    {this._render_bold_butt()}
                    {this._render_italic_butt()}
                    {this._render_underline_butt()}
                    {this._render_onorder_butt()}
                    {this._render_code_butt()}
                    </div>
                    <div className='typo_main_bdy_cont_row'>
                         <div className='typo_main_bdy_cont_label_butt'>
                              <div className='typo_main_bdy_cont_label_butt_txt'>Alignment</div>
                              <div className='typo_main_bdy_cont_label_butt_cont'>
                                             <ToggleButtonGroup name='txt_algn_rad_ele_pop' type="radio" defaultValue={element.STYLE.text_align} className="mb-2"
                                             onChange={(val)=>{
                                                  element.STYLE.text_align =  val;
                                                   this.props.updateEditor();
                                             }}
                                             >
                                             <ToggleButton value={'left'} className='typo_main_bdy_cont_label_butt_butt'><svg className='typo_main_bdy_cont_label_butt_butt_ico' height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z"/></svg></ToggleButton>
                                             <ToggleButton value={'center'} className='typo_main_bdy_cont_label_butt_butt'><svg className='typo_main_bdy_cont_label_butt_butt_ico' height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7 15v2h10v-2H7zm-4 6h18v-2H3v2zm0-8h18v-2H3v2zm4-6v2h10V7H7zM3 3v2h18V3H3z"/></svg></ToggleButton>
                                             <ToggleButton value={'right'} className='typo_main_bdy_cont_label_butt_butt'><svg className='typo_main_bdy_cont_label_butt_butt_ico' height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12V7H9v2zM3 3v2h18V3H3z"/></svg> </ToggleButton>
                                             </ToggleButtonGroup>
                              </div>
                         </div>
                    </div>
                         <div className='typo_main_bdy_cont_row'>
                                                       <div className='ele_pop_box_shad_main_txt_main_cont'>
                                                       <div className='ele_pop_box_shad_main_txt_main_cont_lab'>Letter spacing</div>
                                                       <input type='text' className='ele_pop_box_shad_main_txt' value={100}
                                                       onChange={(e)=>{
                                                            
                                                            this.props.updateEditor();
                                                       }}   
                                                       ></input>
                                                       </div>
                          </div>
                          <div className='typo_main_bdy_cont_row'>
                                                       <div className='ele_pop_box_shad_main_txt_main_cont'>
                                                       <div className='ele_pop_box_shad_main_txt_main_cont_lab'>Line Height</div>
                                                       <input type='text' className='ele_pop_box_shad_main_txt' value={ element.STYLE.line_height}
                                                       onChange={(e)=>{
                                                            element.STYLE.line_height =  e.target.value;
                                                            this.props.updateEditor();
                                                       }}
                                                       ></input>
                                                       </div>
                          </div>
               </div>
          )
     }

     componentDidUpdate(){
     
     }

     handleKeyCommand(command, editorState) {
          const newState = RichUtils.handleKeyCommand(editorState, command);
          if (newState) {
            this.onChange(newState);
            return 'handled';
          }
      
          return 'not-handled';
        }

     render(){
          let element = this.props.element;
          if(element){
          return(
               <div>
               <div className='ele_menu_bdy_edtor_main_cont'>
                                        
                                        <Editor
                                             handleKeyCommand={this.handleKeyCommand}
                                             ref={this.setEditor}
                                             editorState={this.state.editorState}
                                             onChange={this.onChange}
                                             textAlignment={element.STYLE.text_align}
                                        />
                                        </div>
               {this._render_typepogra_menu(element)}
               </div>
               );
          }else{
               return(<div>Empty menu</div>)
          }
     }

}