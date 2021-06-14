const {RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole} = require('agora-access-token');
import('firebase/firebase-database');
const  admin = require("firebase-admin");
const  db = admin.database();
var randomstring = require("randomstring");
const appID = 'd95380ef73954640840d0b042d9e128d';
const appCertificate = '9be93592e761407daa9e7bb45c2d39d6';
const role = RtcRole.PUBLISHER;
const expirationTimeInSeconds = 2592000;
const currentTimestamp = Math.floor(Date.now() / 1000)
const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds

async function getSpaceData(){
     let res ;
     await db.ref('user_space_det').once('value').then((snapshot) => {
          if (snapshot.exists()) {
               res = snapshot;
          }else{
               res = null;
          }
     });
     return res;

}

async function createSpace(data){
     const channelName = "channel"+randomstring.generate({
          length: 10,
          charset: 'alphabetic'
        });;
        const channelUid =randomstring.generate({
          length: 10,
          charset: 'numeric'
        });;
     const FieldValue = admin.firestore.FieldValue;
     let fres;
     if(data){
          data.creation_timestamp = FieldValue.serverTimestamp();
          data.speakers= []
          data.attendee= []
          try{
               let found = false;
               let resData  = await getSpaceData();
               if(resData){
               resData.forEach((e)=>{
                    if(e.val().uid==data.uid){
                         found=true;
                         return;
                    }
               });}
               if(found === false){
                    const tokenA = RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName,0,role,privilegeExpiredTs);
                    console.log("Token With Integer Number Uid: " + tokenA);
                    data.agora_channel_name  = channelName
                    data.agora_channel_token = tokenA
                    //data.agora_channel_uid =  channelUid
                    data.agora_channel_exp_time = privilegeExpiredTs
                    const key = db.ref('user_space_det').push(data).key;
                    if(key){
                         fres= {
                              errBool:false,
                              errCode:0,
                              errMess:'null',
                              data:{creation_bool:true,key:key},
                         }
                    }
                    else{
                         fres= {
                              errBool:true,
                              errCode:0,
                              errMess:'creation error',
                              data:{creation_bool:false},
                         }
                    }
               }
               else{
                    fres= {
                         errBool:true,
                         errCode:0,
                         errMess:'Space already exist',
                         data:{creation_bool:false},
                    }
               }
          }catch(e){
               console.log(e);
               fres= {
                    errBool:true,
                    errCode:0,
                    errMess:'Error aa catch',
                    data:{creation_bool:false},
               }
          }
          
     }else{
          fres= {
               errBool:true,
               errCode:1,
               errMess:'Missing data',
               data:{creation_bool:true},
          }
          return null;
     }
     return fres;
}

module.exports = {createSpace}