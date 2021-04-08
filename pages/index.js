import Head from 'next/head'
import styles from '../styles/Home.module.css'
import LoginAct from './src/login';
import SignUpAct from './src/signup';
import firebaseHelper from './src/util/firebase_helper';

var firebaseHelp = new firebaseHelper();
export default function Home() {
  return (
      <LoginAct firebaseHelp={firebaseHelp}/>
  );
}
