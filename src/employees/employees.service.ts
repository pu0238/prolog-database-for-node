import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { getMany, loadDatabase } from '../utils/prolog-communication';

@Injectable()
export class EmployeesService {
  private database = loadDatabase('bazaTest');

  async getEmployees(
    idPracownika: number | string,
    imiePracownika: string,
    nazwiskoPracownika: string,
    wiekPracownika: number | string,
  ) {
    // TODO: ADD OPCION TO LIST MANY EMPLOYEES
    const query = `
    magazynier(
      id_pracownika(${idPracownika}),
      imie_pracownika(${imiePracownika}),
      nazwisko_pracownika(${nazwiskoPracownika}),
      wiek_pracownika(${wiekPracownika})
    ).`;

    const result = await getMany(this.database, query);
    if (!result) throw new InternalServerErrorException();
    return result;
  }
}
