import CountdownCard from '../CountdownCard/CountdownCard';
import './ReminderCard.css';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';
import { deleteReminderFromDatabase } from '../../databaseConnectors/databaseConnector';


interface ReminderCard {
    reminderProperties: {
        reminderId: string,
        reminderName: string,
        reminderDate: string,
        createdOn: string,
        reminderDetails: string
    },
    onDelete: (reminderId: string) => void
}

const ReminderCard: React.FC<ReminderCard> = ({ reminderProperties, onDelete }) => {
    console.log(`showing reminder ${JSON.stringify(reminderProperties)}`)

    const handleDeleteClick = () => {
        console.log(`Deleting reminder with id ${reminderProperties.reminderId}!`);
        deleteReminderFromDatabase(reminderProperties.reminderId);
        onDelete(reminderProperties.reminderId);
    };
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
                    <IonButton fill="outline" size="small" color="dark">Set as Favourite</IonButton>
                </div>
                <div className="col">
                    <IonButton fill="outline" size="small" color="dark">Election Details</IonButton>
                </div>
                <div className="col">
                    <IonButton fill="outline" size="small" color="dark">Edit</IonButton>
                </div>
                <div className="col">
                    <IonButton fill="outline" size="small" color="dark" onClick={handleDeleteClick}>Delete</IonButton>
                </div>
            </div>
        </IonCard>
    );
};

export default ReminderCard;
