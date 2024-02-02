import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityEntity, PlaceEntity } from './places.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlacesService {
    constructor(
        @InjectRepository(CityEntity)
        private citiesRepository:Repository<CityEntity>,
        @InjectRepository(PlaceEntity)
        private placesRepository:Repository<PlaceEntity>,
    ){}
    async createPlace(place:PlaceEntity){
        return await this.placesRepository.insert(place)
    }
    async createCity(city:CityEntity){
        return await this.citiesRepository.insert(city)
    }
    async getCityLike(name:string){
        return await this.citiesRepository
                    .createQueryBuilder()
                    .where(`region LIKE '%${name}%' or name LIKE '%${name}%'`)
                    .take(10)
                    .getMany()
    }
    async getCityByID(id:number){
        return await this.citiesRepository.findOneBy({id})
    }
    async getPlacesByCityId(id:number){
        return await this.placesRepository.findBy({id})
    }
    async getPlaceById(id:number){
        return await this.placesRepository.findOneBy({id})
    }
}
