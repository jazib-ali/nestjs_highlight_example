import { Controller, Get, HttpException, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './CreateUser.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  secondHello(@Body() createUserDto: CreateUserDto): string {
    return this.appService.getHello();
  }
}
