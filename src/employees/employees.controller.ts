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
import { GetEmployees } from './dto/getEmployees.dto';
import { EmployeesService } from './employees.service';
import { InsertEmployee } from './dto/insertEmployee.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Employees')
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
    return await this.employeesService.getEmployee(idPracownika);
  }

  @Post()
  async insertEmployee(@Body() queryParams: InsertEmployee) {
    return await this.employeesService.insertEmployee(
      queryParams.imiePracownika,
      queryParams.nazwiskoPracownika,
      queryParams.wiekPracownika,
      queryParams.stanowisko,
    );
  }

  @Delete(':id')
  async removeEmployee(@Param('id') idPracownika: string) {
    return await this.employeesService.removeEmployee(idPracownika);
  }

  @Put(':id')
  async updateEmployee(
    @Param('id') idPracownika: string,
    @Body() queryParams: GetEmployees,
  ) {
    return await this.employeesService.updateEmployee(
      idPracownika,
      queryParams,
    );
  }
}
