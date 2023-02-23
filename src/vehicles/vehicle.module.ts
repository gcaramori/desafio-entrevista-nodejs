import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { VehicleRepository } from './vehicle.repository';
import { Vehicle } from './entities/vehicle.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Vehicle])],
    controllers: [VehicleController],
    providers: [VehicleService, VehicleRepository]
})
export class VehicleModule {}