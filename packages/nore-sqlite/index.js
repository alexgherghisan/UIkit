import { buildQuery } from "./mosql.js";
import Table from "./Table.js";
import Database from "./Database.js";
import formatTableDefinitions from "./formatTableDefinitions.js";

export default class SQLite {
	constructor(options = {}) {
		if (!options.file) {
			throw Error(`Missing path to SQLite database file.`);
		}

		// the SQLite connection
		this.db = new Database(options);

		// cache table instances
		this.tables = new Map();
	}

	run(type, command) {
		return this.db[type](command);
	}

	create(table, definition) {
		return this.db.run({
			type: "create-table",
			table: table,
			ifNotExists: true,
			definition: formatTableDefinitions(definition),
		});
	}

	rename(from, to) {
		return this.run({
			type: "alter-table",
			table: from,
			ifExists: true,
			action: { rename: to },
		});
	}

	drop(table) {
		return this.run({
			type: "drop-table",
			table: table,
			ifExists: true,
		});
	}

	// the SQLite table API
	table(name) {
		if (this.tables.has(name)) {
			return this.tables.get(name);
		} else {
			const table = new Table({ name, db: this.db });

			this.tables.set(name, table);

			return table;
		}
	}
}
