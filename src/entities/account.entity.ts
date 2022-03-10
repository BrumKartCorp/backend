import {
    Entity,
    PrimaryColumn,
    Column,
} from "typeorm";

@Entity()
export class Account
{
    @PrimaryColumn({
        unique: true,
        nullable: false,
    })
    id: string;

    @Column({
        nullable: false,
        default: "",
    })
    name: string;
}
