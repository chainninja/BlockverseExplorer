import * as dotenv from 'dotenv';
import { type Hex } from '@alchemy/aa-core';

dotenv.config();

export const PRIVATE_KEY = process.env.PRIVATE_KEY! as Hex;
export const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY!;
