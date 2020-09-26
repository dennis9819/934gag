import { UserAccount } from "../entity/UserAccount";
import { hash } from "../util/passwd";
import { Repository, getManager } from "typeorm";
import { UserToken } from "../entity/UserTokens";
import { mkstring } from "../util/token";
import { StringifyOptions } from "querystring";

export class UserTokenService {
    constructor () {

    }

    //create a new Token
    public async createToken(
        userid: string,
        usecase: string,
        uses: number,
        timeout: number /* minutes */,
        length: number = 16,
        single: boolean = false /* only one token of that kind usecase user */
    ) {
        const userRepository: Repository<UserAccount> = getManager().getRepository(UserAccount);
        const tokenRepository: Repository<UserToken> = getManager().getRepository(UserToken);
        const user = await userRepository.findOne(userid);

        if(!user){
            throw new Error("User not found")
        }

        if(single){
            await this.removeTokenByUsecase(userid,usecase);
        }

        let Token = new UserToken();
        const token_string = mkstring(length);
        Token.token = hash(token_string);
        Token.usecase = usecase;
        Token.uses = uses;
        Token.timeout = new Date()
        Token.timeout.setMinutes(Token.timeout.getMinutes() + timeout)
        Token.user = user;
        await tokenRepository.save(Token);
        return token_string;
    }

    public async removeTokenByUsecase(
        userid: string,
        usecase: string,
    ) {
        const tokenRepository: Repository<UserToken> = getManager().getRepository(UserToken);
        const filters = {
            usecase: usecase,
            userUserId: userid
        };
        const tokens = await tokenRepository.createQueryBuilder()
            .delete()
            .where('usecase = :usecase')
            .andWhere('userUserId = :userUserId')
            .setParameters(filters)
            .execute();
        return;
    }

    //delete timed-out token
    public async checkToken() {
        const tokenRepository: Repository<UserToken> = getManager().getRepository(UserToken);
        const tokens = await tokenRepository.createQueryBuilder()
            .delete()
            .where('timeout < NOW()')
            .execute();
        return;
    }

    public async useToken(
        userid: string,
        usecase: string,
        token: string

    ) {
        const tokenRepository: Repository<UserToken> = getManager().getRepository(UserToken);
        const filters = {
            usecase: usecase,
            userUserId: userid,
            token: hash(token)
        };
        const token_obj = await tokenRepository.createQueryBuilder()
            .where('usecase = :usecase')
            .andWhere('userUserId = :userUserId')
            .andWhere('token = :token')
            .setParameters(filters)
            .getOne();
        if (!token_obj){return false}
        if (token_obj.uses > 0){token_obj.uses -= 1;}
        if (token_obj.uses == 0){
            tokenRepository.remove(token_obj);
        }else{
            tokenRepository.save(token_obj);
        }
        return true;
    }

}