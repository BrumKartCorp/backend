import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Path} from "./path.entity";

@Entity()
export class Checkpoint
{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    position: number;

    @Column()
    latitude: string;

    @Column()
    longitude: string;

    @ManyToOne(() => Path, path => path.checkpoints)
    path: Path;
}