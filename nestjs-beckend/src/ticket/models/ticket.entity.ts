import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity()
export class TicketEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    vatin: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @CreateDateColumn()
    timeCreated: Date
}