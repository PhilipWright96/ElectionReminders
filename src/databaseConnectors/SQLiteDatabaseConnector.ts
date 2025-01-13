import { CapacitorSQLite } from '@capacitor-community/sqlite';
import { DatabaseConnectorInterface } from './DatabaseConnectorInterface';

export class SQLiteDatabaseConnector implements DatabaseConnectorInterface {
    async openDatabase(databaseName: string): Promise<void> {
        const databaseProperties = {
            database: databaseName,
            version: 1,
            encrypted: false,
            readonly: false,
        };

        console.log(`Creating db connection with ${databaseProperties}`)
        await CapacitorSQLite.createConnection(databaseProperties);

        console.log(`Opening db connection`)
        await CapacitorSQLite.open({
            database: databaseName,
            readonly: false,
        });
    }

    async createOrUpdateReminderTable(databaseName: string): Promise<void> {
        const remindersTableName = "reminders", createTableQuery = `
        CREATE TABLE IF NOT EXISTS ${remindersTableName} (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          election_id TEXT NOT NULL,
          reminder_date TIMESTAMP NOT NULL
        );
      `;

        console.log(`Executing query ${createTableQuery}`);

        await CapacitorSQLite.execute({
            database: databaseName,
            statements: createTableQuery,
        });
    }

    async addReminder(databaseName: string, selectedReminderDateTime: Date, electionId: string): Promise<void> {
        console.log(`Adding reminder with time${selectedReminderDateTime} for election ${electionId}`);
        const remindersTableName = "reminders", insertQuery = `
            INSERT INTO ${remindersTableName} (election_id, reminder_date)
            VALUES (?, ?);
            `;
        const result = await CapacitorSQLite.run({
            database: databaseName,
            statement: insertQuery,
            values: [electionId, selectedReminderDateTime],
        });

        if (result.changes && result.changes.changes != undefined && result.changes.changes > 0) {
            console.log(`Reminder added successfully! Row ID: ${result.changes.lastId}`);
        } else {
            console.error("Failed to add reminder.");
        }
    }

    async closeDatabase(databaseName: string): Promise<void> {
        console.log(`Closing connection`);
        await CapacitorSQLite.closeConnection({ database: databaseName, readonly: false });
    }

}