import { DogController } from '@/controllers/dog.controller';
import { IDogController } from '@/controllers/interfaces/i.dog.controller';
import { Dog } from '@/models/dogs.model';
import { DogRepository } from '@/repository/dog.repository';
import { IDogRepository } from '@/repository/interfaces/i.dog.repository';
import { DogService } from '@/services/dog.service';
import { IDogService } from '@/services/interfaces/i.dog.service';
import { DiTypes } from '@/types/di/DiTypes';
import { Container } from 'inversify';

const dogDiContainer = new Container();

// Binding
dogDiContainer.bind<IDogRepository<Dog, number>>(DiTypes.DOG_REPOSITORY).to(DogRepository);
dogDiContainer.bind<IDogService>(DiTypes.DOG_SERVICE).to(DogService);
dogDiContainer.bind<IDogController>(DiTypes.DOG_CONTROLLER).to(DogController);

// Resolve
const dogController = dogDiContainer.get<IDogController>(DiTypes.DOG_CONTROLLER);
const dogService = dogDiContainer.get<IDogService>(DiTypes.DOG_SERVICE);
const dogRepository = dogDiContainer.get<IDogRepository<Dog, number>>(DiTypes.DOG_REPOSITORY);

// Export module
export { dogController, dogService, dogRepository };
