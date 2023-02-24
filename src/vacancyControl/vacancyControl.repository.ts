import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { VacancyControl } from "./entities/vacancyControl.entity";
import { CreateEntryVacancyControlDTO } from "./dto/createEntryVacancyControl.dto";
import { CreateExitVacancyControlDTO } from "./dto/createExitVacancyControl.dto";

@Injectable()
export class VacancyControlRepository {
    constructor(
        @InjectRepository(VacancyControl) private readonly repository: Repository<VacancyControl>
    ){}

    async registerEntry(vacancyData: CreateEntryVacancyControlDTO): Promise<VacancyControl> {
        const vacancyControlEntry = await this.repository.create(vacancyData);

        return await this.repository.save(vacancyControlEntry);
    }

    async registerExit(id: string, vacancyData: CreateExitVacancyControlDTO): Promise<VacancyControl> {
        const vacancy = await this.repository.update(id, vacancyData);

        return await this.repository.findOne({
            where: { id: id }
        });
    }

    async getSummary(): Promise<VacancyControl[]> {
        return await this.repository
        .createQueryBuilder('vacancy_control')  
        .innerJoin('vacancy_control.vehicle', 'vehicles')
        .innerJoin('vacancy_control.store', 'stores')
        .select('vacancy_control.store, stores.name as storeName')
        .addSelect('COUNT(CASE WHEN vacancy_control.entryTime IS NOT NULL THEN 1 END)', 'totalEntry')
        .addSelect('COUNT(CASE WHEN vacancy_control.exitTime IS NOT NULL THEN 1 END)', 'totalExit')
        .groupBy('vacancy_control.store')
        .getRawMany();
    }

    async getSummaryByHour(): Promise<VacancyControl[]> {
        return await this.repository
        .createQueryBuilder('vacancy_control')  
        .innerJoin('vacancy_control.vehicle', 'vehicles')
        .innerJoin('vacancy_control.store', 'stores')
        .select('vacancy_control.store, stores.name as storeName, DATE_FORMAT(vacancy_control.entryTime, "%Y-%m-%d %H:00:00") as hour')
        .addSelect('COUNT(CASE WHEN vacancy_control.entryTime IS NOT NULL THEN 1 END)', 'totalEntry')
        .addSelect('COUNT(CASE WHEN vacancy_control.exitTime IS NOT NULL THEN 1 END)', 'totalExit')
        .groupBy('hour, vacancy_control.store')
        .orderBy('hour', 'ASC')
        .getRawMany();
    }
}