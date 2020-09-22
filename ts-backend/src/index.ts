import "reflect-metadata";
import {createConnection} from "typeorm";
import { WebAPI } from "./api/express";
import { ApiController } from "./types/ApiController";
import { logError, logInfo } from "./util/logging";

// initialize Database Connection
createConnection().then(async connection => {
    logInfo("Database Connected");
}).catch(error => {
    logError(error);
    process.exit(10);
});

// initialize Web API
const app: WebAPI = new WebAPI(3000);
const controllers: ApiController[] = [
    
];
app.initializeControllers(controllers);
app.listen();