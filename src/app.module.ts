import { Module } from '@nestjs/common';
import { ProductsModule } from './app/products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
