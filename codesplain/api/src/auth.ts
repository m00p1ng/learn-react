import crypto from 'crypto';
import { promisify } from 'util';
import client from '../prisma/client';

const scrypt = promisify(crypto.scrypt);

export const hashPassword = async (password: string) => {
  const salt = crypto.randomBytes(16).toString('hex');
  // @ts-ignore
  const hash = (await scrypt(password, salt, 1000, 64)).toString('hex');

  return `${salt}.${hash}`;
};

export const verifyPassword = async (user: any, suppliedPassword: string) => {
  const [salt, hash] = user.password.split('.');
  // @ts-ignore
  const suppliedHash = (
    // @ts-ignore
    await scrypt(suppliedPassword, salt, 1000, 64)
  ).toString('hex');

  return suppliedHash === hash;
};

export const createUser = async (email: string, password: string) => {
  const hashedPassword = await hashPassword(password);
  const user = await client.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return user;
};

export const getUserByEmail = async (email: string) => {
  const user = await client.user.findUnique({
    where: { email },
  });

  return user;
};
