import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNewsDto } from './dto/createNewsDto.dto';
import { UpdateNewsDto } from './dto/updateNewsDto.dto';
import { News } from './entity/news.entity';

@Injectable()
export class NewsService {
    constructor(
        @InjectRepository(News)
        private newsRepository: Repository<News>
    ) { }

    async findAllNews(): Promise<News[]> {
        const found = await this.newsRepository.find()
        return found
    }
    async createNews(payload: CreateNewsDto): Promise<News> {
        try {
            const created = await this.newsRepository.save(payload)
            return created
        } catch (e) {
            throw e;
        }
    }
    async updateNews(id: number, payload: UpdateNewsDto): Promise<any> {
        try {
            const updated = await this.newsRepository.update(id, payload)
            if (updated.affected > 0) return updated;
        } catch (e) {
            throw e;
        }
        throw new NotFoundException()
    }
    async deleteNews(id: number) {
        try {
            const deleted = await this.newsRepository.delete(id)
            if (deleted.affected > 0) return deleted;
        } catch (e) {
            throw e
        }
        throw new NotFoundException()
    }
    async findOneNews(id: number) {
        try {
            const result = await this.newsRepository.findOne({ where: { id } });
            if (result) return result;
            throw new NotFoundException()
        } catch (e) {
            throw e;
        }
    }
}
