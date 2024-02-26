import { AppDataSource } from '@database/data-source';
// import httpStatus from 'http-status';
// import ApiError from '@utils/ApiError';
import { googleAuthType } from '@customTypes/authTypes';
import { User } from 'entity/User';

const userRepository = AppDataSource.getRepository(User);

const createUser = async (userBody: googleAuthType): Promise<User> => {
	const user = {
		firstName: userBody._json.given_name || '',
		lastName: userBody._json.family_name || '',
		age: 0,
		email: userBody._json.email,
		displayName: userBody.displayName || '',
		picture: userBody._json.picture || '',
		googleId: userBody.id,
	};
	const isUserExits = await getUserByEmail(user.email);
	if (!!isUserExits) {
		return isUserExits;
	}
	const userObject = userRepository.create(user);
	const newUser = await userRepository.save(userObject);
	return newUser;
};

const getUserById = async (id: number) => {
  if (!id) {
    return null;
  }
	const user = await userRepository.findOneBy({ id });
	return user;
};

const getUserByEmail = async (email: string) => {
	const user = await userRepository.findOneBy({ email });
	return user;
};

export { createUser, getUserById };
