import { CapacitorSQLite } from '@capacitor-community/sqlite';

const databaseName = "testDatabase.db",
    databaseProperties = {
        database: databaseName,
        version: 1,
        encrypted: false,
        readonly: false,
    },
    createTableQuery = `
          CREATE TABLE IF NOT EXISTS reminders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL
          );
        `,
    insertQuery = `
            INSERT INTO reminders (name, email)
            VALUES (?, ?);
            `;



export async function createReminderInDatabase(): Promise<void> {
    console.log("Creating reminder!");
    try {
        await openDatabase();
        await createOrUpdateReminderTable();
        await addReminder();
        await closeDatabase();
    }
    catch (error) {
        console.log(`error in database operation ${error}`);
    }
}

async function openDatabase(): Promise<void> {
    console.log(`Creating db connection with ${databaseProperties}`)
    await CapacitorSQLite.createConnection(databaseProperties);

    console.log(`Opening db connection`)
    await CapacitorSQLite.open({
        database: databaseName,
        readonly: false,
    });
}

async function createOrUpdateReminderTable(): Promise<void> {
    console.log(`Executing query ${createTableQuery}`);

    await CapacitorSQLite.execute({
        database: databaseName,
        statements: createTableQuery,
    });
}

async function addReminder(): Promise<void> {
    console.log(`Adding user`);
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
}

async function closeDatabase(): Promise<void> {
    console.log(`Closing connection`);
    await CapacitorSQLite.closeConnection({ database: databaseName, readonly: false });
}