import {
    Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne
} from 'typeorm';
import { Planets } from './Planets';
import { Users } from './Users';

@Entity()
export class FavPlanets extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;


   @ManyToOne(() => Users, users => users.favPlanetss)
    users: Users;

    @ManyToOne(() => Planets, planets => planets.favPlanetss)
    planets: Planets;
}