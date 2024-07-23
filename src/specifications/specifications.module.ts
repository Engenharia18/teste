import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specifications } from './entities/specifications.entity';
import { SpecificationsService } from './specifications.service';

@Module({
  imports: [TypeOrmModule.forFeature([Specifications])],
  providers: [SpecificationsService],
  exports: [SpecificationsService],
})
export class SpecificationsModule {}
