import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user-dto";
import {UsersService} from "./users.service";

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto)
    }

    @Get()
    getAll() {
        return this.usersService.getAllUsers()
    }

    @Get('/:email')
    getUserByEmail(@Param('email') email: string) {
        console.log('AAAAAAA', email)
        return this.usersService.getUserByEmail(email)
    }
}