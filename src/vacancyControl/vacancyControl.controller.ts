import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
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
    @Get('/api/v1/vacancies/summary')
    async getSummary(): Promise<VacancyControl[]> {
        return await this.vacancyControlService.getSummary();
    }

    @ApiBearerAuth()
    @Get('/api/v1/vacancies/summaryByHour')
    async getSummaryByHour(): Promise<VacancyControl[]> {
        return await this.vacancyControlService.getSummaryByHour();
    }

    @ApiBearerAuth()
    @Put('/api/v1/vacancies/exit/:id')
    async registerExit(@Param('id') id: string, @Body() vacancyData: CreateExitVacancyControlDTO): Promise<VacancyControl> {
        return await this.vacancyControlService.registerExit(id, vacancyData);
    }
}