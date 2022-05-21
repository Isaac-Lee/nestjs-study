import { Body, Injectable, NotFoundException, Param } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { Movie } from './entities/movies.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];
  private nextId = 0;

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: string): Movie {
    const movie = this.movies.find((movie) => movie.id === parseInt(id));
    if (!movie) {
      throw new NotFoundException(`Movie not found with ID ${id}`);
    }
    return movie;
  }

  create(movieData) {
    this.movies.push({
      id: this.nextId++,
      ...movieData,
    });
  }

  deleteOne(id: string): void {
    this.getOne(id); // for not found error check
    this.movies = this.movies.filter((movie) => movie.id !== parseInt(id));
  }

  update(id: string, updateData) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData });
  }
}
