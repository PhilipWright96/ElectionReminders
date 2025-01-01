import { CapacitorSQLite } from '@capacitor-community/sqlite';

const databaseName = "testDatabase6.db",
    databaseProperties = {
        database: databaseName,
        version: 1,
        encrypted: false,
        readonly: false,
    },
    createTableQuery = `
          CREATE TABLE IF NOT EXISTS reminders6 (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL
          );
        `,
    insertQuery = `
            INSERT INTO reminders6 (name, email)
            VALUES (?, ?);
            `;



export async function createReminderInDatabase(): Promise<void> {
    console.log("Creating reminder!");
    try {
        console.log(`Creating db connection with ${databaseProperties}`)
        await CapacitorSQLite.createConnection(databaseProperties);

        console.log(`Opening db connection`)
        await CapacitorSQLite.open({
            database: databaseName,
            readonly: false,
        });

        console.log(`Executing query ${createTableQuery}`);

        await CapacitorSQLite.execute({
            database: databaseName,
            statements: createTableQuery,
        });

        console.log(`Adding new entry to database connection`);
        const result = await CapacitorSQLite.run({
            database: databaseName,
            statement: insertQuery,
            values: ["phil6", "philemail6"],
        });

        if (result.changes && result.changes.changes != undefined && result.changes.changes > 0) {
            console.log(`User added successfully! Row ID: ${result.changes.lastId}`);
        } else {
            console.error("Failed to insert user.");
        }
        console.log(`Closing connection`);
        await CapacitorSQLite.closeConnection({ database: databaseName, readonly: false });
    }
    catch (error) {
        console.log(`error in database operation ${error}`);
    }

}