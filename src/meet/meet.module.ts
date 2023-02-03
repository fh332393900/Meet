import { Module } from '@nestjs/common';
import { MeetController } from './meet.controller';
import { MeetGateway } from './meet.gateway';
import { MeetService } from './meet.service';

@Module({
  controllers: [MeetController],
  providers: [MeetService, MeetGateway],
})
export class MeetModule {}
