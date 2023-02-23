import { Body, Controller, Delete, Get, Param, Post, Put, HttpException, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateEntryVacancyControlDTO } from "./dto/createEntryVacancyControl.dto";
import { CreateExitVacancyControlDTO } from "./dto/createExitVacancyControl.dto";
import { VacancyControl } from './entities/vacancyControl.entity';
import { VacancyControlService } from './vacancyControl.service';

@Controller()
export class VacancyControlController {
    constructor(
        private readonly vacancyControlService: VacancyControlService
    ) {}
    
    @ApiBearerAuth()
    @Post('/api/v1/vacancies/entry')
    async registerEntry(@Body() vacancyData: CreateEntryVacancyControlDTO): Promise<VacancyControl> {
        return await this.vacancyControlService.registerEntry(vacancyData);
    }

    @ApiBearerAuth()
    @Put('/api/v1/vacancies/exit/:id')
    async registerExit(@Param() id: string, @Body() vacancyData: CreateExitVacancyControlDTO): Promise<VacancyControl> {
        return await this.vacancyControlService.registerExit(id, vacancyData);
    }
}