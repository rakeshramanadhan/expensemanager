import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { Subcategory } from './entities/subcategory.entity';
import { GeneralCategory } from './entities/generalcategory.entity';
import { Payment } from './entities/payment.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(GeneralCategory)
    private generalCategoryRepo: Repository<GeneralCategory>,
    @InjectRepository(Payment)
    private PaymentCategoryRepo: Repository<Payment>,

    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,

    @InjectRepository(Subcategory)
    private subcategoryRepo: Repository<Subcategory>,
  ) {}

  async createGeneralCategory(name: string): Promise<GeneralCategory> {
    const category = this.generalCategoryRepo.create({ name });
    return this.generalCategoryRepo.save(category);
  }
  async createPaymentCategory(name: string): Promise<Payment> {
    const category = this.PaymentCategoryRepo.create({ name });
    return this.PaymentCategoryRepo.save(category);
  }

  async createCategory(name: string, gCategoryId: number): Promise<Category> {
    const generalCategory = await this.generalCategoryRepo.findOne({
      where: { id: gCategoryId },
    });
    if (!generalCategory)
      throw new NotFoundException('General category not found');

    const category = this.categoryRepo.create({ name, generalCategory });
    return this.categoryRepo.save(category);
  }

  async createSubcategory(
    name: string,
    categoryId: number,
  ): Promise<Subcategory> {
    const category = await this.categoryRepo.findOne({
      where: { id: categoryId },
    });
    if (!category) throw new NotFoundException('Category not found');

    const subcategory = this.subcategoryRepo.create({ name, category });
    return this.subcategoryRepo.save(subcategory);
  }
  async getPaymentCategories(): Promise<Payment[]> {
    try {
      const categories = await this.PaymentCategoryRepo.find();
      if (!categories.length) {
        throw new NotFoundException('No payment categories found');
      }
      return categories;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch categories',
        error.message,
      );
    }
  }
  async getCategories(): Promise<Category[]> {
    try {
      const categories = await this.categoryRepo.find({
        relations: ['generalCategory', 'subcategories'],
      });

      if (!categories.length) {
        throw new NotFoundException('No categories found');
      }

      return categories;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch categories',
        error.message,
      );
    }
  }
  async getExpenseCategories(): Promise<Category[]> {
    try {
      const categories = await this.categoryRepo.find({
        where: { generalCategory: { id: 1 } },
        relations: ['generalCategory', 'subcategories'],
      });

      if (!categories.length) {
        throw new NotFoundException('No categories found');
      }

      return categories;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch categories',
        error.message,
      );
    }
  }
  async getIncomeCategories(): Promise<Category[]> {
    try {
      const categories = await this.categoryRepo.find({
        where: { generalCategory: { id: 2 } },
        relations: ['generalCategory', 'subcategories'],
      });

      if (!categories.length) {
        throw new NotFoundException('No categories found');
      }

      return categories;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch categories',
        error.message,
      );
    }
  }
}
