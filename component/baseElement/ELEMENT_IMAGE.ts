import elementSkelton  from "../baseComp/elementSket";
export default class ELEMENT_TEXT extends elementSkelton{
     IMAGE_URI_DATA = null;
     IMAGE_THUMB_URL = null;
     IMAGE_BASE_URL = null;
     IMAGE_SIZE = null;
     IMAGE_IMAGE_KIT_ID = null;
     constructor(){
          super('Image',3);
          this.setPropMenu(true,true,true,true,true,true)
     }
}