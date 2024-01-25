import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Module({
  imports: [ConfigModule.forRoot({
  envFilePath:"local.env"
  }),TypeOrmModule.forRootAsync({
    imports:[ConfigModule],
    inject:[ConfigService],
    useFactory:(config:ConfigService)=>{
      return {
        type:'mysql',
        host:config.get('DB_HOST'),
        port:config.get('DB_HOST'),
        username:config.get('DB_USER'),
        password:config.get('DB_PASSWORD'),
        database:config.get('DB_DATABASE'),
        entities:[],
        autoLoadEntities:true,
        synchronize:true
      }
    },
    dataSourceFactory: async (options) => {
      const dataSource = await new DataSource(options).initialize();
      return dataSource;
    },
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
