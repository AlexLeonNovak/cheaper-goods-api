import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordService } from './password.service';
import { IsUserExistValidator } from '../../common/validators/is-user-exist.validator';
import { UserEntity } from '../../common/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [TypeOrmModule, UserService, PasswordService],
  controllers: [UserController],
  providers: [UserService, PasswordService, IsUserExistValidator],
})
export class UserModule {}
