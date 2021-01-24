

var firebaseConfig = {
    apiKey: "AIzaSyDWfTNRkBUXnPNQeAOKWqfNeDXz-mHlPY0",
    authDomain: "todo-e3462.firebaseapp.com",
    projectId: "todo-e3462",
    stortimeBucket: "todo-e3462.appspot.com",
    messagingSenderId: "703192463462",
    appId: "1:703192463462:web:2067489e3d70d2ffd595a7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);




const listId = document.getElementById('list_name');
const items = document.getElementById('items');
const note = document.getElementById('note');
const time = document.getElementById('time');
const addBtn = document.getElementById('addBtn');
const updateBtn = document.getElementById('updateBtn');
const readBtn = document.getElementById('readBtn')
const removeBtn = document.getElementById('removeBtn')

/*
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");*/

// varibale to interact with the databse
const database = firebase.firestore()

const usersCollection = database.collection('users')

//adding data to the database

addBtn.addEventListener(`click`, e => {
    e.preventDefault();
    usersCollection.doc(listId.value).set({
        Items: items.value,
        Note: note.value,
        Time: time.value

    })
        .then(() => { console.log('sucess'); })
        .catch(error => { console.error(error) })
})

// updating date to the database -- got to work on the update so that i can just update one item

updateBtn.addEventListener(`click`, e => {
    e.preventDefault();

    // this helps to update so that one item can be updated instead of the entire values being changed
    if (items.value != "") {
        usersCollection.doc(listId.value).update({
            Items: items.value,
        }, { merge: true })
    }

    if (note.value != "") {
        usersCollection.doc(listId.value).update({
            Note: note.value,
        }, { merge: true })
    }

    if (time.value != "") {
        usersCollection.doc(listId.value).update({
            Time: time.value,


        }, { merge: true })
    }
}, { merge: true })




// Reading and displaying items in the user database

readBtn.addEventListener(`click`, e => {
    e.preventDefault();
    var docRef = database.collection("users").doc(listId.value);

    docRef.get().then(function (doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            //getting my information indivdually in the dicttionary
            let data = doc.data()


            var time = data["Time"]

            var items = data["Items"]

            var note = data["Note"]

            console.log(note)

            document.getElementById('item').innerHTML = items

            document.getElementById('deadline').innerHTML = time

            document.getElementById('deadline2').innerHTML = note







        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
})

// this function removes a user from the data base. inside of the collection
removeBtn.addEventListener(`click`, e => {
    e.preventDefault();

    var deleteItems = database.collection("users").doc(listId.value).delete().then(function () {
        console.log("Document successfully deleted!");
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });

})


