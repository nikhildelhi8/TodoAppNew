const { Todo } = require('../models/todoModel'); // Correct import statement
const {todoSchemaCheck , idCheck} = require('../zodCheck/zod'); // Correct import statement
const jwt = require("jsonwebtoken");



const todoCheck = (payload) => {

    const isTodoCheck = todoSchemaCheck.safeParse(payload);

    //console.log("isTodoCheck" , isTodoCheck.success);

    if(!isTodoCheck.success){
        return {valid : false , error : isTodoCheck.error.issues.map(issue => issue.message)};
    }
    return {valid : true}
}

const getTodo = async(req , res)=> {

   try {

     const todoList = await Todo.find();

     if(!todoList){
        return res.status(400).send("no todo is available")
     }
     return res.status(200).json({todos : todoList})
   }
   catch(error){
    next(new ErrorResponse(`Error deleting todo : ${error.message}` , 500));
   }

}


const createTodo = async(req , res)=> {

    const payload = req.body; 

    //check whether inputs are in correct format
    const isTodo = todoCheck(payload)
  //  console.log("isTodo valid " , isTodo.valid);

    if(!isTodo.valid){
        return res.status(401).json({error : isTodo.errors})
    }

    try{

        const todo = await Todo.create({
            title : payload.title , 
            description : payload.description
        })

        //console.log(todo);

        return res.status(200).json({
            msg : "todo is created ", 
            title : todo.title
        })
    }
    catch(error){
        next(new ErrorResponse(`Error deleting todo : ${error.message}` , 500));
    }

}


const updateTodo = async(req , res)=> {

    const payload = req.body;
    const id = req.params.id;

    const isTodo = todoCheck(payload);
    const isTodoId = idCheck.safeParse(id);


    if(!isTodo){
        return res.status(400).json({error : isTodo.errors})
    }

    if(!isTodoId){
        return res.status(400).json({error : isTodoId.message})
    }


    try{
        const isIdPresent =  await Todo.findOne({_id : id});
        
        if(!isIdPresent){
            return res.status(400).send("id not present");
        }


        const updatedTodo = await Todo.updateOne(
            {
                _id : id 
            },
            
            { 
                $set: { 
                    title: payload.title, 
                    description: payload.description 
                } 
            },
            { new: true } // Return the updated document
        );
        return res.status(200).json({
            msg : "Todo got updated successfully " , 
            todo : updatedTodo
        })
    }
    catch(error){
        next(new ErrorResponse(`Error deleting todo : ${error.message}` , 404));
    }
    
}

const deleteTodo = async(req , res , next)=> {

    const id = req.params.id; 

    try {

        const deleteTodo = await Todo.deleteOne({_id:id});

        //console.log(deleteTodo);
        
        return res.status(200).send("Todo is deleted");

    }
    catch(error){
       next(new ErrorResponse(`Error deleting todo : ${error.message}` , 404));
        
    }
    
}



module.exports = {getTodo , createTodo , updateTodo , deleteTodo};