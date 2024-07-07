import * as dotenv from 'dotenv';
import { adminSeed } from './admin-seed';

dotenv.config();

export async function seed() {
  await adminSeed();
}
