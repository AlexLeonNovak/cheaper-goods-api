import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopEntity } from '../../common/entities/shop.entity';
import { Repository } from 'typeorm';
import { ShopAddressesService } from '../shop-addresses/shop-addresses.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { ShopDependsKey, ShopStatus } from '../../common/enums/shop.enum';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(ShopEntity)
    private shopRepo: Repository<ShopEntity>,
    private addressService: ShopAddressesService,
  ) {}

  async create(createShopDto: CreateShopDto) {
    const { addressIds, name, description, status } = createShopDto;
    const addresses = await this.addressService.repo.findByIds(addressIds);
    if (!addresses.length) {
      throw new NotFoundException('Addresses not found');
    }
    const shop = await this.shopRepo.save({ name, description, status, [ShopDependsKey.ADDRESSES]: addresses });
    return this.findOne(shop.id);
  }

  async findAll() {
    return this.shopRepo.find({ relations: [ShopDependsKey.ADDRESSES] });
  }

  async findOne(id: number, withRelations = true) {
    let relations: string[] = [];
    if (withRelations) {
      relations = [ShopDependsKey.ADDRESSES];
    }
    const shop = await this.shopRepo.findOne({ where: { id }, relations });
    if (!shop) {
      throw new NotFoundException('Shop not found');
    }
    return shop;
  }

  async update(id: number, updateShopDto: UpdateShopDto) {
    const { addressIds, status, name, description } = updateShopDto;
    const addresses = await this.addressService.repo.findByIds(addressIds);
    if (!addresses.length) {
      throw new NotFoundException('Addresses not found');
    }
    const shop = await this.findOne(id, false);
    await this.shopRepo.save({ ...shop, status, name, description, addresses });
    return this.findOne(id);
  }

  remove(id: number) {
    return this.shopRepo.save({ id, status: ShopStatus.DELETED });
  }
}
