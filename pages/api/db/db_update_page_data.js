var admin = require("firebase-admin");
import('firebase/firebase-firestore');
import {_update_website_data} from '../../../db_utils/db_website_helper';
import {_get_user_data} from '../../../db_utils/db_user_helper';
var serviceAccount = require("../../../util/firebase_admin_cert.json");
var otherFire = null;
var db = null;
db = admin.firestore();

export default async (req, res) => {
     let set_page_data = req.body;
     let fin_res = {errCode:0,errBool:false,mess:'empty'}
     const usrData = await  _get_user_data(set_page_data.UID);
     if(usrData.PID){
          const res = await _update_website_data(usrData.PID,{
                    _ELEMENT_COUNT:set_page_data._ELEMENT_COUNT,
                    _PAGE_CORE_ARRAY:set_page_data._PAGE_CORE_ARRAY,
                    _PAGE_CORE_CODE:set_page_data._PAGE_CORE_CODE,
               });
          if(res.errBool == false){
               fin_res = {errCode:0,errBool:false,mess:'null'}
          }
          else{
               fin_res = {errCode:2,errBool:true,mess:res.errMess}     
          }
     }
     else{
          fin_res = {errCode:1,errBool:true,mess:'Page id not found'}
     }
     res.status(200).json(fin_res);

}