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
import { ProductsService } from './products.service';
import { GetProducts } from './dto/getProducts.dto';
import { InsertProduct } from './dto/insertProduct.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getManyProducts(@Query() queryParams: GetProducts) {
    const typProduktu = queryParams.typProduktu || 'TypProduktu';
    const nazwaProduktu = queryParams.nazwaProduktu || 'NazwaProduktu';
    const rozmiarProduktu = queryParams.rozmiarProduktu || 'RozmiarProduktu';
    const kolorProduktu = queryParams.kolorProduktu || 'KolorProduktu';
    const stanMagazynowy = queryParams.stanMagazynowy || 'StanMagazynowy';
    const cenaProduktu = queryParams.cenaProduktu || 'CenaProduktu';

    return this.productsService.getManyProducts(
      typProduktu,
      nazwaProduktu,
      rozmiarProduktu,
      kolorProduktu,
      stanMagazynowy,
      cenaProduktu,
    );
  }

  @Get(':id')
  async getProduct(@Param('id') idProduktu: string) {
    return await this.productsService.getProduct(idProduktu);
  }

  @Post()
  async insertProduct(@Body() queryParams: InsertProduct) {
    return await this.productsService.insertProduct(
      queryParams.typProduktu,
      queryParams.nazwaProduktu,
      queryParams.rozmiarProduktu,
      queryParams.kolorProduktu,
      queryParams.stanMagazynowy,
      queryParams.cenaProduktu,
    );
  }

  @Delete(':id')
  async removeProduct(@Param('id') idProduktu: string) {
    return await this.productsService.removeProduct(idProduktu);
  }

  @Put(':id')
  async updateEmployee(
    @Param('id') idPracownika: string,
    @Body() queryParams: GetProducts,
  ) {
    return await this.productsService.updateEmployee(idPracownika, queryParams);
  }
}
