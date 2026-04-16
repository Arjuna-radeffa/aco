import { Controller, Get, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('profile')
  async getProfile(@Request() req) {
    const user = await this.usersService.findById(req.user.id);
    if (!user) return null;
    const { password, refreshToken, ...safe } = user;
    return safe;
  }

  @Patch('profile')
  async updateProfile(@Request() req, @Body() body: any) {
    const user = await this.usersService.updateProfile(req.user.id, body);
    if (!user) return null;
    const { password, refreshToken, ...safe } = user;
    return safe;
  }

  @Patch('profile/data')
  async updateProfileData(@Request() req, @Body() body: Record<string, any>) {
    const user = await this.usersService.updateProfileData(req.user.id, body);
    if (!user) return null;
    const { password, refreshToken, ...safe } = user;
    return safe;
  }
}