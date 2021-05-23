var _BASE_URL = process.env.NEXT_DEV_PUBLIC_HOST
var  _URLS = null;
if(_BASE_URL!==null){
     _URLS = {
     land:_BASE_URL+'src/land',
     login:_BASE_URL+'src/login',
     signup:_BASE_URL+'src/signup',
     backend_firestore_init:_BASE_URL+"api/firebase_firestore_init", 
     imagekitauthenticationEndpoint:_BASE_URL+"api/cdn/imageKitAuth"
}
}

export default _URLS;