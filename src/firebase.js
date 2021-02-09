import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// firebase init - add your own config here
const firebaseConfig = {
    apiKey: "AIzaSyDPra2qi_wzkj8Ft9TYlI2j6EXMVuf7XQg",
    authDomain: "data-mockup.firebaseapp.com",
    projectId: "data-mockup",
    storageBucket: "data-mockup.appspot.com",
    messagingSenderId: "428230912260",
    appId: "1:428230912260:web:68bd2880027e450e384851",
    measurementId: "G-7HCTSP8H7F"
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')

// export utils/refs
export {
  db,
  auth,
  usersCollection,
}