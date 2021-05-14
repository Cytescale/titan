import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-rangeslider/lib/index.css'
import 'react-contexify/dist/ReactContexify.css';
import '../styles/noti.css';
import '../styles/globals.css'
import '../styles/login.css';
import '../styles/land.css';
import '../styles/page_element.css';

import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";


import firebaseHelper from '../util/firebase_helper';
const firebaseHelp = new firebaseHelper();


console.log("Hey there 👋");
if(process.env.NEXT_PUBLIC_HOSTED=='true'){
  Sentry.init({
    dsn: "https://d292d344ba224f96a8ad06e72938eaba@o574764.ingest.sentry.io/5726162",
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  });
  console.log("SENTRY: sentry.io initiated");
}else{
  console.log("SENTRY: No sentry.io initiated");
}
firebaseHelp._init_firebase_app();
//firebaseHelp._app_init_auth_state_inti();
function start({ Component, pageProps }) { 
  return <Component {...pageProps} />
}


//https://titan-  -cytescale.vercel.app/
//access token : 2lXzwPH77uwrb15GeprylE3s


// https://ik.imagekit.io/cyte/default-image.jpg

export default start
