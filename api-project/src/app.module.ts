import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from 'prisma/prisma.module';
import { OrdersModule } from './orders/orders.module';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [ProductsModule, PrismaModule, OrdersModule, CustomersModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
