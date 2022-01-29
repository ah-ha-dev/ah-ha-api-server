import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Plant} from './entities/plant.entity';
import {Repository} from 'typeorm';
import {User} from './../user/entities/user.entity';

@Injectable()
export class PlantService {
  constructor(
    @InjectRepository(Plant)
    private readonly plantRepository: Repository<Plant>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async updatePlantInfo(plantId: number, score: number) {
    const plant = await this.plantRepository.findOne(plantId);
    let level = plant.level;

    // todo  레벨 계산하는 로직 추가

    if (score > 0) {
      level = 1;
      await this.plantRepository.update(plantId, {score, level});
    }
  }

  async getPlantInfo(userId: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['plant'],
    });
    return await this.plantRepository.findOne(user.plant.id);
  }
}
