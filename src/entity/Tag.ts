import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  text: string | ''

  @CreateDateColumn()
  created_at: Date
}
