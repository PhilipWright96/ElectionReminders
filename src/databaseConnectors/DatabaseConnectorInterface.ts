import { EditReminderData } from "../components/ReminderCard/types";
import { BackEndReminder, FrontEndReminder } from "./types";

export interface DatabaseConnectorInterface {
    openDatabase(databaseName: string): Promise<void>,
    createOrUpdateReminderTable(databaseName: string): void,
    addReminder(databaseName: string, selectedReminderDateTime: Date, electionId: string, reminderName: string | undefined | null): void,
    deleteReminder(databaseName: string, reminderId: string): void,
    editReminder(databaseName: string, changedReminderProperties: EditReminderData): void,
    readReminderTable(databaseName: string): Promise<BackEndReminder[]>,
    mapDatabaseRemindersToFrontEndReminders(databaseReminders: BackEndReminder[]): FrontEndReminder[],
    closeDatabase(databaseName: string): Promise<void>
}