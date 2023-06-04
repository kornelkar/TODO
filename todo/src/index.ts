import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {Router, Request, Response, NextFunction} from 'express'
import path from 'path';

import routes from './routes/main'

const app = express();

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.json());
app.use(express.urlencoded({extended: false})); 

app.use((_: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(routes)

app.listen(5000, () => console.log(`App is running`));
