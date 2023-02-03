import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Exclude } from 'class-transformer';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcryptjs');

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  username: string; // 用户名

  @Column({ length: 100, default: '' })
  nickname: string; //昵称

  @Column({ nullable: true })
  birthday: Date; // 出生日期

  @Column()
  avatar: string; // 头像

  @Column('bigint')
  phone: number; // 手机号

  @Column()
  sex: number; // 性别

  @Column({ default: '' })
  email: string; // 邮箱

  @Column() // 表示查询时隐藏此列
  @Exclude() // 返回数据时忽略password，配合ClassSerializerInterceptor使用
  password: string; // 密码

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
    this.password = await bcrypt.hashSync(this.password, 10);
  }
}
