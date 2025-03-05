import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsDate,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateExpenseDto {
  @IsOptional()
  @IsString()
  description: string;

  @IsNumber({}, { message: 'Amount must be a number' })
  @IsPositive({ message: 'Amount must be a positive number' })
  amount: number;

  @IsNotEmpty({ message: 'Date is required' })
  @Type(() => Date)
  @IsDate({ message: 'Invalid date format' })
  date: Date;

  @IsOptional()
  @IsString()
  location: string;

  @IsNotEmpty({ message: 'Category ID is required' })
  categoryId: number;

  @IsOptional()
  paymentId?: number;
}
