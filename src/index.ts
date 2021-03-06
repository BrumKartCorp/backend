import "reflect-metadata";

import * as dotenv from 'dotenv';
dotenv.config();

import {createConnection} from "typeorm";
import {Request, Response} from "express";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import {routes} from "./routes";

module.exports = {
    "type": process.env.TYPE,
    "host": process.env.HOST,
    "port": process.env.PORT,
    "username": process.env.USERNAME,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "synchronize": true,
    "logging": false,
    "entities": ["src/entities/*.ts"]
};

createConnection().then(async () =>
{
    const app = express();
    app.use(bodyParser.json(), cors());

    const port = 8001;
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });

    routes.map(route => {
        app[route.method](route.path, (request: Request, response: Response, next: Function) => {
            route.action(request, response)
                .then(() => next)
                .catch(err => next(err));
        });
    });

}).catch(error => console.log(error));
