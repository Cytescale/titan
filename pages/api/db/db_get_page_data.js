var admin = require("firebase-admin");
import('firebase/firebase-firestore');
var random =require('random-key-generator');       
var serviceAccount = require("../../../util/firebase_admin_cert.json");
var otherFire = null;
var db = null;
db = admin.firestore();


var _PAGE_DATA = {
      UID:'null',
     _ELEMENT_COUNT:0,
     _DISABLED_BOOL:false,
     _PAGE_CORE_ARRAY:'null',
     _PAGE_CORE_CODE:'null',
     _VISIT_CODE:random(4),
}

async function create_new_page_entry(_GOT_PAGE_DATA){
     let id_res = null;
     await db.collection("titan_page_collec")
     .add(_GOT_PAGE_DATA)
     .then(function(docRef) {
          //console.log("Document written with ID: ", docRef.id);
          id_res = docRef.id;
          return (docRef.id);
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
          return null;
      });
      return id_res;
}

async function get_page_data(PID){
          const page_data_ref = db.collection('titan_page_collec').doc(PID);
          const page_data = await page_data_ref.get();
          if (!page_data.exists) {
               return null;
          } 
          else {
               return page_data.data();
          }
}


export default async (req, res) => {
     console.log("API GET PAGE INFO");
     let ee = null;
     let fin_res = {errCode:0,errBool:false,mess:'empty',page_id:null,page_data:null}
     if(db!=null){
          console.warn("API DB CREATE CREATE");
          const profile_data = db.collection('titan_user_info_collec').doc(req.body.UID);
          const doc = await profile_data.get();
          if (!doc.exists) {
          fin_res = {errCode:1,errBool:true,mess:'USER INFO BAD',page_id:null,page_data:null}
          } else {
               if(doc.data().PID===null || !doc.data().PID){
               _PAGE_DATA.UID = req.body.UID;
               let gen_id = await create_new_page_entry(_PAGE_DATA)
               let new_wrt = null;
               new_wrt = await db.collection('titan_user_info_collec').doc(req.body.UID).update({PID:gen_id});
               if(new_wrt!==null){
                    fin_res = {errCode:0,errBool:false,mess:'NEW PAGE BASE',page_id:gen_id,page_data:_PAGE_DATA}
               }
               else{
                    fin_res = {errCode:2,errBool:true,mess:'NEW PAGE BASE FAIL',page_id:null,page_data:null}
               }
               }
               else{
                    let page_data = await get_page_data(doc.data().PID);
                    if(page_data===null){
                         await db.collection('titan_user_info_collec').doc(req.body.UID).update({PID:null});
                         fin_res = {errCode:1,errBool:true,mess:'EXIST PAGE BASE NOT FOUND',page_id:null,page_data:null}     
                    }
                    fin_res = {errCode:0,errBool:false,mess:'EXIST PAGE BASE',page_id:doc.data().PID,page_data:page_data}
               }
          }

     }
     //console.warn("API GET PAGE INFO RES"+JSON.stringify(fin_res));
     res.status(200).json(fin_res);
   
}
   