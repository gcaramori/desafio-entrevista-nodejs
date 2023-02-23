import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Store } from '../../stores/entities/store.entity';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';

@Entity('vacancy_control')
export class VacancyControl {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    status: string;

    @Column('datetime')
    entryTime: Date;
    
    @Column('datetime')
    exitTime: Date;

    @Column('varchar')
    storeId: string;

    @Column('varchar')
    vehicleId: string;

    @ManyToOne(() => Store, (store) => store.id)
    @JoinColumn({ name: 'storeId' })
    store: Store

    @ManyToOne(() => Vehicle, (vehicle) => vehicle.id)
    @JoinColumn({ name: 'vehicleId' })
    vehicle: Vehicle
}