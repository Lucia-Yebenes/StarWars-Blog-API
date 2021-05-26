import {
    Entity, Column, PrimaryGeneratedColumn,
    BaseEntity, OneToMany
} from 'typeorm';
import { FavCharacter } from "./FavCharacter"
import { FavPlanets } from "./FavPlanets"
@Entity()
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => FavCharacter, favCharacter => favCharacter.users)
    favCharacters: FavCharacter[];

    @OneToMany(() => FavPlanets, favPlanets => favPlanets.users)
    favPlanetss: FavPlanets[];
}