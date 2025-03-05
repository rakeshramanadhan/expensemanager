import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CategoryService } from './categories.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('general_categories')
  async createGeneralCategory(@Body('name') name: string) {
    return this.categoryService.createGeneralCategory(name);
  }
  @Post('payment')
  async createPaymentCategory(@Body('name') name: string) {
    return this.categoryService.createPaymentCategory(name);
  }
  @Get('payment')
  async getPaymentCategories() {
    return this.categoryService.getPaymentCategories();
  }

  @Post(':id')
  async createCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body('name') name: string,
  ) {
    return this.categoryService.createCategory(name, id);
  }

  @Post(':id/subcategories')
  async createSubcategory(
    @Param('id', ParseIntPipe) id: number,
    @Body('name') name: string,
  ) {
    return this.categoryService.createSubcategory(name, id);
  }

  @Get()
  async getCategories() {
    return this.categoryService.getCategories();
  }
  @Get('expense')
  async getExpenseCategories() {
    return this.categoryService.getExpenseCategories();
  }
  @Get('income')
  async getIncomeCategories() {
    return this.categoryService.getIncomeCategories();
  }
}
