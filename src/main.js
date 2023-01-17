import 'bootstrap/dist/css/bootstrap.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import 'bootstrap/dist/js/bootstrap.js';

import './assets/main.css'

import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyC9uSlTLMtDZKkeqQeyi5pzcxa2z-G4Z48",
  authDomain: "provianten-57efb.firebaseapp.com",
  projectId: "provianten-57efb",
  storageBucket: "provianten-57efb.appspot.com",
  messagingSenderId: "329852982920",
  appId: "1:329852982920:web:2216019579935b267f713d"
};

initializeApp(firebaseConfig);
const auth = getAuth();

const app = createApp(App);

app.use(router);

app.mount('#app');
