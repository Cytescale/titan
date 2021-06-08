import { app } from "firebase-admin";
import Cors from 'cors'


const allowedOrigins = [
     'http://localhost',
     'http://localhost:8080',
     'http://localhost:8100',
     'http://172.20.10.6:8100'
   ];

   const cors = Cors({
     methods: ['GET', 'HEAD'],
     origin:'*',
   })
   const corsOptions = {
     origin: (origin, callback) => {
       if (allowedOrigins.includes(origin) || !origin) {
         callback(null, true);
       } else {
         callback(new Error('Origin not allowed by CORS'));
       }
     }
   }

function runMiddleware(req, res, fn) {
     return new Promise((resolve, reject) => {
       fn(req, res, (result) => {
         if (result instanceof Error) {
           return reject(result)
         }
   
         return resolve(result)
       })
     })
   }
var admin = require("firebase-admin");
var serviceAccount = require("../../util/firebase_admin_cert.json");
var init_bool =  false;
if(admin.apps.length<1)
{
     console.log("FIREBASE: Firebase backend init");
     init_bool = true;
     admin.initializeApp({
       credential: admin.credential.cert(serviceAccount),
       databaseURL: "https://titan-6969-default-rtdb.asia-southeast1.firebasedatabase.app"
      });
}

export default async (req, res) => {
     await runMiddleware(req,res,cors)
     res.status(200).json({firestore_inti:init_bool,app_count:admin.apps.length});
}