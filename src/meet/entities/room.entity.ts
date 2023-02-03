import { BaseEntity } from 'src/common/entity/baseEntity';
import { Column, Entity } from 'typeorm';

@Entity('meet')
export class Meet extends BaseEntity {
  @Column({ unique: true, comment: '创建会议人id' })
  meetUserId: string;

  @Column({ unique: true, comment: '会议ID' })
  meetId: string;

  @Column({ length: 255, nullable: true, comment: '会议logo' })
  meetLogo: string;

  @Column({ length: 20, comment: '会议名称' })
  meetName: string;

  @Column({ default: 1, comment: '会议是否需要密码 1:公开 2:加密' })
  meetNeedPassword: number;

  @Column({ length: 255, nullable: true, comment: '会议房间密码' })
  meetPassword: string;
}
