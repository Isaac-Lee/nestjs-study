import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movies.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];
  private nextId = 0;

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: string): Movie {
    return this.movies.find((movie) => movie.id === parseInt(id));
  }

  create(movieData) {
    this.movies.push({
      id: this.nextId++,
      ...movieData,
    });
  }

  deleteOne(id: string): boolean {
    this.movies.filter((movie) => movie.id !== parseInt(id));
    return true;
  }
}
