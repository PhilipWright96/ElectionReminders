export type FrontEndReminder = {
    reminderId: string;
    reminderName: string;
    electionId: string;
    reminderDetails: string;
    createdOn: string;
    reminderDate: string;
};

export type BackEndReminder = {
    id: number;
    reminder_name: string;
    election_id: string;
    reminder_details: string;
    created_on: number;
    reminder_date: string;
};

