import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { ProductsService } from './products.service';
import { ProductDto } from './products.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as asyncfs from 'fs/promises'
import * as path from 'path'

@Controller('products')
export class ProductsController{
    constructor(private productsService:ProductsService){}
    
    @Post('/create')
    async createProduct(@Body() product:ProductDto){
        const id = await this.productsService.createProduct(product)
        return {id:id??null}
    }/*->*/
    @Post('/upload-image')
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(@UploadedFile() file:Express.Multer.File){
        if(!file) return {id:null}
        const lastID = await this.productsService.getLastImageID()
        const fileExpansion = file.originalname.split('.').at(-1)
        const fileName = `${lastID+1}.${fileExpansion}`
        const pathTo = path.resolve(__dirname,'../../../images',fileName)
        await asyncfs.writeFile(pathTo,file.buffer)
        await this.productsService.createFile(fileName)
        return {id:lastID?lastID+1:null}
    }/*->*/
    @Get('/all')
    async getAll(){
        return await this.productsService.getAllProducts()
    }/*->*/ 
    @Get('/grouped')
    async getGrouped(){
        return await this.productsService.getGrouped()
    }/*->*/
    @Get('/single/:id')
    async getSingle(@Param('id') id:string){
        return await this.productsService.getSingleProduct(+id)
    }/*->*/
    @Get('/image/:id')
    async getImage(@Param('id') id:string, @Res() res:Response){
        const name = await this.productsService.getImage(+id)
        res.sendFile(path.resolve(__dirname,'../../../images/',(name??'error_404.png')))
    }/*->*/
}
