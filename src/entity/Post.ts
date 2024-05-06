import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm"
import { User } from './User';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, (user) => user.posts)
  user: User

  @Column()
  content: string | ''

  @Column()
  media_url: string | ''

  @CreateDateColumn()
  created_at: Date
}
