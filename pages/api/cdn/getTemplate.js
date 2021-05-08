const fs = require('fs')
const admin = require("firebase-admin");
import('firebase/firebase-storage');
var bucket = admin.storage().bucket('gs://titan-6969.appspot.com');
export default async (req, res) => {
     let  temp_code = req.body.temp_code;
     switch(parseInt(temp_code)){
          case 1:{
                    try{
                    let data = '';
                    const strm = bucket.file('titan-template-1.json').createReadStream();
                    strm.on('data',(d)=>{
                         data+=d;
                    }).on('end',()=>{
                         if(data){res.status(200).send({errBool:false,errMess:null,data:data});}
                         else{res.status(200).send({errBool:true,errMess:'File collection error',data:null});}         
                         return;
                    })}
                    catch(e){
                         res.status(200).send({errBool:true,errMess:'File id fault',data:null});          
                         return;
                    }
               break;
          }
          default:{
               res.status(200).send({errBool:true,errMess:'File id fault',data:null});
          break;
          }


          
     }
}