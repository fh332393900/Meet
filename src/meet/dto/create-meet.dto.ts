import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// 进行数据验证和转换
import { IsNotEmpty } from 'class-validator';

export class CreateMeetDto {
  @ApiProperty({ description: '会议名称' })
  @IsNotEmpty({ message: '会议名称不能为空' })
  readonly meetName: string;

  @ApiPropertyOptional({ description: '会议是否需要密码 1:公开 2:加密' })
  readonly meetNeedPassword: number;

  @ApiPropertyOptional({ description: '会议房间密码' })
  readonly meetPassword: string;
}
