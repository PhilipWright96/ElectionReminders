import { DatabaseConnectorInterface } from './DatabaseConnectorInterface';
import { BackEndReminder, FrontEndReminder } from './types';
import { EditReminderData } from '../components/ReminderCard/types';
import Dexie, { Table } from 'dexie';
import { v4 as uuidv4 } from 'uuid';


export class DexieDatabaseConnector extends Dexie implements DatabaseConnectorInterface {
    reminders!: Table<BackEndReminder, number>;

    constructor() {
        super('AppDatabase');

        this.version(1).stores({
            reminders: 'id, reminder_name, election_id, reminder_details, created_on, reminder_date'
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async openDatabase(databaseName: string): Promise<void> {
        console.log("Dexie doesn't need to open the database explicitly!");
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async createOrUpdateReminderTable(databaseName: string): Promise<void> {
        console.log("Dexie doesn't need to open or update tables")
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async readReminderTable(databaseName: string): Promise<BackEndReminder[]> {
        console.log(`Reading reminders from ${databaseName}`);

        return await this.reminders.toArray();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async addReminder(databaseName: string, selectedReminderDateTime: Date, electionId: string, reminderName: string | undefined): Promise<void> {
        console.log(`Adding reminder with time${selectedReminderDateTime} for election ${electionId}`);
        if (!reminderName) {
            console.log("Error - reminder must have a name");
            return;
        }
        await this.reminders.add({
            id: uuidv4(),
            reminder_name: reminderName,
            election_id: electionId,
            reminder_details: "Here are test reminder details!",
            created_on: Date.now(),
            reminder_date: selectedReminderDateTime.toDateString()
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async deleteReminder(databaseName: string, reminderId: string): Promise<void> {
        await this.reminders
            .where('reminder_name')
            .equals(reminderId)
            .delete();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async editReminder(databaseName: string, changedReminderProperties: EditReminderData): Promise<void> {
        console.log(`Editing reminder with id ${changedReminderProperties.reminderId}`);

        await this.reminders
            .where('reminder_name')
            .equals(changedReminderProperties.reminderId)
            .modify({
                reminder_name: changedReminderProperties.reminderName,
                reminder_details: changedReminderProperties.reminderDetails,
                reminder_date: changedReminderProperties.reminderDate
            });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async closeDatabase(databaseName: string): Promise<void> {
        console.log(`Dexie doesn't need to close databases`);
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