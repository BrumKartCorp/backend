import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class StartCoordinate
{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    latitude: string;

    @Column()
    longitude: string;
}