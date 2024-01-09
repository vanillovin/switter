import { atom } from 'jotai';
import { User } from '../types/User';

import { loadUserFromLocalStorage } from '../utils/storage';

const initialUser = loadUserFromLocalStorage();

export const userAtom = atom<User | null>(initialUser);
