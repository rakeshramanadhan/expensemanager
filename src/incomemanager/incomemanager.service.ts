import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Income } from './entites/income.entity';
import { Category } from '@entities/category/category.entity';
import { Payment } from '@entities/category/payment.entity';
import { CreateIncomeDto } from './entites/dto/create-income.dto';

@Injectable()
export class IncomeManagerService {
  constructor(
    @InjectRepository(Income) private incomeRepo: Repository<Income>,

    @InjectRepository(Payment) private PaymentCategoryRepo: Repository<Payment>,

    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  async createIncome(dto: CreateIncomeDto): Promise<Income> {
    const category = await this.categoryRepo.findOne({
      where: { id: dto.categoryId },
    });
    if (!category) throw new NotFoundException('Category not found');

    const payment = await this.PaymentCategoryRepo.findOne({
      where: { id: dto.paymentId },
    });
    if (!payment) throw new NotFoundException('Payment Category not found');

    const income = this.incomeRepo.create({
      description: dto.description,
      amount: dto.amount,
      date: dto.date,
      location: dto.location,
      category: category,
      payment: payment,
    });
    return this.incomeRepo.save(income);
  }
  async getIncomeById(id: number) {
    return this.incomeRepo.findOne({
      where: { id },
      relations: ['category', 'payment'],
    });
  }
  async getIncome(): Promise<any[]> {
    const incomes = this.incomeRepo.find({
      relations: ['category', 'payment'],
    });

    return (await incomes).map((income) => ({
      id: income.id,
      description: income.description,
      amount: income.amount,
      date: income.date,
      location: income.location,
      category: income.category ? income.category.name : null, // Return category name
      payment: income.payment ? income.payment.name : null, // Return payment method name
    }));
  }
}
