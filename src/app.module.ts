import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ProductsModule } from './app/products/products.module'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
