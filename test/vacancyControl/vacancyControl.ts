import { CreateEntryVacancyControlDTO } from "../../src/vacancyControl/dto/createEntryVacancyControl.dto";
import { CreateExitVacancyControlDTO } from "../../src/vacancyControl/dto/createExitVacancyControl.dto";
import { Vehicle } from "../../src/vehicles/entities/vehicle.entity";
import { Store } from "../../src/stores/entities/store.entity";
import { VacancyControl } from "../../src/vacancyControl/entities/vacancyControl.entity";

export const createEntryRegistryMock = (): CreateEntryVacancyControlDTO => ({
    status: 'parked',
    entryTime: new Date('2023-01-02 01:00:00 GMT-0300'),
    vehicleId: 'randomvehicleid',
    storeId: 'randomstoreid'
});

export const createExitRegistryMock = (): CreateExitVacancyControlDTO => ({
    status: 'exited',
    exitTime: new Date('2023-01-02 01:00:00 GMT-0300')
});

const storeMock  = new Store();
storeMock.id = 'randomstoreid';

const vehicleMock  = new Vehicle();
vehicleMock.id = 'randomvehicleid';

export const mockVacancyControl = (): VacancyControl => ({
    id: 'randomid',
    status: 'parked',
    entryTime: new Date('2023-01-02 01:00:00 GMT-0300'),
    exitTime: new Date('2023-01-02 01:00:00 GMT-0300'),
    storeId: 'randomstoreid',
    vehicleId: 'randomvehicleid',
    store: storeMock,
    vehicle: vehicleMock
});