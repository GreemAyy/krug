import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageEntity, ProductEntity } from './products.entity';
import { LessThan, Like, MoreThan, MoreThanOrEqual, Repository } from 'typeorm';
import { ProductDto } from './products.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductEntity)
        private productsRepository:Repository<ProductEntity>,
        @InjectRepository(ImageEntity)
        private imageRepository:Repository<ImageEntity>
    ){}
    async createProduct(product:ProductDto):Promise<number|void>{
        //@ts-ignore
        const create = await this.productsRepository.insert(product);
        return create.raw?.insertId
    }
    async getAllProducts(){
        return await this.productsRepository.find()
    }
    async getSingleProduct(id:number){
        return await this.productsRepository.findOneBy({id})
    }
    async getGrouped(){
        return await this.productsRepository.find({order:{category:'ASC'}})
    }
    async getLastImageID():Promise<number>{
        const isEmpty =  (await this.imageRepository.count()) == 0
        console.log(isEmpty)
        return !isEmpty
        ?(await this.imageRepository.findOne({where:{id:MoreThan(0)},order:{id:'DESC'}})).id
        :0 
    }
    async createFile(filename:string){
        void this.imageRepository.insert({name:filename})
    }
    async getImage(id:number){
        return (await this.imageRepository.findOneBy({id}))?.name
    }
    async search(text:string){
        return await this.productsRepository.findBy({name:Like(`%${text}%`),description:Like(`%${text}%`)})
    }
}
