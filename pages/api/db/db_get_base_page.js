import('firebase/firebase-firestore');
import {_get_website_data} from '../../../db_utils/db_website_helper';
import {_get_user_data} from '.../../../db_utils/db_user_helper';
const  admin = require("firebase-admin");
const db = admin.firestore();
export default async (req, res) => {
     if(req.method  == 'POST'){
          console.log("API: Get base page data init");
          let fin_res = {errCode:0,errBool:false,mess:'empty',page_id:null,page_data:null}
          if(req.body.UID===null || req.body.UID===''){
               fin_res = {errCode:3,errBool:true,mess:'API: empty uid provided',page_id:null,page_data:null}
               res.status(200).json(fin_res);
               return;
          }
          if(db!=null){
               const profile_data = await _get_user_data(req.body.UID);
               if (!profile_data) {
                    fin_res = {errCode:1,errBool:true,mess:'API: User info invalid/non-existant',page_id:null,page_data:null}
               } else {
                    if(profile_data.PID===null || !profile_data.PID){
                         fin_res = {errCode:2,errBool:true,mess:'API: No PID found',page_id:null,page_data:null}
                    }
                    else{
                         const page_data = await _get_website_data(profile_data.PID);  
                         if(page_data){
                              fin_res = {errCode:0,errBool:false,mess:'API: Page found success',page_id:profile_data.PID,page_data:page_data}    
                         }
                         else{
                              fin_res = {errCode:3,errBool:true,mess:'API: Page found fail',page_id:profile_data.PID,page_data:null}                                                                
                         }
                         
                    }
               }

          }
          res.status(200).json(fin_res);
     }
}
   