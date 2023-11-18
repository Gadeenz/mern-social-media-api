import 'dotenv/config';
import { connectToDB } from '../src/db';
import { Numbering } from '../src/numbering/schemas';

export const mochaHooks = {
  async beforeAll() {
    const dbhost = 'mongodb://127.0.0.1:27017/CentralFishAgencyTEST';
    connectToDB(dbhost);

    await Numbering.db.dropDatabase();
  },
};
