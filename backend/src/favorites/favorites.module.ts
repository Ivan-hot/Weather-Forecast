import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './enity/favorites.entity';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite])],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}