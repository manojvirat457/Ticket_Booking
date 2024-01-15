import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import BookingStatus from '../enums/bookingEnum';
import User from './user';
import Bus from './bus';

@Entity()
export default class Booking extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: string;

    @Column({ type: 'varchar', enum: BookingStatus, default: BookingStatus.PENDING })
    status!: BookingStatus;

    @Column()
    @IsNotEmpty()
    seat_no!: string;

    @ManyToOne(() => User, (user) => user.booking, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user!: User;

    @ManyToOne(() => Bus, (bus) => bus.booking)
    bus!: Bus;
}