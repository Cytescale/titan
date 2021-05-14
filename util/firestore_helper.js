import axios from 'axios';
import qs from 'qs';
import imageKitCert from './imagekit-cert';


export default class firestoreHelper{
     constructor(UID){
          this.UID = UID;
     }


     async _get_image_kit_auth(){
          let gotFile = null;
          await axios(process.env.NEXT_PUBLIC_HOST+"api/cdn/imageKitAuth",{
               method: 'POST',
               mode: 'no-cors',
               cache: 'no-cache',
               headers: {
                 'Content-Type': 'application/x-www-form-urlencoded',
               },
               credentials: 'same-origin',
               redirect: 'follow',
               referrerPolicy: 'no-referrer', 
             })
             .then(res=>{
                 if(res){
                      gotFile =res.data;
                 }
             })
             .catch(err=>{
                  console.log(err);
               
             });
             return gotFile;
     }

     async _image_upload(file_data){
          let tok = await this._get_image_kit_auth();     
          const formData = new FormData();
          formData.append('file',file_data['data_url']);
          formData.append('publicKey',imageKitCert.publicKey);
          formData.append('signature',tok.signature);
          formData.append('expire',tok.expire);
          formData.append('token',tok.token);
          formData.append('fileName',"titan-user-img");
          formData.append('useUniqueFileName',true);
          formData.append('isPrivateFile',false);
          const res  = await axios.post("https://upload.imagekit.io/api/v1/files/upload", formData, {
               headers: {
                    'content-type': 'multipart/form-data'
                }
             });        
          return res.data;
     }

     async _get_template(got_id){
          let gotFile = null;
          await axios(process.env.NEXT_PUBLIC_HOST+"api/cdn/getTemplate",{
               method: 'POST',
               mode: 'no-cors',
               cache: 'no-cache',
               headers: {
                 'Content-Type': 'application/x-www-form-urlencoded',
               },
               credentials: 'same-origin',
               redirect: 'follow',
               referrerPolicy: 'no-referrer', 
               data: qs.stringify({temp_code:got_id})
             })
             .then(res=>{
                    if(res.data.errBool===false){
                         gotFile = res.data;
                    }
                    else{
                         gotFile = null;
                    }
             })
             .catch(err=>{
                  console.log(err);
               
             });
             return gotFile;
     }

     async _send_feedback_data(send_data){
          let update_res = null;
          await axios(process.env.NEXT_PUBLIC_HOST+"api/db/db_create_feed",{
               method: 'POST',
               mode: 'no-cors',
               cache: 'no-cache',
               headers: {
                 'Content-Type': 'application/x-www-form-urlencoded',
               },
               credentials: 'same-origin',
               redirect: 'follow',
               referrerPolicy: 'no-referrer', 
               data: qs.stringify(send_data)
             })
             .then(res=>{
               console.log(JSON.stringify(res.data));
               update_res = res.data;
                    if(res.data.errBool===false){
                         
                    }
                    else{

                    }
             })
             .catch(err=>{
                  console.log(err);
               
             });
             return update_res;
     }
      

     async _update_page_data(send_data){
          let update_res = null;
          await axios(process.env.NEXT_PUBLIC_HOST+"api/db/db_update_page_data",{
               method: 'POST',
               mode: 'no-cors',
               cache: 'no-cache',
               headers: {
                 'Content-Type': 'application/x-www-form-urlencoded',
               },
               credentials: 'same-origin',
               redirect: 'follow',
               referrerPolicy: 'no-referrer', 
               data: qs.stringify(send_data)
             })
             .then(res=>{
               console.log(JSON.stringify(res.data));
               update_res = res.data;
                    if(res.data.errBool===false){

                    }
                    else{

                    }
             })
             .catch(err=>{
                  console.log(err);
               
             });
             return update_res;
     }

     async _get_page_data(){
          let _PAGE_DATA = null;
          let send_data ={
               UID:this.UID
          }
          await axios(process.env.NEXT_PUBLIC_HOST+"api/db/db_get_page_data",{
               method: 'POST',
               mode: 'no-cors',
               cache: 'no-cache',
               headers: {
                 'Content-Type': 'application/x-www-form-urlencoded',
               },
               credentials: 'same-origin',
               redirect: 'follow',
               referrerPolicy: 'no-referrer', 
               data: qs.stringify(send_data)
             })
             .then(res=>{
                    if(res.data!==null && res.status === 200){
                              _PAGE_DATA = res.data;
                    }
             })
             .catch(err=>{
                  console.log(err);
             });
             return _PAGE_DATA;
     }

     async _get_base_page_data(){
          let _PAGE_DATA = null;
          let send_data ={
               UID:this.UID
          }
          await axios(process.env.NEXT_PUBLIC_HOST+"api/db/db_get_base_page",{
               method: 'POST',
               mode: 'no-cors',
               cache: 'no-cache',
               headers: {
                 'Content-Type': 'application/x-www-form-urlencoded',
               },
               credentials: 'same-origin',
               redirect: 'follow',
               referrerPolicy: 'no-referrer', 
               data: qs.stringify(send_data)
             })
             .then(res=>{
                    if(res.data!==null && res.status === 200){
                              _PAGE_DATA = res.data;
                    }
             })
             .catch(err=>{
                  console.log(err);
             });
             return _PAGE_DATA;
     }


}