import { Module } from '@nestjs/common';
import { PrologDatabase } from './prolog-database.service';

@Module({})
export class PrologDatabaseModule {
  providers: [PrologDatabase];
}
