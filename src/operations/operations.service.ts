import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from '@entities/expense/expence.entity';
import { Income } from '@entities/income/income.entity';
import { Repository } from 'typeorm';
import { OperationOutcome } from './dto/operation-outcome.dto';

@Injectable()
export class OperationsService {
  constructor(
    @InjectRepository(Income) private incomeRepo: Repository<Income>,
    @InjectRepository(Expense) private expenseRepo: Repository<Expense>,
  ) {}

  async getOperations(
    startDate?: string,
    endDate?: string,
  ): Promise<OperationOutcome> {
    let incomeQuery = this.incomeRepo
      .createQueryBuilder('income')
      .select('SUM(income.amount)', 'totalIncome');
    let expenseQuery = this.expenseRepo
      .createQueryBuilder('expense')
      .select('SUM(expense.amount)', 'totalExpense');

    if (startDate && endDate) {
      incomeQuery = incomeQuery.where('income.date BETWEEN :start AND :end', {
        start: startDate,
        end: endDate,
      });
      expenseQuery = expenseQuery.where(
        'expense.date BETWEEN :start AND :end',
        { start: startDate, end: endDate },
      );
    }

    const totalIncome = (await incomeQuery.getRawOne()).totalIncome || 0;
    const totalExpense = (await expenseQuery.getRawOne()).totalExpense || 0;
    const outcome = totalIncome - totalExpense;
    return { totalIncome, totalExpense, outcome };
  }
}
