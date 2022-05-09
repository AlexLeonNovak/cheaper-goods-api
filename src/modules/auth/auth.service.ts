import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserEntity } from '../../common/entities/user.entity';
import { PasswordService } from '../user/password.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private passwordService: PasswordService,
  ) {}

  private async validate({ email, password }: LoginDto): Promise<UserEntity | null> {
    const user = await this.userService.getByEmail(email);
    const passwordEquals = user && (await this.passwordService.compare(password, user.passwordHash));
    if (user && passwordEquals) {
      return user;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validate(loginDto);
    if (!user) {
      throw new BadRequestException('Wrong email or password');
    }

    if (!user.isActive()) {
      throw new ForbiddenException();
    }

    return this.userData(user);
  }

  async register(registerDto: RegisterDto) {
    const candidate = await this.userService.getByEmail(registerDto.email);
    if (candidate) {
      throw new BadRequestException('User already exists');
    }

    const user = await this.userService.create(registerDto);

    return this.userData(user);
  }

  async logout(refreshToken: string): Promise<void> {
    await this.tokenService.removeToken(refreshToken);
  }

  async userData(user: UserEntity) {
    const { id, email } = user;
    const { accessToken, refreshToken } = this.tokenService.generateTokens({ id, email });
    await this.tokenService.saveToken(id, refreshToken);
    return { user, accessToken, refreshToken };
  }
}
