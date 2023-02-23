import { Injectable } from '@nestjs/common';
import { CreateVehicleDTO } from './dto/createVehicle.dto';
import { UpdateVehicleDTO } from './dto/updateVehicle.dto';
import { Vehicle } from './entities/vehicle.entity';
import { VehicleRepository } from './vehicle.repository';

@Injectable()
export class VehicleService {
    constructor(
        private readonly vehicleRepository: VehicleRepository
    ) {}

    async create(vehicleData: CreateVehicleDTO) {
        return this.vehicleRepository.create(vehicleData);
    }

    async findAll(): Promise<Vehicle[]> {
        return this.vehicleRepository.findAll();
    }

    async findById(id: string): Promise<Vehicle> {
        return this.vehicleRepository.findById(id);
    }

    async update(id: string, updateData: UpdateVehicleDTO): Promise<Vehicle> {
        return this.vehicleRepository.update(id, updateData);
    }

    async delete(id: string): Promise<Vehicle> {
        return this.vehicleRepository.delete(id);
    }
}