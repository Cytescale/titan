var admin = require("firebase-admin");
import('firebase/firebase-firestore');
var serviceAccount = require("../../../util/firebase_admin_cert.json");
var otherFire = null;
var db = null;
db = admin.firestore();

export default async (req, res) => {
     //console.log("API UPDATE PAGE INFO"+JSON.stringify(req.body));
     let set_page_data = req.body;
     let fin_res = {errCode:0,errBool:false,mess:'empty'}
     let new_wrt  = null
     
     //console.log("\n\n"+set_page_data._CRUDE_PAGE_CODE_ARRAY);
     
     new_wrt = await db.collection('titan_page_collec').doc(set_page_data.PID).update({
          _ELEMENT_COUNT:set_page_data._ELEMENT_COUNT,
          _PAGE_CORE_ARRAY:set_page_data._PAGE_CORE_ARRAY,
          _PAGE_CORE_CODE:set_page_data._PAGE_CORE_CODE,
     
     }).catch(e=>{
          console.log(e);
          fin_res = {errCode:2,errBool:trye,mess:err}
     });
     if(new_wrt!==null){
          fin_res = {errCode:0,errBool:false,mess:' UDPATE PAGE DATA SUCESS'}
     }else{
          fin_res = {errCode:1,errBool:true,mess:'UDPATE PAGE DATA FAIL'}
     }
     console.log("API UPDATE PAGE INFO res"+JSON.stringify(fin_res));
     res.status(200).json(fin_res);

}