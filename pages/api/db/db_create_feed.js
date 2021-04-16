var admin = require("firebase-admin");
import('firebase/firebase-firestore');
var serviceAccount = require("../../../util/firebase_admin_cert.json");
var otherFire = null;
var db = null;
// if(admin.apps.length<1)
// {
//      console.log("IN");
//      admin.initializeApp({credential: admin.credential.cert(serviceAccount)});
// }
let send_data ={
     UID:'null',
     mess:'null',
     satisfaction:0
}
db = admin.firestore();
export default async (req, res) => {
     let fin_res = {errCode:0,errBool:false}
     send_data={
     UID:req.body.UID,
     mess:req.body.mess,
     satisfaction:req.body.satisfaction
     }
     ///console.log("\n\n\n"+JSON.stringify(send_data));
     await db.collection("titan_feedback_collec")
     .add(send_data)
     .then(function(docRef) {
           fin_res = {errCode:0,errBool:false,mess:'FEED CREATE TRUE'}
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
          fin_res = {errCode:1,errBool:true,mess:'FEED CREATE FALSE'}
          return null;
      });
     res.status(200).json(fin_res);

}