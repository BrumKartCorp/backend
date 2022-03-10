import {
    Entity,
    Column, PrimaryGeneratedColumn, OneToMany,
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

    @OneToMany(() => Gift, gift => gift.accounts)
    gifts: Gift[];
}
