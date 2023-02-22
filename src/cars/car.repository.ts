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
        const car = await this.repository
        .createQueryBuilder()
        .insert()
        .into(Car)
        .values({
            brand: carData.brand,
            model: carData.model,
            color: carData.color,
            sign_code: carData.sign_code,
            type: carData.type,
            store: {
                id: carData.store
            },
        })
        .execute();
        
        return await this.repository.findOne({
            where: { id: car.identifiers[0].id }
        });
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
        const updatedCar = await this.repository
        .createQueryBuilder()
        .update(Car)
        .set(updateData)
        .where("id = :id", { id: id })
        .execute();

        return await this.repository.findOne({
            where: { id: id }
        });
    }  

    async delete(id: string): Promise<Car> {
        const deletedData = this.repository.findOne({
            where: { id: id }
        });

        await this.repository.delete(id);

        return deletedData;
    }
}