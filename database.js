var dbUserName = "dept";
var dbPassword = "v9f4y9PIIDDNB4Q4"
var dbName = "login"

var url = "mongodb+srv://" + dbUserName + ":" + dbPassword + "@cluster1.vwm8s.mongodb.net/" + dbName +"?retryWrites=true&w=majority"; 

module.exports = url;