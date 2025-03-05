import { Test, TestingModule } from '@nestjs/testing';
import { IncomemanagerController } from './incomemanager.controller';

describe('IncomemanagerController', () => {
  let controller: IncomemanagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IncomemanagerController],
    }).compile();

    controller = module.get<IncomemanagerController>(IncomemanagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
