import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { mockCar, updateCarMock } from './cars';
import { Car } from '../../src/cars/entities/car.entity';
import { CarRepository } from '../../src/cars/car.repository';

describe('Car repository', () => {
    let repository: CarRepository;
    let ormMock: Repository<Car>;

    beforeEach(async () => {
        const mockOrmRepository = {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn()
        }

        const moduleRef = await Test.createTestingModule({
            providers: [
                CarRepository,
                {
                    provide: getRepositoryToken(Car),
                    useValue: mockOrmRepository
                }
            ]
        }).compile();
        
        repository = moduleRef.get<CarRepository>(CarRepository);
        ormMock = moduleRef.get(getRepositoryToken(Car));
    });

    describe('creating a car', () => {
        it('should create a new car', async () => {
            jest.spyOn(ormMock, 'create').mockReturnValueOnce(mockCar())

            const response = await repository.create({
                brand: 'random car',
                model: 'random model',
                color: 'black',
                sign_code: 'ENL-2019',
                type: 'Off-road',
                storeId: 'randomstoreid'
            })

            expect(response.id).toBeTruthy();
            expect(response.brand).toBe('random car');
            expect(response.model).toBe('random model');
            expect(response.color).toBe('black');
            expect(response.sign_code).toBe('ENL-2019');
            expect(response.type).toBe('Off-road');
            expect(response.store.id).toBe('randomstoreid');
        })
    });

    describe('find all cars', () => {
        it('should return all cars', async () => {
          const mockReturn = [mockCar()];
    
          jest.spyOn(ormMock, 'find').mockResolvedValueOnce(mockReturn);
    
          const response = await repository.findAll();
    
          expect(response).toEqual(mockReturn);
        })
    });

    describe('find car by id', () => {
        it('should return a car', async () => {
            const mockReturn = mockCar();

            jest.spyOn(ormMock, 'findOne').mockResolvedValueOnce(mockReturn);

            const response = await repository.findById('randomid');

            expect(response).toEqual(mockReturn);
        })
    });

    describe('update a car', () => {
        it('should call mockRepository update with correct id', async () => {
            const mockParam = updateCarMock();

            const updateSpy = jest.spyOn(ormMock, 'save');

            await repository.update('randomid', mockParam);

            expect(updateSpy).toHaveBeenCalledWith({ id: 'randomid', updateData: mockParam });
        })
    });

    describe('delete a car', () => {
        it('should call mockRepository delete with correct id', async () => {
          const deleteSpy = jest.spyOn(ormMock, 'delete');
    
          await repository.delete('randomid');
    
          expect(deleteSpy).toHaveBeenCalledWith('randomid');
        })
    });
})