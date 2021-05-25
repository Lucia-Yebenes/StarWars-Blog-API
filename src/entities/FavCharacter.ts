import {
  Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToMany, JoinTable
} from 'typeorm';
import { Character } from './Character';
import { Users } from './Users';

@Entity()
export class FavCharacter extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Character)
    @JoinTable()
    character: Character[];

@ManyToMany(() => Users)
    @JoinTable()
    users: Users[];
}