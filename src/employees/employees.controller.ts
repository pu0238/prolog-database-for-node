import { Controller, Get } from '@nestjs/common';
import { getMany, loadDatabase } from '../utils/prolog-communication';

@Controller('employees')
export class EmployeesController {
  @Get()
  async getEmployees() {
    const database = loadDatabase('bazaTest');
    const query = `
    magazynier(
      id_pracownika(IdPracownika),
      imie_pracownika(ImiePracownika),
      nazwisko_pracownika(NazwiskoPracownika),
      wiek_pracownika(WiekPracownika)
    ).`;
    const response = await getMany(database, query);
    console.log(response);
    return response;
  }
}
