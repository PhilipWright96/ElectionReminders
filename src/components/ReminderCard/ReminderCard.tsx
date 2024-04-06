import CountdownCard from '../CountdownCard/CountdownCard';
import './ReminderCard.css';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';

interface ReminderCard {
    reminderProperties: {
        reminderName: string,
        reminderDate: string,
        createdOn: string,
        reminderDetails: string
    }
}

const ReminderCard: React.FC<ReminderCard> = ({ reminderProperties }) => {
    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>{reminderProperties.reminderName}</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <CountdownCard countdownCardProperties={{ countdownText: "Countdown to reminder which triggers on", countdownDate: new Date(2024, 2, 1) }}></CountdownCard>
                <b>Reminder Date: </b> {reminderProperties.reminderDate} <br></br>
                <b>Created On: </b> {reminderProperties.createdOn} <br></br>
                <b>Reminder Details: </b>{reminderProperties.reminderDetails} <br></br>
            </IonCardContent>
            <div className="row">
                <div className="col">
                    <IonButton fill="outline" size="small" color="dark">More Details</IonButton>
                </div>
            </div>
        </IonCard>
    );
};

export default ReminderCard;
