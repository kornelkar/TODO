import {Router, Request, Response, NextFunction} from 'express';

import { Todo } from '../models/todo';

const router = Router();
const todos: Todo[] = [];

router.post('/todos-list', (req: Request, res: Response, next: NextFunction) => {

  res.status(200).json({ todos });
});


router.post('/add-todo', (req: Request, res: Response, next: NextFunction) => {
  const todo = req.body.todo;
  const newTodo: Todo = {
    dateAdd: todo.dateAdd,
    title: todo.title,
    text: todo.text,
  };
  
  if(todo){
    res.status(200).json({ 
      message: 'dodano zadanie', 
      todo: newTodo, 
    });
  }
  
  todos.push(newTodo);
});


router.put('/todo/:todoId', (req: Request, res: Response, next: NextFunction) => {
  const todos = res.locals.todos as Todo[];
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

router.delete('/todo/:todoId', (req: Request, res: Response, next: NextFunction) => {
  const params = req.params;
  const todos = res.locals.todos as Todo[];
 // const todosFiltered = todos.filter((todoItem) => todoItem.id !== params.todoId);

 // res.status(200).json({ message: 'Deleted todo', todos: todosFiltered });
});


export default router;