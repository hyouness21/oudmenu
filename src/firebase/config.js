import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// TODO: Replace with your Firebase project config
// Go to Firebase Console → Project Settings → Your Apps → Web App
const firebaseConfig = {
  apiKey: 'AIzaSyCMM_okuEcVYT-nax2cMovs-mO8M-MYN8I',
  authDomain: 'oudd-823e7.firebaseapp.com',
  projectId: 'oudd-823e7',
  storageBucket: 'oudd-823e7.firebasestorage.app',
  messagingSenderId: '435237307819',
  appId: '1:435237307819:web:722142652a6a7e45ff3eee',
  measurementId: 'G-KTDQRB2JW9',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
})
export const storage = getStorage(app)
