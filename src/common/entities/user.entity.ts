import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { UserStatuses } from '../enums/user.enum';
import { ApiProperty } from '@nestjs/swagger';

// import { Role } from '../enums/role.enum';

@Entity({ name: 'users' })
export class UserEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ nullable: true })
  firstName: string;

  @ApiProperty()
  @Column({ nullable: true })
  lastName: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column({ unique: true })
  phone: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  passwordHash: string;

  @ApiProperty()
  @Column({ default: UserStatuses.NEW, length: 16 })
  status: UserStatuses;

  // @Column({ type: 'set', enum: Role, default: [Role.USER] })
  // roles: Role[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @Exclude({ toPlainOnly: true })
  @DeleteDateColumn()
  deletedAt: Date;

  // @OneToMany(() => WalletsUsers, (walletsUsers) => walletsUsers.user)
  // userWallets: WalletsUsers[];

  public isActive() {
    return this.status === UserStatuses.ACTIVE;
  }
}
