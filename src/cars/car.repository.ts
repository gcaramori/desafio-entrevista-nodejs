import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './entities/car.entity';
import { CreateCarDTO } from './dto/createCar.dto';
import { UpdateCarDTO } from './dto/updateCar.dto';

@Injectable()
export class CarRepository {  
    constructor(
        @InjectRepository(Car) private readonly repository: Repository<Car>
    ){}

    async create(carData: CreateCarDTO): Promise<Car> {
        const createdCar = await this.repository.create(carData);

        return await this.repository.save(createdCar);
    }

    async findAll(): Promise<Car[]> {
        return this.repository.find();
    }

    async findById(id: string): Promise<Car> {
        const car = await this.repository.findOne({
            where: { id: id }
        });

        return car;
    }

    async update(id: string, updateData: UpdateCarDTO): Promise<Car> {
        const store = await this.repository.update(id, updateData);

        const returnStore = await this.repository.findOne({
            where: { id: id }
        });

        return returnStore;
    }  

    async delete(id: string): Promise<Car> {
        const deletedData = this.repository.findOne({
            where: { id: id }
        });

        await this.repository.delete(id);

        return deletedData;
    }
}