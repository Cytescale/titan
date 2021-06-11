import('firebase/firebase-firestore');
const  admin = require("firebase-admin");
const db = admin.firestore();
async function get_user_data(uid){
     if(uid){
     const profile_data = db.collection('titan_user_info_collec').doc(uid);
     const doc = await profile_data.get();
     if (!doc.exists) {
          return null;
     }else{
          return doc.data();
     }}
     else{
          return null;
     }
}    


async function getAllUserNames(){
const userRef = db.collection('titan_user_info_collec');
const snapshot = await userRef.get();
let un=[];
snapshot.forEach(doc => {
  const  d= {unm:doc.data().uname,uid:doc.data().UID}
  un.push(d);
});
return un;
}


async function setUserFollow(uid,suid){
     const FieldValue = admin.firestore.FieldValue;
     const data  = {
          creation_timestamp:FieldValue.serverTimestamp(),
          foll_from_uid:uid,
          foll_to_uid:suid,
     }
     ee = await db.collection("user_relation_collec").doc().set(data);
     if(ee!==null){
          if(ee._writeTime!==null){
               fin_res = {errCode:0,errBool:false,errMess:'null'}
               console.log("USER CREATED SUCC - LOC FIRESTORE")
          }
     }else{
          console.log("USER CREATED FAILURE - LOC FIRESTORE")
          fin_res = {errCode:1,errBool:true,errMess:'Creation failure'}
     }
     return fin_res;
}

async function getFollCount(uid,suid){
     const userRef = db.collection('user_relation_collec');
     const snapshot = await userRef.get();
     let n ,fin_res;
     let followers=0;
     let following=0;
     snapshot.forEach(doc => {
          if((doc.data().foll_to_uid === suid)){
               followers++;
          } 
          if((doc.data().foll_from_uid===suid)){
               following++;
          }
     });
     fin_res = {
          followers:followers,
          following:following
     }
     return fin_res;
}

async function delUserFollow(uid,suid){
     const userRef = db.collection('user_relation_collec');
     const snapshot = await userRef.get();
     let n ,fin_res;
     snapshot.forEach(doc => {
       if((doc.data().foll_to_uid === suid) && (doc.data().foll_from_uid===uid)){
          n = doc.id;
          return true;
          } 
     });
     const res = await db.collection('user_relation_collec').doc(n).delete();
     if(res._writeTime!==null){
          fin_res = {errCode:0,errBool:false}
          
     }else{
          fin_res = {errCode:1,errBool:true}
     }
     return fin_res;
     
}
async function get_user_follow(uid,suid){
     let res = {
          errBool:false,
          errMess:'null'
     }
     let n = false;
     
     const userRef = db.collection('user_relation_collec');
     const snapshot = await userRef.get();
     snapshot.forEach(doc => {
       if((doc.data().foll_to_uid === suid) && (doc.data().foll_from_uid===uid)){
          n=true;
          return true;
          } 
     });
     return n;
}


async function update_user_data(uid,update_data){
     const uname  = await getAllUserNames();
     let  n = true;
     uname.forEach((e,i)=>{
          if(e.unm === update_data.uname && e.uid !== uid){
               n = false;
               return;
          }
     })
     let res = {
          errBool:false,
          errMess:'null'
     }
     if(n===true){
     update_data.init_bool = true;
     let new_wrt = await db.collection('titan_user_info_collec').doc(uid).update(update_data).catch(e=>{ 
          console.log(e);
          res = {errBool:true,errMess:e}
     });
     if(new_wrt){
          res = {errBool:false,errCode:0,errMess:'null'}
      
     }
     else{
          res = {errBool:true,errCode:2,errMess:'Update Failed'}
     }}
     else{
          res = {
               errBool:true,
               errCode:1,
               errMess:'username exist'
          }
     }
     return res;
}




module.exports = {
     get_user_data,
     update_user_data,
     get_user_follow,
     setUserFollow,
     delUserFollow,
     getFollCount
     }