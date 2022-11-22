import {initializeApp} from 'firebase/app'

const firebaseConfig = {
    apiKey: 'AIzaSyD0DRAgIxVweaTMvah3RE4q0Z21ngq5IOY',
    authDomain: 'todos-back.firebaseapp.com',
    databaseURL: 'https://todos-back-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'todos-back',
    storageBucket: 'todos-back.appspot.com',
    messagingSenderId: '20986665013',
    appId: '1:20986665013:web:3dc4aef7b6de55b559797c'
}

export const api = initializeApp(firebaseConfig)

const db = {
    todos: [
        {
            title: '1',
            desc: 'ada',
            done: false,
            expiring: 222,
            file: null
        },
        {
            title: '2',
            desc: 'ada',
            done: false,
            expiring: 222,
            file: null
        },
        {
            title: '3',
            desc: 'ada',
            done: false,
            expiring: 222,
            file: null
        },
    ]
}