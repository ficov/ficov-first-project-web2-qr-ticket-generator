import { Module } from '@nestjs/common';
import { TicketService } from './service/ticket.service';
import { TicketController } from './controller/ticket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketEntity } from './models/ticket.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketEntity])
  ],
  providers: [TicketService],
  controllers: [TicketController]
})
export class TicketModule {}
