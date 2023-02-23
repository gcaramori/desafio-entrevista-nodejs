import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Vehicle } from './vehicles/entities/vehicle.entity';
import { Store } from './stores/entities/store.entity';
import { VacancyControl } from './vacancyControl/entities/vacancyControl.entity';
import { VehicleModule } from './vehicles/vehicle.module';
import { StoreModule } from './stores/store.module';
import { VacancyControlModule } from './vacancyControl/vacancyControl.module';
import { AuthenticationModule } from './shared/authentication/authentication.module';
import { AuthenticationMiddleware } from './shared/middleware/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Store, Vehicle, VacancyControl],
      synchronize: true
    }),
    AuthenticationModule,
    StoreModule,
    VehicleModule,
    VacancyControlModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes('/api/v1/stores', '/api/v1/vehicles');
  }
}