import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateShopAddressDto } from './dto/create-shop-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopAddressEntity } from '../../common/entities/shop-address.entity';
import { Like, Not, Repository } from 'typeorm';
import { ShopAddressStatus } from '../../common/enums/shop.enum';
import { UpdateShopAddressDto } from './dto/update-shop-address.dto';
import { PaginationParamsDto } from '../../common/dtos/pagination-params.dto';
import { FindConditions } from 'typeorm/find-options/FindConditions';

@Injectable()
export class ShopAddressesService {
  constructor(
    @InjectRepository(ShopAddressEntity)
    private addressRepo: Repository<ShopAddressEntity>,
  ) {}

  get repo() {
    return this.addressRepo;
  }

  create(createShopAddressDto: CreateShopAddressDto) {
    return this.addressRepo.save(createShopAddressDto);
  }

  async findAll(
    {
      search = '',
      pagination: { offset, limit },
    }: {
      search: string;
      pagination: PaginationParamsDto;
    },
    withDeleted = false,
  ) {
    const where: FindConditions<ShopAddressEntity> = {};
    if (search.trim() !== '') {
      where.address = Like(`%${search.trim()}%`);
    }
    if (!withDeleted) {
      where.status = Not(ShopAddressStatus.DELETED);
    }
    const [result, total] = await this.addressRepo.findAndCount({
      where,
      take: limit,
      skip: offset,
    });

    return {
      data: result,
      total,
      offset,
      limit,
    };
  }

  async findOne(id: number, withDeleted = false) {
    return await this.findByCondition({ id }, withDeleted);
  }

  async findByLatLng({ lat, lng }) {
    return await this.findByCondition({ lat, lng });
  }

  private async findByCondition(condition, withDeleted = false) {
    const address = await this.addressRepo.findOne(
      condition,
      !withDeleted && { where: { status: Not(ShopAddressStatus.DELETED) } },
    );
    if (!address) {
      throw new NotFoundException('Shop address not found');
    }
    return address;
  }

  async update(id: number, updateShopAddressDto: UpdateShopAddressDto) {
    const address = await this.findOne(id);
    const updatedAddress = this.addressRepo.create({ ...address, ...updateShopAddressDto });
    return this.addressRepo.save(updatedAddress);
  }

  async remove(id: number) {
    const address = await this.findOne(id);
    address.status = ShopAddressStatus.DELETED;
    return this.addressRepo.save(address);
  }

  async removePermanent(id: number) {
    const address = await this.findOne(id);
    await this.addressRepo.remove(address);
    return address;
  }

  async recover(id: number) {
    const address = await this.findOne(id, true);
    if (!address.isDeleted()) {
      throw new BadRequestException('Shop address not deleted');
    }
    address.status = ShopAddressStatus.INACTIVE;
    return this.addressRepo.save(address);
  }
}
