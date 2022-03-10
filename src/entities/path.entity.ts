import {
    Entity,
    Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany
} from "typeorm";
import {StartCoordinate} from "./startcoodinate.entity";
import {EndCoordinate} from "./endcoodinate.entity";
import {Checkpoint} from "./checkpoint";

@Entity()
export class Path
{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @OneToOne(() => StartCoordinate, {
        eager: true,
    })
    @JoinColumn()
    start: StartCoordinate;

    @OneToOne(() => EndCoordinate, {
        eager: true,
    })
    @JoinColumn()
    end: EndCoordinate;

    @OneToMany(() => Checkpoint, checkpoint => checkpoint.path)
    checkpoints: Checkpoint[];
}