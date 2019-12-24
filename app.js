
const express = require('express');

const request = require('request');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended : true})) ;

app.use(express.static('public'));

app.listen(process.env.PORT || 3000,function(){
  console.log('Server is up at port 3000');
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/signup.html');
  
});

app.post('/', function(req,res){



  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;

  var data = {
    members : [
      {email_address : email,
      status : 'subscribed',
      merge_fields : {
        FNAME : firstName,
        LNAME : lastName
      }
    }
    ]
  };

  var jsonData = JSON.stringify(data);


  var options = {
    url : 'https://us4.api.mailchimp.com/3.0/lists/167eb21627',
    method : 'POST',
    headers : {
      'Authorization' : 'Siddhant 63861030106a63fb6380bfa69248fbab-us4'
    },
    body : jsonData
    
  };

    request(options,function(error,response,body){
      if(error){
        res.sendFile(__dirname + '/failure.html');
      }else if(response.statusCode === 200){
        res.sendFile(__dirname + '/success.html');
      }
      else{
        
        res.sendFile(__dirname + '/failure.html');
      }
      
      
    });


});

app.post('/failure.html', function(req,res){
  
  res.redirect('/');
  
});

//
