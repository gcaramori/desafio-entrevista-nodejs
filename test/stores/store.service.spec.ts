import { Test, TestingModule } from "@nestjs/testing";
import { createStoreMock, updateStoreMock, mockStore } from "./stores";
import { StoreService } from "../../src/stores/store.service";
import { StoreRepository } from "../../src/stores/store.repository";

describe('Store service', () => {
    let service: StoreService;
    let repository: StoreRepository;

    beforeEach(async () => {
        const mockService = {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn()
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                StoreService,
                {
                    provide: StoreRepository,
                    useValue: mockService
                }
            ]
        }).compile();

        service = module.get<StoreService>(StoreService);
        repository = module.get<StoreRepository>(StoreRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create a store', () => {
        it('should call Store repository create with correct values', async () => {
          const createSpy = jest.spyOn(service, 'create');
    
          const mockParam = createStoreMock();
    
          await service.create(mockParam);
    
          expect(createSpy).toHaveBeenCalledWith(mockParam);
        });

        it('should throw if Store repository create throw errors', async () => {
            jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());
      
            await expect(service.create(createStoreMock())).rejects.toThrow(new Error());
        });
        
        it('should return a Store on success', async () => {
            const mockReturn = mockStore();
            
            jest.spyOn(service, 'create').mockResolvedValueOnce(mockReturn);
      
            const response = await service.create(createStoreMock())
      
            expect(response).toEqual(mockReturn);
        });
    });

    describe('find all stores', () => {
        it('should call Store repository find all', async () => {
            const findSpy = jest.spyOn(service, 'findAll');

            await service.findAll();

            expect(findSpy).toHaveBeenCalled();
        });

        it('should throw if Store repository find all throw errors', async () => {
            jest.spyOn(service, 'findAll').mockRejectedValueOnce(new Error());

            await expect(service.findAll()).rejects.toThrow(new Error());
        });

        it('should return an array of Stores on success', async () => {
            const mockReturn = [mockStore()];

            jest.spyOn(service, 'findAll').mockResolvedValueOnce(mockReturn);

            const response = await service.findAll();

            expect(response).toEqual(mockReturn);
        });
    });

    describe('find a store by id', () => {
        it('should call Store repository find by id correctly', async () => {
            const findSpy = jest.spyOn(service, 'findById');

            await service.findById('randomid');

            expect(findSpy).toHaveBeenCalledWith('randomid');
        });
        
        it('should throw if Store repository find by id throw errors', async () => {
            jest.spyOn(service, 'findById').mockRejectedValueOnce(new Error());

            await expect(service.findById('randomid')).rejects.toThrow(new Error());
        });
        
        it('should return a Store on success', async () => {
            const mockReturn = mockStore();

            jest.spyOn(service, 'findById').mockResolvedValueOnce(mockReturn);

            const response = await service.findById('randomid');

            expect(response).toEqual(mockReturn);
        });
    });

    describe('update a store', () => {
        it('should call Store repository update with correct id and values', async () => {
            const updateSpy = jest.spyOn(service, 'update');
        
            const mockParam = updateStoreMock();
        
            await service.update('randomid', mockParam);
        
            expect(updateSpy).toHaveBeenCalledWith('randomid', mockParam);
        });

        it('should throw if Store repository update throw errors', async () => {
            jest.spyOn(service, 'update').mockRejectedValueOnce(new Error());

            await expect(service.update('randomid', updateStoreMock())).rejects.toThrow(new Error());
        });
    });

    describe('delete a store', () => {
        it('should call Store repository delete with correct id', async () => {
            const deleteSpy = jest.spyOn(service, 'delete');

            await service.delete('randomid');

            expect(deleteSpy).toHaveBeenCalledWith('randomid');
        });

        it('should throw if Store repository delete throw errors', async () => {
            jest.spyOn(service, 'delete').mockRejectedValueOnce(new Error());

            await expect(service.delete('randomid')).rejects.toThrow(new Error())
        });
    });
});