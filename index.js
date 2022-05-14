const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose.js');
const Contact = require('./models/contact.js')

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views')); //auto matically finds the current module path

app.use(express.urlencoded()); //middleware

app.use(express.static('assets'));

//creating middleware

// //middleware 1
// app.use(function(req,res,next){
//    // console.log("middleware 1 called");
//    req.myName = "srivathsan";
//    next();
// });

// //middleware 2
// app.use(function(req,res,next){
//    // console.log("middleware 2 called");
//    console.log("printing from middleware 2",req.myName)
//    next();
// });

// var contactList = [
//   {
//     name : 'srivathsan',
//     phone : '6379740416'
//   },
//   {
//     name : 'arun',
//     phone : '1234567890'
//   },
//   {
//     name : 'sandy',
//     phone : '0987654321'
//   }
// ]

app.get('/',function(req,res){
    // res.send('<h1>Express server is up and running</h1>');
    // console.log("printing from / route controller 2",req.myName)

    Contact.find({},function(err,contacts){
        if(err){
            console.log('error in fetching contacts from DB!')
        }
         return res.render('home',{
        title:'Contacts List',
        contact_list : contacts
    });
    });
    
               //this is commented because we are not using contactList array anymore
               //we will fetch data from DB and show it
    // return res.render('home',{
    //     title:'Contacts List',
    //     contact_list : contactList
    // });
});

app.get('/practise',function(req,res){
    // res.send('<h1>Express server is up and running</h1>');
    return res.render('practise',{title:'Let us play with ejs'});
});

app.post('/create-contact',function(req,res){
    // console.log(req.body);
    // return res.redirect('/practise');

    // contactList.push({
    //     name : req.body.name,
    //     phone : req.body.phone
    // });

    // contactList.push(req.body);
                // this is for pushing the objects in thhis local array called contactList
                //but we are not going to do that because we are going to add it to the database
    // return res.redirect('/');

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    },function(err,newContact){
        if(err){
            console.log('erroe in creating contact in DB!');
        }
        console.log('********',newContact);
        return res.redirect('back');
    });

});


//params method
// app.get('/delete-contact:phone',function(req,res){
//    console.log(req.params);
//    let phone = req.params.phone;
// });

//query params method

app.get('/delete-contact',function(req,res){  //if you use params give it like :phone
    // console.log(req.params);
        //now we are going to delete with id so phone is commented
    // let phone = req.query.phone;

    // let contactIndex = contactList.findIndex(contact => contact.pone == phone);
    // if(contactIndex != -1){
    //     contactList.splice(contactIndex,1);
    // }
    // return res.redirect('back');

    let id = req.query.id;

    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting the contact from DB!');
            return;
        }
        return res.redirect('back');
    });

 });

// app.get('/delete-contact/', function(req, res){
//         console.log(req.query.phone);
//         console.log(req.query.name);
//         return res.redirect('back');
// }


app.listen(port,function(err){
    if(err){
    	console.log('Error in running the server!');
    }
    console.log('Server is up and running on port:',port);
});
