import Connection from "better-sqlite3";
import { buildQuery } from "./mosql.js";

export default class Database {
	constructor(options) {
		this.connection = new Connection(options.file, {
			memory: options.inMemory || false,
			readonly: options.isReadOnly || false,
			fileMustExist: options.throwOnMissingFile || false,
		});
	}

	// only on queries that return data
	get(query) {
		return this.command(query, "get");
	}

	// only on queries that return data
	getAll(query) {
		return this.command(query, "all");
	}

	// only on queries that return data
	getOneByOne(query) {
		return this.command(query, "iterate");
	}

	// only on queries that do not return data
	run(query) {
		return this.command(query, "run");
	}

	command(command, method) {
		const { sql, values } = buildQuery(command);
		const statement = this.connection.prepare(sql);

		return Promise.resolve(statement[method](values));
	}
}
