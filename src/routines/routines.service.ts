import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Routine } from './entities/routine.entity';
import { Repository } from 'typeorm';
import { CreateRoutineDto } from './dtos/create-routine.dto';

@Injectable()
export class RoutinesService {
  constructor(
    @InjectRepository(Routine)
    private routineRepository: Repository<Routine>,
  ) {}

  async create(routine: CreateRoutineDto): Promise<Routine> {
    const createRoutine = this.routineRepository.create(routine);

    return await this.routineRepository.save(createRoutine);
  }

  async findAll(): Promise<Routine[]> {
    const routines = this.routineRepository.find({
      relations: ['products'],
    });
    if (!routines) {
      return null;
    }

    return routines;
  }

  async findOne(id: number): Promise<Routine> {
    const routine = this.routineRepository.findOne({
      where: { id },
      relations: ['products'],
    });

    if (!routine) {
      return null;
    }

    return routine;
  }

  async update(id: number, update: CreateRoutineDto): Promise<Routine> {
    const routine = await this.findOne(id);
    if (routine === null) {
      throw new BadRequestException('Routine not found');
    }

    await this.routineRepository.update(id, update);

    return this.findOne(id);
  }

  async remove(id: number): Promise<any> {
    const routine = await this.findOne(id);

    if (routine === null) {
      throw new BadRequestException('Routine not found');
    }

    await this.routineRepository.remove(routine);

    return {
      message: 'Routine deleted',
    };
  }
}
