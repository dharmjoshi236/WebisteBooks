const mongoose = require('mongoose');
const  validator  = require('validator');

const BookSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:3
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is Invalid")
            }
        }
    },
    book:{
        type:String,
        required:true,
        minLength:5
    },
    author:{
        type:String,
        required:true,
        minLength:3
    }

})

const Book =  mongoose.model('Book',BookSchema);
module.exports = Book
