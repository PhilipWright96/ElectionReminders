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
                <b>Election Date: </b> 15/01/2024 <br></br>
                <b>Election Summary: </b> Election for President of the World <br></br>
                <b>Repeating every: </b> 4 years <br></br>
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
