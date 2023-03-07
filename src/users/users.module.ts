import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';

@Module({  
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: process.env.jwt_key,
      signOptions: { expiresIn: '2h'},
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
