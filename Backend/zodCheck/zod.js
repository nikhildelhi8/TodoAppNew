const z = require("zod");
const mongoose = require("mongoose");

const loginSchemaCheck = z.object({
    username : z.string().email(), 
    password : z.string().min(6) 
});



const idCheck = z.string().refine((value) => mongoose.isValidObjectId(value),{
    message : "invalid objectID format",
})


const todoSchemaCheck = z.object({
    title : z.string(), 
    description : z.string()
})


module.exports = {loginSchemaCheck, todoSchemaCheck , idCheck}
