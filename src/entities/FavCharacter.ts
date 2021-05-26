import {
  Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne
} from 'typeorm';
import { Character } from './Character';
import { Users } from './Users';

@Entity()
export class FavCharacter extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

@ManyToOne(() => Users, users => users.favCharacters)
    users: Users;

@ManyToOne(() => Character, character => character.favCharacters)
    character: Character;
}