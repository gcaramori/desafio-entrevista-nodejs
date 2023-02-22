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
        const car = this.repository.create(carData);

        await this.repository.save(car);

        return car;
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
        const updatedCar = await this.repository.save({ id, updateData });

        return updatedCar;
    }  

    async delete(id: string): Promise<Car> {
        const deletedData = this.repository.findOne({
            where: { id: id }
        });

        await this.repository
        .createQueryBuilder('cars')
        .delete()
        .where("id = :id", { id: id })
        .execute();

        return deletedData;
    }
}