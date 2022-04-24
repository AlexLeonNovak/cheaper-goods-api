import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import { ShopAddressesService } from './shop-addresses.service';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateShopAddressDto } from './dto/create-shop-address.dto';
import { ShopAddressEntity } from '../../common/entities/shop-address.entity';
import { UpdateShopAddressDto } from './dto/update-shop-address.dto';
import { PaginationParamsDto } from '../../common/dtos/pagination-params.dto';

@ApiTags('Shop addresses')
@UsePipes(ValidationPipe)
@Controller('shop-addresses')
export class ShopAddressesController {
  constructor(public shopService: ShopAddressesService) {}

  @ApiOperation({ summary: 'Create shop address' })
  @ApiCreatedResponse({ type: ShopAddressEntity })
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() createShopAddressDto: CreateShopAddressDto) {
    return this.shopService.create(createShopAddressDto);
  }

  @ApiOperation({ summary: 'Get all shop addresses' })
  @ApiOkResponse({ type: [ShopAddressEntity] })
  @Get()
  findAll(
    @Query('search') search: string,
    @Query() pagination: PaginationParamsDto,
    @Query('withDeleted', new DefaultValuePipe(false), ParseBoolPipe) withDeleted,
  ) {
    return this.shopService.findAll({ search, pagination }, withDeleted);
  }

  @ApiOperation({ summary: 'Get shop address by ID' })
  @ApiOkResponse({ type: ShopAddressEntity })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.shopService.findOne(id);
  }

  @ApiOperation({ summary: 'Update shop address' })
  @ApiOkResponse({ type: ShopAddressEntity })
  @UsePipes(ValidationPipe)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateShopAddressDto: UpdateShopAddressDto) {
    return this.shopService.update(id, updateShopAddressDto);
  }

  @ApiOperation({ summary: 'Delete shop address' })
  @ApiOkResponse({ type: ShopAddressEntity })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.shopService.remove(id);
  }

  @ApiOperation({ summary: 'Recover deleted shop address' })
  @ApiOkResponse({ type: ShopAddressEntity })
  @Put(':id/recover')
  recover(@Param('id', ParseIntPipe) id: number) {
    return this.shopService.recover(id);
  }

  @ApiOperation({ summary: 'Permanent delete shop address' })
  @ApiOkResponse({ type: ShopAddressEntity })
  @Delete(':id/permanent')
  removePermanent(@Param('id', ParseIntPipe) id: number) {
    return this.shopService.removePermanent(id);
  }
}
