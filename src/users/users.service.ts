import {
  BadRequestException,
  Get,
  Inject,
  Injectable,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto, UserDto } from './dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  @Inject(JwtService)
  private jwtService: JwtService;

  async register(createUserDto: CreateUserDto) {
    const createUser = new this.userModel(createUserDto);
    return createUser.save();
  }

  async login(userDto: UserDto) {
    const user = await this.userModel
      .findOne({ username: userDto.username })
      .exec();
    if (!user) {
      throw new BadRequestException('用户不存在');
    }
    if (user.password !== userDto.password) {
      throw new BadRequestException('密码错误');
    }

    const accessToken = this.jwtService.sign(
      {
        username: user.username,
        email: user.email,
      },
      {
        expiresIn: '0.5h',
      },
    );

    const refreshToken = this.jwtService.sign(
      {
        username: user.username,
      },
      {
        expiresIn: '7d',
      },
    );

    return {
      userInfo: {
        username: user.username,
        email: user.email,
      },
      accessToken,
      refreshToken,
    };
  }

  @Get('refresh')
  async refresh(@Query('token') token: string) {
    try {
      const data = this.jwtService.verify(token);
      const user = await this.userModel
        .findOne({
          username: data.username,
        })
        .exec();
      const accessToken = this.jwtService.sign(
        {
          username: user.username,
          email: user.email,
        },
        {
          expiresIn: '0.5h',
        },
      );
      const refreshToken = this.jwtService.sign(
        {
          username: user.username,
        },
        {
          expiresIn: '7d',
        },
      );
      return {
        accessToken,
        refreshToken,
      };
    } catch (e) {
      throw new UnauthorizedException('token 失效，请重新登录');
    }
  }
}
