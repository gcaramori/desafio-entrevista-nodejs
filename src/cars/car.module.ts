import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { CarRepository } from './car.repository';
import { Car } from './entities/car.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Car])],
    controllers: [CarController],
    providers: [CarService, CarRepository]
})
export class CarModule {}