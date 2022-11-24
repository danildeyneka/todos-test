import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: 'AIzaSyD0DRAgIxVweaTMvah3RE4q0Z21ngq5IOY',
    authDomain: 'todos-back.firebaseapp.com',
    databaseURL: 'https://todos-back-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'todos-back',
    storageBucket: 'todos-back.appspot.com',
    messagingSenderId: '20986665013',
    appId: '1:20986665013:web:3dc4aef7b6de55b559797c'
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)