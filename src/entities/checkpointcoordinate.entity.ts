import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Checkpoint} from "./checkpoint";

@Entity()
export class CheckpointCoordinate
{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToOne(() => Checkpoint)
    @Column()
    checkpoint: string;

    @Column()
    latitude: string;

    @Column()
    longitude: string;
}