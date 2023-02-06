import { CreateMeetDto } from './dto/create-meet.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    const { meetNeedPassword } = createMeetDto;
    if (![1, 2].includes(meetNeedPassword)) {
      throw new HttpException(
        `meetNeedPassword 字段不正确`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const createMeetDtoParam = await this.meetRepository.create(createMeetDto);
    const meetId = getuuid();
    createMeetDtoParam.meetId = meetId;
    createMeetDtoParam.meetUserId = req.user.id;
    return this.meetRepository.save(createMeetDtoParam);
  }

  async del(meetId: string, req) {
    const meet = await this.meetRepository.findOne({ meetId });
    if (req.user.id !== meet.meetUserId) {
      throw new HttpException(`只能删除自己创建的会议`, HttpStatus.BAD_REQUEST);
    }
    return await this.meetRepository.remove(meet);
  }
}
