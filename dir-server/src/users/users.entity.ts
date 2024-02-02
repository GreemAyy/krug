import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserEntity{
    @PrimaryGeneratedColumn({type:'int'})
    id:number
    @Column({type:'varchar',length:100})
    name:string
    @Column({type:'varchar',length:30})
    phone:string
    @Column({type:'varchar',length:10,default:'00-00-0000'})
    dob:string
}

@Entity('hashes')
export class HashEntity{
    @PrimaryGeneratedColumn({type:'int'})
    id:number
    @Column({type:'int'})
    user_id:number
    @Column({type:'varchar',length:25})
    hash:string
}

@Entity('roles')
export class RoleEntity{
    @PrimaryGeneratedColumn({type:'int'})
    id:number
    @Column({type:"int"})
    user_id:number
    @Column({type:'varchar',length:20})
    role:string
}

@Entity('codes')
export class CodeEntity{
    @PrimaryGeneratedColumn({type:"int"})
    id:number
    @Column({type:'varchar',length:12})
    phone:string
    @Column({type:'varchar',length:4})
    code:string
    @Column({type:'date'})
    date:Date|string
    @Column({type:'boolean',default:0})
    used:0|1
}