import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { GetEmployees } from './dto/getEmployees.dto';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  async getManyEmployees(@Query() queryParams: GetEmployees) {
    const imiePracownika = queryParams.imiePracownika || 'ImiePracownika';
    const nazwiskoPracownika =
      queryParams.nazwiskoPracownika || 'NazwiskoPracownika';
    const wiekPracownika = queryParams.wiekPracownika || 'WiekPracownika';
    const stanowisko = queryParams.stanowisko || 'Stanowisko';

    return this.employeesService.getManyEmployees(
      imiePracownika,
      nazwiskoPracownika,
      wiekPracownika,
      stanowisko,
    );
  }

  @Get(':id')
  async getEmployee(@Param('id') idPracownika: string) {
    return this.employeesService.getEmployee(idPracownika);
  }

  @Post()
  async insertEmployee() {
    return this.employeesService.insertEmployee();
  }
}
