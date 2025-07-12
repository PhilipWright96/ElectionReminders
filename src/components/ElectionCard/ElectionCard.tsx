import { Link } from 'react-router-dom';
import './ElectionCard.css';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';

interface ElectionCard {
    electionProperties: {
        electionId: string,
        electionName: string,
        electionDetails: string,
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
                    <IonButton fill="outline" size="small" color="dark">
                        <Link
                            to={{
                                pathname: `/electionDetails/${electionProperties.electionName}`,
                                state: { electionDetails: electionProperties.electionDetails },
                            }}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            More Details
                        </Link>
                    </IonButton>
                </div>
                <div className="col">
                    <IonButton fill="outline" size="small" color="dark" routerLink={`/setupReminder?electionName=${electionProperties.electionName}&electionDate=${electionProperties.electionDate}&electionId=${electionProperties.electionId}`}>Setup Reminder</IonButton>
                </div>
            </div>
        </IonCard>
    );
};

export default ElectionCard;
