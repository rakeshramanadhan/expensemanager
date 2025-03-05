import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from './entites/expence.entity';
import { Subcategory } from '@entities/category/subcategory.entity';
import { Payment } from '@entities/category/payment.entity';
import { CreateExpenseDto } from './entites/dto/create-expense.dto';

@Injectable()
export class ExpencemanagerService {
  constructor(
    @InjectRepository(Expense) private expenseRepo: Repository<Expense>,

    @InjectRepository(Payment) private PaymentCategoryRepo: Repository<Payment>,

    @InjectRepository(Subcategory)
    private categoryRepo: Repository<Subcategory>,
  ) {}

  async createExpense(dto: CreateExpenseDto): Promise<Expense> {
    const subcategory = await this.categoryRepo.findOne({
      where: { id: dto.categoryId },
    });
    if (!subcategory) throw new NotFoundException('Category not found');

    const payment = await this.PaymentCategoryRepo.findOne({
      where: { id: dto.paymentId },
    });
    if (!payment) throw new NotFoundException('Payment Category not found');

    const expense = this.expenseRepo.create({
      description: dto.description,
      amount: dto.amount,
      date: dto.date,
      location: dto.location,
      subcategory: subcategory,
      payment: payment,
    });
    return this.expenseRepo.save(expense);
  }
  async getExpenseById(id: number) {
    return this.expenseRepo.findOne({
      where: { id },
      relations: ['subcategory', 'payment'],
    });
  }
  async getExpenses(): Promise<any[]> {
    const expenses = this.expenseRepo.find({
      relations: ['subcategory', 'payment'],
    });

    return (await expenses).map((expense) => ({
      id: expense.id,
      description: expense.description,
      amount: expense.amount,
      date: expense.date,
      location: expense.location,
      subcategory: expense.subcategory ? expense.subcategory.name : null, // Return category name
      payment: expense.payment ? expense.payment.name : null, // Return payment method name
    }));
  }
}
