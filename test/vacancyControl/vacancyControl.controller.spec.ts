import { Test, TestingModule } from "@nestjs/testing";
import { createEntryRegistryMock, createExitRegistryMock, mockVacancyControl } from "./vacancyControl";
import { VacancyControlController } from "../../src/vacancyControl/vacancyControl.controller";
import { VacancyControlService } from "../../src/vacancyControl/vacancyControl.service";

describe('VacancyControl controller', () => {
    let controller: VacancyControlController;
    let service: VacancyControlService;

    beforeEach(async () => {
        const mockService = {
            registerEntry: jest.fn(),
            registerExit: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [VacancyControlController],
            providers: [
                {
                    provide: VacancyControlService,
                    useValue: mockService
                }
            ]
        }).compile();

        controller = module.get<VacancyControlController>(VacancyControlController);
        service = module.get<VacancyControlService>(VacancyControlService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create a entry registry in vacancyControl', () => {
        it('should call VacancyControl service registerEntry with correct values', async () => {
          const createSpy = jest.spyOn(service, 'registerEntry');
    
          const mockParam = createEntryRegistryMock();
    
          await controller.registerEntry(mockParam);
    
          expect(createSpy).toHaveBeenCalledWith(mockParam);
        });

        it('should throw if VacancyControl service registerEntry throw errors', async () => {
            jest.spyOn(service, 'registerEntry').mockRejectedValueOnce(new Error());
      
            await expect(controller.registerEntry(createEntryRegistryMock())).rejects.toThrow(new Error());
        });
        
        it('should return a VacancyControl on success', async () => {
            const mockReturn = mockVacancyControl();
            
            jest.spyOn(service, 'registerEntry').mockResolvedValueOnce(mockReturn);
      
            const response = await controller.registerEntry(createEntryRegistryMock())
      
            expect(response).toEqual(mockReturn);
        });
    });

    describe('update the entry registry to exit in vacancyControl', () => {
        it('should call VacancyControl repository registerExit with correct id and values', async () => {
            const updateSpy = jest.spyOn(service, 'registerExit');
        
            const mockParam = createExitRegistryMock();
        
            await controller.registerExit('randomid', mockParam);
        
            expect(updateSpy).toHaveBeenCalledWith('randomid', mockParam);
        });

        it('should throw if VacancyControl repository registerExit throw errors', async () => {
            jest.spyOn(service, 'registerExit').mockRejectedValueOnce(new Error());

            await expect(controller.registerExit('randomid', createExitRegistryMock())).rejects.toThrow(new Error());
        });
    });
});