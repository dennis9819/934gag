import {Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, ManyToOne} from "typeorm";
import { UserAccount } from "./UserAccount";

@Entity()
export class UserToken {
    @PrimaryGeneratedColumn()
    tokenID!: number;

    @Column({type: "varchar", nullable: false})
    token!: string;

    @Column({type: "datetime", nullable: true})
    timeout!: Date;

    @Column({type: "varchar", nullable: false})
    usecase!: string;

    @Column({type: "int", nullable: false, default: 1})
    uses!: number;

    @ManyToOne(type=> UserAccount, user => user.tokens)
    user!: UserAccount;
}