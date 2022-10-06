import {
    Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {

	constructor(private usersService: UsersService) { }

	@Post('/signup')
	createUser(@Body() dto: CreateUserDto) {
		return this.usersService.create(dto);
	}

	@Get('/:id')
	async findUser(@Param('id') id: string) {
		const user = await this.usersService.findOne(parseInt(id));

		if (!user) {
			throw new NotFoundException(`Could not find user with ID : ${id}`);
		}

		return user;
	}

	@Get()
	findAllUsers(@Query('email') email: string) {
		return this.usersService.find(email);
	}

	@Patch('/:id')
	updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
		return this.usersService.update(parseInt(id), dto);
	}

	@Delete('/:id')
	removeUser(@Param('id') id: string) {
		return this.usersService.remove(parseInt(id));
	}
}
