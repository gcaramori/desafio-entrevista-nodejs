import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Store } from '../../stores/entities/store.entity';

@Entity('cars')
export class Car {
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

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @OneToOne(() => Store, (Store) => Store.id)
    @JoinColumn({ name: 'id' })
    store: Store
}