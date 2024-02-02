import {TypeOrmModuleOptions} from '@nestjs/typeorm'

export default {
    type:'mysql',
    database:"food_delivery",
    username:"root",
    password:"",
    host:"localhost",
    port:3306,
    entities:["dist/**/*.entity{.ts,.js}"],
    synchronize:false,
    
} as TypeOrmModuleOptions