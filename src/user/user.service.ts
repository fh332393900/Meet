import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // 用户注册
  async register(createUserDto: CreateUserDto) {
    const { username } = createUserDto;
    const data = await this.userRepository.findOne({ where: { username } });
    if (data) {
      throw new HttpException({ message: '用户已存在', code: 400 }, 200);
    }
    // 必须先create才能进@BeforeInsert
    createUserDto = await this.userRepository.create(createUserDto);
    return await this.userRepository.save(createUserDto);
  }
}
