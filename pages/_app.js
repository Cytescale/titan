import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-rangeslider/lib/index.css'
import '../styles/noti.css';
import '../styles/globals.css'
import '../styles/login.css';
import '../styles/land.css';
import '../styles/page_element.css';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

import firebaseHelper from '../util/firebase_helper';
import UserClass from '../util/User';
var User = new UserClass();
const firebaseHelp = new firebaseHelper(User);

Sentry.init({
  dsn: "https://d292d344ba224f96a8ad06e72938eaba@o574764.ingest.sentry.io/5726162",
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

// firebaseHelp._init_firebase_app();
// firebaseHelp._app_init_auth_state_inti();
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}


//access token : 2lXzwPH77uwrb15GeprylE3s

export default MyApp
