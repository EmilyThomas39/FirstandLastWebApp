const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Name = mongoose.model('Names');

router.get('/',(req,res)=>{
    res.render("user/add",{
        viewTitle:"Enter First and Last Name"
    });
});

router.post('/',(req,res)=>{
    insertRecord(req,res);
});

function insertRecord(req,res){
    var name = new Name();
    name.firstName = req.body.firstName;
    name.lastName = req.body.lastName;
    name.save((err,doc)=>{
        if(!err){res.redirect('user/list');}
        else{
            if(err.name == 'ValidationError'){
                handleVariationError(err,req.body);
                res.render("user/add",{
                    viewTitle:"Enter First and Last Name",
                    name: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err)
        }
    });
}

router.get('/list',(req,res)=>{
    Name.find((err, docs)=>{
        if(!err){
            res.render("user/list", {
                list: docs
            });
        }
        else{
            console.log('Error in retrieving employee list :' + err)
        }
    });
});

function handleVariationError(err,body){
    for(field in err.errors)
    {
        switch(err.errors[field].path){
            case 'firstName':
                body['firstnameError']=err.errors[field].message;
                break;
            case 'lastName':
                body['lastnameError']=err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

module.exports = router;