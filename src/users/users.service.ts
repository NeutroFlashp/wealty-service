import { Injectable, BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const {password, ...userData} = createUserDto 
    const user = this.usersRepository.create(
      {
        ...userData, 
        password: bcrypt.hashSync(password, 10)
      }
    );
    await this.usersRepository.save(user);
    return user
  }

  async findOne(id: number): Promise<User> {    
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  //async update(id: number, updateUserDto: UpdateUserDto) {    
  //  const user = await this.usersRepository.findOneBy({ id });
  //  if (!user) {
   //   throw new NotFoundException(`User with id ${id} not found`);
  //  }    
  //    const updatedUser = this.usersRepository.preload({
  //      id: id,
  //      ...updateUserDto,
  //    });
  //    await this.usersRepository.save(await updatedUser);
  //    return updatedUser;
  //}

  async login(loginUserDto: LoginUserDto) {
    const {password, email} = loginUserDto
    const user = await this.usersRepository.findOneBy({
      email
    });
    return user
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
    return {
      message: `User ${user.name} has been deleted.`,
    };
  }
  findAll(){
    return this.usersRepository.find()
  }
}
