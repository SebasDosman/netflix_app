import { BadRequestException, InternalServerErrorException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import * as bcrypt from 'bcryptjs';
import { AnyObject, Model } from 'mongoose';

import { CreateUserDto, UpdateUserDto } from '../dto';
import { User } from '../entities/user.entity';


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) 
    private userModel: Model<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { password, ...userData } = createUserDto;

      const newUser = new this.userModel({
        password: bcrypt.hashSync(password, 10),
        ...userData
      });

      await newUser.save();

      const { password:_, ...user } = newUser.toJSON();

      return user;
    } catch(error) {
      if (error.code === 11000) throw new BadRequestException(`${ createUserDto.email } already exists`);

      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userModel.find();
  
      if (users) return users;

      return [];
    } catch(error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({ _id: id });
  
      return user;
    } catch(error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<AnyObject> {
    try {
      const { password, ...userData } = updateUserDto;
      
      if (password) updateUserDto.password = bcrypt.hashSync(password, 10);
      
      const updateResult = await this.userModel.updateOne(
        { _id: id },
        { $set: userData }
      )

      if (updateResult.modifiedCount === 0 ) {
        const originalUser = await this.userModel.findOne({ _id: id });

        return originalUser; 
      }
      
      const updatedUser = await this.userModel.findOne({ _id: id });
      
      return updatedUser; 
    } catch(error) {
      throw new InternalServerErrorException(error);
    }
  }

  remove(id: string): Promise<AnyObject> {
    try {
      return this.userModel.deleteOne({ _id: id });
    } catch(error) {
      throw new InternalServerErrorException(error);
    }
  }
}