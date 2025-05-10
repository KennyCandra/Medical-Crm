import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, OneToMany } from "typeorm";
import { Prescription } from "./prescription";
import { Drug } from "./drug";
import { ReportsEntity } from "./ReportsEntity";

@Entity()
export class PrescribedDrug {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'enum', enum: ["before", "after"], nullable: false, default: 'before' })
    time: "before" | "after"

    @ManyToOne(() => Prescription, (prescription) => prescription.prescribedDrugs)
    @JoinColumn()
    prescription: Prescription;

    @OneToMany(() => ReportsEntity, (reports) => reports.prescribedDrug)
    @JoinColumn()
    reports: Report[];

    @ManyToOne(() => Drug, (drug) => drug.prescribedDrugs)
    drug: Drug;

    @Column({ nullable: false })
    dosage: string;

    @Column({ nullable: false })
    frequency: string;

}
