import {
    Entity,
    Column, PrimaryGeneratedColumn
} from "typeorm";

@Entity()
export class Path
{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        nullable: false,
    })
    start: string;

    @Column({
        nullable: false,
    })
    end: string;

}