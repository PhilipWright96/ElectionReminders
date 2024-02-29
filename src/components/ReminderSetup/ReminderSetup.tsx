import './ReminderSetup.css';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';
interface ContainerProps { }

const ReminderSetup: React.FC<ContainerProps> = () => {
    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>Test Title</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <b>Test: </b>
            </IonCardContent>
            <div className="row">
                <div className="col">
                    <button type="button" className="btn">More Details</button>
                </div>
            </div>
        </IonCard>
    );
};

export default ReminderSetup;
