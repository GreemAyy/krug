import { Module } from'@nestjs/common';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { PlacesModule } from './places/places.module';
import ormconfig from'./ormconfig';
import {TypeOrmModule} from'@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), ProductsModule, UsersModule, OrdersModule, PlacesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
