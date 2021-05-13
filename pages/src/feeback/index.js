import {Accordion,Alert,Button,Dropdown,Modal,OverlayTrigger,Tooltip,Popover,Tabs,Tab,DropdownButton,ToggleButton,ButtonGroup,ToggleButtonGroup } from 'react-bootstrap';
import React, { useState,useEffect,Suspense } from 'react';
import Cookies from 'universal-cookie';
import firestoreHelper from '../../../util/firestore_helper';



const cookies  = new Cookies();
const storeHelper = new firestoreHelper(cookies.get('accessToken'));


export default class FeedbackComp extends React.Component{
     constructor(props){
          super(props)
          this.state={
               feedData:'',
               errCode:0,
               errMessage:'',
               radioValue:0,
               emojiArray:[
               { name: '😶', value: '1' },
               { name: '😛', value: '2' },
               { name: '😨', value: '3' },
               { name: '😘', value: '4' },
               { name: '😍', value: '5' },]
          }
          this._set_emoji_value = this._set_emoji_value.bind(this);
          this._set_err_state = this._set_err_state.bind(this);
          this._set_feed_mess = this._set_feed_mess.bind(this);
          this.send_req  = this.send_req.bind(this);
     }

     _set_err_state(code,mess){
          this.setState({errCode:code,errMessage:mess})
     }

     _set_feed_mess(e){
          this.setState({feedData:e.target.value})
     }

     async send_req(){
          if(this.state.feedData.length>0){
               if(this.state.radioValue!==0){
                    this._set_err_state(0);       
                    const SEND_DATA = {
                         UID:cookies.get('accessToken'),
                         mess:this.state.feedData,
                         satisfaction:this.state.radioValue
                    }
                    let feed_res = await storeHelper._send_feedback_data(SEND_DATA);
                    console.log('\n\n\n FEED RES\n'+JSON.stringify(feed_res));
                    if(feed_res.errBool===false){
                         this._set_err_state(2,"Thank you :)");       
                    }else{
                         this._set_err_state(1,"Request failed");       
                    }
                    
               }
               else{
                    this._set_err_state(1,'Select any reaction')         
               }
          }
          else{
               this._set_err_state(1,'Write any message')    
          }
     }

     _set_emoji_value(val){
          this.setState({radioValue:val});
     }

     feedBackPop(){
          return(
                <Popover id="popover-basic" className='feed_back_pop_main_cont'>
                         <div>

                          <div className='feed_back_pop_tit_cont'>Feeback</div>
                         <textarea
                         placeholder='Please tell us any feedback/suggestions or bugs, your opinion matters to us.'
                         value={this.state.feedData}
                         onChange={this._set_feed_mess}
                         className='feed_back_pop_tit_txt_ara'
                         />
                         <div className='feed_back_pop_feed_emo_main_cont'>
                         <ButtonGroup className='feed_back_pop_feed_emo' toggle>
                              {this.state.emojiArray.map((radio, idx) => (
                                   <ToggleButton  
                                   key={idx}
                                   type="radio"
                                   variant="light"
                                   name="radio"
                                   value={this.state.radioValue}
                                   checked={this.state.radioValue === radio.value}
                                   onChange={(e) => {this._set_emoji_value(e.currentTarget.value)}}
                                   >
                                   {radio.name}
                                   </ToggleButton>
                              ))}
                              </ButtonGroup>
                         </div>
                         <div className='feed_back_err_main_cont'>{this.state.errCode===1?this.state.errMessage:<span></span>}</div>
                         <div className='feed_back_succ_main_cont'>{this.state.errCode===2?this.state.errMessage:<span></span>}</div>
                         <Button variant={'primary'} className='feed_back_sub_butt' onClick={this.send_req}>Send</Button>
                     </div>
               </Popover>
        )
     }

     render(){
          return(
               <div className='feed_back_main_cont'>
               <OverlayTrigger trigger="click" rootClose={true} target={this} placement="bottom" overlay={this.feedBackPop()}>
               <Button variant={'outline-light'}  className='feed_back_main_butt'>Feedback</Button>
               </OverlayTrigger>     
               </div>
          )
     }

}