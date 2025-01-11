import { SQLiteDatabaseConnector } from './SQLiteDatabaseConnector';

const databaseName = "testDatabase1234s.db";

export async function createReminderInDatabase(selectedReminderDateTime: Date, electionId: string): Promise<void> {
    console.log("Creating reminder!");
    try {
        const databaseConnector: DatabaseConnectorInterface = new SQLiteDatabaseConnector();
        await databaseConnector.openDatabase(databaseName);
        await databaseConnector.createOrUpdateReminderTable(databaseName);
        await databaseConnector.addReminder(databaseName, selectedReminderDateTime, electionId);
        await databaseConnector.closeDatabase(databaseName);
    }
    catch (error) {
        console.log(`error in database operation ${error}`);
    }
}