import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
} from "typeorm";

@Entity()
export class Account
{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        nullable: false,
    })
    mail: string;

    @Column({
        nullable: false,
    })
    password: string;

    @Column({
        nullable: false,
        default: 0,
    })
    score: number;
}
