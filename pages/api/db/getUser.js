import {runMiddleware} from '../getCors';
import { get_user_data } from '../../../db_utils/db_user_helper'; 
import Cors from 'cors'
const cors = Cors({
     methods: ['GET', 'HEAD'],
     origin:'*',
   })
   

export default async (req, res) => {
     await runMiddleware(req,res,cors);
     console.log("User data request");
     if(req.body.uid){
          const usrData= await get_user_data(req.body.uid);
          if(usrData){
               res.send(
                    {
                         errBool:false,
                         errCode:0,
                         errMess:'null',
                         data:usrData,
                    });
          }else{
               res.send({
                    errBool:true,
                    errCode:1,
                    errMess:'Data extraction failure',
                    data:null,
               })
          }
           return;
     }    
     else{
          res.send(
               {
                    errBool:false,
                    errCode:2,
                    errMess:'missing uid',
                    data:null,
               });
     }

}