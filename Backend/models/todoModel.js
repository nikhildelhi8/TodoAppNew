const mongoose  = require("mongoose");

//user schema 


mongoose.connect("mongodb+srv://nikhildelhi8:Nikhim%4090@cohertcluster.gg9qaxh.mongodb.net/TodoApp");

const userSchema = new mongoose.Schema({

    username  : {
        type : String , 
        required : true , 
        unique : true 
    },
    password  : {
        type : String , 
        required : true , 
        unique : true 
    },
    todos : [
        {
            type : mongoose.Schema.Types.ObjectId, 
            ref : 'Todo'
        }
    ]
});

//creating model 

const schema = new mongoose.Schema({
    title :{
        type : String , 
        required : true ,
    } ,
    description :{
        type : String , 
        required : true ,
    } ,
    isCompleted : {
        type : Boolean , 
        default : false
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    createdAt : {
        type : Date , 
        default : Date.now
    }
})



const Todo = mongoose.model('Todo' , schema);


const User = mongoose.model("User" , userSchema);

module.exports  = {User , Todo};