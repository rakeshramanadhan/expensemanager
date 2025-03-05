import { Expense } from 'src/expencemanager/entites/expence.entity';
import { Income } from 'src/incomemanager/entites/income.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => Expense, (expense) => expense.payment)
  expenses: Expense[];
  @OneToMany(() => Income, (income) => income.payment)
  income: Income[];
}
