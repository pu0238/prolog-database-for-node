import { prologDB } from './../../db/prologDB.service';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmployeesService {
  //DATABASE_NAME
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
    console.log(result);
    if (!result) throw new InternalServerErrorException();
    return { ...result, idPracownika };
  }

  async insertEmployee() {
    const data = `pracownik(id_pracownika("42adde3b-8025-4d3c-866f-5f3d51c7f8d4"), stanowisko(magazynier), imie_pracownika(jan), nazwisko_pracownika(kowalski), wiek_pracownika(35)).`;
    const result = await this.prologDBService.insert(data);
    /*const data =
      `pracownik(` +
      `id_pracownika('${idPracownika}'), ` +
      `stanowisko(Stanowisko), ` +
      `imie_pracownika(ImiePracownika), ` +
      `nazwisko_pracownika(NazwiskoPracownika), ` +
      `wiek_pracownika(WiekPracownika)` +
      `).`;*/
    /*
    fs.appendFileSync(data);

    const result = await getOne(this.database, query);
    if (!result) throw new InternalServerErrorException();
    return { ...result, idPracownika };*/
  } /**/
}
