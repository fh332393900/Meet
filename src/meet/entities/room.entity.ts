import { BaseEntity } from 'src/common/entity/baseEntity';
import { Column, Entity } from 'typeorm';

@Entity('meet_room')
export class RoomEntity extends BaseEntity {
  @Column({ unique: true, comment: '创建房间人id' })
  room_user_id: string;

  @Column({ unique: true, comment: '房间ID' })
  room_id: number;

  @Column({ length: 255, nullable: true, comment: '房间logo' })
  room_logo: string;

  @Column({ length: 20, comment: '房间名称' })
  room_name: string;

  @Column({ default: 1, comment: '房间是否需要密码 1:公开 2:加密' })
  room_need_password: number;

  @Column({ length: 255, nullable: true, comment: '房间密码' })
  room_password: string;
}
