const { User } = require('../models/todoModel'); // Correct import statement
const {loginSchemaCheck} = require('../zodCheck/zod'); // Correct import statement
const jwt = require("jsonwebtoken");
const jwt_password = '123456';


//function for input validation
const checkPayload = (payload) => {

  const isUserValid = loginSchemaCheck.safeParse(payload);

  //console.log(isUserValid);

  if (!isUserValid.success) {
    return { valid: false, errors: isUserValid.error.issues.map(issue => issue.message) };
  }

  return { valid: true };
}

//function for signup logic
const userSignup = async (req, res) => {



  const payload = req.body; 
  //console.log("user is validated");

  const isValidUser = checkPayload(payload);

  console.log("isValidUser" , isValidUser.valid);
  
  if (!isValidUser.valid) {
    return res.status(400).json({ errors: isValidUser.errors });
  }
  try {
    // Attempt to create a new user
    const user = await User.create({
      username: payload.username, 
      password: payload.password
    });
    //console.log(user.username)


    // Respond with success message
    return res.status(200).json({
      msg: "User is created",
      username: user.username  // Use the created user's data
    });
  } catch (error) {
    // Handle database or other errors
    return res.status(500).json({ error: error.message });
  }
};


//function for signin logic

const userSignIn = async (req, res) => {
  const payload = req.body; 
  // const isUserLogin = checkPayload(payload);

  // if (!isUserLogin.valid) {
  //   return res.status(404).json({errors : isUserLogin.errors});
  // }

  try {
    const isUser = await User.findOne({ username: payload.username }); 

    if (!isUser) {
      return res.status(400).send("User does not exist"); 
    }

    const token = jwt.sign({
      username : payload.username
    } , jwt_password);
  
    return res.status(200).json({msg : "user signed in" , token : token});

  }
  catch(error){
    return res.status(500).json({error : error.message})

  }
}

module.exports = { userSignIn, userSignup , jwt_password }; 
