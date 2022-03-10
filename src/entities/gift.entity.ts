import {
    Entity, Column, PrimaryGeneratedColumn, ManyToOne
} from "typeorm";
import {Account} from "./account.entity";

@Entity()
export class Gift
{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @ManyToOne(() => Account, account => account.gifts)
    accounts: Account[];
}