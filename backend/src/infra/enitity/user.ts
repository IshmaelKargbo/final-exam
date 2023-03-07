import { hashText } from 'src/common/encrypt';
import { Entity, Column, BeforeInsert, ManyToOne, JoinColumn } from 'typeorm';
import { Base } from './base';
import { RoleEntity } from './role';

@Entity('user')
export class UserEntity extends Base {
  @Column('varchar')
  firstName: string;

  @Column('varchar')
  lastName: string;

  @Column('varchar')
  email: string;

  @ManyToOne(() => RoleEntity, (role) => role.users)
  @JoinColumn()
  role: RoleEntity;

  @Column('varchar', { unique: true })
  username: string;

  @Column('varchar')
  password: string;

  @Column('enum', { enum: ['PENDING', 'COMPLETE'], default: 'PENDING' })
  state: string;

  @Column({ default: true })
  isActive: boolean;

  @BeforeInsert()
  async hashPassword() {
    const password = await hashText(this.password, 10);
    this.password = password;
  }
}

export abstract class UserEntityInterface {
  abstract create(payload: UserEntity): Promise<UserEntity>;
  abstract update(payload: UserEntity): Promise<UserEntity>;
  abstract changeUsername(payload: UserEntity): Promise<UserEntity>;
  abstract changePassword(payload: UserEntity): Promise<UserEntity>;
  abstract resetPassword(payload: UserEntity): Promise<UserEntity>;
  abstract login(username: string, password: string): Promise<UserEntity>;
  abstract delete(id: string): Promise<UserEntity>;
  abstract findOne(id: string): Promise<UserEntity>;
  abstract find(): Promise<UserEntity[]>;
}
