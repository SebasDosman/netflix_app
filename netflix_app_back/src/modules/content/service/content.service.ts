import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { CreateContentDto, UpdateContentDto } from '../dto';
import { Content } from '../entities/content.entity';


@Injectable()
export class ContentService {
  constructor(  
    @InjectModel(Content.name) 
    private contentModel: Model<Content> 
  ) { }

  async create(createContentDto: CreateContentDto): Promise<Content> {
    try {
      const newContent = new this.contentModel(createContentDto);
      await newContent.save();

      return newContent.toJSON();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<Content[]> {
    try {
      const resp = await this.contentModel.find();

      if (resp) return resp; 

      return [];
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOneById(id: string): Promise<Content[] | Content>  {
    try {
      const resp = await this.contentModel.findOne({ _id: id });

      if (resp) return resp;

      return [];
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findByString(query: string): Promise<Content[] | Content> {
    try {
      const resp = await this.contentModel.find({
        $or: [
          { title : { $regex: query, $options: 'i' }},
          { description : { $regex: query, $options: 'i' }},
          { tags : { $elemMatch: { $regex: query, $options: 'i' }}},
          { castList : { $elemMatch: { $regex: query, $options: 'i' }}}
        ]
      });

      if (resp) return resp;
      
      return [];
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateContentDto: UpdateContentDto) {
    try {
      const resp = await  this.contentModel.updateOne({ _id: id }, updateContentDto);

      return resp;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  remove(id: string) {
    try {
      return this.contentModel.deleteOne({ _id: id });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
