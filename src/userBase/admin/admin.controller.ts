import { JsonController, Post, Body, HttpCode } from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';
import { AdminService } from './admin.service';
import { AddAdminResponse, AdminLoginResponse } from './responses';
import { AddAdminValidation, AdminLoginValidation } from './validations';

@JsonController('/admins', { transformResponse: false })
export class AdminsController {
  private adminService: AdminService;

  constructor() {
    this.adminService = new AdminService();
  }

  @HttpCode(201)
  @Post('/')
  @ResponseSchema(AddAdminResponse)
  createAdmin(@Body() body: AddAdminValidation) {
    return this.adminService.addNewAdmins(body);
  }

  @HttpCode(200)
  @Post('/login')
  @ResponseSchema(AdminLoginResponse)
  login(@Body() body: AdminLoginValidation) {
    return this.adminService.AdminsLogin(body);
  }
}
