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
db = admin.firestore();
var data = {
     UID:'default',
     dname:'default', 
     email:'default',
     cname:'default',
     deleted_bool:false,
     init_bool:false,
     pro_bool:false,
     email_noti_bool:false,
     admin_bool:false,
     login_method:0,
   };
export default async (req, res) => {
     console.warn("API DB CREATE INIT"+JSON.stringify(req.body));
     let ee = null;
     data = {
          UID:req.body.UID,
          dname:req.body.dname, 
          email:req.body.eml,
          cname:req.body.cname,
          deleted_bool:false,
          init_bool:false,
          pro_bool:false,
          email_noti_bool:false,
          admin_bool:false,
          login_method:req.body.login_method,
        };
     let fin_res = {errCode:0,errBool:false}
     if(db!=null){
          console.warn("API DB CREATE CREATE");
          ee = await db.collection("titan_user_info_collec").doc(data.UID).set(data);
     }
     if(ee!==null){
          if(ee._writeTime!==null){
               fin_res = {errCode:0,errBool:false}
               console.log("USER CREATED SUCC - LOC FIRESTORE")
          }
     }else{
          console.log("USER CREATED FAILURE - LOC FIRESTORE")
          fin_res = {errCode:1,errBool:true}
     }
     res.status(200).json(fin_res);
   
}
   