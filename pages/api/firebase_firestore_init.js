import { app } from "firebase-admin";

var admin = require("firebase-admin");
var serviceAccount = require("../../util/firebase_admin_cert.json");
var init_bool =  false;
if(admin.apps.length<1)
{
     console.log("FIREBASE: Firebase backend init");
     init_bool = true;
     admin.initializeApp({credential: admin.credential.cert(serviceAccount)});
}
export default async (req, res) => {
     res.status(200).json({firestore_inti:init_bool,app_count:admin.apps.length});
}