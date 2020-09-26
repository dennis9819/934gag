import { UserService } from "./UserService";
import { Repository, getManager } from "typeorm";
import { UserAccount } from "../entity/UserAccount";
import { UserSessions } from "../entity/UserSessions";
import { getProperties } from "./PropertyService";

export class SessionService {
    userservice: UserService = new UserService;
    public async create_new_session(user: UserAccount, ip: string, permanent: boolean): Promise<String> {
        let nSession: UserSessions = new UserSessions;
        nSession.ip = ip;
        nSession.started = new Date();
        nSession.permanent = permanent;
        if (permanent){
            nSession.timeout = new Date()
            nSession.timeout.setMinutes(nSession.timeout.getMinutes() + getProperties().auth.sessionTimeout)
        }
        nSession.user = user;
        let sessionRepositroy: Repository<UserSessions> = getManager().getRepository(UserSessions);
        return (await sessionRepositroy.save(nSession)).sessionID;
    }

    public async destroy_session(sessionID: string): Promise<void> {
        let sessionRepositroy: Repository<UserSessions> = getManager().getRepository(UserSessions);
        const filters = { sid: sessionID };
        sessionRepositroy.createQueryBuilder()
            .where("sessionID == :sid")
            .setParameters(filters)
            .delete();
        return;
    }

    public async destroy_user_sessions(userID: string): Promise<void> {
        let sessionRepositroy: Repository<UserSessions> = getManager().getRepository(UserSessions);
        const filters = { uid: userID };
        sessionRepositroy.createQueryBuilder()
            .where("userUserId  == :uid")
            .setParameters(filters)
            .delete();
        return;
    }

    
}
