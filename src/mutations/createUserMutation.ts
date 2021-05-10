import { CreateUserMutation } from '../types';
import oktaClient from '../oktaClient';

export const createUser: CreateUserMutation = async (_, { user }) => {
  console.log('Received request: createUser');
  console.log(user);

  const newUser = {
    profile: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.emailAddress,
      login: user.emailAddress
    },
    credentials: {
      password: {
        value: user.password
      }
    }
  };

  try {
    await oktaClient.createUser(newUser);

    return 'success';
  } catch (error) {
    console.error('Error occured: createUser');
    console.error(error.errorCauses);
    return JSON.stringify(error.errorCauses);
  }
};
