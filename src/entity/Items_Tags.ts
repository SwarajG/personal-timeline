import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"

@Entity()
export class Items_Tags {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  post_id: number

  @Column()
  tag_id: number

  @CreateDateColumn()
  created_at: Date
}
