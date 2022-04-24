import { BadRequestException, Injectable } from '@nestjs/common';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../common/entities/user.entity';
import { UserStatuses } from '../../common/enums/user.enum';
import { RegisterDto } from '../auth/dto/register.dto';
import { PasswordService } from './password.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    private passwordService: PasswordService,
  ) {}

  public async create(userDto: RegisterDto): Promise<UserEntity> {
    const passwordHash = await this.passwordService.hash(userDto.password);
    return await this.userRepo.save({ ...userDto, passwordHash });
  }

  public async getAll(): Promise<UserEntity[]> {
    return await this.userRepo.find();
  }

  async getNotDeleted() {
    return await this.userRepo.find({
      where: { status: Not(UserStatuses.DELETED) },
    });
  }

  public async getByEmail(email: string): Promise<UserEntity> {
    return await this.userRepo.findOne({ email });
  }

  public async findOne(conditions): Promise<UserEntity> {
    const user = await this.userRepo.findOne(conditions);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  getById(id: string): Promise<UserEntity> {
    return this.findOne(id);
  }

  async setDeletedStatus(id: string) {
    return await this.setStatus(id, UserStatuses.DELETED);
  }

  async setActiveStatus(id: string) {
    return await this.setStatus(id, UserStatuses.ACTIVE);
  }

  async setInactiveStatus(id: string) {
    return await this.setStatus(id, UserStatuses.INACTIVE);
  }

  async setStatus(id: string, status: UserStatuses) {
    const user = await this.getById(id);
    user.status = status;
    return await this.userRepo.save(user);
  }

  async update(id: string, updateDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.getById(id);
    if (updateDto.newPassword) {
      user.passwordHash = await this.passwordService.hash(updateDto.newPassword);
    }
    const updatedUser = this.userRepo.create({ ...user, ...updateDto });
    return this.userRepo.save<UserEntity>(updatedUser);
  }
}
