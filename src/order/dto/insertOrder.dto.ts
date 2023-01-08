import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class InsertOrder {
  @ApiProperty()
  @IsString()
  idProduktu: string;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  iloscProduktu: number;

  @ApiProperty()
  @IsString()
  idMagazyniera: string;

  @ApiProperty()
  @IsString()
  idSprzedawcy: string;

  @ApiProperty()
  @IsString()
  statusZamowienia: string;
}
