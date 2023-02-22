import { Test, TestingModule } from "@nestjs/testing";
import { createCarMock, updateCarMock, mockCar } from "./cars";
import { CarService } from "../../src/cars/car.service";
import { CarRepository } from "../../src/cars/car.repository";

describe('Car service', () => {
    let service: CarService;
    let repository: CarRepository;

    beforeEach(async () => {
        const mockService = {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn()
        }

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CarService,
                {
                    provide: CarRepository,
                    useValue: mockService
                }
            ]
        }).compile();

        service = module.get<CarService>(CarService);
        repository = module.get<CarRepository>(CarRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create a car', () => {
        it('should call Car repository create with correct values', async () => {
          const createSpy = jest.spyOn(service, 'create');
    
          const mockParam = createCarMock();
    
          await service.create(mockParam);
    
          expect(createSpy).toHaveBeenCalledWith(mockParam);
        });

        it('should throw if Car repository create throw errors', async () => {
            jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());
      
            await expect(service.create(createCarMock())).rejects.toThrow(new Error());
        });
        
        it('should return a Car on success', async () => {
            const mockReturn = mockCar();
            
            jest.spyOn(service, 'create').mockResolvedValueOnce(mockReturn);
      
            const response = await service.create(createCarMock())
      
            expect(response).toEqual(mockReturn);
        });
    });

    describe('find all cars', () => {
        it('should call Car repository find all', async () => {
            const findSpy = jest.spyOn(service, 'findAll');

            await service.findAll();

            expect(findSpy).toHaveBeenCalled();
        });

        it('should throw if Car repository find all throw errors', async () => {
            jest.spyOn(service, 'findAll').mockRejectedValueOnce(new Error());

            await expect(service.findAll()).rejects.toThrow(new Error());
        });

        it('should return an array of Cars on success', async () => {
            const mockReturn = [mockCar()];

            jest.spyOn(service, 'findAll').mockResolvedValueOnce(mockReturn);

            const response = await service.findAll();

            expect(response).toEqual(mockReturn);
        });
    });

    describe('find a car by id', () => {
        it('should call Car repository find by id correctly', async () => {
            const findSpy = jest.spyOn(service, 'findById');

            await service.findById('randomid');

            expect(findSpy).toHaveBeenCalledWith('randomid');
        });
        
        it('should throw if Car repository find by id throw errors', async () => {
            jest.spyOn(service, 'findById').mockRejectedValueOnce(new Error());

            await expect(service.findById('randomid')).rejects.toThrow(new Error());
        });
        
        it('should return a Car on success', async () => {
            const mockReturn = mockCar();

            jest.spyOn(service, 'findById').mockResolvedValueOnce(mockReturn);

            const response = await service.findById('randomid');

            expect(response).toEqual(mockReturn);
        });
    });

    describe('update a car', () => {
        it('should call Car repository update with correct id and values', async () => {
            const updateSpy = jest.spyOn(service, 'update');
        
            const mockParam = updateCarMock();
        
            await service.update('randomid', mockParam);
        
            expect(updateSpy).toHaveBeenCalledWith('randomid', mockParam);
        });

        it('should throw if Car repository update throw errors', async () => {
            jest.spyOn(service, 'update').mockRejectedValueOnce(new Error());

            await expect(service.update('randomid', updateCarMock())).rejects.toThrow(new Error());
        });
    });

    describe('delete a car', () => {
        it('should call Car repository delete with correct id', async () => {
            const deleteSpy = jest.spyOn(service, 'delete');

            await service.delete('randomid');

            expect(deleteSpy).toHaveBeenCalledWith('randomid');
        });

        it('should throw if Car repository delete throw errors', async () => {
            jest.spyOn(service, 'delete').mockRejectedValueOnce(new Error());

            await expect(service.delete('randomid')).rejects.toThrow(new Error())
        });
    });
});