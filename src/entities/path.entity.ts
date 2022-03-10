import {
    Entity,
    Column, PrimaryGeneratedColumn
} from "typeorm";

@Entity()
export class Path
{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @OneToOne(() => StartCoordinateEntity, {
        eager: true,
    })
    @JoinColumn()
    start: StartCoordinateEntity;

    @Column({
        nullable: false,
    })
    end: string;

}