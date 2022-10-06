import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {

	constructor(
		@InjectRepository(User)
		private repo: Repository<User>,
	) { }

	/**
	 * Create a new user
	 * 
	 * @param dto CreateUserDto
	 * @returns
	 */
	create(dto: CreateUserDto) {
		const user = this.repo.create(dto);

		return this.repo.save(user);
	}

	/**
	 * Find a user based on its Id
	 * 
	 * @param id number
	 * @returns user User
	 */
	findOne(id: number) {
		return this.repo.findOne({
			where: {
				id: id,
			},
		});
	}

	/**
	 * Find users With the given email
	 * 
	 * @param email string
	 * @returns users User[]
	 */
	find(email: string) {
		return this.repo.find({
			where: {
				email: email,
			},
		});
	}

	/**
	 * Update some or whole user attributes 
	 * after finding them using their ID
	 * 
	 * @param id number
	 * @param attrs User
	 */
	async update(id: number, attrs: Partial<User>) {
		const user = await this.findOne(id);

		if (!user) {
			throw new Error(`User not found`);
		}

		Object.assign(user, attrs); // copy and replace all the properties of attrs to user

		return this.repo.save(user);
	}

	/**
	 * delete a user with requested ID 
	 * 
	 * @param id number
	 */
	async remove(id: number) {
		const user = await this.findOne(id);

		if (!user) {
			throw new Error(`User not found`);
		}

		return this.repo.remove(user);
	}
}
