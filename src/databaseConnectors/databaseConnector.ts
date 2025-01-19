import { DatabaseConnectorInterface } from './DatabaseConnectorInterface';
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

// TODO - any is evil. Add a type here! 
export async function getRemindersFromPhoneDatabase(): Promise<any> {
    console.log("Retrieving reminders from local database!");
    if (!enablePhoneTesting) {
        console.log("Phone testing switched off - returning front end dummy data")
        return dummyReminderData;
    }
    try {
        const databaseConnector: DatabaseConnectorInterface = new SQLiteDatabaseConnector();
        await databaseConnector.openDatabase(databaseName);
        const remindersFromDatabase = await databaseConnector.readReminderTable(databaseName);
        await databaseConnector.closeDatabase(databaseName);

        console.log(`Returning reminders ${JSON.stringify(remindersFromDatabase)}`);
        return mapDatabaseRemindersToFrontEndReminders(remindersFromDatabase);
    }
    catch (error) {
        console.log(`error in database operation ${error}`);
    }
}

// TODO - move this to the database connector implementation
function mapDatabaseRemindersToFrontEndReminders(databaseReminders: any[]) {
    return databaseReminders.map((databaseReminder) => ({
        reminderName: databaseReminder.reminder_name,
        electionName: databaseReminder.election_id,
        reminderDetails: databaseReminder.reminder_details,
        createdOn: databaseReminder.created_on,
        reminderDate: databaseReminder.reminder_date,
    }))
}