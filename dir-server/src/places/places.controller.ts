import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PlacesService } from './places.service';
import { CityEntity, PlaceEntity } from './places.entity';


@Controller('places-cities')
export class PlacesController {
    constructor(
        private placesService : PlacesService
    ){}

    @Post('/create/place')
    async createPlace(@Body() body:PlaceEntity){
        try{
            await this.placesService.createPlace(body)
            return {create:true}
        }catch(e){
            return {create:false}
        }
    }
    @Post('/create/city')
    async createCity(@Body() body:CityEntity){
        try{
            await this.placesService.createCity(body)
            return {create:true}
        }catch(e){
            return {create:false}
        }
    }
    @Get('/get-city-like/:text')
    async getCitiesLike(@Param('text') text:string){
        console.log(text)
        if(text.length)
            return this.placesService.getCityLike(text)
        return []
    }
    @Get('/get-city-by-id/:id')
    async getCitiesById(@Param('id') id:string){
        const idToNum = +id
        if(!Number.isNaN(idToNum))
            return this.placesService.getCityByID(idToNum)
        return null
    }
    @Get('/get-places-by-city-id/:id')
    async getPlacesById(@Param('id') id:string){
        const idToNum = +id
        if(!Number.isNaN(idToNum))
            return this.placesService.getPlacesByCityId(idToNum)
        return null
    }
    @Get('/get-place/:id')
    async getPlaceById(@Param('id') id:string){
        const idToNum = +id
        if(!Number.isNaN(idToNum))
            return this.placesService.getPlaceById(idToNum)
        return null
    }
}
