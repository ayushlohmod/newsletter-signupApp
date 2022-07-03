const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");
const { url } = require("inspector");


const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));

app.get("/", function(req , res){

    res.sendFile(__dirname + "/signup.html");
})

app.post("/" , function(req , res){

    const firstname = req.body.fname;
    const lastname = req.body.sname;
    const email = req.body.emailname;

    //console.log(firstname , lastname , email);
    const data ={
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstname,
                    LNAME: lastname

                } 
            }
        ]
    };

    var jsondata = JSON.stringify(data);

    const url ="https://us12.api.mailchimp.com/3.0/lists/fc1a32e323";

    const options = {
        method: "POST",
        auth: "ayush1:8f4a57e708ee445e43077fe6ed9e4b75-us12"
    }

    const request = https.request(url, options, function(response){

        if(response.statusCode == 200){
            res.sendFile(__dirname + "/success.html")

        }else{
            res.sendFile(__dirname + "/failure.html")
        }
        
        response.on("data", function(data){
            console.log(JSON.parse(data));
        }) 
    } )
    request.write(jsondata);
    request.end();

})

app.post("/failure", function(req, res){
    res.redirect("/")
})




app.listen(process.env.PORT || 3000 , function(){
    console.log("Server is running on port 3000");
})

//api key
// 8f4a57e708ee445e43077fe6ed9e4b75-us12

//list id
// fc1a32e323