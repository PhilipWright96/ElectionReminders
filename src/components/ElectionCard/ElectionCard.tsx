import './ElectionCard.css';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';

interface ElectionCard {
    electionProperties: {
        electionName: string,
        electionDate: string,
        electionSummary: string,
        isRepeating: boolean,
        repeatingEvery: string
    }
}

const ElectionCard: React.FC<ElectionCard> = ({ electionProperties }) => {
    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>{electionProperties.electionName}</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <b>Election Date: </b> {electionProperties.electionDate} <br></br>
                <b>Election Summary: </b> {electionProperties.electionSummary} <br></br>
                <b>Repeating every: </b> {electionProperties.repeatingEvery} <br></br>
            </IonCardContent>
            <div className="row">
                <div className="col">
                    <button type="button" className="btn">More Details</button>
                </div>
                <div className="col">
                    <a href={`/setupReminder/${electionProperties.electionName}`} className="btn">Setup Reminder</a>
                </div>
            </div>
        </IonCard>
    );
};

export default ElectionCard;
