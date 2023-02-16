import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import envConfig from '../../config/env';
import { User } from './entities/user.entity';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          ...envConfig.DATABASE_CONFIG,
          entities: [User],
        }),
        TypeOrmModule.forFeature([User]),
      ],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
