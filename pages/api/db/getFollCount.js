import {runMiddleware} from '../getCors';
import {getFollCount } from '../../../db_utils/db_user_helper'; 
import Cors from 'cors'
const cors = Cors({
     methods: ['GET', 'HEAD'],
     origin:'*',
   })
   

export default async (req, res) => {
     await runMiddleware(req,res,cors);
     if(req.body.uid && req.body.suid){
          const follCount= await getFollCount(req.body.uid,req.body.suid);
          if(follCount){
               res.send({
                    errBool:false,
                    errCode:0,
                    errMess:'null',
                    data:{follCount},
          });
          }
          else{
               res.send({
                    errBool:true,
                    errCode:2,
                    errMess:'extraction failure',
                    data:null,
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