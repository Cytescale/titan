import('firebase/firebase-firestore');
const  admin = require("firebase-admin");
const db = admin.firestore();

async function _get_website_data(pid){
          const page_data_ref = db.collection('titan_page_collec').doc(pid);
          const page_data = await page_data_ref.get();
          if (!page_data.exists) {
               return null;
          } 
          else {
               return page_data.data();
          }
}

async function _update_website_data(PID,update_data){
     let res = {
          errBool:false,
          errMess:'null'
     }
     let new_wrt = await db.collection('titan_page_collec').doc(PID).update(update_data).catch(e=>{ 
          console.log(e);
          res = {errBool:true,errMess:e}
     });
     if(new_wrt){
          res = {errBool:false,errMess:'null'}
      
     }
     else{
          res = {errBool:true,errMess:'Update Failed'}
     }
     return res;
}

export {_get_website_data,_update_website_data};