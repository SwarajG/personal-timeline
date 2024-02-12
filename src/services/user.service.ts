import { AppDataSource } from "@database/data-source";
import httpStatus from 'http-status';
import ApiError from '@utils/ApiError';
import { googleAuthType } from '@customTypes/authTypes';
import { User } from "entity/User";

const userRepository = AppDataSource.getRepository(User);


const createUser = async (userBody: googleAuthType): Promise<User> => {
  const user = {
    firstName: userBody._json.given_name || '',
    lastName: userBody._json.family_name || '',
    age: null,
    email: userBody._json.email,
    displayName: userBody.displayName || '',
    picture: userBody._json.picture || '',
  };
  if (await userRepository.findOneBy({ email: user.email })) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return userRepository.create(userBody);
};

const getUserById = async (id: number) => {
  const user = await userRepository.findOneBy({ id });
  return user;
};

export {
  createUser,
  getUserById
}