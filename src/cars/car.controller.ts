import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateCarDTO } from './dto/createCar.dto';
import { Car } from './entities/car.entity';
import { CarService } from './car.service';
import { UpdateCarDTO } from './dto/updateCar.dto';

@Controller('/api/v1/cars')
export class CarController {
    constructor(
        private readonly carService: CarService
    ) {}
    
    @ApiBearerAuth()
    @Post()
    async create(@Body() carData: CreateCarDTO): Promise<Car> {
        return this.carService.create(carData);
    }

    @ApiBearerAuth()
    @Get()
    async findAll(): Promise<Car[]> {
        return this.carService.findAll();
    }

    @ApiBearerAuth()
    @Get(':id')
    async findById(@Param('id') id: string): Promise<Car> {
        return this.carService.findById(id);
    }

    @ApiBearerAuth()
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateData: UpdateCarDTO): Promise<Car> {
        return this.carService.update(id, updateData);
    }

    @ApiBearerAuth()
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Car> {
        return this.carService.delete(id);
    }
}