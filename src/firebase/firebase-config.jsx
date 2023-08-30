import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
const firebaseConfig = {
  apiKey: 'AIzaSyDDj3vIx_2A5a66qlCkO-botibAr4Kmxu0',
  authDomain: 'monkey-blogging-988ec.firebaseapp.com',
  projectId: 'monkey-blogging-988ec',
  storageBucket: 'monkey-blogging-988ec.appspot.com',
  messagingSenderId: '508158103802',
  appId: '1:508158103802:web:b7ae2276847880338df943'
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)

export const auth = getAuth(app)
