import { IsDate, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { Payment } from '@entities/category/payment.entity';
import { Subcategory } from '@entities/category/subcategory.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column('decimal')
  @IsNumber({}, { message: 'Amount shoud be a number' })
  @IsPositive({ message: 'Amont should be postive' })
  amount: number;

  @Column()
  @IsDate({ message: 'Date should be a valid format' })
  date: Date;

  @Column({ type: 'text', nullable: true })
  location: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => Subcategory, (subcategory) => subcategory.expenses, {
    onDelete: 'CASCADE',
  })
  @IsNotEmpty({ message: 'Category is required' })
  subcategory: Subcategory;

  @ManyToOne(() => Payment, (payment) => payment.expenses, {
    onDelete: 'CASCADE',
  })
  payment: Payment;
}
