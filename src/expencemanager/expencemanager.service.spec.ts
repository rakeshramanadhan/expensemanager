import { Test, TestingModule } from '@nestjs/testing';
import { ExpencemanagerService } from './expencemanager.service';

describe('ExpencemanagerService', () => {
  let service: ExpencemanagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpencemanagerService],
    }).compile();

    service = module.get<ExpencemanagerService>(ExpencemanagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
