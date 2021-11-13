import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import * as SQLite from 'expo-sqlite';
import setGlobalVars from 'indexeddbshim/dist/indexeddbshim-noninvasive';
window.openDatabase = SQLite.openDatabase;
window.localStorage = {
    _data: {},

    getItem: function (key) {
        return this._data[key];
    },
    setItem: function (key, value) {
        this._data[key] = value;
    },
    removeItem: function (key) {
        delete this._data[key];
    },
    clear: function () {
        this._data = {};
    },
    key: function (i) {
        return Object.keys(this._data)[i];
    },
};

setGlobalVars(window, { checkOrigin: false, win: SQLite });
const firebaseConfig = {
  apiKey: "AIzaSyBYHUFRn58f2mwCDHeP1R76Rt3lusl51QY",
  authDomain: "react-native-todo-a23e9.firebaseapp.com",
  projectId: "react-native-todo-a23e9",
  storageBucket: "react-native-todo-a23e9.appspot.com",
  messagingSenderId: "309571005017",
  appId: "1:309571005017:web:80b5ff4f79fe0122bb5f48"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    firebase.firestore().enablePersistence()
}

export { firebase };