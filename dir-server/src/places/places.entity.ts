import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('places')
export class PlaceEntity{
    @PrimaryGeneratedColumn({type:'int'})
    id:number
    @Column({type:'int'})
    city_id:number
    @Column({type:'varchar',length:100})
    street:string
    @Column({type:'varchar',length:100})
    building:string
}

@Entity('cities')
export class CityEntity{
    @PrimaryGeneratedColumn({type:'int'})
    id:number
    @Column({type:'varchar',length:150})
    region:string
    @Column({type:'varchar',length:15})
    name:string
}