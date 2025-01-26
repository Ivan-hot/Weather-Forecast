import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './enity/favorites.entity';
@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoritesRepository: Repository<Favorite>,
  ) {}

  async addFavorite(userId: number, cityName: string): Promise<Favorite> {
    const count = await this.favoritesRepository.count({ where: { userId } });
    if (count >= 5) {
      throw new BadRequestException('Maximum number of favorite cities (5) reached');
    }

    const favorite = this.favoritesRepository.create({
      userId,
      cityName,
    });
    return this.favoritesRepository.save(favorite);
  }

  async removeFavorite(userId: number, cityName: string): Promise<void> {
    await this.favoritesRepository.delete({ userId, cityName });
  }

  async getFavorites(userId: number): Promise<Favorite[]> {
    return this.favoritesRepository.find({ where: { userId } });
  }
}