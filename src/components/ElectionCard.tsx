import './ElectionCard.css';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

interface ElectionCard {
    electionName: string,
    electionDate: string,
    electionSummary: string,
    isRepeating: boolean,
    repeatingEvery: string
}

const ElectionCard: React.FC<ElectionCard> = (props) => {
    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>{props.electionProperties.electionName}</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <b>Election Date: </b> {props.electionProperties.electionDate} <br></br>
                <b>Election Summary: </b> {props.electionProperties.electionSummary} <br></br>
                <b>Repeating every: </b> {props.electionProperties.repeatingEvery} <br></br>
            </IonCardContent>
            <div className="row">
                <div className="col">
                    <button type="button" className="btn">More Details</button>
                </div>
                <div className="col">
                    <button type="button" className="btn">Setup Reminder</button>
                </div>
            </div>
        </IonCard>
    );
};

export default ElectionCard;
