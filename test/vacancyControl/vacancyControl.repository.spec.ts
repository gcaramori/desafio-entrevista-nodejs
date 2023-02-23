import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createEntryRegistryMock, createExitRegistryMock, mockVacancyControl } from './vacancyControl';
import { VacancyControl } from '../../src/vacancyControl/entities/vacancyControl.entity';
import { VacancyControlRepository } from '../../src/vacancyControl/vacancyControl.repository';

describe('VacancyControl repository', () => {
    let repository: VacancyControlRepository;
    let ormMock: Repository<VacancyControl>;

    beforeEach(async () => {
        const mockOrmRepository = {
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            findOne: jest.fn()
        };

        const moduleRef = await Test.createTestingModule({
            providers: [
                VacancyControlRepository,
                {
                    provide: getRepositoryToken(VacancyControl),
                    useValue: mockOrmRepository
                }
            ]
        }).compile();
        
        repository = moduleRef.get<VacancyControlRepository>(VacancyControlRepository);
        ormMock = moduleRef.get(getRepositoryToken(VacancyControl));
    });

    describe('create a entry registry in vacancyControl', () => {
        it('should create a new entry registry', async () => {
            jest.spyOn(ormMock, 'save').mockResolvedValueOnce(mockVacancyControl());

            const response = await repository.registerEntry(createEntryRegistryMock());

            expect(response.id).toBeTruthy();
            expect(response.status).toBe('parked');
            expect(response.entryTime).toEqual(new Date('2023-01-02 01:00:00 GMT-0300'));
            expect(response.vehicleId).toBe('randomvehicleid');
            expect(response.storeId).toBe('randomstoreid');
        });
    });

    describe('update the entry registry to exit in vacancyControl', () => {
        it('should update the entry status to exit', async () => {
            const mockParam = createExitRegistryMock();
            
            const updateSpy = jest.spyOn(ormMock, 'update');

            await repository.registerExit('randomid', mockParam);

            expect(updateSpy).toHaveBeenCalledWith('randomid', mockParam);
        });
    });
})