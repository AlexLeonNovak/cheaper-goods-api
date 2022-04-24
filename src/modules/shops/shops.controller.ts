import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ShopsService } from './shops.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { UpdateShopDto } from './dto/update-shop.dto';
import { ShopEntity } from '../../common/entities/shop.entity';

@ApiTags('Shops')
@UsePipes(ValidationPipe)
@Controller('shops')
export class ShopsController {
  constructor(public shopService: ShopsService) {}

  @ApiOperation({ summary: 'Create shop' })
  @ApiCreatedResponse({ type: ShopEntity })
  @Post()
  create(@Body() createShopDto: CreateShopDto) {
    return this.shopService.create(createShopDto);
  }

  @ApiOperation({ summary: 'Get all shops' })
  @ApiOkResponse({ type: [ShopEntity] })
  @Get()
  findAll() {
    return this.shopService.findAll();
  }

  @ApiOperation({ summary: 'Get shop by id' })
  @ApiOkResponse({ type: ShopEntity })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.shopService.findOne(id);
  }

  @ApiOperation({ summary: 'Update shop' })
  @ApiOkResponse({ type: ShopEntity })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateShopDto: UpdateShopDto) {
    return this.shopService.update(id, updateShopDto);
  }

  @ApiOperation({ summary: 'Delete shop' })
  @ApiOkResponse({ type: ShopEntity })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.shopService.remove(id);
  }
}
