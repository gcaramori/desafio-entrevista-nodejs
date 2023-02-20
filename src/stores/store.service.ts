import { Injectable } from '@nestjs/common';
import { CreateStoreDTO } from './dto/createStore.dto';
import { Store } from './entities/store.entity';
import { StoreRepository } from './store.repository';

@Injectable()
export class StoreService {
    constructor(
        private readonly storeRepository: StoreRepository
    ) {}

    async create(storeData: CreateStoreDTO) {
        return this.storeRepository.create(storeData);
    }
}