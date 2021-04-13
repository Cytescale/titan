import axios from 'axios';
import qs from 'qs';



export default class firestoreHelper{
     constructor(UID){
          this.UID = UID;
     }

      

     async _update_page_data(send_data){
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
                    if(res.data.errBool===false){

                    }
                    else{

                    }
             })
             .catch(err=>{
                  console.log(err);
               
             });
             
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
                    if(res.data.errBool===false){
                         _PAGE_DATA = res.data;
                    }
                    else{
                         _PAGE_DATA = null;
                    }
             })
             .catch(err=>{
                  console.log(err);
                  _PAGE_DATA = null;
             });
             return _PAGE_DATA;
     }


}