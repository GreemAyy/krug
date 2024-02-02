import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodeEntity, HashEntity, RoleEntity, UserEntity } from './users.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity,HashEntity,RoleEntity,CodeEntity])],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
