import './ElectionCard.css';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

interface ContainerProps { }

const ElectionCard: React.FC<ContainerProps> = () => {
    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>Election 1</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                Election Date: 15/01/2024
                Election Summary: Election for President of the World
                Repeating every : 4 years
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
