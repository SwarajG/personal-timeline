import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm"
import { User } from './User';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, (user) => user.posts)
  user: User

  @Column({
    nullable: true
  })
  content: string | ''

  @Column({
    nullable: true
  })
  media_url: string | ''

  @CreateDateColumn()
  created_at: Date
}
