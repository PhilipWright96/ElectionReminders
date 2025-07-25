import { CapacitorSQLite } from '@capacitor-community/sqlite';
import { DatabaseConnectorInterface } from './DatabaseConnectorInterface';
import { BackEndReminder, FrontEndReminder } from './types';
import { EditReminderData } from '../components/ReminderCard/types';

export class SQLiteDatabaseConnector implements DatabaseConnectorInterface {

    async openDatabase(databaseName: string): Promise<void> {
        const databaseProperties = {
            database: databaseName,
            version: 1,
            encrypted: false,
            readonly: false,
        };

        console.log(`Creating db connection with ${JSON.stringify(databaseProperties)}`);
        await CapacitorSQLite.createConnection(databaseProperties);

        console.log(`Opening db connection`);
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
          reminder_date TIMESTAMP NOT NULL,
          reminder_name TEXT NOT NULL,
          reminder_details TEXT,
          created_on TIMESTAMP NOT NULL
        );
      `;

        console.log(`Executing query ${createTableQuery}`);

        await CapacitorSQLite.execute({
            database: databaseName,
            statements: createTableQuery,
        });
    }

    async readReminderTable(databaseName: string): Promise<BackEndReminder[]> {
        console.log(`Reading reminders from ${databaseName}`);

        const remindersTableName = "reminders", readTableQuery = `
        SELECT * FROM ${remindersTableName}
        ;
      `;

        console.log(`Executing query ${readTableQuery}`);

        const result = await CapacitorSQLite.query({
            database: databaseName,
            statement: readTableQuery,
            values: []
        });

        if (!result || !result.values) {
            console.error("Error - no results returned from database");
            return [];
        }
        else {
            console.log(`Returned ${JSON.stringify(result)}`);
        }

        return result.values;
    }

    async addReminder(databaseName: string, selectedReminderDateTime: Date, electionId: string, reminderName: string | undefined): Promise<void> {
        console.log(`Adding reminder with time${selectedReminderDateTime} for election ${electionId}`);
        const exampleReminderDetails = "Here are test reminder details",
            remindersTableName = "reminders", insertQuery = `
            INSERT INTO ${remindersTableName} (election_id, reminder_date, reminder_name, reminder_details, created_on)
            VALUES (?, ?, ?, ?, ?);
            `;
        const result = await CapacitorSQLite.run({
            database: databaseName,
            statement: insertQuery,
            values: [electionId, selectedReminderDateTime, reminderName, exampleReminderDetails, Date.now()],
        });

        if (result.changes && result.changes.changes != undefined && result.changes.changes > 0) {
            console.log(`Reminder added successfully! Row ID: ${result.changes.lastId}`);
        } else {
            console.error("Failed to add reminder.");
        }
    }

    async deleteReminder(databaseName: string, reminderId: string): Promise<void> {
        console.log(`Deleting reminder with id ${reminderId}`);
        const remindersTableName = "reminders", deleteQuery = `
            DELETE FROM ${remindersTableName} WHERE id = ?;
            `;
        const result = await CapacitorSQLite.run({
            database: databaseName,
            statement: deleteQuery,
            values: [reminderId],
        });

        if (result.changes && result.changes.changes != undefined && result.changes.changes > 0) {
            console.log(`Reminder deleted successfully`);
        } else {
            console.error("Failed to delete reminder.");
        }
    }

    async editReminder(databaseName: string, changedReminderProperties: EditReminderData): Promise<void> {
        console.log(`Editing reminder with id ${changedReminderProperties.reminderId}`);
        const remindersTableName = "reminders", editQuery = `
            UPDATE ${remindersTableName} set reminder_name = ?, reminder_date = ?, reminder_details = ? WHERE id = ?;
            `,
            values = [
                changedReminderProperties.reminderName,
                changedReminderProperties.reminderDate,
                changedReminderProperties.reminderDetails,
                changedReminderProperties.reminderId];

        const result = await CapacitorSQLite.run({
            database: databaseName,
            statement: editQuery,
            values: values,
        });

        if (result.changes?.changes === 0) {
            console.log("No edit has taken place.");
        } else {
            console.log(`Reminder with ID ${changedReminderProperties.reminderId} updated successfully.`);
        }
    }

    async closeDatabase(databaseName: string): Promise<void> {
        console.log(`Closing connection`);
        await CapacitorSQLite.closeConnection({ database: databaseName, readonly: false });
    }


    mapDatabaseRemindersToFrontEndReminders(databaseReminders: BackEndReminder[]): FrontEndReminder[] {
        return databaseReminders.map((databaseReminder) => ({
            reminderId: databaseReminder.id.toString(),
            reminderName: databaseReminder.reminder_name,
            electionId: databaseReminder.election_id,
            reminderDetails: databaseReminder.reminder_details,
            createdOn: new Date(databaseReminder.created_on).toLocaleString(),
            reminderDate: new Date(databaseReminder.reminder_date).toLocaleString(),
        }))
    }

}