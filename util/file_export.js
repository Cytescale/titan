
const BrowserFS = require('browserfs')


export default class fileExport {
     _website_component = null;
     constructor(){
     }

     _set_website_comp(_website_comp){
          this._website_component = _website_comp;
     }

     _down_titan_file(_website_comp,callback){
          if(_website_comp){

          }
          else{
               callback(null);
          }
     }

}