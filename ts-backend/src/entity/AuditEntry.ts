import {Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, ManyToOne} from "typeorm";

import { UserAccount } from "./UserAccount";

@Entity()
export class AuditEntry {
    @PrimaryGeneratedColumn()
    auditID!: number;

    @Column({type: "int", nullable: true})
    risk!: number;

    @Column({type: "longtext", nullable: true})
    msg!: string;

    @Column({type: "varchar", nullable: false})
    ip!: string;

    @Column({type: "datetime", nullable: false})
    timestamp!: Date;
}