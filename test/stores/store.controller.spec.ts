import { Test, TestingModule } from "@nestjs/testing";
import { createStoreMock, updateStoreMock, mockStore } from "./stores";
import { StoreController } from "../../src/stores/store.controller";
import { StoreService } from "../../src/stores/store.service";

describe('Store controller', () => {
    let controller: StoreController;
    let service: StoreService;

    beforeEach(async () => {
        const mockService = {
            create: jest.fn()
        }

        const module: TestingModule = await Test.createTestingModule({
            controllers: [StoreController],
            providers: [
                {
                    provide: StoreService,
                    useValue: mockService
                }
            ]
        }).compile();

        controller = module.get<StoreController>(StoreController);
        service = module.get<StoreService>(StoreService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});