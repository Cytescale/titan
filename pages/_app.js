import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-rangeslider/lib/index.css'
import '../styles/noti.css';
import '../styles/globals.css'
import '../styles/login.css';
import '../styles/land.css';
import '../styles/page_element.css';


import firebaseHelper from '../util/firebase_helper';
import UserClass from '../util/User';
var User = new UserClass();
const firebaseHelp = new firebaseHelper(User);
firebaseHelp._init_firebase_app();
firebaseHelp._app_init_auth_state_inti();
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
