import {Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, ManyToOne} from "typeorm";
import { UserAccount } from "./UserAccount";

@Entity()
export class UserSessions {
    @PrimaryGeneratedColumn('uuid')
    sessionID!: string;

    @Column({type: "datetime", nullable: false})
    started!: Date;

    @Column({type: "datetime", nullable: true})
    timeout!: Date;

    @Column({type: "tinyint", nullable: false, default: false})
    permanent!: boolean;

    @Column({type: "varchar", nullable: false})
    ip!: string;

    @ManyToOne(type=> UserAccount, user => user.sessions)
    user!: UserAccount;
}