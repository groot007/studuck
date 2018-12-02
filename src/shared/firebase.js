import store from '../store'
import Firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyAqSojl2Z8EydYxlimchZI-ouqhtClNLt0",
    authDomain: "studuck-87087.firebaseapp.com",
    databaseURL: "https://studuck-87087.firebaseio.com",
    projectId: "studuck-87087",
    storageBucket: "studuck-87087.appspot.com",
    messagingSenderId: "763704481227"
};


const firebase = Firebase.initializeApp(config);

let db = firebase.firestore();
db.settings({timestampsInSnapshots: true});

export default {
	db: db,
	base: Firebase,
	firebaseMain: firebase
}
