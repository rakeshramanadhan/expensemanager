import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './categories/entities/category.entity';
import { Subcategory } from './categories/entities/subcategory.entity';
import config from './config';
import { GeneralCategory } from './categories/entities/generalcategory.entity';
import { Payment } from './categories/entities/payment.entity';
import { ExpencemanagerModule } from './expencemanager/expencemanager.module';
import { IncomemanagerModule } from './incomemanager/incomemanager.module';
import { OperationsModule } from './operations/operations.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    CategoriesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.database.host,
      port: config.database.port,
      username: config.database.username,
      password: config.database.password,
      database: config.database.database,
      autoLoadEntities: true, // Automatically loads entities
      synchronize: true,
    }),
    ExpencemanagerModule,
    IncomemanagerModule,
    OperationsModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
