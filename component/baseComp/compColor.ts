export default class compColor {
     COLOR = null;
     constructor(){
          this.COLOR = {
               colorStr:'#fff',
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