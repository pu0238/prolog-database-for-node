import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetEmployees {
  @ApiProperty()
  @IsString()
  @IsOptional()
  imiePracownika: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  nazwiskoPracownika: string;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  wiekPracownika: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  stanowisko;
}
