// DO NOT CHANGE THE SPACING OF THIS FILE. EXTREMELY SENSITIVE!!
// RUN firebase deploy --only functions IN TERMINAL

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();

// Deletes a document with ID -> uid in the `test` collection.
const deleteProfile = (userRecord, context) => {
  const {uid} = userRecord;
  return db
      .collection("test")
      .doc(uid)
      .delete()
      .catch(console.error);
};

// Creates a document with ID -> uid in the `test` collection.
const createProfile = (userRecord, context) => {
  const {email, phoneNumber, uid, photoURL} = userRecord;

  return db
      .collection("test")
      .doc(uid)
      .set({email,
        phoneNumber,
        photoURL,
        id: uid,
        fname: "",
        lname: "",
        title: "Buddy",
        languages: [],
        description: "Hey there! I'm a new buddy. Be friendly and say hello!",
        hourlyRate: "",
        trialRate: "",
        createdAt: new Date()})
      .catch(console.error);
};

module.exports = {
  authOnCreate: functions.auth.user().onCreate(createProfile),
  authOnDelete: functions.auth.user().onDelete(deleteProfile),
};
