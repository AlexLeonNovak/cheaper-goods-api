import * as bcrypt from 'bcryptjs';

const SALT_FACTOR = 10;

export class PasswordService {
  async compare(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }

  async hash(password: string) {
    return await bcrypt.hash(password, await bcrypt.genSalt(SALT_FACTOR));
  }
}
