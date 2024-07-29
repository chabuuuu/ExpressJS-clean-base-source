import { HumanController } from "@/controllers/human.controller";
import { IHumanController } from "@/controllers/interfaces/i.human.controller";
import { Human } from "@/models/humans.model";
import { HumanRepository } from "@/repository/human.repository";
import { IHumanRepository } from "@/repository/interfaces/i.human.repository";
import { HumanService } from "@/services/human.service";
import { IHumanService } from "@/services/interfaces/i.human.service";
import { DiTypes } from "@/types/di/DiTypes";
import { Container } from "inversify";

const humanDiContainer = new Container();

humanDiContainer.bind<IHumanRepository<Human, string>>(DiTypes.HUMAN_REPOSITORY).to(HumanRepository);
humanDiContainer.bind<IHumanService>(DiTypes.HUMAN_SERVICE).to(HumanService);
humanDiContainer.bind<IHumanController>(DiTypes.HUMAN_CONTROLLER).to(HumanController);

const humanController = humanDiContainer.get<IHumanController>(DiTypes.HUMAN_CONTROLLER);
export { humanController };