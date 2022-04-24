import { Test, TestingModule } from '@nestjs/testing';
import { ShopAddressesService } from './shop-addresses.service';

describe('ShopAddressesService', () => {
  let service: ShopAddressesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShopAddressesService],
    }).compile();

    service = module.get<ShopAddressesService>(ShopAddressesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
