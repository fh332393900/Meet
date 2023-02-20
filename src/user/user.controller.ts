import { UserService } from './user.service';
import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
  Body,
  Delete,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
@ApiTags('用户管理')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: '用户注册' })
  // formdata接收方式
  @UseInterceptors(AnyFilesInterceptor())
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: 201, type: [User] })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Post('update')
  @ApiOperation({ summary: '修改用户信息' })
  @ApiBearerAuth() // swagger文档设置token
  @UseGuards(AuthGuard('jwt'))
  async update(@Req() req, @Body() data: UpdateUserDto) {
    const user = await this.userService.update(req.user, data);
    delete user.password;
    return user;
  }

  @Delete('delete')
  @ApiOperation({ summary: '删除用户' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async deleteUser(@Query('id') id: string) {
    return await this.userService.delete(id);
  }
}
