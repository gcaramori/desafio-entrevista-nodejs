import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateStoreDTO } from './dto/createStore.dto';
import { Store } from './entities/store.entity';
import { StoreService } from './store.service';
import { UpdateStoreDTO } from './dto/updateStore.dto';

@Controller('/api/v1/stores')
export class StoreController {
    constructor(
        private readonly storeService: StoreService
    ) {}
    
    @ApiBearerAuth()
    @Post()
    async create(@Body() storeData: CreateStoreDTO): Promise<Store> {
        return this.storeService.create(storeData);
    }

    @ApiBearerAuth()
    @Get()
    async findAll(): Promise<Store[]> {
        return this.storeService.findAll();
    }

    @ApiBearerAuth()
    @Get(':id')
    async findById(@Param('id') id: string): Promise<Store> {
        return this.storeService.findById(id);
    }

    @ApiBearerAuth()
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateData: UpdateStoreDTO): Promise<void> {
        return this.storeService.update(id, updateData);
    }

    @ApiBearerAuth()
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.storeService.delete(id);
    }
}