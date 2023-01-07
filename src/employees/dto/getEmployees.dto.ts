import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetEmployees {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  imiePracownika: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  nazwiskoPracownika: string;

  @ApiPropertyOptional()
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  wiekPracownika: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  stanowisko: string;
}
