import { UserAccount } from "../entity/UserAccount";
import { hash } from "../util/passwd";
import { Repository, getManager } from "typeorm";
import { UserTokenService } from "./UserTokenService";
import { getProperties } from "./PropertyService";
import { AuditService } from "./AuditService";

export class UserService {
    usertokenservice: UserTokenService = new UserTokenService;
    constructor () {

    }

    //create a new User
    public async createUser(
        nick: string,
        mail: string,
        name_first: string,
        name_last: string,
        passwd: string
    ){
        const userRepository: Repository<UserAccount> = getManager().getRepository(UserAccount);
        //check if username is taken
        const filters = {
            nick: nick,
            mail: mail
        };
        let taken = await userRepository.createQueryBuilder()
            .where("nick = :nick")
            .setParameters(filters)
            .getCount() ? true: false;
        if (taken){throw "Nickname already taken"}
        taken = await userRepository.createQueryBuilder()
            .where("mail = :mail")
            .setParameters(filters)
            .getCount() ? true: false;
        if (taken){throw "Email already taken"}

        let User = new UserAccount();
        User.nick = nick;
        User.mail = mail;
        User.name_first = name_first;
        User.name_last = name_last;
        User.passwd = hash(passwd);
        User.last_pass_change = new Date();

        let new_user_id = (await userRepository.save(User)).userId;
        const token = await this.createActivationToken(new_user_id)
        console.log("SendToken", token);
        //TODO: send verification mail
        return new_user_id
    }

    public async resendToken(
        userId: string,
    ){
        const token = await this.createActivationToken(userId);
        const user = await this.checkUserExist(userId);
        console.log("ReendToken", token, user.mail);
    }

    //create activation token
    public async createActivationToken(
        userId: string,
    ){
        const userRepository: Repository<UserAccount> = getManager().getRepository(UserAccount);
        const token = await this.usertokenservice.createToken(userId,'activate',1,getProperties().auth.activateTokenTimout,16,true);
        return token;
    }

    //activate account with activation key
    public async useActivationToken(
        userId: string,
        token: string
    ){
        let user = await this.checkUserExist(userId);
        if (!await this.usertokenservice.useToken(userId,'activate',token)){
            return false;
        }
        const userRepository: Repository<UserAccount> = getManager().getRepository(UserAccount);
        user.active = true;
        userRepository.save(user);
        return true;
    }

    //create password token
    public async createPasswordToken(
        userId: string,
    ){
        const userRepository: Repository<UserAccount> = getManager().getRepository(UserAccount);
        await this.checkUserExist(userId);
        const token = await this.usertokenservice.createToken(userId,'resetpw',1,30,16,true);
        return token;
    }

    //use  password token
    public async usePasswordToken(
        userId: string,
        token: string,
        passwd: string
    ){
        if (!await this.usertokenservice.useToken(userId,'resetpw',token)){
            return false;
        }
        await this.setUserPassword(userId,passwd);
        return true;
    }

    //check user password
    public async checkUserPassword(
        userId: string,
        tpasswd: string
    ){
        let user = await this.checkUserExist(userId);
        return (user.passwd == hash(tpasswd))
    }

    //get user by nickname
    public async getUserByNick(
        nick: string,
    ){
        const userRepository: Repository<UserAccount> = getManager().getRepository(UserAccount);
        const filters = {
            nick: nick,
        };
        let user = await userRepository.createQueryBuilder()
            .where("nick = :nick")
            .setParameters(filters)
            .getOne();
        if (!user) {throw new Error("User not found")}
        return user.userId;
    }

    //set user password
    public async setUserPassword(
        userId: string,
        passwd: string
    ){
        const userRepository: Repository<UserAccount> = getManager().getRepository(UserAccount);
        let user = await this.checkUserExist(userId);
        user.passwd = hash(passwd);
        user.last_pass_change = new Date();
        userRepository.save(user);
        return;
    }

    public async getUser(userid: string): Promise<UserAccount>{
        return await this.checkUserExist(userid)
    }

    public async checkUserExist(
        id: string
    ){
        const userRepository: Repository<UserAccount> = getManager().getRepository(UserAccount);
        let user = await userRepository.findOne(id);
        if (!user) {throw new Error("User not found")}
        return user
    }

    public async checkNickExist(
        nick: string
    ){
        const userRepository: Repository<UserAccount> = getManager().getRepository(UserAccount);
        let user = await userRepository.findOne({nick: nick});
        if (!user) {throw new Error("User not found")}
        return user
    }

    public async checkMailExist(
        mail: string
    ){
        const userRepository: Repository<UserAccount> = getManager().getRepository(UserAccount);
        let user = await userRepository.findOne({mail: mail});
        if (!user) {throw new Error("User not found")}
        return user
    }
}