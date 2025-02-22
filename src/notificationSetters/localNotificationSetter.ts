import { LocalNotifications } from '@capacitor/local-notifications';


export async function setReminderAlertForPhone(alertTime: Date, electionName: string | null) {

    console.log("Asking permissions!");

    const permission = await LocalNotifications.requestPermissions();

    if (permission.display === 'granted') {
        console.log('Notification permission granted');
    } else {
        console.log('Notification permission denied');
    }

    console.log("Done!!");

    await LocalNotifications.schedule({
        notifications: [
            {
                id: 1,
                title: "Election reminder!",
                body: `Reminder for election ${electionName}`,
                schedule: { at: alertTime }
                // We can try specifying the icons and sound later. Right now android has defaults which are fine. 
            },
        ],
    });
}