import { DatabaseConnectorInterface } from './DatabaseConnectorInterface';
import { SQLiteDatabaseConnector } from './SQLiteDatabaseConnector';
import { enablePhoneTesting } from "../assets/config.json";
import dummyReminderData from "../dummyData/dummyReminderData.json";
import { BackEndReminder, FrontEndReminder } from './types';

const databaseName = "testDatabase1234s.db";

export async function createReminderInDatabase(selectedReminderDateTime: Date, electionId: string, reminderName: string | undefined | null): Promise<void> {
    console.log("Creating reminder!");
    try {
        const databaseConnector: DatabaseConnectorInterface = new SQLiteDatabaseConnector();
        await databaseConnector.openDatabase(databaseName);
        await databaseConnector.createOrUpdateReminderTable(databaseName);
        await databaseConnector.addReminder(databaseName, selectedReminderDateTime, electionId, reminderName);
        await databaseConnector.closeDatabase(databaseName);
    }
    catch (error) {
        console.log(`error in database operation ${error}`);
    }
}

export async function deleteReminderFromDatabase(reminderId: string): Promise<void> {
    console.log("Deleting reminder!");
    try {
        const databaseConnector: DatabaseConnectorInterface = new SQLiteDatabaseConnector();
        await databaseConnector.openDatabase(databaseName);
        await databaseConnector.deleteReminder(databaseName, reminderId);
        await databaseConnector.closeDatabase(databaseName);
    }
    catch (error) {
        console.log(`error in database operation ${error}`);
    }
}

export async function getRemindersFromPhoneDatabase(): Promise<FrontEndReminder[] | undefined> {
    console.log("Retrieving reminders from local database!");
    if (!enablePhoneTesting) {
        console.log("Phone testing switched off - returning front end dummy data")
        return dummyReminderData;
    }
    try {
        const databaseConnector: DatabaseConnectorInterface = new SQLiteDatabaseConnector();
        await databaseConnector.openDatabase(databaseName);
        const remindersFromDatabase: BackEndReminder[] = await databaseConnector.readReminderTable(databaseName);
        await databaseConnector.closeDatabase(databaseName);

        console.log(`Returning reminders ${JSON.stringify(remindersFromDatabase)}`);
        return databaseConnector.mapDatabaseRemindersToFrontEndReminders(remindersFromDatabase);
    }
    catch (error) {
        console.log(`error in database operation ${error}`);
    }
}