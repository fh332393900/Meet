import { CreateMeetDto } from './dto/create-meet.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meet } from './entities/room.entity';
import { getuuid } from 'src/utils';

@Injectable()
export class MeetService {
  constructor(
    @InjectRepository(Meet)
    private meetRepository: Repository<Meet>,
  ) {}

  // 创建会议
  async create(createMeetDto: CreateMeetDto, req) {
    const createMeetDtoParam = await this.meetRepository.create(createMeetDto);
    const meetId = getuuid();
    createMeetDtoParam.meetId = meetId;
    createMeetDtoParam.meetUserId = req.user.id;
    return this.meetRepository.save(createMeetDtoParam);
  }
}
