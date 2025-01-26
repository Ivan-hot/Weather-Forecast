import { Controller, Get, Post, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/favorites')
@UseGuards(JwtAuthGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getFavorites(@Request() req) {
    return this.favoritesService.getFavorites(req.user.id);
  }

  @Post(':cityName')
  addFavorite(@Request() req, @Param('cityName') cityName: string) {
    return this.favoritesService.addFavorite(req.user.id, cityName);
  }

  @Delete(':cityName')
  removeFavorite(@Request() req, @Param('cityName') cityName: string) {
    return this.favoritesService.removeFavorite(req.user.id, cityName);
  }
}
