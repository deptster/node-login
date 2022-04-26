const mongoose = require('mongoose');
const url = require("./database")


// const data = require('./data.json');
// console.log(data.firstname);


mongoose.connect(url, function(err, db) {  
    if (err) throw err; 

db.collection("Users").deleteMany({}, function(err, result) {  
    if (err) throw err;  
    console.log("deleted Users");  
  });  

  db.collection("UsersProfile").deleteMany({}, function(err, result) {  
    if (err) throw err;  
    console.log("deleted UsersProfile"); 
    db.close();  
  }); 
});