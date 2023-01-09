import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './order/orders.module';
import { PrologDatabaseModule } from './prolog-database/prolog-database.module';

@Module({
  imports: [
    EmployeesModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ProductsModule,
    OrdersModule,
    PrologDatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
