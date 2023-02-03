import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { MeetService } from './meet.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateMeetDto } from './dto/create-meet.dto';
import { Meet } from './entities/room.entity';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('meet')
@ApiTags('会议管理')
export class MeetController {
  constructor(private readonly meetService: MeetService) {}

  @Post('create')
  @ApiOperation({ summary: '创建会议' })
  @UseInterceptors(AnyFilesInterceptor())
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 201, type: [Meet] })
  async create(@Body() createMeetDto: CreateMeetDto) {
    return await this.meetService.create(createMeetDto);
  }
}
