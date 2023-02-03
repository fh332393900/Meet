import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetController } from './meet.controller';
import { MeetGateway } from './meet.gateway';
import { MeetService } from './meet.service';
import { Meet } from './entities/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Meet])],
  controllers: [MeetController],
  providers: [MeetService, MeetGateway],
})
export class MeetModule {}
