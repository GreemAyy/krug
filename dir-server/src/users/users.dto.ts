import { createZodDto } from "nestjs-zod";
import {UserSchema} from '../contracts/users'

export class UserDto extends createZodDto(UserSchema){}