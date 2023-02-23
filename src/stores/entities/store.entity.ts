import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import { VacancyControl } from '../../vacancyControl/entities/vacancyControl.entity';

@Entity('stores')
export class Store {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    name: string;

    @Column('varchar', { unique: true })
    cnpj: string;

    @Column('varchar')
    address: string;

    @Column('varchar')
    telephone: string;
    
    @Column('int')
    qtyCars: number;
    
    @Column('int')
    qtyMotorcicles: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @OneToMany(() => Vehicle, (vehicle) => vehicle.store)
    vehicle: Vehicle[]

    @OneToMany(() => VacancyControl, (vacantyControl) => vacantyControl.id)
    vacantyControl: VacancyControl[]
}