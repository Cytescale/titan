import {runMiddleware} from '../getCors';
import { get_user_data,update_user_data } from '../../../db_utils/db_user_helper'; 
import Cors from 'cors'
const cors = Cors({
     methods: ['GET', 'HEAD'],
     origin:'*',
   })
   

export default async (req, res) => {
     await runMiddleware(req,res,cors);
     if(req.body.uid){
          
          const usrData = await update_user_data(req.body.uid,req.body.data);
          if(usrData){
               if(usrData.errBool === false){
                    res.send({
                         errBool:false,
                         errCode:0,
                         errMess:'null',
                         data:{mess:"profile updated"},
                    })
               }else{
                    switch(usrData.errCode){
                         case 1:{
                              res.send({
                                   errBool:true,
                                   errCode:4,
                                   errMess:'Username found',
                                   data:{mess:"null"},
                              })
                              break;
                         }
                         case 2: {
                              res.send({
                                   errBool:true,
                                   errCode:2,
                                   errMess:'Updation failure',
                                   data:{mess:"null"},
                              })
                              break;
                         }
                         default:{
                              res.send({
                                   errBool:true,
                                   errCode:-1,
                                   errMess:'Fatal error',
                                   data:{mess:"null"},
                              })
                              break;
                         }
                    }
                  
               }
          }else{
               res.send({
                    errBool:true,
                    errCode:1,
                    errMess:'Data extraction failure',
                    data:{mess:"null"},
               })
          }
          
           return;
     }    
     else{
          res.send(
               {
                    errBool:true,
                    errCode:3,
                    errMess:'missing uid',
                    data:null,
               });
     }

}