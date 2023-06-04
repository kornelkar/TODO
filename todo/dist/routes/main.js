"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const todos = [];
router.post('/todos-list', (req, res, next) => {
    res.status(200).json({ todos });
});
router.post('/add-todo', (req, res, next) => {
    const todo = req.body.todo;
    const newTodo = {
        dateAdd: todo.dateAdd,
        title: todo.title,
        text: todo.text,
    };
    if (todo) {
        res.status(200).json({
            message: 'dodano zadanie',
            todo: newTodo,
        });
    }
    todos.push(newTodo);
});
router.put('/todo/:todoId', (req, res, next) => {
    const todos = res.locals.todos;
    const params = req.params;
    const tid = params.todoId;
    const body = req.body;
    /*
    const todoIndex = todos.findIndex((todoItem) => todoItem.id === tid);
  
    if (todoIndex >= 0) {
      todos[todoIndex] = {
        id: todos[todoIndex].id,
        title: body.title,
        text: body.text
     };
  
      return res.status(200).json({ message: 'Zaktualizowano', todos });
    }
    */
    res.status(404).json({ message: 'Nie znaleziono' });
});
router.delete('/todo/:todoId', (req, res, next) => {
    const params = req.params;
    const todos = res.locals.todos;
    // const todosFiltered = todos.filter((todoItem) => todoItem.id !== params.todoId);
    // res.status(200).json({ message: 'Deleted todo', todos: todosFiltered });
});
exports.default = router;
