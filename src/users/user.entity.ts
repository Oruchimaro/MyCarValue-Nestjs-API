import {
    AfterInsert, AfterRemove, AfterUpdate, Column, Entity, PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	email: string;

	@Column()
	password: string;

	/**
	 * Log to console after a user is created with
	 * typeorm hooks
	 *
	 */
	@AfterInsert()
	logInsert() {
		console.log(`Inserted user with the ID : ${this.id}`);
	}

	/**
	 * Log to console after a user is updated
	 * with typeorm hooks
	 */
	@AfterUpdate()
	logUpdate() {
		console.log(`Updated user with the ID : ${this.id}`);
	}

	/**
	 * Log to console after a user is deleted
	 * with typeorm hooks
	 */
	@AfterRemove()
	logDelete() {
		console.log(`Removed user with the ID : ${this.id}`);
	}
}
