import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { AnyObject, Model } from 'mongoose';

import { CreateGenreDto, UpdateGenreDto } from '../dto';
import { Genre } from '../entities/genre.entity';


@Injectable()
export class GenreService {
  constructor(
    @InjectModel(Genre.name)
    private genreModel: Model<Genre>,
  ) { }

  async create(createGenreDto: CreateGenreDto): Promise<Genre> {
    try {
      const genre = new this.genreModel(createGenreDto);
      await genre.save();

      return genre;
    } catch (error) {
      if (error.code === 11000) throw new BadRequestException(`${ createGenreDto.name } already exists!`);
      
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateGenreDto: UpdateGenreDto): Promise<Genre> {
    try {
      const updatedGenre = await this.genreModel.findByIdAndUpdate(id, updateGenreDto, { new: true });

      return updatedGenre;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<Genre[]> {
    try {
      const genres = await this.genreModel.find();

      if (genres) return genres;

      return [];
    } catch(error){
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string): Promise<Genre> {
    try{
      const genre = await this.genreModel.findOne({ _id: id });
      
      return genre;
    } catch(error){
      throw new InternalServerErrorException(error);
    }
  }

  remove(id: string): Promise<AnyObject> {
    try {
      return this.genreModel.deleteOne({ _id: id });
    } catch(error) {
      throw new InternalServerErrorException(error);
    }
  }
}
