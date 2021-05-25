import {
    Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToMany, JoinTable
} from 'typeorm';
import { Planets } from './Planets';
import { Users } from './Users';

@Entity()
export class FavPlanets extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => Planets)
    @JoinTable()
    planets: Planets[];

    @ManyToMany(() => Users)
    @JoinTable()
    users: Users[];
}