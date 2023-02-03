import { Test, TestingModule } from '@nestjs/testing';
import { MeetService } from './meet.service';

describe('MeetService', () => {
  let service: MeetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeetService],
    }).compile();

    service = module.get<MeetService>(MeetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
