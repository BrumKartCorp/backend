import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Path} from "./path.entity";

@Entity()
export class EndCoordinateEntity
{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToOne(() => Path, {
    })
    @JoinColumn()
    end: Path;

    @Column()
    latitude: string;

    @Column()
    longitude: string;
}