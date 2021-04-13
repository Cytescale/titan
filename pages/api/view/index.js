var admin = require("firebase-admin");
var portDriver = require("../../../util/portDriverCode");
import('firebase/firebase-firestore');
var db = null;
db = admin.firestore();

async function get_page(VIEW_ID){
     let _PAGE_CODE = `<div>Page not found</div>`;;
     const page_data_ref = db.collection('titan_page_collec');
     const page_data = await page_data_ref.get();
     page_data.forEach(doc=>{
          if(doc.data()._VISIT_CODE==VIEW_ID){
               _PAGE_CODE = doc.data()._PAGE_CORE_CODE;
          }
     })
     return _PAGE_CODE;
}

export default async (req, res) => {
     get_page(req.query.q).then(rese=>{
          res.status(200).send(portDriver.driverCode(rese));
     });
     
}