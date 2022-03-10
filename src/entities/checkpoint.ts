import {Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from "typeorm";
import {CheckpointCoordinate} from "./checkpointcoordinate.entity";
import {Path} from "./path.entity";

@Entity()
export class Checkpoint
{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @ManyToOne(() => Path, path => path.checkpoints)
    path: Path;

    @OneToOne(() => CheckpointCoordinate)
    @JoinColumn()
    coordinate: CheckpointCoordinate;
}