import {runMiddleware} from '../getCors';
import { get_user_data,get_user_follow } from '../../../db_utils/db_user_helper'; 
import Cors from 'cors'
const cors = Cors({
     methods: ['GET', 'HEAD'],
     origin:'*',
   })
   
export default async (req, res) => {
     await runMiddleware(req,res,cors);
     if(req.body.uid && req.body.suid){
          const follBool= await get_user_follow(req.body.uid,req.body.suid);
          res.send({
                    errBool:false,
                    errCode:0,
                    errMess:'null',
                    data:{follow_bool:follBool},
          });
     }
     else{
          res.send(
               {
                    errBool:true,
                    errCode:1,
                    errMess:'Missing data',
                    data:null,
               });
     }

}