import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { IsEmail, IsPhoneNumber, IsNotEmpty } from 'class-validator';
import Booking from './booking';

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsNotEmpty({ message: 'name cannot be empty' })
  fullName!: string;

  @Column()
  @IsEmail({}, { message: 'Invalid email format' })
  email!: string;

  @Column()
  age!: number;

  @Column()
  @IsPhoneNumber('IN', { message: 'Invalid phone number format' })
  phone!: string;

  @OneToMany(() => Booking, (booking) => booking.user)
  booking!: Booking[];
}

export default User;
