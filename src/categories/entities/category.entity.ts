import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Subcategory } from './subcategory.entity';
import { GeneralCategory } from './generalcategory.entity';
import { Income } from 'src/incomemanager/entites/income.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => Subcategory, (subcategory) => subcategory.category)
  subcategories: Subcategory[];

  @ManyToOne(
    () => GeneralCategory,
    (generalCategory) => generalCategory.categories,
    {
      onDelete: 'CASCADE',
    },
  )
  generalCategory: GeneralCategory;

  @OneToMany(() => Income, (income) => income.category)
  income: Income[];
}
