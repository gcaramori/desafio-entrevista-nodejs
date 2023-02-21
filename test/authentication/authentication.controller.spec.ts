import { Test, TestingModule } from "@nestjs/testing";
import { AuthenticationController } from "../../src/shared/authentication/authentication.controller";
import { AuthenticationService } from "../../src/shared/authentication/authentication.service";

describe('Authentication controller', () => {
    let controller: AuthenticationController;
    let service: AuthenticationService;

    beforeEach(async () => {
        const mockService = {
            getToken: jest.fn()
        }

        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthenticationController],
            providers: [
                {
                    provide: AuthenticationService,
                    useValue: mockService
                }
            ]
        }).compile();

        controller = module.get<AuthenticationController>(AuthenticationController);
        service = module.get<AuthenticationService>(AuthenticationService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('generate an access_token', () => {
        it('should call Authentication service getToken with correct values', async () => {
          const createSpy = jest.spyOn(service, 'getToken');
            
          const mockParam = { email: 'testuser@test.com' };

          await controller.grantAuthentication(mockParam);
    
          expect(createSpy).toHaveBeenCalledWith(mockParam.email);
        });

        it('should throw if Authentication service getToken throw errors', async () => {
            jest.spyOn(service, 'getToken').mockRejectedValueOnce(new Error()); 
            
            const mockParam = { email: 'testuser@test.com' };

            await expect(controller.grantAuthentication(mockParam)).rejects.toThrow(new Error());
        });

        it('should not return the access_token if parameter email is not valid', async () => {
            const mockParam = { email: 'blabla@test.com' };

            const createSpy = jest.spyOn(service, 'getToken');

            await controller.grantAuthentication(mockParam);

            expect(createSpy).not.toHaveProperty('access_token');
        });
        
        it('should return a access_token on success', async () => {
            const mockReturn = { access_token: '!*sa4dXAldj1' };
            const mockParam = { email: 'testuser@test.com' };
            
            jest.spyOn(service, 'getToken').mockResolvedValueOnce(mockReturn);
      
            const response = await controller.grantAuthentication(mockParam);
      
            expect(response).toEqual(mockReturn);
        });
    });
});