import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from './entities/store.entity';
import { CreateStoreDTO } from './dto/createStore.dto';
import { UpdateStoreDTO } from './dto/updateStore.dto';

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

    async findAll(): Promise<Store[]> {
        return this.repository.find();
    }

    async findById(id: string): Promise<Store> {
        const store = await this.repository.findOne({
            where: { id: id }
        });

        return store;
    }

    async update(id: string, updateData: UpdateStoreDTO): Promise<Store> {
        const updatedStore = await this.repository.save({ id, updateData });

        return updatedStore;
    }  

    async delete(id: string): Promise<Store> {
        const deletedData = this.repository.findOne({
            where: { id: id }
        });

        await this.repository
        .createQueryBuilder('stores')
        .delete()
        .where("id = :id", { id: id })
        .execute();

        return deletedData;
    }
}