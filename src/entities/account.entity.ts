import {
    Entity,
    Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, JoinTable, ManyToMany,
} from "typeorm";
import {Gift} from "./gift.entity";

@Entity()
export class Account
{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    mail: string;

    @Column()
    password: string;

    @Column({
        default: 0,
    })
    score: number;

    @Column({
        default: 0,
    })
    coins: number;

    @ManyToMany(() => Gift, gift => gift.accounts, {
        eager: true,
    })
    @JoinTable({
        name: "account_gifts",
        joinColumn: {
            name: "account",
            referencedColumnName: "id",
        },
        inverseJoinColumn: {
            name: "gift",
            referencedColumnName: "id",
        },
    })
    gifts: Gift[];
}
