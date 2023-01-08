import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { prologDB } from 'db/prologDB.service';
import * as crypto from 'crypto';
import { GetOrders } from './dto/getOrders.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly configService: ConfigService) {}

  private readonly databaseName =
    this.configService.get<string>('DATABASE_NAME');
  private prologDBService = new prologDB(this.databaseName);

  async getManyOrders(
    idProduktu: string,
    iloscProduktu: number | string,
    idMagazyniera: string,
    idSprzedawcy: string,
    statusZamowienia: string,
  ) {
    const query = `
    zamowienie(
        id_zamowienia(IdZamowienia),
        id_produktu(produkt(id_produktu(${idProduktu}),_,_,_,_,_)),
        ilosc(${iloscProduktu}),
        id_magazyniera(pracownik(id_pracownika(${idMagazyniera}),_,_,_,_)),
        id_sprzedawcy(pracownik(id_pracownika(${idSprzedawcy}),_,_,_,_)),
        status(${statusZamowienia})
    ),
    zamowienie(
        id_zamowienia(IdZamowienia),
        id_produktu(produkt(id_produktu(IdProduktu),_,_,_,_,_)),
        ilosc(IloscProduktu),
        id_magazyniera(pracownik(id_pracownika(IdMagazyniera),_,_,_,_)),
        id_sprzedawcy(pracownik(id_pracownika(IdSprzedawcy),_,_,_,_)),
        status(StatusZamowienia)
    ).`;
    const result = await this.prologDBService.find(query);
    if (!result) throw new InternalServerErrorException();
    return result;
  }

  async getOrder(idZamowienia: string) {
    const query = `
    zamowienie(
        id_zamowienia('${idZamowienia}'),
        id_produktu(produkt(id_produktu(IdProduktu),_,_,_,_,_)),
        ilosc(IloscProduktu),
        id_magazyniera(pracownik(id_pracownika(IdMagazyniera),_,_,_,_)),
        id_sprzedawcy(pracownik(id_pracownika(IdSprzedawcy),_,_,_,_)),
        status(StatusZamowienia)
    ).`;
    const result = await this.prologDBService.findOne(query);
    if (!result) throw new InternalServerErrorException();
    return { ...result, idZamowienia } as {
      idZamowienia: string;
      idProduktu: string;
      iloscProduktu: number;
      idMagazyniera: string;
      idSprzedawcy: string;
      statusZamowienia: string;
    };
  }

  async insertOrder(
    idProduktu: string,
    iloscProduktu: number | string,
    idMagazyniera: string,
    idSprzedawcy: string,
    statusZamowienia: string,
  ) {
    const idZamowienia = crypto.randomUUID();

    const data =
      `zamowienie(` +
      `id_zamowienia('${idZamowienia}'),` +
      `id_produktu(produkt(id_produktu('${idProduktu}'),_,_,_,_,_)),` +
      `ilosc(${iloscProduktu}),` +
      `id_magazyniera(pracownik(id_pracownika('${idMagazyniera}'),_,_,_,_)),` +
      `id_sprzedawcy(pracownik(id_pracownika('${idSprzedawcy}'),_,_,_,_)),` +
      `status(${statusZamowienia})` +
      `).`;
    await this.prologDBService.insert(data);
    return await this.getOrder(idZamowienia);
  }

  async removeOrder(idZamowienia: string) {
    const order = await this.getOrder(idZamowienia);
    const data =
      `zamowienie(` +
      `id_zamowienia('${idZamowienia}'),` +
      `id_produktu(produkt(id_produktu('${order.idProduktu}'),_,_,_,_,_)),` +
      `ilosc(${order.iloscProduktu}),` +
      `id_magazyniera(pracownik(id_pracownika('${order.idMagazyniera}'),_,_,_,_)),` +
      `id_sprzedawcy(pracownik(id_pracownika('${order.idSprzedawcy}'),_,_,_,_)),` +
      `status(${order.statusZamowienia})` +
      `).`;
    await this.prologDBService.remove(data);
  }

  async updateOrder(idZamowienia: string, queryParams: GetOrders) {
    const order = await this.getOrder(idZamowienia);
    const removeData =
      `zamowienie(` +
      `id_zamowienia('${idZamowienia}'),` +
      `id_produktu(produkt(id_produktu('${order.idProduktu}'),_,_,_,_,_)),` +
      `ilosc(${order.iloscProduktu}),` +
      `id_magazyniera(pracownik(id_pracownika('${order.idMagazyniera}'),_,_,_,_)),` +
      `id_sprzedawcy(pracownik(id_pracownika('${order.idSprzedawcy}'),_,_,_,_)),` +
      `status(${order.statusZamowienia})` +
      `).`;

    const updateData =
      `zamowienie(` +
      `id_zamowienia('${idZamowienia}'),` +
      `id_produktu(produkt(id_produktu('${
        queryParams.idProduktu || order.idProduktu
      }'),_,_,_,_,_)),` +
      `ilosc(${queryParams.iloscProduktu || order.iloscProduktu}),` +
      `id_magazyniera(pracownik(id_pracownika('${
        queryParams.idMagazyniera || order.idMagazyniera
      }'),_,_,_,_)),` +
      `id_sprzedawcy(pracownik(id_pracownika('${
        queryParams.idSprzedawcy || order.idSprzedawcy
      }'),_,_,_,_)),` +
      `status(${queryParams.statusZamowienia || order.statusZamowienia})` +
      `).`;
    await this.prologDBService.update(removeData, updateData);
    return await this.getOrder(idZamowienia);
  }
}
