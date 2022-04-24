import { All, Body, Controller, HttpCode, HttpStatus, Post, Req, Res, UseGuards, UsePipes } from '@nestjs/common';
import { CookieOptions, Request, Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { JwtRefreshAuthGuard } from './jwt-refresh-auth.guard';
import { COOKIE_REFRESH_TOKEN_KEY } from './jwt-refresh.strategy';
import { UserEntity } from '../../common/entities/user.entity';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PayloadDto } from './dto/payload.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  private readonly cookieOptions: CookieOptions = {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    signed: true,
  };

  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login user' })
  @ApiOkResponse({ type: PayloadDto })
  @Post('login')
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  async login(@Body() login: LoginDto, @Res({ passthrough: true }) response: Response) {
    const payload = await this.authService.login(login);
    response.cookie(COOKIE_REFRESH_TOKEN_KEY, payload.refreshToken, this.cookieOptions);
    return payload;
  }

  @ApiOperation({ summary: 'Register user' })
  @ApiCreatedResponse({ type: PayloadDto })
  @Post('register')
  @UsePipes(ValidationPipe)
  async register(@Body() registerDto: RegisterDto, @Res({ passthrough: true }) response: Response) {
    const payload = await this.authService.register(registerDto);
    response.cookie(COOKIE_REFRESH_TOKEN_KEY, payload.refreshToken, this.cookieOptions);
    return payload;
  }

  @ApiOperation({ summary: 'Logout' })
  @ApiNoContentResponse()
  @All('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Res({ passthrough: true }) response: Response, @Req() request: Request) {
    const { refreshToken } = request.signedCookies;
    await this.authService.logout(refreshToken);
    response.clearCookie(COOKIE_REFRESH_TOKEN_KEY);
    return;
  }

  @ApiOperation({ summary: 'Refresh tokens' })
  @ApiOkResponse({ type: PayloadDto })
  @All('refresh')
  @UseGuards(JwtRefreshAuthGuard)
  @HttpCode(HttpStatus.OK)
  async refresh(@Res({ passthrough: true }) response: Response, @Req() request: Request) {
    const payload = await this.authService.userData(request.user as UserEntity);
    response.cookie(COOKIE_REFRESH_TOKEN_KEY, payload.refreshToken, this.cookieOptions);
    return payload;
  }
}
