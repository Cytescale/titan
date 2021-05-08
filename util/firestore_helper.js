import axios from 'axios';
import qs from 'qs';



export default class firestoreHelper{
     constructor(UID){
          this.UID = UID;
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


}