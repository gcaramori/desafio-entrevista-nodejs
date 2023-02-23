import { Test, TestingModule } from '@nestjs/testing';
import { createEntryRegistryMock, createExitRegistryMock, mockVacancyControl } from './vacancyControl';
import { VacancyControlService } from '../../src/vacancyControl/vacancyControl.service';
import { VacancyControlRepository } from '../../src/vacancyControl/vacancyControl.repository';

describe('VacancyControl service', () => {
    let service: VacancyControlService;
    let repository: VacancyControlRepository;

    beforeEach(async () => {
        const mockService = {
            registerEntry: jest.fn(),
            registerExit: jest.fn()
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                VacancyControlService,
                {
                    provide:VacancyControlRepository,
                    useValue: mockService
                }
            ]
        }).compile();
        
        service = module.get<VacancyControlService>(VacancyControlService);
        repository = module.get<VacancyControlRepository>(VacancyControlRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create a entry registry in vacancyControl', () => {
        it('should call VacancyControl repository registerEntry with correct values', async () => {
            const createSpy = jest.spyOn(service, 'registerEntry');
      
            const mockParam = createEntryRegistryMock();
      
            await service.registerEntry(mockParam);
      
            expect(createSpy).toHaveBeenCalledWith(mockParam);
        });

        it('should throw if VacancyControl repository registerEntry throw errors', async () => {
            jest.spyOn(service, 'registerEntry').mockRejectedValueOnce(new Error());
    
            await expect(service.registerEntry(createEntryRegistryMock())).rejects.toThrow(new Error());
        });
        
        it('should return a VacancyControl on success', async () => {
            const mockReturn = mockVacancyControl();
            
            jest.spyOn(service, 'registerEntry').mockResolvedValueOnce(mockReturn);
    
            const response = await service.registerEntry(createEntryRegistryMock())
    
            expect(response).toEqual(mockReturn);
        });
    });

    describe('update the entry registry to exit in vacancyControl', () => {
        it('should call VacancyControl repository registerExit with correct id and values', async () => {
            const updateSpy = jest.spyOn(service, 'registerExit');
        
            const mockParam = createExitRegistryMock();
        
            await service.registerExit('randomid', mockParam);
        
            expect(updateSpy).toHaveBeenCalledWith('randomid', mockParam);
        });

        it('should throw if VacancyControl repository registerExit throw errors', async () => {
            jest.spyOn(service, 'registerExit').mockRejectedValueOnce(new Error());

            await expect(service.registerExit('randomid', createExitRegistryMock())).rejects.toThrow(new Error());
        });
    });
})