import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ProductsModule } from './app/products/products.module'
import { CountApiModule } from './app/count-api/count-api.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ProductsModule, CountApiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
