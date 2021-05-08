const fs = require('fs')


function getFile(url){
     try {
          const data = fs.readFileSync(url, 'utf8')
          return data;
        } catch (err) {
          console.error(err);
          return null;
        }
        return null;
}


export default async (req, res) => {
     let  temp_code = req.body.temp_code;
     switch(parseInt(temp_code)){
          case 1:{
               let data  = getFile('templates/titan-template-1.json');
               if(data){res.status(200).send({errBool:false,errMess:null,data:data});}
               else{res.status(200).send({errBool:true,errMess:'File collection error',data:null});}
               break;
          }
          default:{
               res.status(200).send({errBool:true,errMess:'File id fault',data:null});
          break;
          }


          
     }
}