import('firebase/firebase-firestore');
const  admin = require("firebase-admin");
const db = admin.firestore();
async function _get_user_data(uid){
     const profile_data = db.collection('titan_user_info_collec').doc(uid);
     const doc = await profile_data.get();
     if (!doc.exists) {
          return null;
     }else{
          return doc.data();
     }
}    

export {_get_user_data}
