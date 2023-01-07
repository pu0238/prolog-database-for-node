import { prologDB } from './../../db/prologDB.service';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { GetEmployees } from './dto/getEmployees.dto';

@Injectable()
export class EmployeesService {
  constructor(private readonly configService: ConfigService) {}

  private readonly databaseName =
    this.configService.get<string>('DATABASE_NAME');
  private prologDBService = new prologDB(this.databaseName);

  async getManyEmployees(
    imiePracownika: string,
    nazwiskoPracownika: string,
    wiekPracownika: number | string,
    stanowisko: string,
  ) {
    const query = `
    pracownik(
      id_pracownika(IdPracownika),
      stanowisko(${stanowisko}),
      imie_pracownika(${imiePracownika}),
      nazwisko_pracownika(${nazwiskoPracownika}),
      wiek_pracownika(${wiekPracownika})
    ),
    pracownik(
      id_pracownika(IdPracownika),
      stanowisko(Stanowisko),
      imie_pracownika(ImiePracownika),
      nazwisko_pracownika(NazwiskoPracownika),
      wiek_pracownika(WiekPracownika)
    ).`;
    const result = await this.prologDBService.find(query); //await getMany(this.database, query);
    if (!result) throw new InternalServerErrorException();
    return result;
  }

  async getEmployee(idPracownika: string) {
    const query = `
    pracownik(
      id_pracownika('${idPracownika}'),
      stanowisko(Stanowisko),
      imie_pracownika(ImiePracownika),
      nazwisko_pracownika(NazwiskoPracownika),
      wiek_pracownika(WiekPracownika)
    ).`;

    const result = await this.prologDBService.findOne(query);
    if (!result) throw new InternalServerErrorException();
    return { ...result, idPracownika } as {
      idPracownika: string;
      stanowisko: string;
      imiePracownika: string;
      nazwiskoPracownika: string;
      wiekPracownika: number;
    };
  }

  async insertEmployee(
    imiePracownika: string,
    nazwiskoPracownika: string,
    wiekPracownika: number,
    stanowisko: string,
  ) {
    const idPracownika = crypto.randomUUID();
    const data =
      `pracownik(` +
      `id_pracownika('${idPracownika}'),` +
      `stanowisko(${stanowisko}),` +
      `imie_pracownika(${imiePracownika}),` +
      `nazwisko_pracownika(${nazwiskoPracownika}),` +
      `wiek_pracownika(${wiekPracownika})` +
      `).`;
    await this.prologDBService.insert(data);
    return await this.getEmployee(idPracownika);
  }

  async removeEmployee(idPracownika: string) {
    const employee = await this.getEmployee(idPracownika);
    const data =
      `pracownik(` +
      `id_pracownika('${idPracownika}'),` +
      `stanowisko(${employee.stanowisko}),` +
      `imie_pracownika(${employee.imiePracownika}),` +
      `nazwisko_pracownika(${employee.nazwiskoPracownika}),` +
      `wiek_pracownika(${employee.wiekPracownika})` +
      `).`;
    await this.prologDBService.remove(data);
  }

  async updateEmployee(idPracownika: string, queryParams: GetEmployees) {
    const employee = await this.getEmployee(idPracownika);
    const removeData =
      `pracownik(` +
      `id_pracownika('${idPracownika}'),` +
      `stanowisko(${employee.stanowisko}),` +
      `imie_pracownika(${employee.imiePracownika}),` +
      `nazwisko_pracownika(${employee.nazwiskoPracownika}),` +
      `wiek_pracownika(${employee.wiekPracownika})` +
      `).`;
    const updateData =
      `pracownik(` +
      `id_pracownika('${idPracownika}'),` +
      `stanowisko(${queryParams.stanowisko || employee.stanowisko}),` +
      `imie_pracownika(${
        queryParams.imiePracownika || employee.imiePracownika
      }),` +
      `nazwisko_pracownika(${
        queryParams.nazwiskoPracownika || employee.nazwiskoPracownika
      }),` +
      `wiek_pracownika(${
        queryParams.wiekPracownika || employee.wiekPracownika
      })` +
      `).`;
    await this.prologDBService.update(removeData, updateData);
    return await this.getEmployee(idPracownika);
  }
}
