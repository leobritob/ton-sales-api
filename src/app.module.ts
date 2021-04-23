import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ProductsModule } from './app/products/products.module'
import { CountApiModule } from './app/count-api/count-api.module';
import { HealthModule } from './app/health/health.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ProductsModule, CountApiModule, HealthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
