import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import firebaseConfig from "./firebaseConfig.js";
import { FirebaseAppProvider } from 'reactfire';

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

ReactDOM.render(
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <App />
    </FirebaseAppProvider>,
  document.getElementById('root')
);