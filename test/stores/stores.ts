import { CreateStoreDTO } from "src/stores/dto/createStore.dto";
import { UpdateStoreDTO } from "src/stores/dto/updateStore.dto";
import { Store } from "../../src/stores/entities/store.entity";
import { Vehicle } from "../../src/vehicles/entities/vehicle.entity";
import { VacancyControl } from "../../src/vacancyControl/entities/vacancyControl.entity";

export const createStoreMock = (): CreateStoreDTO => ({
    name: 'random store',
    cnpj: '55.674.472/0001-11',
    address: 'Rua Olivio Belinate, 147',
    telephone: '(19) 97858-3232',
    qtyCars: 10,
    qtyMotorcicles: 20
});

export const updateStoreMock = (): UpdateStoreDTO => ({
    name: 'random store',
    cnpj: '55.674.472/0001-11',
    address: 'Rua Olivio Belinate, 147',
    telephone: '(19) 97858-3232',
    qtyCars: 10,
    qtyMotorcicles: 20
});

const mockVehicle = new Vehicle();
mockVehicle.id = 'randomvehicleid';

const mockVacancy = new VacancyControl();
mockVacancy.id = 'randomvacancyid';

export const mockStore = (): Store => ({
    id: 'randomid',
    name: 'random store',
    cnpj: '55.674.472/0001-11',
    address: 'Rua Olivio Belinate, 147',
    telephone: '(19) 97858-3232',
    qtyCars: 10,
    qtyMotorcicles: 20,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: new Date(),
    vehicle: [mockVehicle],
    vacantyControl: [mockVacancy]
});