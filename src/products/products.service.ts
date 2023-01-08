import { GetProducts } from './dto/getProducts.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { prologDB } from 'db/prologDB.service';
import * as crypto from 'crypto';

@Injectable()
export class ProductsService {
  constructor(private readonly configService: ConfigService) {}

  private readonly databaseName =
    this.configService.get<string>('DATABASE_NAME');
  private prologDBService = new prologDB(this.databaseName);

  async getManyProducts(
    typProduktu: string,
    nazwaProduktu: string,
    rozmiarProduktu: string,
    kolorProduktu: string,
    stanMagazynowy: number | string,
    cenaProduktu: number | string,
  ) {
    const query = `
    produkt(
        id_produktu(IdProduktu),
        typ_produktu(${typProduktu}),
        nazwa_produktu(${nazwaProduktu}),
        rozmiar_produktu(${rozmiarProduktu}),
        kolor_produktu(${kolorProduktu}),
        stan_magazynowy(${stanMagazynowy}),
        cena_produktu(${cenaProduktu})
        ),
    produkt(
        id_produktu(IdProduktu),
        typ_produktu(TypProduktu),
        nazwa_produktu(NazwaProduktu),
        rozmiar_produktu(RozmiarProduktu),
        kolor_produktu(KolorProduktu),
        stan_magazynowy(StanMagazynowy),
        cena_produktu(CenaProduktu)
    ).`;
    const result = await this.prologDBService.find(query);
    if (!result) throw new InternalServerErrorException();
    return result;
  }

  async getProduct(idProduktu: string) {
    const query = `
    produkt(
        id_produktu('${idProduktu}'),
        typ_produktu(TypProduktu),
        nazwa_produktu(NazwaProduktu),
        rozmiar_produktu(RozmiarProduktu),
        kolor_produktu(KolorProduktu),
        stan_magazynowy(StanMagazynowy),
        cena_produktu(CenaProduktu)
    ).`;
    const result = await this.prologDBService.findOne(query);
    if (!result) throw new InternalServerErrorException();
    return { ...result, idProduktu } as {
      idProduktu: string;
      typProduktu: string;
      nazwaProduktu: string;
      rozmiarProduktu: string;
      kolorProduktu: string;
      stanMagazynowy: number;
      cenaProduktu: number;
    };
  }

  async insertProduct(
    typProduktu: string,
    nazwaProduktu: string,
    rozmiarProduktu: string,
    kolorProduktu: string,
    stanMagazynowy: number | string,
    cenaProduktu: number | string,
  ) {
    const idProduktu = crypto.randomUUID();
    const data =
      `produkt(` +
      `id_produktu('${idProduktu}'),` +
      `typ_produktu(${typProduktu}),` +
      `nazwa_produktu(${nazwaProduktu}),` +
      `rozmiar_produktu(${rozmiarProduktu}),` +
      `kolor_produktu(${kolorProduktu}),` +
      `stan_magazynowy(${stanMagazynowy}),` +
      `cena_produktu(${cenaProduktu})` +
      `).`;
    await this.prologDBService.insert(data);
    return await this.getProduct(idProduktu);
  }

  async removeProduct(idProduktu: string) {
    const product = await this.getProduct(idProduktu);
    const data =
      `produkt(` +
      `id_produktu('${idProduktu}'),` +
      `typ_produktu(${product.typProduktu}),` +
      `nazwa_produktu(${product.nazwaProduktu}),` +
      `rozmiar_produktu(${product.rozmiarProduktu}),` +
      `kolor_produktu(${product.kolorProduktu}),` +
      `stan_magazynowy(${product.stanMagazynowy}),` +
      `cena_produktu(${product.cenaProduktu})` +
      `).`;
    await this.prologDBService.remove(data);
  }

  async updateEmployee(idProduktu: string, queryParams: GetProducts) {
    const product = await this.getProduct(idProduktu);
    const removeData =
      `produkt(` +
      `id_produktu('${idProduktu}'),` +
      `typ_produktu(${product.typProduktu}),` +
      `nazwa_produktu(${product.nazwaProduktu}),` +
      `rozmiar_produktu(${product.rozmiarProduktu}),` +
      `kolor_produktu(${product.kolorProduktu}),` +
      `stan_magazynowy(${product.stanMagazynowy}),` +
      `cena_produktu(${product.cenaProduktu})` +
      `).`;
    const updateData =
      `pracownik(` +
      `id_pracownika('${idProduktu}'),` +
      `typ_produktu(${queryParams.typProduktu || product.typProduktu}),` +
      `nazwa_produktu(${queryParams.nazwaProduktu || product.nazwaProduktu}),` +
      `rozmiar_produktu(${
        queryParams.rozmiarProduktu || product.rozmiarProduktu
      }),` +
      `kolor_produktu(${queryParams.kolorProduktu || product.kolorProduktu}),` +
      `stan_magazynowy(${
        queryParams.stanMagazynowy || product.stanMagazynowy
      }),` +
      `cena_produktu(${queryParams.cenaProduktu || product.cenaProduktu})` +
      `).`;
    await this.prologDBService.update(removeData, updateData);
    return await this.getProduct(idProduktu);
  }
}