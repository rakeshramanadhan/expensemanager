import { Module } from '@nestjs/common';
import { IncomemanagerController } from './incomemanager.controller';
import { IncomeManagerService } from './incomemanager.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Income } from './entites/income.entity';
import { CategoriesModule } from 'src/categories/categories.module';
import { LoggerModule } from '../logger/logger.module';
@Module({
  imports: [TypeOrmModule.forFeature([Income]), CategoriesModule, LoggerModule],
  controllers: [IncomemanagerController],
  providers: [IncomeManagerService],
  exports: [IncomeManagerService],
})
export class IncomemanagerModule {}
