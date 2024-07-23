import { Routine } from 'src/routines/entities/routine.entity';
import { Specifications } from 'src/specifications/entities/specifications.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToOne(() => User, (user) => user.addedProducts, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'addedById' })
  addedById: User;

  @OneToMany(
    () => Specifications,
    (specifications) => specifications.productId,
    { cascade: true },
  )
  addedSpecifications: Specifications;

  @ManyToMany(() => Routine, (routine) => routine.products, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  routines: Routine[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
