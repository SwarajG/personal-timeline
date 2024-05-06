import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany } from "typeorm"
import { Post } from "./Post"

@Entity()
@Index(["email"], { unique: true })
export class User {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firstName: string | ''

  @Column()
  lastName: string | ''

  @Column()
  age: number

  @Column()
  email: string

  @Column()
  displayName: string | ''

  @Column()
  picture: string | ''

  @Column()
  googleId: string | ''

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[]
}
