import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { config } from '../../common';
import { BaseModel } from '../base/schemas';
import HttpException from '../../common/exceptions/HttpException';
import { AddAdminValidation, AdminLoginValidation } from './validations';
import { AdminModel } from './schemas';

export class AdminService {
  public async addNewAdmins(body: AddAdminValidation) {
    const reqBody = body;
    reqBody.password = await hash(reqBody.password, 8);
    const admin: any = await AdminModel.create(reqBody);
    // TODO: Revamp JWT token
    const token = sign({ _id: admin._id.toString() }, config.jwtSecret);
    admin.token = token;
    await admin.save();
    return { added: true, admin };
  }

  public async AdminsLogin(body: AdminLoginValidation): Promise<{}> {
    const { email, password } = body;
    const admin = await BaseModel.findUserByEmailAndPassword(email, password);
    if (!admin.active) {
      throw new HttpException(500, 'deactivated');
    }
    return { admin };
  }
}
