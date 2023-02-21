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
            findById: jest.fn()
        }

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

        it('should throw if Store service throw errors', async () => {
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

        it('should throw if Store service throw errors', async () => {
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
    });
});