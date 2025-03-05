import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IncomeManagerService } from './incomemanager.service';
import { CreateIncomeDto } from './entites/dto/create-income.dto';

@Controller('income')
export class IncomemanagerController {
  constructor(private readonly incomeManager: IncomeManagerService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async createIncome(@Body() createIncomeDto: CreateIncomeDto) {
    return this.incomeManager.createIncome(createIncomeDto);
  }

  @Get()
  async getIncome(@Query('id') id?: number) {
    if (id) {
      return this.incomeManager.getIncomeById(id);
    }
    return this.incomeManager.getIncome();
  }
}
