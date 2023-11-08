
import { EXCEPTIONS_MESSAGES } from 'src/exceptions/custom-exception';

import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';

import { AuthGuard } from 'src/guards/auth.guard';
import { ContentService } from '../service/content.service';
import { CreateContentDto } from '../dto/create-content.dto';
import { UpdateContentDto } from '../dto/update-content.dto';
import { Content } from '../entities/content.entity';
import { AuthorizationMiddleware } from 'src/middlewares/authorization.middleware';
import { AdminMiddleware } from 'src/middlewares/admin-authorization.middleware';


@Controller('content')
export class ContentController {
  constructor(
    private readonly contentService: ContentService
  ) { }

  @UseGuards(AuthGuard)
  @UseGuards(AuthorizationMiddleware)
  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() createContentDto: CreateContentDto): Promise<Content> {    
    return this.contentService.create(createContentDto);
  }

  @UseGuards(AuthGuard)
  @UseGuards(AdminMiddleware)
  @Get()
  findAll() {
    return this.contentService.findAll();
  }

  @UseGuards(AuthGuard)
  @UseGuards(AdminMiddleware)
  @Get(':id')
  findOneById(@Param('id') id: string) {
    if (!this.isValidMongoId(id)) throw new NotFoundException(EXCEPTIONS_MESSAGES.INVALID_ID(id));

    return this.contentService.findOneById(id);
  }
  
  @UseGuards(AuthGuard)
  @Get('/query/:query')
  findByQuery(@Param('query') query: string) {
    return this.contentService.findByString(query)
  }

  @UseGuards(AuthGuard)
  @UseGuards(AuthorizationMiddleware)
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updateContentDto: UpdateContentDto) {
    if (!this.isValidMongoId(id)) throw new NotFoundException(EXCEPTIONS_MESSAGES.INVALID_ID(id));

    return this.contentService.update(id, updateContentDto);
  }

  @UseGuards(AuthGuard)
  @UseGuards(AuthorizationMiddleware)
  @Delete(':id')
  remove(@Param('id') id: string) {
    if (!this.isValidMongoId(id)) throw new NotFoundException(EXCEPTIONS_MESSAGES.INVALID_ID(id));

    return this.contentService.remove(id);
  }

  private isValidMongoId(id: string): boolean {
    const mongoIdRegex = /^[0-9a-fA-F]{24}$/;
    
    return mongoIdRegex.test(id);
  }
}
