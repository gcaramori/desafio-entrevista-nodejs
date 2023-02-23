import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { CreateVehicleDTO } from './dto/createVehicle.dto';
import { UpdateVehicleDTO } from './dto/updateVehicle.dto';

@Injectable()
export class VehicleRepository {
    constructor(
        @InjectRepository(Vehicle) private readonly repository: Repository<Vehicle>
    ){}

    async create(VehicleData: CreateVehicleDTO): Promise<Vehicle> {
        const createdVehicle = await this.repository.create(VehicleData);

        return await this.repository.save(createdVehicle);
    }

    async findAll(): Promise<Vehicle[]> {
        return this.repository.find();
    }

    async findById(id: string): Promise<Vehicle> {
        const Vehicle = await this.repository.findOne({
            where: { id: id }
        });

        return Vehicle;
    }

    async update(id: string, updateData: UpdateVehicleDTO): Promise<Vehicle> {
        const store = await this.repository.update(id, updateData);

        const returnStore = await this.repository.findOne({
            where: { id: id }
        });

        return returnStore;
    }  

    async delete(id: string): Promise<Vehicle> {
        const deletedData = this.repository.findOne({
            where: { id: id }
        });

        await this.repository.delete(id);

        return deletedData;
    }
}