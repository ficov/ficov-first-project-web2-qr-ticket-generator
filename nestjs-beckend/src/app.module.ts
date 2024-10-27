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
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
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
