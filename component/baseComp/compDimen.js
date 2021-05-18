export default class compDimen {
     DIMEN = null;
     constructor(){
          this.DIMEN = {
               xpx:0,
               ypy:0,
               xpr:0,
               ypr:0,
          }
     }
     getDimen(){
          return this.DIMEN;
     }
     setDimen(val){
          val?this.DIMEN = val:null;
     }
}