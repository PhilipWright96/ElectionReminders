import './RelativeDatePicker.css';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';
interface ContainerProps { }

const RelativeDatePicker: React.FC<ContainerProps> = () => {
    return (
        <IonCard>
            <IonCardHeader>
                <div className='row text-center'>
                    <IonCardTitle>RelativeDatePicker</IonCardTitle>
                </div>
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

export default RelativeDatePicker;
