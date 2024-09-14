const express = require("express");

const todoRouter = require('./routes/todoRoutes'); // Corrected import
const userRouter = require('./routes/userRoutes'); // Corrected import

const app = express();

app.use(express.json());

// Routes
app.use('/user', userRouter);
app.use('/todo', todoRouter);

app.use((err, req, res, next) => {
  console.error(err.stack); // Corrected console method
  
  let statusCode = err.statusCode || 500; 
  let message = err.message || 'Server Error';

  
  res.status(statusCode).json({
    success: false , 
    message ,
    stack : process.env.NODE_ENV === 'development' ? err.stack : undefined
  })


});

app.listen(3000, () => {
  console.log('Server is running on port 3000'); // Optional: log the port
});
