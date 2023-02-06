import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { RedisInstance } from 'src/cache/redis';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // 获取用户信息
  getUser(user: Partial<User>) {
    const existUser = this.userRepository.findOne({
      where: { id: user.id, username: user.username },
    });
    return existUser;
  }

  createToken(user: Partial<User>) {
    return this.jwtService.sign({
      id: user.id,
      username: user.username,
    });
  }

  // 用户登录
  async login(user: Partial<User>) {
    const token = this.createToken(user);
    const redis = new RedisInstance(0);
    redis.setItem(`user-token-${user.id}-${user.username}`, token, 60 * 60 * 8);

    return {
      userInfo: user,
      token,
    };
  }
}
