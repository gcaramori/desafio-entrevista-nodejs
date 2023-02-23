import { CreateVehicleDTO } from "src/vehicles/dto/createVehicle.dto";
import { UpdateVehicleDTO } from "src/vehicles/dto/updateVehicle.dto";
import { Vehicle } from "../../src/vehicles/entities/vehicle.entity";
import { Store } from "../../src/stores/entities/store.entity";
import { VacancyControl } from "../../src/vacancyControl/entities/vacancyControl.entity";

const storeMock  = new Store();
storeMock.id = 'randomstoreid';

const vacancyMock  = new VacancyControl();
vacancyMock.id = 'randomvacancyid';

export const createVehicleMock = (): CreateVehicleDTO => ({
    brand: 'random vehicle',
    model: 'random model',
    color: 'black',
    sign_code: 'ENL-2019',
    type: 'Off-road',
    storeId: 'randomstoreid'
});

export const updateVehicleMock = (): UpdateVehicleDTO => ({
    brand: 'random vehicle',
    model: 'random model',
    color: 'black',
    sign_code: 'ENL-2019',
    type: 'Off-road'
});

export const mockVehicle = (): Vehicle => ({
    id: 'randomid',
    brand: 'random vehicle',
    model: 'random model',
    color: 'black',
    sign_code: 'ENL-2019',
    type: 'Off-road',
    storeId: 'randomstoreid',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: new Date(),
    store: storeMock,
    vacancyControl: [vacancyMock]
});