import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Path} from "./path.entity";

@Entity()
export class Checkpoint
{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    latitude: string;

    @Column()
    longitude: string;

    @ManyToOne(() => Path, path => path.checkpoints)
    @JoinColumn()
    path: Path;
}