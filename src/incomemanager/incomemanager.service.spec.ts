import { Test, TestingModule } from '@nestjs/testing';
import { IncomemanagerService } from './incomemanager.service';

describe('IncomemanagerService', () => {
  let service: IncomemanagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IncomemanagerService],
    }).compile();

    service = module.get<IncomemanagerService>(IncomemanagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
