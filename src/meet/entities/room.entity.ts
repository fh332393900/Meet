import { BaseEntity } from 'src/common/entity/baseEntity';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcryptjs');

@Entity('meet')
export class Meet extends BaseEntity {
  @Column({ comment: '创建会议人id' })
  meetUserId: string;

  // unique 唯一主键
  @Column({ unique: true, comment: '会议ID' })
  meetId: string;

  @Column({ length: 255, nullable: true, comment: '会议logo' })
  meetLogo: string;

  @Column({ length: 20, comment: '会议名称' })
  meetName: string;

  @Column({ default: 1, comment: '会议是否需要密码 1:公开 2:加密' })
  meetNeedPassword: number;

  @Column({ length: 255, nullable: true, comment: '会议房间密码' })
  @Exclude()
  meetPassword: string;

  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @Column({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updateTime = new Date();
  }

  @BeforeInsert()
  async encryptPwd() {
    this.meetPassword = await bcrypt.hashSync(this.meetPassword, 10);
  }
}
