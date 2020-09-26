import * as express from 'express';
import { ApiController } from '../../types/ApiController';
import { UserController } from './user/UserController';
import { responseJson } from '../../util/response';
import { logError } from '../../util/logging';


export class AuthController implements ApiController{
    public path = '/api/auth';
    public router = express.Router();
    public childComponents = [
        new UserController(),
    ];

    constructor() {
        this.intializeRoutes();
    }
   
    public intializeRoutes() {
        this.childComponents.forEach( el => {
            this.router.use(el.path, el.router)
        })
        this.router.get('/', (request: express.Request, response: express.Response) => {
            responseJson(request,response,200,"to be implemented");
        });
        //404
        this.router.use(function(req, res, next) {
            responseJson(req,res,404,{},"api request not found");
        });
        
        
    }
   
    
}