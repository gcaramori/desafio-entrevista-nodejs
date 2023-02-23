import { Test, TestingModule } from "@nestjs/testing";
import { createVehicleMock, updateVehicleMock, mockVehicle } from "./vehicles";
import { VehicleController } from "../../src/vehicles/vehicle.controller";
import { VehicleService } from "../../src/vehicles/vehicle.service";

describe('Vehicle controller', () => {
    let controller: VehicleController;
    let service: VehicleService;

    beforeEach(async () => {
        const mockService = {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn()
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [VehicleController],
            providers: [
                {
                    provide: VehicleService,
                    useValue: mockService
                }
            ]
        }).compile();

        controller = module.get<VehicleController>(VehicleController);
        service = module.get<VehicleService>(VehicleService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create a vehicle', () => {
        it('should call Vehicle service create with correct values', async () => {
          const createSpy = jest.spyOn(service, 'create');
    
          const mockParam = createVehicleMock();
    
          await controller.create(mockParam);
    
          expect(createSpy).toHaveBeenCalledWith(mockParam);
        });

        it('should throw if Vehicle service create throw errors', async () => {
            jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());
      
            await expect(controller.create(createVehicleMock())).rejects.toThrow(new Error());
        });
        
        it('should return a Vehicle on success', async () => {
            const mockReturn = mockVehicle();
            
            jest.spyOn(service, 'create').mockResolvedValueOnce(mockReturn);
      
            const response = await controller.create(createVehicleMock())
      
            expect(response).toEqual(mockReturn);
        });
    });

    describe('find all vehicles', () => {
        it('should call Vehicle service find all', async () => {
            const findSpy = jest.spyOn(service, 'findAll');

            await controller.findAll();

            expect(findSpy).toHaveBeenCalled();
        });

        it('should throw if Vehicle service find all throw errors', async () => {
            jest.spyOn(service, 'findAll').mockRejectedValueOnce(new Error());

            await expect(controller.findAll()).rejects.toThrow(new Error());
        });

        it('should return an array of Vehicles on success', async () => {
            const mockReturn = [mockVehicle()];

            jest.spyOn(service, 'findAll').mockResolvedValueOnce(mockReturn);

            const response = await controller.findAll();

            expect(response).toEqual(mockReturn);
        });
    });

    describe('find a vehicle by id', () => {
        it('should call Vehicle service find by id correctly', async () => {
            const findSpy = jest.spyOn(service, 'findById');

            await controller.findById('randomid');

            expect(findSpy).toHaveBeenCalledWith('randomid');
        });
        
        it('should throw if Vehicle service find by id throw errors', async () => {
            jest.spyOn(service, 'findById').mockRejectedValueOnce(new Error());

            await expect(controller.findById('randomid')).rejects.toThrow(new Error());
        });
        
        it('should return a Vehicle on success', async () => {
            const mockReturn = mockVehicle();

            jest.spyOn(service, 'findById').mockResolvedValueOnce(mockReturn);

            const response = await controller.findById('randomid');

            expect(response).toEqual(mockReturn);
        });
    });

    describe('update a vehicle', () => {
        it('should call Vehicle service update with correct id and values', async () => {
            const updateSpy = jest.spyOn(service, 'update');
        
            const mockParam = updateVehicleMock();
        
            await controller.update('randomid', mockParam);
        
            expect(updateSpy).toHaveBeenCalledWith('randomid', mockParam);
        });

        it('should throw if Vehicle service update throw errors', async () => {
            jest.spyOn(service, 'update').mockRejectedValueOnce(new Error());

            await expect(controller.update('randomid', updateVehicleMock())).rejects.toThrow(new Error());
        });
    });

    describe('delete a vehicle', () => {
        it('should call Vehicle service delete with correct id', async () => {
            const deleteSpy = jest.spyOn(service, 'delete');

            await controller.delete('randomid');

            expect(deleteSpy).toHaveBeenCalledWith('randomid');
        });

        it('should throw if Vehicle service delete throw errors', async () => {
            jest.spyOn(service, 'delete').mockRejectedValueOnce(new Error());

            await expect(controller.delete('randomid')).rejects.toThrow(new Error())
        });
    });
});