import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateStoreDTO } from './dto/createStore.dto';
import { Store } from './entities/store.entity';
import { StoreService } from './store.service';
import { UpdateStoreDTO } from './dto/updateStore.dto';

@Controller('/api/v1/stores')
export class StoreController {
    constructor(
        private readonly storeService: StoreService
    ) {}

    @Post()
    async create(@Body() storeData: CreateStoreDTO): Promise<Store> {
        return this.storeService.create(storeData);
    }

    @Get()
    async findAll(): Promise<Store[]> {
        return this.storeService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<Store> {
        return this.storeService.findById(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateData: UpdateStoreDTO): Promise<void> {
        return this.storeService.update(id, updateData);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.storeService.delete(id);
    }
}