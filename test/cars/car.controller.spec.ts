import { Test, TestingModule } from "@nestjs/testing";
import { createCarMock, updateCarMock, mockCar } from "./cars";
import { CarController } from "../../src/cars/car.controller";
import { CarService } from "../../src/cars/car.service";

describe('Car controller', () => {
    let controller: CarController;
    let service: CarService;

    beforeEach(async () => {
        const mockService = {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn()
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [CarController],
            providers: [
                {
                    provide: CarService,
                    useValue: mockService
                }
            ]
        }).compile();

        controller = module.get<CarController>(CarController);
        service = module.get<CarService>(CarService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create a car', () => {
        it('should call Car service create with correct values', async () => {
          const createSpy = jest.spyOn(service, 'create');
    
          const mockParam = createCarMock();
    
          await controller.create(mockParam);
    
          expect(createSpy).toHaveBeenCalledWith(mockParam);
        });

        it('should throw if Car service create throw errors', async () => {
            jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());
      
            await expect(controller.create(createCarMock())).rejects.toThrow(new Error());
        });
        
        it('should return a Car on success', async () => {
            const mockReturn = mockCar();
            
            jest.spyOn(service, 'create').mockResolvedValueOnce(mockReturn);
      
            const response = await controller.create(createCarMock())
      
            expect(response).toEqual(mockReturn);
        });
    });

    describe('find all cars', () => {
        it('should call Car service find all', async () => {
            const findSpy = jest.spyOn(service, 'findAll');

            await controller.findAll();

            expect(findSpy).toHaveBeenCalled();
        });

        it('should throw if Car service find all throw errors', async () => {
            jest.spyOn(service, 'findAll').mockRejectedValueOnce(new Error());

            await expect(controller.findAll()).rejects.toThrow(new Error());
        });

        it('should return an array of Cars on success', async () => {
            const mockReturn = [mockCar()];

            jest.spyOn(service, 'findAll').mockResolvedValueOnce(mockReturn);

            const response = await controller.findAll();

            expect(response).toEqual(mockReturn);
        });
    });

    describe('find a car by id', () => {
        it('should call Car service find by id correctly', async () => {
            const findSpy = jest.spyOn(service, 'findById');

            await controller.findById('randomid');

            expect(findSpy).toHaveBeenCalledWith('randomid');
        });
        
        it('should throw if Car service find by id throw errors', async () => {
            jest.spyOn(service, 'findById').mockRejectedValueOnce(new Error());

            await expect(controller.findById('randomid')).rejects.toThrow(new Error());
        });
        
        it('should return a Car on success', async () => {
            const mockReturn = mockCar();

            jest.spyOn(service, 'findById').mockResolvedValueOnce(mockReturn);

            const response = await controller.findById('randomid');

            expect(response).toEqual(mockReturn);
        });
    });

    describe('update a car', () => {
        it('should call Car service update with correct id and values', async () => {
            const updateSpy = jest.spyOn(service, 'update');
        
            const mockParam = updateCarMock();
        
            await controller.update('randomid', mockParam);
        
            expect(updateSpy).toHaveBeenCalledWith('randomid', mockParam);
        });

        it('should throw if Car service update throw errors', async () => {
            jest.spyOn(service, 'update').mockRejectedValueOnce(new Error());

            await expect(controller.update('randomid', updateCarMock())).rejects.toThrow(new Error());
        });
    });

    describe('delete a car', () => {
        it('should call Car service delete with correct id', async () => {
            const deleteSpy = jest.spyOn(service, 'delete');

            await controller.delete('randomid');

            expect(deleteSpy).toHaveBeenCalledWith('randomid');
        });

        it('should throw if Car service delete throw errors', async () => {
            jest.spyOn(service, 'delete').mockRejectedValueOnce(new Error());

            await expect(controller.delete('randomid')).rejects.toThrow(new Error())
        });
    });
});