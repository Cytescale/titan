export default class User{
     constructor(){
       this._init_user_const();
     }
     _init_user_const(){
          console.log("Null user init");
          this.LOGGED_USER = null;
     }
     _set_curr_user(gotUser){
          gotUser!=null?this.LOGGED_USER = gotUser:console.log("Trying to set user as null");
     }
     
     
}