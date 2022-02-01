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

  create() {
    return 'This action adds a new plantHistory';
  }

  async findAllHistory(userId: number) {
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

  findOne(id: number) {
    return `This action returns a #${id} plantHistory`;
  }

  update(id: number) {
    return `This action updates a #${id} plantHistory`;
  }
}
