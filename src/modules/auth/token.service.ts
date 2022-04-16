import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtPayload } from './jwt.strategy';
import { UserTokensEntity } from '../../entities/user-tokens.entity';

@Injectable()
export class TokenService {
  private readonly jwtRefreshSecret;
  private readonly jwtRefreshExp;

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectRepository(UserTokensEntity)
    private tokenRepo: Repository<UserTokensEntity>,
  ) {
    this.jwtRefreshSecret = this.configService.get<string>('JWT_REFRESH_SECRET');
    this.jwtRefreshExp = this.configService.get<string>('JWT_REFRESH_EXP');
  }

  generateTokens(payload: JwtPayload) {
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.jwtRefreshSecret,
      expiresIn: this.jwtRefreshExp,
    });
    return { accessToken, refreshToken };
  }

  validateAccessToken(token: string): JwtPayload | null {
    try {
      return this.jwtService.verify(token);
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token: string): JwtPayload | null {
    try {
      return this.jwtService.verify(token, {
        secret: this.jwtRefreshSecret,
      });
    } catch (e) {
      return null;
    }
  }

  async removeToken(refreshToken: string): Promise<void> {
    await this.tokenRepo.delete({ refreshToken });
  }

  async findToken(refreshToken): Promise<UserTokensEntity> {
    return await this.tokenRepo.findOne({ refreshToken }, { relations: ['user'] });
  }

  async saveToken(userId, refreshToken): Promise<UserTokensEntity> {
    let tokenData = await this.tokenRepo.findOne({ userId });
    if (!tokenData) {
      tokenData = new UserTokensEntity();
      tokenData.userId = userId;
    }
    tokenData.refreshToken = refreshToken;
    return this.tokenRepo.save(tokenData);
  }
}
