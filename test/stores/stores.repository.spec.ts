import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, UpdateResult, UpdateQueryBuilder } from 'typeorm';
import { createStoreMock, mockStore, updateStoreMock } from './stores';
import { Store } from '../../src/stores/entities/store.entity';
import { StoreRepository } from '../../src/stores/store.repository';

describe('Store repository', () => {
    let repository: StoreRepository;
    let ormMock: Repository<Store>;

    beforeEach(async () => {
        const mockOrmRepository = {
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn()
        };

        const moduleRef = await Test.createTestingModule({
            providers: [
                StoreRepository,
                {
                    provide: getRepositoryToken(Store),
                    useValue: mockOrmRepository
                }
            ]
        }).compile();
        
        repository = moduleRef.get<StoreRepository>(StoreRepository);
        ormMock = moduleRef.get(getRepositoryToken(Store));
    });

    describe('creating a store', () => {
        it('should create a new store', async () => {
            jest.spyOn(ormMock, 'create').mockReturnValueOnce(mockStore())

            const response = await repository.create(createStoreMock());

            expect(response.id).toBeTruthy();
            expect(response.name).toBe('random store');
            expect(response.cnpj).toBe('55.674.472/0001-11');
            expect(response.address).toBe('Rua Olivio Belinate, 147');
            expect(response.telephone).toBe('(19) 97858-3232');
            expect(response.qtyCars).toBe(10);
            expect(response.qtyMotorcicles).toBe(20);
        });
    });

    describe('find all stores', () => {
        it('should return all stores', async () => {
          const mockReturn = [mockStore()];
    
          jest.spyOn(ormMock, 'find').mockResolvedValueOnce(mockReturn);
    
          const response = await repository.findAll();
    
          expect(response).toEqual(mockReturn);
        });
    });

    describe('find store by id', () => {
        it('should return a store', async () => {
            const mockReturn = mockStore();

            jest.spyOn(ormMock, 'findOne').mockResolvedValueOnce(mockReturn);

            const response = await repository.findById('randomid');

            expect(response).toEqual(mockReturn);
        });
    });

    describe('find store by cnpj', () => {
        it('should return a store', async () => {
            const mockReturn = mockStore();

            jest.spyOn(ormMock, 'findOne').mockResolvedValueOnce(mockReturn);

            const response = await repository.findByCnpj('55.674.472/0001-11');

            expect(response).toEqual(mockReturn);
        });
    });

    describe('update a store', () => {
        it('should call mockRepository update with correct id', async () => {
            const mockParam = updateStoreMock();
            
            const updateSpy = jest.spyOn(ormMock, 'update');

            await repository.update('randomid', mockParam);

            expect(updateSpy).toHaveBeenCalledWith('randomid', mockParam);
        });
    });

    describe('delete a store', () => {
        it('should call mockRepository delete with correct id', async () => {
          const deleteSpy = jest.spyOn(ormMock, 'delete');
    
          await repository.delete('randomid');
    
          expect(deleteSpy).toHaveBeenCalledWith('randomid');
        });
    });
})