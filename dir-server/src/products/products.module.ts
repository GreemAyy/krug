import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity, ProductEntity } from './products.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ProductEntity,ImageEntity])],
  providers: [ProductsService],
  controllers: [ProductsController]
})
export class ProductsModule {}
