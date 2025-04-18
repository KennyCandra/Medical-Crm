import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Diagnosis } from "./diagnosis";

@Entity()
export class Disease {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column({ unique: true })
    classification: string

    @Column({ type: 'text', nullable: true })
    description: string

    @OneToMany(() => Diagnosis, (diagnosis) => diagnosis.disease)
    diagnoses: Diagnosis[]
}