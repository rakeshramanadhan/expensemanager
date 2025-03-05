import { IsDate, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { Category } from '@entities/category/category.entity';
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
export class Income {
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

  @ManyToOne(() => Category, (category) => category.income, {
    onDelete: 'CASCADE',
  })
  @IsNotEmpty({ message: 'Category is required' })
  category: Category;

  @ManyToOne(() => Payment, (payment) => payment.income, {
    onDelete: 'CASCADE',
  })
  payment: Payment;
}
