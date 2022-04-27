//db connection
const mongoose = require("mongoose");
//require environment variable file
const dotenv = require("dotenv").config();
//database url
var url = dotenv.parsed.url;

//for average age
var averageAge = 0;

mongoose.connect(url, async function (err, db) {
  if (err) throw err;

  //count no of documents in UsersProfile Collections
  await db.collection("UsersProfile").count({}, async function (error, numOfDocs) {
    if(error) throw error;

    //find specific data
    await db.collection("UsersProfile").find({}).toArray( async function(err, data) {
      if (err) throw err;


      async function deleteAge() {
        for (let j = 0; j < numOfDocs; j++) {
            
        //Delete users who’s age is more than 25yrs
        var mydate = data[j].dob;
        var cleardate = await mydate.replace('/', '');
        var cleardate2 = await cleardate.replace('/', '');

        var d0 = cleardate2[0] + cleardate2[1];
        var m0 = cleardate2[2] + cleardate2[3]
        var y0 = cleardate2[4] + cleardate2[5] + cleardate2[6] + cleardate2[7];

        var d1 = parseInt(d0);
        var m1 = parseInt(m0);
        var y1 = parseInt(y0);

        var date = new Date();
        var d2 = date.getDate();
        var m2 = 1 + date.getMonth();
        var y2 = date.getFullYear();
        var month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        if(d1 > d2){
          d2 = d2 + month[m2 - 1];
          m2 = m2 - 1;
        }
        if(m1 > m2){
          m2 = m2 + 12;
          y2 = y2 - 1;
        }
        var d = d2 - d1;
        var m = m2 - m1;
        var y = y2 - y1;

        if(y>25) {

          //actual deletion code
          await db.collection("UsersProfile").deleteOne(data[j], function(err, mydate) {  
            if (err) throw err;  
            console.log("data deleted " + mydate);  
          });  

        } else {
          //data that is not deleted
          console.log("data safe " + mydate);
          console.log("year " + y);
        }

        //average age code
        averageAge += y;

      
      }

    }

    //calling age function
    await deleteAge();

    //average age
    console.log(averageAge/numOfDocs);


    });
    

  });



});
