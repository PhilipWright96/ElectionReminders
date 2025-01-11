interface DatabaseConnectorInterface {
    openDatabase(databaseName: string): Promise<void>,
    createOrUpdateReminderTable(databaseName: string): void,
    addReminder(databaseName: string, selectedReminderDateTime: Date, electionId: String): void,
    closeDatabase(databaseName: string): Promise<void>
}