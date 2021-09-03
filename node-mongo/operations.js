const assert = require("assert");

//using javascript promises
exports.insertDocument = (db, document, collection) => {
  const coll = db.collection(collection);
  return coll.insertOne(document);
};

exports.findDcouments = (db, collection) => {
  const coll = db.collection(collection);
  return coll.find({}).toArray();
};

exports.removeDocuments = (db, document, collection) => {
  const coll = db.collection(collection);
  return coll.deleteOne(document);
};

exports.updateDocument = (db, document, update, collection) => {
  const coll = db.collection(collection);
  return coll.updateOne(document);
};
