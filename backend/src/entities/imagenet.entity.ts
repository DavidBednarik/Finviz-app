import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ImageNet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'int' })
  size: number;
}
