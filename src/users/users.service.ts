import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {

	constructor(
		@InjectRepository(User)
		private repo: Repository<User>
	) { }

	/**
	 * Create a new user
	 * @param dto CreateUserDto
	 * @returns 
	 */
	create(dto: CreateUserDto) {
		const user = this.repo.create(dto);

		return this.repo.save(user);
	}
}
