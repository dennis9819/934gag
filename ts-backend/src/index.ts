
import {createConnection} from "typeorm";
import { AuthController } from "./api/auth/AuthController";
import { WebAPI } from "./api/express";
import { loadProperties } from "./services/PropertyService";
import { ApiController } from "./types/ApiController";
import { logError, logInfo } from "./util/logging";

loadProperties("config.json");
// initialize Database Connection
createConnection().then(async connection => {
    logInfo("Database Connected");
}).catch(error => {
    console.log(error)
    logError(error);
    process.exit(10);
});

// initialize Web API
const app: WebAPI = new WebAPI(3000);
const controllers: ApiController[] = [
    new AuthController()
];
app.initializeControllers(controllers);
app.listen();