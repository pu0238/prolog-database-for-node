import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { GetOrders } from './dto/getOrders.dto';
import { InsertOrder } from './dto/insertOrder.dto';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async getManyOrders(@Query() queryParams: GetOrders) {
    const idProduktu = queryParams.idProduktu
      ? `'${queryParams.idProduktu}'`
      : 'IdProduktu';
    const iloscProduktu = queryParams.iloscProduktu || 'IloscProduktu';
    const idMagazyniera = queryParams.idMagazyniera
      ? `'${queryParams.idMagazyniera}'`
      : 'IdMagazyniera';
    const idSprzedawcy = queryParams.idSprzedawcy
      ? `'${queryParams.idSprzedawcy}'`
      : 'IdSprzedawcy';
    const statusZamowienia = queryParams.statusZamowienia || 'StatusZamowienia';

    return this.ordersService.getManyOrders(
      idProduktu,
      iloscProduktu,
      idMagazyniera,
      idSprzedawcy,
      statusZamowienia,
    );
  }

  @Get(':id')
  async getProduct(@Param('id') idProduktu: string) {
    return await this.ordersService.getOrder(idProduktu);
  }

  @Post()
  async insertOrder(@Body() queryParams: InsertOrder) {
    return await this.ordersService.insertOrder(
      queryParams.idProduktu,
      queryParams.iloscProduktu,
      queryParams.idMagazyniera,
      queryParams.idSprzedawcy,
      queryParams.statusZamowienia,
    );
  }

  @Delete(':id')
  async removeOrder(@Param('id') idZamowienia: string) {
    return await this.ordersService.removeOrder(idZamowienia);
  }

  @Put(':id')
  async updateOrder(
    @Param('id') idZamowienia: string,
    @Body() queryParams: GetOrders,
  ) {
    return await this.ordersService.updateOrder(idZamowienia, queryParams);
  }
}
