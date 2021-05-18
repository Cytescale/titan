export default class compColor {
     COLOR = null;
     constructor(){
          this.COLOR = {
               colorStr:'rgb(0,0,0)',
               alpha:1,
          }
     }
     getColor(){
          return this.COLOR;
     }
     setColor(val){
          val?this.COLOR = val:null;
     }
}