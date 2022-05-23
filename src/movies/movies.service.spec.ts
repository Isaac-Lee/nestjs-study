import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    
    service.create({
      title: 'Test Movie',
      genres: ['test'],
      year: 2000,
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      const movie = service.getOne(0);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(0);
    });
    it('should throw NotFoundException', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie not found with ID 999`);
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeMovies = service.getAll().length;
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeGreaterThan(beforeMovies);
    });
  });

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      const allMovies = service.getAll().length;
      service.deleteOne(0);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(allMovies);
    });
    it('should throw NotFoundException', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie not found with ID 999`);
      }
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.update(0, { title: 'Updated Test' });
      const movie = service.getOne(0);
      expect(movie.title).toEqual('Updated Test');
    });
    it('should throw NotFoundException', () => {
      try {
        service.update(0, { title: 'Updated Test' });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie not found with ID 999`);
      }
    });
  });
});
