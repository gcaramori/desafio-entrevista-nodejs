import { CreateStoreDTO } from "src/stores/dto/createStore.dto";
import { Store } from "src/stores/entities/store.entity";

export const createStoreMock = (): CreateStoreDTO => ({
    name: 'random store',
    cnpj: '55.674.472/0001-11',
    address: 'Rua Olivio Belinate, 147',
    telephone: '(19) 97858-3232',
    qtyCars: 10,
    qtyMotorcicles: 20
});

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
    deleted_at: new Date()
});