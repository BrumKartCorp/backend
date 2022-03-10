import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class StartCoordinateEntity
{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    latitude: string;

    @Column()
    longitude: string;
}