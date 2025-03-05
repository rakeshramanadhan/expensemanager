import { Test, TestingModule } from '@nestjs/testing';
import { ExpencemanagerController } from './expencemanager.controller';

describe('ExpencemanagerController', () => {
  let controller: ExpencemanagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpencemanagerController],
    }).compile();

    controller = module.get<ExpencemanagerController>(ExpencemanagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
