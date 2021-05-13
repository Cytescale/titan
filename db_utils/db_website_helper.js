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

export {_get_website_data};