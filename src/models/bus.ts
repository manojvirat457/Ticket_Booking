import { IsNotEmpty } from "class-validator";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Booking from "./booking";

@Entity()
export default class Bus extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: string;

    @Column({ unique: true })
    @IsNotEmpty()
    bus_no!: string;

    @OneToMany(() => Booking, (booking) => booking.bus)
    booking!: Booking[];

} 