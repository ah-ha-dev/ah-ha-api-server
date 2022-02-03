import {Injectable, BadRequestException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {PlantHistory} from './entities/plant-history.entity';
import {Repository} from 'typeorm';
import {User} from '../user/entities/user.entity';
import {Err} from './../common/error';

@Injectable()
export class PlantHistoryService {
  constructor(
    @InjectRepository(PlantHistory)
    private readonly plantHistoryRepository: Repository<PlantHistory>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createPlantHistory(user: User) {
    return await this.plantHistoryRepository.save({
      startTime: new Date(),
      user,
    });
  }

  async findAllPlantHistory(userId: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['plant'],
    });

    if (!user) throw new BadRequestException(Err.USER.NOT_FOUND);

    const plantHistoryList = await this.plantHistoryRepository.find({
      where: {
        user,
      },
      order: {
        createdAt: 'ASC',
      },
    });
    plantHistoryList.pop();
    return plantHistoryList;
  }

  async findLatestPlantHistory(user: User) {
    return await this.plantHistoryRepository.findOne({
      where: {
        user,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async update(plantHistoryId: number, user: User) {
    return await this.plantHistoryRepository.update(plantHistoryId, {
      name: user.plant.name,
      kind: user.plant.kind,
      finishTime: new Date(),
    });
  }
}
