import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './users.dto';

type CheckUserBody = {id:number,hash:string}
type GetUserBody = {id:number}
type UpdateUserBody = {hash:string,id:number,name:string,dob:string}

@Controller('users')
export class UsersController {
    constructor(private usersService:UsersService){}

    @Post('/create-code')
    async createCode(@Body() {phone}:{phone:string}){
        return await this.usersService.createCode(phone) 
    }
    @Post('/create')
    async createUser(@Body() {phone,code}:{phone:string,code:string}){
        const create = await this.usersService.createUser(phone,code)
        return create     
    }
    @Post('/check')
    async checkUser(@Body() {id,hash}:CheckUserBody){
        return await this.usersService.checkAccess(id,hash)
    }
    @Post('/get')
    async getUser(@Body() {id}:GetUserBody){
        return await this.usersService.getUser(id)
    }
    @Post('/update')
    async updateUser(@Body() body:UpdateUserBody){
        return await this.usersService.updateUser(body);
    }
}
