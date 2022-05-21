import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movies.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];
  private nextId = 0;

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) {
      throw new NotFoundException(`Movie not found with ID ${id}`);
    }
    return movie;
  }

  create(movieData: CreateMovieDto) {
    this.movies.push({
      id: this.nextId++,
      ...movieData,
    });
  }

  deleteOne(id: number): void {
    this.getOne(id); // for not found error check
    this.movies = this.movies.filter((movie) => movie.id !== id);
  }

  update(id: number, updateData: UpdateMovieDto) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData });
  }
}
