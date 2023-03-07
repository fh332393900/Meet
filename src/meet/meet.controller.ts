import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
  Body,
  Request,
  UseGuards,
  Delete,
  Query,
  Get,
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
import { AuthGuard } from '@nestjs/passport';

@Controller('meet')
@ApiTags('会议管理')
export class MeetController {
  constructor(private readonly meetService: MeetService) {}

  @Post('create')
  @ApiOperation({ summary: '创建会议' })
  @UseInterceptors(AnyFilesInterceptor())
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 201, type: [Meet] })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth() // swagger文档设置token
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createMeetDto: CreateMeetDto, @Request() req) {
    return await this.meetService.create(createMeetDto, req);
  }

  @Get('get')
  @ApiOperation({ summary: '查询会议详情' })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async get(@Query('id') id: string) {
    return await this.meetService.get(id);
  }

  @Get('getMeetByUser')
  @ApiOperation({ summary: '根据用户查询会议列表' })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getMeetByUser(@Request() req) {
    return await this.meetService.getMeetByUser(req);
  }

  @Delete('del')
  @ApiOperation({ summary: '删除会议' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async del(@Query('id') id: string, @Request() req) {
    return await this.meetService.del(id, req);
  }
}
