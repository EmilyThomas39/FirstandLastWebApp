const mongoose= require('mongoose');

var nameSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required: '*This field is required.'
    },
    lastName: {
        type:String,
        required: '*This field is required.'
    }
});

mongoose.model('Names',nameSchema);