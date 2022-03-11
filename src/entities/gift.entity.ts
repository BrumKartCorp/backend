import {
    Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, OneToMany
} from "typeorm";
import {Account} from "./account.entity";

@Entity()
export class Gift
{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @ManyToMany(() => Account, account => account.gifts)
    accounts: Account[];
}