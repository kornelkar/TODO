import {Router, Request, Response, NextFunction} from 'express';
import { prisma } from '../backend/database'
import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { checkPrismaError } from '../backend/utils'
import { v4 } from 'uuid'
import { Todo } from '../models/todo';

const router = Router();
const todos: Todo[] = [];

router.post('/todos-list', (req: Request, res: Response, next: NextFunction) => {

  res.status(200).json({ todos });
});


router.post('/add-todo', async (req: Request, res: Response, next: NextFunction) => {
  const todo = req.body.todo;

  if (todo) {
    res.status(200).json({
      message: 'dodano zadanie',
      todo: todo,
    });
  }

//  todos.push(newTodo);
  var response;
  try {
    await prisma.todo.create({
      data: {
        id: v4(),
        title: todo.title,
        text: todo.text,
        dateAdd: todo.dateAdd
      },
    })
    res.status(StatusCodes.CREATED)
  } catch (err) {
    console.error(err)
    response = checkPrismaError(err, {})

    res.status(response.status)
//res.send(response.message)
  }
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
