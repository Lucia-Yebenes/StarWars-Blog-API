import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Character extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    img: string;
    @Column()
    height: number;
    @Column()
    mass: number;
    @Column()
    hairColor: string;
    @Column()
    skinColor: string;
    @Column()
    eyeColor: string;
    @Column()
    birthYear: string;
    @Column()
    gender: string;
}