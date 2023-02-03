import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MeetModule } from './meet/meet.module';
import { AuthModule } from './auth/auth.module';
import envConfig from '../config';

@Module({
  imports: [
    TypeOrmModule.forRoot(envConfig.DATABASE_CONFIG),
    UserModule,
    MeetModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
