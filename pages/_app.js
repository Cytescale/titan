import '../styles/globals.css'
import '../styles/login.css';
import 'react-notifications/lib/notifications.css';
import firebaseHelper from '../util/firebase_helper';
import UserClass from '../util/User';


var User = new UserClass();
const firebaseHelp = new firebaseHelper(User);
firebaseHelp._app_init_auth_state_inti();
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
