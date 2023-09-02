import { Controller, Post, Body,  UsePipes, ValidationPipe, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Create a user' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {

    const { username, password } = createUserDto;
    if (!username || !password) {
      throw new BadRequestException('Username and password should not be empty');
    }
    return this.userService.create(createUserDto.username, createUserDto.name, createUserDto.password);
  }
}
