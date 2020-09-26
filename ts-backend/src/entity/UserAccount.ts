import {Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn} from "typeorm";
import { UserSessions } from "./UserSessions";
import { UserToken } from "./UserTokens";

@Entity()
export class UserAccount {
    @PrimaryGeneratedColumn('uuid')
    userId!: string;

    @Column({type: "varchar", nullable: false})
    nick!: string;

    @Column({type: "varchar", nullable: false})
    mail!: string;
 
    @Column({type: "varchar", nullable: false})
    name_first!: string;

    @Column({type: "varchar", nullable: false})
    name_last!: string;

    @Column({type: "varchar", nullable: false})
    passwd!: string;

    @Column({type: "int", nullable: false, default: 0})
    failed!: number;

    @Column({type: "tinyint", nullable: false, default: false})
    active!: boolean;

    @Column({type: "tinyint", nullable: false, default: false})
    locked!: boolean;

    @Column({type: "datetime", nullable: true})
    last_pass_change!: Date;

    @OneToMany(type=> UserSessions, sessions => sessions.user)
    sessions!: UserSessions[];

    @OneToMany(type=> UserToken, tokens => tokens.user)
    tokens!: UserToken[];
}