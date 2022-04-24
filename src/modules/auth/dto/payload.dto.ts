import { UserEntity } from '../../../common/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class PayloadDto {
  @ApiProperty()
  public user: UserEntity;

  @ApiProperty()
  public accessToken: string;

  @ApiProperty()
  public refreshToken: string;
}
