import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createVehicleMock, mockVehicle, updateVehicleMock } from './vehicles';
import { Vehicle } from '../../src/vehicles/entities/vehicle.entity';
import { VehicleRepository } from '../../src/vehicles/vehicle.repository';

describe('Vehicle repository', () => {
    let repository: VehicleRepository;
    let ormMock: Repository<Vehicle>;

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
                VehicleRepository,
                {
                    provide: getRepositoryToken(Vehicle),
                    useValue: mockOrmRepository
                }
            ]
        }).compile();
        
        repository = moduleRef.get<VehicleRepository>(VehicleRepository);
        ormMock = moduleRef.get(getRepositoryToken(Vehicle));
    });

    describe('creating a vehicle', () => {
        it('should create a new vehicle', async () => {
            jest.spyOn(ormMock, 'save').mockResolvedValueOnce(mockVehicle());

            const response = await repository.create(createVehicleMock());

            expect(response.id).toBeTruthy();
            expect(response.brand).toBe('random vehicle');
            expect(response.model).toBe('random model');
            expect(response.color).toBe('black');
            expect(response.sign_code).toBe('ENL-2019');
            expect(response.type).toBe('Off-road');
            expect(response.storeId).toBe('randomstoreid');
        })
    });

    describe('find all vehicles', () => {
        it('should return all vehicles', async () => {
          const mockReturn = [mockVehicle()];
    
          jest.spyOn(ormMock, 'find').mockResolvedValueOnce(mockReturn);
    
          const response = await repository.findAll();
    
          expect(response).toEqual(mockReturn);
        })
    });

    describe('find vehicle by id', () => {
        it('should return a vehicle', async () => {
            const mockReturn = mockVehicle();

            jest.spyOn(ormMock, 'findOne').mockResolvedValueOnce(mockReturn);

            const response = await repository.findById('randomid');

            expect(response).toEqual(mockReturn);
        })
    });

    describe('update a vehicle', () => {
        it('should call mockRepository update with correct id', async () => {
            const mockParam = updateVehicleMock();
            
            const updateSpy = jest.spyOn(ormMock, 'update');

            await repository.update('randomid', mockParam);

            expect(updateSpy).toHaveBeenCalledWith('randomid', mockParam);
        })
    });

    describe('delete a vehicle', () => {
        it('should call mockRepository delete with correct id', async () => {
          const deleteSpy = jest.spyOn(ormMock, 'delete');
    
          await repository.delete('randomid');
    
          expect(deleteSpy).toHaveBeenCalledWith('randomid');
        })
    });
})