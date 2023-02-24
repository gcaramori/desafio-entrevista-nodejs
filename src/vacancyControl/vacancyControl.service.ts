import { Injectable } from '@nestjs/common';
import { CreateEntryVacancyControlDTO } from "./dto/createEntryVacancyControl.dto";
import { CreateExitVacancyControlDTO } from "./dto/createExitVacancyControl.dto";
import { VacancyControlRepository } from './vacancyControl.repository';
import { VacancyControl } from './entities/vacancyControl.entity';

@Injectable()
export class VacancyControlService {
    constructor(
        private readonly vacancyControlRepository: VacancyControlRepository
    ) {}

    async registerEntry(vacancyData: CreateEntryVacancyControlDTO): Promise<VacancyControl> {
        return this.vacancyControlRepository.registerEntry(vacancyData);
    }

    async registerExit(id: string, vacancyData: CreateExitVacancyControlDTO): Promise<VacancyControl> {
        return await this.vacancyControlRepository.registerExit(id, vacancyData);
    }

    async getSummary(): Promise<VacancyControl[]> {
        return await this.vacancyControlRepository.getSummary();
    }

    async getSummaryByHour(): Promise<VacancyControl[]> {
        return await this.vacancyControlRepository.getSummaryByHour();
    }
}