export default class compDimen {
     DIMEN = null;
     constructor(){
          this.DIMEN = {
               x_type:0,// 0 = px 1 = precent 2 = viewport 
               y_type:0,
               x:0,
               y:0,
               xper:0,
               yper:0,
               xvp:0,
               yvp:0,
          }
     }
     
     getXdimen():string{
          let res = null;
          switch(this.DIMEN.x_type){
               case 0:{
                    res = this.DIMEN.x +'px';
                    break;
               }
               case 1:{
                    res = this.DIMEN.xper +'%';
                    break;
               }
               case 2:{
                    res = this.DIMEN.xvp +'vw';
                    break;
               }default:{
                    console.log("FALSE DIMENTIONS");
                    break;
               }
          }
          return res;
     }
     getYdimen():string{
          let res = null;
          switch(this.DIMEN.y_type){
               case 0:{
                    res = this.DIMEN.y +'px';
                    break;
               }
               case 1:{
                    res = this.DIMEN.yper +'%';
                    break;
               }
               case 2:{
                    res = this.DIMEN.yvp +'vh';
                    break;
               }default:{
                    console.log("FALSE DIMENTIONS");
                    break;
               }
          }
          return res;
     }

     getDimen(){
          return this.DIMEN;
     }
     setDimen(val){
          val?this.DIMEN=Object.assign({},this.DIMEN,val):null;
     }
}