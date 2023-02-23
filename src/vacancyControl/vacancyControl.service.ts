import { Injectable } from '@nestjs/common';
import { CreateEntryVacancyControlDTO } from "./dto/createEntryVacancyControl.dto";
import { CreateExitVacancyControlDTO } from "./dto/createExitVacancyControl.dto";
import { VacancyControlRepository } from './vacancyControl.repository';

@Injectable()
export class VacancyControlService {
    constructor(
        private readonly vacancyControlRepository: VacancyControlRepository
    ) {}

    async registerEntry(vacancyData: CreateEntryVacancyControlDTO) {
        return this.vacancyControlRepository.registerEntry(vacancyData);
    }

    async registerExit(id: string, vacancyData: CreateExitVacancyControlDTO) {
        return await this.vacancyControlRepository.registerExit(id, vacancyData);
    }
}