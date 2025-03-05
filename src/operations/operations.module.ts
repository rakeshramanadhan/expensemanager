import { Module } from '@nestjs/common';
import { OperationsController } from './operations.controller';
import { OperationsService } from './operations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Income } from '@entities/income/income.entity';
import { Expense } from '@entities/expense//expence.entity';
import { CategoriesModule } from '../categories/categories.module';
import { LoggerModule } from '../logger/logger.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Income, Expense]),
    CategoriesModule,
    LoggerModule,
  ],
  controllers: [OperationsController],
  providers: [OperationsService],
  exports: [OperationsService],
})
export class OperationsModule {}
