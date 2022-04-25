import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PriceEntity } from '../../common/entities/price.entity';
import { Repository } from 'typeorm';
import { ShopsService } from '../shops/shops.service';
import { ShopAddressesService } from '../shop-addresses/shop-addresses.service';
import { ProductsService } from '../products/products.service';
import { ShopDependsKey } from '../../common/enums/shop.enum';
import { UserService } from '../user/user.service';

@Injectable()
export class PricesService {
  constructor(
    @InjectRepository(PriceEntity)
    private priceRepo: Repository<PriceEntity>,
    private shopService: ShopsService,
    private addressService: ShopAddressesService,
    private productService: ProductsService,
    private userService: UserService,
  ) {}

  async create(createPriceDto: CreatePriceDto) {
    const shop = await this.shopService.findOne(createPriceDto.shop);
    const address = shop[ShopDependsKey.ADDRESSES].find(address => address.id === createPriceDto.address);
    if (!address) {
      throw new NotFoundException(`Shop ${shop.id} with address ${createPriceDto.address} not found`);
    }
    const product = await this.productService.findOne(createPriceDto.product);
    // TODO: change to get user from req
    const user = await this.userService.getById('15052e1e-0ae0-41f8-bf75-5def3ceaa837');
    return this.priceRepo.save({
      shop,
      address,
      product,
      price: createPriceDto.price,
      createdByUser: user,
    });
  }

  findAll() {
    return `This action returns all prices`;
  }

  findOne(id: number) {
    return `This action returns a #${id} price`;
  }

  update(id: number, updatePriceDto: UpdatePriceDto) {
    return `This action updates a #${id} price`;
  }

  remove(id: number) {
    return `This action removes a #${id} price`;
  }
}
