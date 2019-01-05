import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import { FIREBASE_CONFIG } from './secret'

firebase.initializeApp(FIREBASE_CONFIG)

export default firebase