import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetProducts {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  typProduktu: string | undefined;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  nazwaProduktu: string | undefined;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  rozmiarProduktu: string | undefined;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  kolorProduktu: string | undefined;

  @ApiPropertyOptional()
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  stanMagazynowy: number | undefined;

  @ApiPropertyOptional()
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  cenaProduktu: number | undefined;
}
