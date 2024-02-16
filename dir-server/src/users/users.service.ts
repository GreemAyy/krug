import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CodeEntity, HashEntity, RoleEntity, UserEntity } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
            private usersRepository:Repository<UserEntity>,
        @InjectRepository(HashEntity)
            private hashesRepository:Repository<HashEntity>,
        @InjectRepository(RoleEntity)
            private rolesRepository:Repository<RoleEntity>,
        @InjectRepository(CodeEntity)
            private codesRepository:Repository<CodeEntity>
    ){}

    async getUser(id:number){
        return await this.usersRepository.findOneBy({id})
    }
    async createCode(phone:string){
        const code = this.createNewCode()
        await this.codesRepository.insert({phone, code, date:new Date()})
        return code;
    }
    async createUser(phone:string,code:string){
        console.log(phone, code )
        const checkCode = await this.checkCode(phone,code)
        if(checkCode){
            const alreadyCreated = await this.checkUserAlreadyCreated(phone)
            const hash = this.generateHash()
            let user_id:number;
            if(!alreadyCreated){
                const create = await this.usersRepository.insert({
                    phone,name:'',dob:'0000-00-00'})
                user_id = create.raw?.insertId;
                await this.rolesRepository.insert({user_id,role:'standard'});
                await this.hashesRepository.create({user_id,hash});
            }else
                user_id = (await this.usersRepository.findOneBy({phone})).id
            await this.hashesRepository.update({user_id},{hash})
            await this.changeCodeStatus(phone,code)
            console.log({id:user_id, hash})
            return {id:user_id, hash}
        } 
        return null
    }  
    async checkAccess(id:number,hash:string){
        const hashData = await this.hashesRepository.count({where:{user_id:id,hash}})
        return {access:Boolean(hashData)}
    }
    private async checkUserAlreadyCreated(phone:string){
        return Boolean(await this.usersRepository.findOneBy({phone})) 
    }
    private generateHash(){
        const str = 'qwertyuiopasdfghjklzxcvbnm1234567890'
        let total = ''
        for(let i = 0;i<25;i++){
            total+=str[Math.floor(Math.random()*(str.length-1))]
        }
        return total
    }
    private createNewCode(){
        return [0,0,0,0].map(_=>Math.round(Math.random()*9)).join('')
    }
    private async checkCodeAlreadyCreated(phone:string){
        const check = await this.codesRepository.findBy({phone,date:this.dateConverter()})
        return check?.length
    }
    private dateConverter(){
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`
    }
    private async checkCode(phone:string,code:string){
        const get = await this.codesRepository
                    .findOne({where:{phone,date:this.dateConverter(),used:0},
                    order:{id:'DESC'}})
        return (get?.code||0)==code
    }
    private async changeCodeStatus(phone:string,code:string){
        await this.codesRepository.update({phone,code},{used:1})
    }
    async updateUser(body:{hash:string,id:number,name:string,dob:string}){
        const getHash = await this.hashesRepository.findOneBy({user_id:body.id})
        if(getHash.hash==body.hash){
            await this.usersRepository
            .update({id:body.id},{name:body.name,dob:body.dob})
            return {update:true}
        }
        return {update:false}
    }
}
