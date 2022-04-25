import { IsNumber } from 'class-validator';

export class CreatePriceDto {
  @IsNumber()
  public readonly product: number;

  @IsNumber()
  public readonly shop: number;

  @IsNumber()
  public readonly address: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  public readonly price: number;
}
