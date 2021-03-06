import { IsNotEmpty } from 'class-validator';
import { UserStatuses } from '../../../common/enums/user.enum';

export class StatusUserDto {
  @IsNotEmpty()
  public readonly status: UserStatuses;
}
