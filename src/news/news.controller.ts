import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Put, Res } from '@nestjs/common';
import { IsNumber } from 'class-validator';
import { CreateNewsDto } from './dto/createNewsDto.dto';
import { UpdateNewsDto } from './dto/updateNewsDto.dto';
import { News } from './entity/news.entity';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
    constructor(private newsService:NewsService){}

    @Get(":id")
    getOneNews(@Param("id") id:number){
        return this.newsService.findOneNews(id);       
    }
    @Get()
    getNews(){
        return this.newsService.findAllNews();       
    }

    @Post()
    createNews(@Body() payload:CreateNewsDto){
        return this.newsService.createNews(payload);
    }

    @Put(":id")
    updateNews(@Param("id") id:number,@Body() payload:UpdateNewsDto){
        return this.newsService.updateNews(id,payload);
    }

    @Delete(":id")
    deleteNews(@Param("id") id:number){
        return this.newsService.deleteNews(id)
    }

}

