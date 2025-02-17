import { Test, TestingModule } from "@nestjs/testing";
import { createStoreMock, updateStoreMock, mockStore } from "./stores";
import { StoreController } from "../../src/stores/store.controller";
import { StoreService } from "../../src/stores/store.service";

describe('Store controller', () => {
    let controller: StoreController;
    let service: StoreService;

    beforeEach(async () => {
        const mockService = {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            findByCnpj: jest.fn(),
            update: jest.fn(),
            delete: jest.fn()
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [StoreController],
            providers: [
                {
                    provide: StoreService,
                    useValue: mockService
                }
            ]
        }).compile();

        controller = module.get<StoreController>(StoreController);
        service = module.get<StoreService>(StoreService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create a store', () => {
        it('should call Store service create with correct values', async () => {
          const createSpy = jest.spyOn(service, 'create');
    
          const mockParam = createStoreMock();
    
          await controller.create(mockParam);
    
          expect(createSpy).toHaveBeenCalledWith(mockParam);
        });

        it('should throw if Store service create throw errors', async () => {
            jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());
      
            await expect(controller.create(createStoreMock())).rejects.toThrow(new Error());
        });
        
        it('should return a Store on success', async () => {
            const mockReturn = mockStore();
            
            jest.spyOn(service, 'create').mockResolvedValueOnce(mockReturn);
      
            const response = await controller.create(createStoreMock())
      
            expect(response).toEqual(mockReturn);
        });
    });

    describe('find all stores', () => {
        it('should call Store service find all', async () => {
            const findSpy = jest.spyOn(service, 'findAll');

            await controller.findAll();

            expect(findSpy).toHaveBeenCalled();
        });

        it('should throw if Store service find all throw errors', async () => {
            jest.spyOn(service, 'findAll').mockRejectedValueOnce(new Error());

            await expect(controller.findAll()).rejects.toThrow(new Error());
        });

        it('should return an array of Stores on success', async () => {
            const mockReturn = [mockStore()];

            jest.spyOn(service, 'findAll').mockResolvedValueOnce(mockReturn);

            const response = await controller.findAll();

            expect(response).toEqual(mockReturn);
        });
    });

    describe('find a store by id', () => {
        it('should call Store service find by id correctly', async () => {
            const findSpy = jest.spyOn(service, 'findById');

            await controller.findById('randomid');

            expect(findSpy).toHaveBeenCalledWith('randomid');
        });
        
        it('should throw if Store service find by id throw errors', async () => {
            jest.spyOn(service, 'findById').mockRejectedValueOnce(new Error());

            await expect(controller.findById('randomid')).rejects.toThrow(new Error());
        });
        
        it('should return a Store on success', async () => {
            const mockReturn = mockStore();

            jest.spyOn(service, 'findById').mockResolvedValueOnce(mockReturn);

            const response = await controller.findById('randomid');

            expect(response).toEqual(mockReturn);
        });
    });

    describe('update a store', () => {
        it('should call Store service update with correct id and values', async () => {
            const updateSpy = jest.spyOn(service, 'update');
        
            const mockParam = updateStoreMock();
        
            await controller.update('randomid', mockParam);
        
            expect(updateSpy).toHaveBeenCalledWith('randomid', mockParam);
        });

        it('should throw if Store service update throw errors', async () => {
            jest.spyOn(service, 'update').mockRejectedValueOnce(new Error());

            await expect(controller.update('randomid', updateStoreMock())).rejects.toThrow(new Error());
        });
    });

    describe('delete a store', () => {
        it('should call Store service delete with correct id', async () => {
            const deleteSpy = jest.spyOn(service, 'delete');

            await controller.delete('randomid');

            expect(deleteSpy).toHaveBeenCalledWith('randomid');
        });

        it('should throw if Store service delete throw errors', async () => {
            jest.spyOn(service, 'delete').mockRejectedValueOnce(new Error());

            await expect(controller.delete('randomid')).rejects.toThrow(new Error())
        });
    });
});