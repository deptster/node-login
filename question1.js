//require db lib
const mongoose = require("mongoose");

//require md5 lib
const md5 = require("md5");

//require environment variable file
const dotenv = require("dotenv").config();
//database url
var url = dotenv.parsed.url;

//require my data file
const userData = require("./data.json");

//storing each _id attribute of Users Collection inside loop
var objId;


//db start
mongoose.connect(url, async function (err, db) {
  if (err) throw err;


  //loop to retrieve all the data in data.json and md5 for password
  for (let i = 0; i < 5; i++) {
    let User = {
      firstname: userData[i].firstname,
      email: userData[i].email,
      lastame: userData[i].lastname,
      password: md5(userData[i].password),
    };


    //inserting into Users Collection
    await db.collection("Users").insertOne(User, async function (err, res) {
      if (err) throw err;
      console.log("1 record inserted in Users");

      //storing each _id attribute of Users Collection
      objId = User._id;

      //retrieving data from data.json
      let Profile = {
        user_id: objId,
        dob: userData[i].dob,
        Mobile_no: userData[i].Mobile_no,
      };

      //inserting into UsersProfile Collection
      await db.collection("UsersProfile").insertOne(Profile, async function (err, res) {
        if (err) throw err;
        console.log("1 record inserted in UsersProfile");
      });
    });
  }

});
