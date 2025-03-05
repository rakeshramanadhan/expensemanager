import { Controller, Get, Query } from '@nestjs/common';
import { OperationsService } from './operations.service';
import { OperationOutcome } from './dto/operation-outcome.dto';

@Controller('operations')
export class OperationsController {
  constructor(private readonly operationsService: OperationsService) {}
  @Get()
  async getOperations(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ): Promise<OperationOutcome> {
    return await this.operationsService.getOperations(startDate, endDate);
  }
}
