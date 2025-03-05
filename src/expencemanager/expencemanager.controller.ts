import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ExpencemanagerService } from './expencemanager.service';
import { CreateExpenseDto } from './entites/dto/create-expense.dto';

@Controller('expenses')
export class ExpencemanagerController {
  constructor(private readonly expenseManager: ExpencemanagerService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async createExpense(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseManager.createExpense(createExpenseDto);
  }

  @Get()
  async getPaymentCategories(@Query('id') id?: number) {
    if (id) {
      return this.expenseManager.getExpenseById(id);
    }
    return this.expenseManager.getExpenses();
  }
}
