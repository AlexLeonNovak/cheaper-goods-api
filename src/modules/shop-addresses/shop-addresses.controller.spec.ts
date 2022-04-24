import { Test, TestingModule } from '@nestjs/testing';
import { ShopAddressesController } from './shop-addresses.controller';
import { ShopAddressesService } from './shop-addresses.service';

describe('ShopAddressesController', () => {
  let controller: ShopAddressesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShopAddressesController],
      providers: [ShopAddressesService],
    }).compile();

    controller = module.get<ShopAddressesController>(ShopAddressesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
