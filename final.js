const mongoose = require("mongoose");
const userData = require("./data.json");
const url = require("./database");
const md5 = require("md5");
var objId;

mongoose.connect(url, function (err, db) {
  if (err) throw err;

  for (let i = 0; i < 5; i++) {
    let User = {
      firstname: userData.firstname,
      email: userData.email,
      lastame: userData.lastname,
      password: md5(userData.password),
    };

    db.collection("Users").insertOne(User, function (err, res) {
      if (err) throw err;
      console.log("1 record inserted in Users");

      objId = User._id;

      let Profile = {
        user_id: objId,
        dob: userData.dob,
        Mobile_no: userData.Mobile_no,
      };

      db.collection("UsersProfile").insertOne(Profile, function (err, res) {
        if (err) throw err;
        console.log("1 record inserted in UsersProfile");
      });
    });
  }
});
