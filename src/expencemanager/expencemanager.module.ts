import { Module } from '@nestjs/common';
import { ExpencemanagerController } from './expencemanager.controller';
import { ExpencemanagerService } from './expencemanager.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './entites/expence.entity';
import { CategoriesModule } from '../categories/categories.module';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Expense]),
    CategoriesModule,
    LoggerModule,
  ],
  controllers: [ExpencemanagerController],
  providers: [ExpencemanagerService],
  exports: [ExpencemanagerService],
})
export class ExpencemanagerModule {}
