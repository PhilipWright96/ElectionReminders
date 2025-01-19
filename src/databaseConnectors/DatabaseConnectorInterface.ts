export interface DatabaseConnectorInterface {
    openDatabase(databaseName: string): Promise<void>,
    createOrUpdateReminderTable(databaseName: string): void,
    addReminder(databaseName: string, selectedReminderDateTime: Date, electionId: string): void,
    readReminderTable(databaseName: string): Promise<any[]>,
    mapDatabaseRemindersToFrontEndReminders(databaseReminders: any[]): any[],
    closeDatabase(databaseName: string): Promise<void>
}