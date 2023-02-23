import { Test, TestingModule } from "@nestjs/testing";
import { createVehicleMock, updateVehicleMock, mockVehicle } from "./vehicles";
import { VehicleService } from "../../src/vehicles/vehicle.service";
import { VehicleRepository } from "../../src/vehicles/vehicle.repository";

describe('Vehicle service', () => {
    let service: VehicleService;
    let repository: VehicleRepository;

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
                VehicleService,
                {
                    provide: VehicleRepository,
                    useValue: mockService
                }
            ]
        }).compile();

        service = module.get<VehicleService>(VehicleService);
        repository = module.get<VehicleRepository>(VehicleRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create a vehicle', () => {
        it('should call Vehicle repository create with correct values', async () => {
          const createSpy = jest.spyOn(service, 'create');
    
          const mockParam = createVehicleMock();
    
          await service.create(mockParam);
    
          expect(createSpy).toHaveBeenCalledWith(mockParam);
        });

        it('should throw if Vehicle repository create throw errors', async () => {
            jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());
      
            await expect(service.create(createVehicleMock())).rejects.toThrow(new Error());
        });
        
        it('should return a Vehicle on success', async () => {
            const mockReturn = mockVehicle();
            
            jest.spyOn(service, 'create').mockResolvedValueOnce(mockReturn);
      
            const response = await service.create(createVehicleMock())
      
            expect(response).toEqual(mockReturn);
        });
    });

    describe('find all vehicles', () => {
        it('should call Vehicle repository find all', async () => {
            const findSpy = jest.spyOn(service, 'findAll');

            await service.findAll();

            expect(findSpy).toHaveBeenCalled();
        });

        it('should throw if Vehicle repository find all throw errors', async () => {
            jest.spyOn(service, 'findAll').mockRejectedValueOnce(new Error());

            await expect(service.findAll()).rejects.toThrow(new Error());
        });

        it('should return an array of Vehicles on success', async () => {
            const mockReturn = [mockVehicle()];

            jest.spyOn(service, 'findAll').mockResolvedValueOnce(mockReturn);

            const response = await service.findAll();

            expect(response).toEqual(mockReturn);
        });
    });

    describe('find a vehicle by id', () => {
        it('should call Vehicle repository find by id correctly', async () => {
            const findSpy = jest.spyOn(service, 'findById');

            await service.findById('randomid');

            expect(findSpy).toHaveBeenCalledWith('randomid');
        });
        
        it('should throw if Vehicle repository find by id throw errors', async () => {
            jest.spyOn(service, 'findById').mockRejectedValueOnce(new Error());

            await expect(service.findById('randomid')).rejects.toThrow(new Error());
        });
        
        it('should return a Vehicle on success', async () => {
            const mockReturn = mockVehicle();

            jest.spyOn(service, 'findById').mockResolvedValueOnce(mockReturn);

            const response = await service.findById('randomid');

            expect(response).toEqual(mockReturn);
        });
    });
    

    describe('update a vehicle', () => {
        it('should call Vehicle repository update with correct id and values', async () => {
            const updateSpy = jest.spyOn(service, 'update');
        
            const mockParam = updateVehicleMock();
        
            await service.update('randomid', mockParam);
        
            expect(updateSpy).toHaveBeenCalledWith('randomid', mockParam);
        });

        it('should throw if Vehicle repository update throw errors', async () => {
            jest.spyOn(service, 'update').mockRejectedValueOnce(new Error());

            await expect(service.update('randomid', updateVehicleMock())).rejects.toThrow(new Error());
        });
    });

    describe('delete a vehicle', () => {
        it('should call Vehicle repository delete with correct id', async () => {
            const deleteSpy = jest.spyOn(service, 'delete');

            await service.delete('randomid');

            expect(deleteSpy).toHaveBeenCalledWith('randomid');
        });

        it('should throw if Vehicle repository delete throw errors', async () => {
            jest.spyOn(service, 'delete').mockRejectedValueOnce(new Error());

            await expect(service.delete('randomid')).rejects.toThrow(new Error())
        });
    });
});