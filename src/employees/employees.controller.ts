import { Controller, Get, Query } from '@nestjs/common';
import { getMany, loadDatabase } from '../utils/prolog-communication';
import { GetEmployees } from './dto/getEmployees.dto';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  async getEmployees(@Query() queryParams: GetEmployees) {
    const idPracownika = queryParams.idPracownika || 'IdPracownika';
    const imiePracownika = queryParams.imiePracownika || 'ImiePracownika';
    const nazwiskoPracownika =
      queryParams.nazwiskoPracownika || 'NazwiskoPracownika';
    const wiekPracownika = queryParams.wiekPracownika || 'WiekPracownika';

    return this.employeesService.getEmployees(
      idPracownika,
      imiePracownika,
      nazwiskoPracownika,
      wiekPracownika,
    );
  }
}
