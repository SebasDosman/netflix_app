import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel, } from '@nestjs/mongoose';

import * as bcryptjs from 'bcryptjs';
import { Model } from 'mongoose';

import { JwtPayload } from 'src/interfaces/jwt-payload.interface';
import { LoginResponse } from 'src/interfaces/login-response.interface';
import { CreateUserDto } from '../../user/dto';
import { User } from '../../user/entities/user.entity';
import { LoginUserDto, RegisterUserDto } from '../dto';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { password, ...userData } = createUserDto;

      const newUser = new this.userModel({ 
        password: bcryptjs.hashSync(password, 10), 
        ...userData 
      });

      await newUser.save();

      const { password: _, ...user } = newUser.toJSON();

      return user;
    } catch (error) {
      if (error.code === 11000) throw new BadRequestException(`${createUserDto.email} already exists!`);
      
      throw new InternalServerErrorException();
    }
  }

  async register(registerDto: RegisterUserDto): Promise<LoginResponse> {
    const user = await this.create(registerDto)

    return {
      user: user,
      token: this.getJwtToken({ id: user._id })
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginResponse> {
    const { email, password } = loginUserDto;

    const user = await this.userModel.findOne({ email })

    if (!user) throw new UnauthorizedException('Not valid credentials');
    if (!bcryptjs.compareSync(password, user.password)) throw new UnauthorizedException('Not valid credentials');
    
    const { password: _, ...rest } = user.toJSON();

    return {
      user: rest,
      token: this.getJwtToken({ id: user.id, iat: 0 }),
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findUserById(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) throw new UnauthorizedException('User not found');
    
    const { password, ...rest } = user.toJSON();
    
    return rest;
  }

  async findOne(id: string): Promise<User | null> {
    const user = await this.userModel.findById(id);
    
    return user;
  }

  getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    
    return token;
  }
}
