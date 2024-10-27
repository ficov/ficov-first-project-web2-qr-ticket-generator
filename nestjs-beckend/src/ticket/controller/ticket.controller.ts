import { Body, Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import { TicketService } from '../service/ticket.service';
import { Observable } from 'rxjs';
import { TicketEntity } from '../models/ticket.entity';
import { TicketInterface } from '../models/ticket.interface';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('ticket')
export class TicketController {

    constructor(private ticketService: TicketService) {}

    @Get('totalNumber')
    getTotalNum(): Observable<number> {
        return this.ticketService.getTotalNum();
    }

    @UseGuards(AuthGuard('jwt-m2m-authz'))
    @Post()
    async add(@Body() ticket: TicketInterface, @Res() res: Response): Promise<any> {
        const ticketValue = await this.ticketService.add(ticket);
        res.setHeader('Content-Type', 'image/png');
        res.send(ticketValue);
    }

    @UseGuards(AuthGuard('jwt-openid-acces'))
    @Get(':id')
    findOne(@Param() params: any): Promise<any> {
        return this.ticketService.findOne(params.id);
    }
}
