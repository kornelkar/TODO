"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = require("../backend/database");
const http_status_codes_1 = require("http-status-codes");
const utils_1 = require("../backend/utils");
const uuid_1 = require("uuid");
const router = (0, express_1.Router)();
const todos = [];
router.post('/todos-list', (req, res, next) => {
    res.status(200).json({ todos });
});
router.post('/add-todo', (req, res, next) => {
    const todo = req.body.todo;
    const newTodo = {
        //id: v4(),
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
    //  todos.push(newTodo);
    var response;
    var todo2;
    try {
        todo2 = database_1.prisma.todo.create({
            //newTodo
            data: {
                id: (0, uuid_1.v4)(),
                title: 'title',
                text: 'text',
                dateAdd: 'dateAdd'
            },
        });
        res.status(http_status_codes_1.StatusCodes.CREATED);
    }
    catch (err) {
        console.error(err);
        response = (0, utils_1.checkPrismaError)(err, {});
        res.status(response.status);
        //res.send(response.message)
    }
    console.log(todo2);
    console.log(response);
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
