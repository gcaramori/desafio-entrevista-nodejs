import { Injectable } from '@nestjs/common';
import { CreateStoreDTO } from './dto/createStore.dto';
import { UpdateStoreDTO } from './dto/updateStore.dto';
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

    async findAll(): Promise<Store[]> {
        return this.storeRepository.findAll();
    }

    async findById(id: string): Promise<Store> {
        return this.storeRepository.findById(id);
    }

    async findByCnpj(cnpj: string): Promise<Store> {
        return this.storeRepository.findByCnpj(cnpj);
    }

    async update(id: string, updateData: UpdateStoreDTO): Promise<Store> {
        return this.storeRepository.update(id, updateData);
    }

    async delete(id: string): Promise<Store> {
        return this.storeRepository.delete(id);
    }
}