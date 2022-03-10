import {
    Entity, Column, PrimaryGeneratedColumn, OneToMany, DeleteDateColumn
} from "typeorm";
import {Checkpoint} from "./checkpoint.entity";

@Entity()
export class Path
{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @OneToMany(() => Checkpoint, checkpoint => checkpoint.path, {
        eager: true,
        onDelete: "CASCADE",
    })
    checkpoints: Checkpoint[];

    @DeleteDateColumn()
    public deletedAt?: Date
}