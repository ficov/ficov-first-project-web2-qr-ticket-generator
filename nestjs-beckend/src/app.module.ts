import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketModule } from './ticket/ticket.module';
import { TicketEntity } from './ticket/models/ticket.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthzModule } from './authz/authz.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [TicketEntity],
      synchronize: true, 
    }),
    TicketModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthzModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
