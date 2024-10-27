import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketEntity } from '../models/ticket.entity';
import { NumericType, Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { TicketInterface } from '../models/ticket.interface';
import { Logger } from '@nestjs/common';
import { log } from 'console';
import * as QRCode from 'qrcode';

@Injectable()
export class TicketService {
    private logger = new Logger('TicketService');

    constructor(
        @InjectRepository(TicketEntity)
        private ticketRepository: Repository<TicketEntity>
    ) { }

    async add(ticket: TicketInterface): Promise<any> {
        const { firstName, lastName, vatin } = ticket;
        if (!firstName || !lastName || !vatin) {
            throw new BadRequestException('vatin, firstname and lastName are required');
        }

        var vatinString = String(vatin);

        if (vatinString.length !== 11) {
            throw new BadRequestException('VATIN must be exactly 11 characters', {
                cause: new Error(),
                description: 'Invalid VATIN length'
            });
        }

        var count = 0;
        count = await this.ticketRepository
            .createQueryBuilder("ticket")
            .where("ticket.vatin = :oib", { oib: vatin })
            .getCount();
        if (count == 3) {
            throw new BadRequestException('Cannot create more than 3 tickets for the same person', {
                cause: new Error(),
                description: 'Too many tickets on the same person'
            });
        } else {
            const savedTicket = await this.ticketRepository.save(ticket);
            const ticketUrl = process.env.FRONTEND_DEV_URL +  `/tickets/${savedTicket.id}`;
            const qrCodeImageBuffer = await QRCode.toBuffer(ticketUrl);

            return qrCodeImageBuffer;
        }
    }

    getTotalNum(): Observable<number> {
        return from(this.ticketRepository.count())
    }

    async findOne(id: string): Promise<any> {
        const ticket = this.ticketRepository
            .createQueryBuilder("ticket")
            .select(["ticket.vatin", "ticket.firstName", "ticket.lastName", "ticket.timeCreated"])
            .where("ticket.id = :id", { id })
            .getOne()
        return ticket
    }
}
