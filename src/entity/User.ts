import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm"

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
}
