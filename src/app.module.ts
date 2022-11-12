import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsModule } from './news/news.module';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {  TypeOrmConfigService } from './config/database.configuration';
import { News } from './news/entity/news.entity';
import { User } from './user/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    NewsModule, UserModule, AuthModule,
    ConfigModule.forRoot({
      envFilePath: 'src/config/database.env',
      isGlobal: true,
    })
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
