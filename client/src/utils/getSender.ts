import { User } from '../types';

export function getSender(loggedUser: User, users: User[]): string {
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
}
