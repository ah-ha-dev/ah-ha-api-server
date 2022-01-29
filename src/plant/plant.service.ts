import {Injectable, BadRequestException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Plant} from './entities/plant.entity';
import {Repository} from 'typeorm';
import {User} from './../user/entities/user.entity';
import {Err} from './../common/error';
import {CreatePlantDto} from './dto/createPlant.dto';

@Injectable()
export class PlantService {
  constructor(
    @InjectRepository(Plant)
    private readonly plantRepository: Repository<Plant>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createPlant(userId: number, createPlantDto: CreatePlantDto) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['plant'],
    });

    if (!user) throw new BadRequestException(Err.USER.NOT_FOUND);
    if (user.plant) throw new BadRequestException(Err.PLANT.EXISTING_PlANT);

    const plant = await this.plantRepository.save({
      name: createPlantDto.name,
      kind: createPlantDto.kind,
      score: 0,
      level: 1,
      user,
      ordinalNumber: 0,
    });
    delete plant.user;
    delete plant.createdAt;
    delete plant.updatedAt;
    delete plant.deletedAt;
    return plant;
  }

  async getPlantInfo(userId: number): Promise<Plant> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['plant'],
    });

    if (!user) throw new BadRequestException(Err.USER.NOT_FOUND);
    if (!user.plant) throw new BadRequestException(Err.PLANT.NOT_FOUND);

    return await this.plantRepository.findOne(user.plant.id);
  }

  async updatePlantInfo(userId: number, createPlantDto: CreatePlantDto) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['plant'],
    });

    if (!user) throw new BadRequestException(Err.USER.NOT_FOUND);
    if (!user.plant) throw new BadRequestException(Err.PLANT.NOT_FOUND);

    await this.plantRepository.update(user.plant.id, createPlantDto);
    return '업데이트에 성공하였습니다.';
  }

  async updatePlantScore(plantId: number, score: number) {
    const plant = await this.plantRepository.findOne(plantId);
    const level = plant.level;

    // todo  레벨 계산하는 로직 추가
    const sum = plant.score + score;

    await this.plantRepository.update(plantId, {
      score: sum,
      level,
    });
  }

  async resetPlant(userId: number, createPlantDto: CreatePlantDto) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['plant'],
    });

    if (!user) throw new BadRequestException(Err.USER.NOT_FOUND);
    if (!user.plant) throw new BadRequestException(Err.PLANT.NOT_FOUND);

    await this.plantRepository.update(user.plant.id, {
      name: createPlantDto.name,
      kind: createPlantDto.kind,
      score: 0,
      level: 1,
      ordinalNumber: user.plant.ordinalNumber + 1,
    });

    const plant = await this.plantRepository.findOne(user.plant.id);
    delete plant.user;
    delete plant.createdAt;
    delete plant.updatedAt;
    delete plant.deletedAt;
    return plant;
  }
}
