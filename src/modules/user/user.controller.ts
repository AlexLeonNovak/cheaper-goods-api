import { Body, Controller, Delete, Get, Param, Patch, UseGuards, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
// import { Roles } from '../roles/roles.decorator';
// import { Role } from '../../enums/role.enum';
// import { RolesGuard } from '../roles/roles.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  public async getAllNotDeleted() {
    // console.log(request.user);
    return await this.userService.getNotDeleted();
  }

  @Get(':id')
  public async getById(@Param('id') id: string) {
    return await this.userService.getById(id);
  }

  // @Post()
  // @UsePipes(ValidationPipe)
  // // @Roles(Role.ADMIN)
  // public async create(@Body() userDto: CreateUserDto) {
  //   return await this.userService.create(userDto);
  // }

  @Delete(':id')
  // @Roles(Role.ADMIN)
  public delete(@Param('id') id: string) {
    return this.userService.setDeletedStatus(id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  // @Roles(Role.ADMIN)
  public update(@Param('id') id: string, @Body() updateDto: UpdateUserDto) {
    return this.userService.update(id, updateDto);
  }
}
