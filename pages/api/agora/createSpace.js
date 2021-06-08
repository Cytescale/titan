import {runMiddleware} from '../getCors';
import { get_user_data,get_user_follow } from '../../../db_utils/db_user_helper'; 
import Cors from 'cors'
import { createSpace } from '../../../db_utils/db_space_helper';


const cors = Cors({
     methods: ['GET', 'HEAD'],
     origin:'*',
   })
   

//token creation link
//https://github.com/AgoraIO/Tools/tree/master/DynamicKey/AgoraDynamicKey/nodejs


export default async (req, res) => {
     await runMiddleware(req,res,cors);
     if(req.body){
          let ress = await createSpace(req.body);
          if(ress.errBool===false){
               res.send({
                    errBool:false,
                    errCode:0,
                    errMess:'null',
                    data:ress.data,
               });
          }else{
               res.send({
                    errBool:true,
                    errCode:2,
                    errMess:ress.errMess,
                    data:null,
               });
          }
     }
     else{
          res.send({
               errBool:true,
               errCode:1,
               errMess:'Mising data',
               data:null,
          });
     }
}