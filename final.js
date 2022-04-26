const mongoose = require('mongoose');
const userData = require('./data.json');

var dbUserName = "dept";
var dbPassword = "v9f4y9PIIDDNB4Q4"
var dbName = "login"
var myman;

var url = "mongodb+srv://" + dbUserName + ":" + dbPassword + "@cluster1.vwm8s.mongodb.net/" + dbName +"?retryWrites=true&w=majority";  

mongoose.connect(url, function(err, db) {  
if (err) throw err;  


for (let i=0; i<1; i++)
{
    let User =  {firstname: userData.firstname, email: userData.email, lastame: userData.lastname , password: userData.password};

    db.collection("Users").insertOne(User, function(err, res) {  
        if (err) throw err;  
        console.log("1 record inserted in Users");

        myman = User._id;  
        
        let Profile = { user_id: myman, dob: userData.dob, Mobile_no: userData.Mobile_no}; 
    
        db.collection("UsersProfile").insertOne(Profile, function(err, res) {  
            if (err) throw err;  
            console.log("1 record inserted in UsersProfile");  
            db.close();  
        }); 
    });   

}




// db.collection("Users").findOne({}, function(err, result) {  
//     if (err) throw err;  
//     console.log(result.firstname);  
//     db.close();  
//   });  


}); 