import {runMiddleware} from '../getCors';
import { setUserFollow,delUserFollow} from '../../../db_utils/db_user_helper'; 
import Cors from 'cors'
const cors = Cors({
     methods: ['GET', 'HEAD'],
     origin:'*',
   })
   
export default async (req, res) => {
     await runMiddleware(req,res,cors);
     if(req.body.uid && req.body.suid){
          const follBool= await delUserFollow(req.body.uid,req.body.suid);
          if(follBool.errBool===false){
               res.send({
                    errBool:false,
                    errCode:0,
                    errMess:'null',
                    data:{follow_bool:false},
          });
          }
          else{
               res.send({
                    errBool:true,
                    errCode:1,
                    errMess:follBool.errMess,
                    data:'null',
          });
          }
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