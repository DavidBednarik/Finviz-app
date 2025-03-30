import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ImageNet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'int' })
  size: number;

  @ManyToOne(() => ImageNet, (imagenet) => imagenet.children, {
    nullable: true,
  })
  parent: ImageNet;

  @OneToMany(() => ImageNet, (imagenet) => imagenet.parent)
  children: ImageNet[];
}
