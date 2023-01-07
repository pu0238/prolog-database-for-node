import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class InsertEmployee {
  @ApiProperty()
  @IsString()
  imiePracownika: string;

  @ApiProperty()
  @IsString()
  nazwiskoPracownika: string;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  wiekPracownika: number;

  @ApiProperty()
  @IsString()
  stanowisko: string;
}
