import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) { }

  @Post('userData')
  async getUserData(@Request() req) {
    console.log('Received request for user data:', req.user);
    try {
      const userData = await this.userService.getUserData(req.user.id);
      console.log('User data retrieved:', userData);
      return userData;
    } catch (error) {
      console.error('Error getting user data:', error);
      throw error;
    }
  }
}