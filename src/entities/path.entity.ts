import {
    Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, DeleteDateColumn
} from "typeorm";
import {StartCoordinate} from "./startcoodinate.entity";
import {EndCoordinate} from "./endcoodinate.entity";
import {Checkpoint} from "./checkpoint";

@Entity()
export class Path {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @OneToOne(() => StartCoordinate, {
        eager: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    start: StartCoordinate;

    @OneToOne(() => EndCoordinate, {
        eager: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    end: EndCoordinate;

    @OneToMany(() => Checkpoint, checkpoint => checkpoint.path, {
        eager: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    checkpoints: Checkpoint[];

    @DeleteDateColumn()
    public deletedAt?: Date
}