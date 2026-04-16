import { Controller, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('users')
  async getAllUsers() {
    return this.adminService.getAllUsers();
  }

  @Get('stats')
  async getPlatformStats() {
    return this.adminService.getPlatformStats();
  }

  @Patch('users/:id/role')
  async updateRole(@Param('id') id: string, @Body() body: { role: string }) {
    await this.adminService.updateUserRole(id, body.role);
    return { success: true };
  }

  @Patch('users/:id/kyc')
  async updateKyc(@Param('id') id: string, @Body() body: { kycStatus: string }) {
    await this.adminService.updateUserKyc(id, body.kycStatus);
    return { success: true };
  }
}
