import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { Car } from '../../cars/entities/car.entity';

@Entity('stores')
export class Store {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    name: string;

    @Column('varchar')
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

    @OneToMany(() => Car, (car) => car.store)
    car: Car[]
}