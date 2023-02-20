import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from './entities/store.entity';
import { CreateStoreDTO } from './dto/createStore.dto';

@Injectable()
export class StoreRepository {  
    constructor(
        @InjectRepository(Store) private readonly repository: Repository<Store>
    ){}

    async create(storeData: CreateStoreDTO) {
        const store = this.repository.create(storeData);

        await this.repository.save(store);

        return store;
    }
}