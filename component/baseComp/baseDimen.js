export default class compDimen {
     VALUE = null;
     constructor(){
          this.VALUE = {
               type:0,//0=px 1=percentage
               val_px:0,
               val_per:0,
          }
     }
     getDimen(){
          return this.VALUE;
     }
     setDimen(val){
          val?this.VALUE = val:null;
     }
}