import { Body, Controller, Post } from '@nestjs/common';
import { CreateStoreDTO } from './dto/createStore.dto';
import { Store } from './entities/store.entity';
import { StoreService } from './store.service';

@Controller('/api/v1/stores')
export class StoreController {
    constructor(
        private readonly storeService: StoreService
    ) {}

    @Post()
    async create(@Body() storeData: CreateStoreDTO): Promise<Store> {
        return this.storeService.create(storeData);
    }
}