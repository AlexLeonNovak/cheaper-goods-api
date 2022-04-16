import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { UserStatuses } from '../enums/user.enum';
// import { Role } from '../enums/role.enum';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  passwordHash: string;

  @Column({ default: UserStatuses.NEW, length: 16 })
  status: UserStatuses;

  // @Column({ type: 'set', enum: Role, default: [Role.USER] })
  // roles: Role[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // @OneToMany(() => WalletsUsers, (walletsUsers) => walletsUsers.user)
  // userWallets: WalletsUsers[];

  public isActive() {
    return this.status === UserStatuses.ACTIVE;
  }
}
