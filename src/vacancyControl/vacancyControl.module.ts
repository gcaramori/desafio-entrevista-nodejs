import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VacancyControlService } from "./vacancyControl.service";
import { VacancyControlRepository } from "./vacancyControl.repository";
import { VacancyControlController } from "./vacancyControl.controller";
import { VacancyControl } from "./entities/vacancyControl.entity";

@Module({
    imports: [TypeOrmModule.forFeature([VacancyControl])],
    controllers: [VacancyControlController],
    providers: [VacancyControlRepository, VacancyControlService]
})
export class VacancyControlModule {}