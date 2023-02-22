import { Injectable } from '@nestjs/common';
import { CreateCarDTO } from './dto/createCar.dto';
import { UpdateCarDTO } from './dto/updateCar.dto';
import { Car } from './entities/car.entity';
import { CarRepository } from './car.repository';

@Injectable()
export class CarService {
    constructor(
        private readonly carRepository: CarRepository
    ) {}

    async create(carData: CreateCarDTO) {
        return this.carRepository.create(carData);
    }

    async findAll(): Promise<Car[]> {
        return this.carRepository.findAll();
    }

    async findById(id: string): Promise<Car> {
        return this.carRepository.findById(id);
    }

    async update(id: string, updateData: UpdateCarDTO): Promise<Car> {
        return this.carRepository.update(id, updateData);
    }

    async delete(id: string): Promise<Car> {
        return this.carRepository.delete(id);
    }
}