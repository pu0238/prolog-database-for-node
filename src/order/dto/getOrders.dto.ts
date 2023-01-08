import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetOrders {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  idProduktu: string | undefined;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  idMagazyniera: string | undefined;

  @ApiPropertyOptional()
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  iloscProduktu: number | undefined;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  idSprzedawcy: string | undefined;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  statusZamowienia: string | undefined;
}
