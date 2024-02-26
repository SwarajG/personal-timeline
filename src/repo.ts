import { AppDataSource } from '@database/data-source';
import { User } from 'entity/User';

const userRepository = AppDataSource.getRepository(User);

export { userRepository };
