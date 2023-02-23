import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateVehicleDTO } from './dto/createVehicle.dto';
import { Vehicle } from './entities/vehicle.entity';
import { VehicleService } from './vehicle.service';
import { UpdateVehicleDTO } from './dto/updateVehicle.dto';

@Controller('/api/v1/vehicles')
export class VehicleController {
    constructor(
        private readonly vehicleService: VehicleService
    ) {}
    
    @ApiBearerAuth()
    @Post()
    async create(@Body() vehicleData: CreateVehicleDTO): Promise<Vehicle> {
        return this.vehicleService.create(vehicleData);
    }

    @ApiBearerAuth()
    @Get()
    async findAll(): Promise<Vehicle[]> {
        return this.vehicleService.findAll();
    }

    @ApiBearerAuth()
    @Get(':id')
    async findById(@Param('id') id: string): Promise<Vehicle> {
        return this.vehicleService.findById(id);
    }

    @ApiBearerAuth()
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateData: UpdateVehicleDTO): Promise<Vehicle> {
        return this.vehicleService.update(id, updateData);
    }

    @ApiBearerAuth()
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Vehicle> {
        return this.vehicleService.delete(id);
    }
}