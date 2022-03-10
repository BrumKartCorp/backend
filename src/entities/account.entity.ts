import {
    Entity,
    Column, PrimaryGeneratedColumn,
} from "typeorm";

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
}
