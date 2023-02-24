import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Store } from '../../stores/entities/store.entity';
import { VacancyControl } from '../../vacancyControl/entities/vacancyControl.entity';

@Entity('vehicles')
export class Vehicle {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    brand: string;

    @Column('varchar')
    model: string;

    @Column('varchar')
    color: string;

    @Column('varchar')
    sign_code: string;

    @Column('varchar')
    type: string;

    @Column('varchar')
    storeId: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @ManyToOne(() => Store, (store) => store.id)
    @JoinColumn({ name: 'storeId' })
    store: Store

    @OneToMany(() => VacancyControl, (vacancyControl) => vacancyControl.id)
    vacancyControl: VacancyControl[]
}