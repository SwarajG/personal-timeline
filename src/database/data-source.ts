import "reflect-metadata"
import { DataSource } from "typeorm";
import { User } from "../entity/User";
import { Post } from '../entity/Post';
import { Tag } from '../entity/Tag';
import { Items_Tags } from '../entity/Items_Tags';

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "",
  password: "",
  database: "swarajgandhi",
  synchronize: true,
  logging: false,
  // NOTE: Always update this whenever adding any new entities to the DB
  entities: [User, Post, Tag, Items_Tags],
  migrations: [],
  subscribers: [],
})
