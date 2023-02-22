import { CreateCarDTO } from "src/cars/dto/createCar.dto";
import { UpdateCarDTO } from "src/cars/dto/updateCar.dto";
import { Car } from "../../src/cars/entities/car.entity";
import { Store } from "../../src/stores/entities/store.entity";

export const createCarMock = (): CreateCarDTO => ({
    brand: 'random car',
    model: 'random model',
    color: 'black',
    sign_code: 'ENL-2019',
    type: 'Off-road',
    store: 'randomstoreid'
});

export const updateCarMock = (): UpdateCarDTO => ({
    brand: 'random car',
    model: 'random model',
    color: 'black',
    sign_code: 'ENL-2019',
    type: 'Off-road'
});

const storeMock  = new Store();
storeMock.id = 'randomstoreid';

export const mockCar = (): Car => ({
    id: 'randomid',
    brand: 'random car',
    model: 'random model',
    color: 'black',
    sign_code: 'ENL-2019',
    type: 'Off-road',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: new Date(),
    store: storeMock
});