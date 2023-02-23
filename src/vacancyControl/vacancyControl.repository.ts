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
}