import * as firebase from 'firebase/app';
import 'firebase/auth'; // 認証機能を使用
import 'firebase/firestore'; // firebaseのデータベースを使用
import 'firebase/database';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyDDyF0NO4t8m6JWRVpJboimZT8i7_uPe-w',
  authDomain: 'videorecommender-43c5b.firebaseapp.com',
  databaseURL: 'https://videorecommender-43c5b.firebaseio.com',
  projectId: 'videorecommender-43c5b',
  storageBucket: 'videorecommender-43c5b.appspot.com',
  messagingSenderId: '373392465529',
  appId: '1:373392465529:web:d0af2e7879d32412bbbea8',
  measurementId: 'G-5TGC0C8HDG',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
