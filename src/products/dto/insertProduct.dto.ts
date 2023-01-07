import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class InsertProduct {
  @IsString()
  @ApiProperty()
  typProduktu: string;

  @IsString()
  @ApiProperty()
  nazwaProduktu: string;

  @IsString()
  @ApiProperty()
  rozmiarProduktu: string;

  @IsString()
  @ApiProperty()
  kolorProduktu: string;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty()
  stanMagazynowy: number;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty()
  cenaProduktu: number;
}
