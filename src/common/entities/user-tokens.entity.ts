import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('user_tokens')
export class UserTokensEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, user => user.id, { primary: true })
  @JoinColumn()
  user: UserEntity;

  @Column({ type: 'uuid' })
  userId: string;

  @Column()
  refreshToken: string;
}
