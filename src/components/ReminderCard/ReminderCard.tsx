import CountdownCard from '../CountdownCard/CountdownCard';
import './ReminderCard.css';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';

interface ReminderCard {
}

const ReminderCard: React.FC<ReminderCard> = ({ }) => {
    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>Reminder for Election a</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <CountdownCard countdownCardProperties={{ countdownText: "Countdown to reminder which triggers on", countdownDate: new Date(2024, 2, 1) }}></CountdownCard>
                <b>Election Date: </b> <br></br>
                <b>Election Summary: </b> <br></br>
                <b>Repeating every: </b> <br></br>
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
