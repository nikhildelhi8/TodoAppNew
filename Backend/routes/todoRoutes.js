const express = require("express");

const { getTodo, createTodo, updateTodo, deleteTodo } = require('../controllers/todoController');
const { userAuth } = require('../middleware/userAuth');

const router = express.Router();

router.get('/getTodo', userAuth, getTodo); // Removed parentheses
router.post('/createTodo', userAuth, createTodo); // Removed parentheses
router.put('/updateTodo/:id', userAuth, updateTodo); // Removed parentheses
router.delete('/deleteTodo/:id', userAuth, deleteTodo); // Removed parentheses

module.exports = router; // Correctly export 'router'
