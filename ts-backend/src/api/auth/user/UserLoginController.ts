import * as express from 'express';
import { ApiController } from '../../../types/ApiController';
import { responseJson } from '../../../util/response';

export class UserLoginController implements ApiController{
    public path = '/login';
    public router = express.Router();
    public childComponents = [];

    constructor() {
        this.intializeRoutes();
        this.router.get('/', (request: express.Request, response: express.Response) => {
            responseJson(request,response,200,"to be implemented");
        });
    }
   
    public intializeRoutes() {

    }
   
    getHelp = (request: express.Request, response: express.Response) => {
        responseJson(request,response,200,"to be implemented");
    }
}