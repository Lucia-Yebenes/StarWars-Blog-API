import {
  Entity, Column, PrimaryGeneratedColumn, 
  BaseEntity, 
} from 'typeorm';

@Entity()
export class FavPlanets extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;
}