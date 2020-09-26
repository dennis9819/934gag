import * as express from 'express';
import { ApiController } from '../../../types/ApiController';
import { UserLoginController } from './UserLoginController';
import { UserService } from '../../../services/UserService';
import { responseJson } from '../../../util/response';
import { logError } from '../../../util/logging';
import { AuditService } from '../../../services/AuditService';

const re_mail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export class UserController implements ApiController{
    private auditservice: AuditService = new AuditService;
    public path = '/user';
    public router = express.Router();
    public userService: UserService = new UserService();
    public childComponents = [
        new UserLoginController(),
    ];

    constructor() {
        this.intializeRoutes();

    }
   
    public intializeRoutes() {
        this.router.post(`/register`,this.post_register)
        this.router.post(`/resendToken`,this.post_resendToken)
        this.router.post(`/activate`,this.post_activate)
        this.router.post(`/forgot`,this.post_forgot)
        this.router.post(`/reset`,this.post_reset)
        this.router.post(`/testName`,this.post_testName)
        this.router.post(`/testMail`,this.post_testMail)
        this.childComponents.forEach( el => {
            this.router.use(el.path, el.router)
        })
    }

    post_register = async (request: express.Request, response: express.Response) => {
        try {
            if(!(
                request.body.nick?.match(/^\w*$/) &&
                request.body.mail?.match(re_mail) &&
                request.body.name_first?.match(/^[\w\s]*$/) &&
                request.body.name_last?.match(/^[\w\s]*$/) &&
                request.body.passwd?.match(/^.*$/)
            )){
                responseJson(request,response,400,{},"Format invalid");
                return;
            }
        } catch (error) {
            responseJson(request,response,400,{},"Format invalid");
            return;
        }
        
        this.userService.createUser(
            request.body.nick,
            request.body.mail,
            request.body.name_first,
            request.body.name_last,
            request.body.passwd
        ).then((res) => {
            responseJson(request,response,200,{uid: res});
        }).catch((err: Error) => {
            if (err.toString() == "Nickname already taken"){
                responseJson(request,response,409,{},`Nickname already taken`);
            }else if (err.toString() == "Email already taken"){
                responseJson(request,response,409,{},`Email already taken`);
            }else{
                console.error(err)
                logError(`Error creating user: ${err.message}`)
                responseJson(request,response,505,{},`internal error`);
            }

        })
        return;
    }


    post_resendToken = async (request: express.Request, response: express.Response) => {
        try {
            if(!(
                request.body.t?.match(/^.*$/)
            )){
                responseJson(request,response,400,{},"Format invalid");
                return;
            }
        } catch (error) {
            responseJson(request,response,400,{},"Format invalid");
            return;
        }
        
        this.userService.resendToken(
            request.body.t
        ).then((res) => {
            responseJson(request,response,200,{});
        }).catch((err: Error) => {
            if (err.message == "User not found"){
                responseJson(request,response,404,{},`t not found`);
            }else{
                logError(`Error resending confirmation to user: ${err.message}`)
                responseJson(request,response,505,{},`internal error`);
            }

        })
        return;
    }
   
    post_activate = async (request: express.Request, response: express.Response) => {
        try {
            if(!(
                request.body.userId?.match(/^[\w-]*$/) &&
                request.body.token?.match(/^\w*$/)
            )){
                responseJson(request,response,400,{},"Format invalid");
                return;
            }
        } catch (error) {
            responseJson(request,response,400,{},"Format invalid");
            return;
        }

        this.userService.useActivationToken(
            request.body.userId,
            request.body.token
        ).then((res) => {
            if (res){
                responseJson(request,response,200,{});
                this.auditservice.logAudit(`User ${request.body.userId} activated account with ${request.body.token}`)
            }else{
                responseJson(request,response,404,{},`Token not found`);
                this.auditservice.logAudit(`User ${request.body.userId} failed activating account with ${request.body.token}. Token not found`)
            }
        }).catch((err: Error) => {
            if (err.message == "User not found"){
                responseJson(request,response,404,{},`User not found`);
                this.auditservice.logAudit(`User ${request.body.userId} failed activating account with ${request.body.token}. User not found`)
            }else{
                logError(`Error creating user: ${err.message}`)
                responseJson(request,response,505,{},`internal error`);
            }

        })
        return;
    }

    post_forgot = async (request: express.Request, response: express.Response) => {
        try {
            if(!(
                request.body.nick?.match(/^\w*$/) &&
                request.body.mail?.match(re_mail)
            )){
                responseJson(request,response,400,{},"Format invalid");
                return;
            }
        } catch (error) {
            responseJson(request,response,400,{},"Format invalid");
            return;
        }

        try {
            const uid = await this.userService.getUserByNick(request.body.nick);
            const user_mail = (await this.userService.getUser(uid)).mail;
            
            if ( user_mail != request.body.mail){
                responseJson(request,response,404,'Mail not Found');
                return;
            }

            const token = await this.userService.createPasswordToken(uid);
            responseJson(request,response,200,{});
            this.auditservice.logAudit(`User ${request.body.userId} requested password reset token`)
            console.log(token);

        } catch (err) {
            if (err.message == "User not found"){
                responseJson(request,response,404,{},`User not found`);
            }else{
                logError(`Error resetting Password: ${err.message}`)
                responseJson(request,response,505,{},`internal error`);
            }
        }
        return;
    }

    post_reset = async (request: express.Request, response: express.Response) => {
        try {
            if(!(
                request.body.userId?.match(/^[\w-]*$/) &&
                request.body.token?.match(/^\w*$/) &&
                request.body.passwd?.match(/^.*$/)
            )){
                responseJson(request,response,400,{},"Format invalid");
                return;
            }
        } catch (error) {
            responseJson(request,response,400,{},"Format invalid");
            return;
        }

        this.userService.usePasswordToken(  
            request.body.userId,
            request.body.token,
            request.body.passwd
        ).then((res) => {
            if (res){
                responseJson(request,response,200,{});
                this.auditservice.logAudit(`User ${request.body.userId} reset account with ${request.body.token}. User not found`)
            
            }else{
                responseJson(request,response,404,{},`Token not found`);
                this.auditservice.logAudit(`User ${request.body.userId} failed resetting account with ${request.body.token}. Token not found`,1)
            
            }
        }).catch((err: Error) => {
            if (err.message == "User not found"){
                responseJson(request,response,404,{},`User not found`);
                this.auditservice.logAudit(`User ${request.body.userId} failed resetting account with ${request.body.token}. User not found`)
            
            }else{
                logError(`Error creating user: ${err.message}`)
                responseJson(request,response,505,{},`internal error`);
            }

        })
        return;
    }

    post_testName = async (request: express.Request, response: express.Response) => {
        try {
            if(!(
                request.body.user?.match(/^[\w-.:_]*$/)
            )){
                responseJson(request,response,400,{},"Format invalid");
                return;
            }
        } catch (error) {
            responseJson(request,response,400,{},"Format invalid");
            return;
        }
        this.userService.checkNickExist(
            request.body.user,
        ).then((res) => {
            responseJson(request,response,200,{used: true});
        }).catch((err: Error) => {
            if (err.message == "User not found"){
                responseJson(request,response,200,{used: false});
            }else{
                logError(`Error creating user: ${err.message}`)
                responseJson(request,response,505,{},`internal error`);
            }
        })
        return;
    }

    post_testMail = async (request: express.Request, response: express.Response) => {
        try {
            if(!(
                request.body.mail?.match(re_mail)
            )){
                responseJson(request,response,400,{},"Format invalid");
                return;
            }
        } catch (error) {
            responseJson(request,response,400,{},"Format invalid");
            return;
        }
        this.userService.checkMailExist(
            request.body.mail,
        ).then((res) => {
            responseJson(request,response,200,{used: true});
        }).catch((err: Error) => {
            if (err.message == "User not found"){
                responseJson(request,response,200,{used: false});
            }else{
                logError(`Error creating user: ${err.message}`)
                responseJson(request,response,505,{},`internal error`);
            }
        })
        return;
    }
}