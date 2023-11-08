
import { EXCEPTIONS_MESSAGES } from 'src/exceptions/custom-exception';

import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';

import { AuthGuard } from 'src/guards/auth.guard';
import { CreateGenreDto } from '../dto/create-genre.dto';
import { UpdateGenreDto } from '../dto/update-genre.dto';
import { GenreService } from '../service/genre.service';
import { AuthorizationMiddleware } from 'src/middlewares/authorization.middleware';


@Controller('genre')
export class GenreController {
  constructor(
    private readonly genreService: GenreService
  ) { }

  @UseGuards(AuthGuard)
  @UseGuards(AuthorizationMiddleware)
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genreService.create(createGenreDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.genreService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!this.isValidMongoId(id)) throw new NotFoundException(EXCEPTIONS_MESSAGES.INVALID_ID(id));

    return this.genreService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @UseGuards(AuthorizationMiddleware)
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updateGenreDto: UpdateGenreDto) {
    if (!this.isValidMongoId(id)) throw new NotFoundException(EXCEPTIONS_MESSAGES.INVALID_ID(id));

    return this.genreService.update(id, updateGenreDto);
  }

  @UseGuards(AuthGuard)
  @UseGuards(AuthorizationMiddleware)
  @Delete(':id')
  remove(@Param('id') id: string) {
    if (!this.isValidMongoId(id)) throw new NotFoundException(EXCEPTIONS_MESSAGES.INVALID_ID(id));
    
    return this.genreService.remove(id);
  }

  private isValidMongoId(id: string): boolean {
    const mongoIdRegex = /^[0-9a-fA-F]{24}$/;
    
    return mongoIdRegex.test(id);
  }
}