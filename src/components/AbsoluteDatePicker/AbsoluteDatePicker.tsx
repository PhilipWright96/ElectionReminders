import './AbsoluteDatePicker.css';
import { IonCard, IonCardContent } from '@ionic/react';
import { IonDatetime } from '@ionic/react';

interface ContainerProps { }

const AbsoluteDatePicker: React.FC<ContainerProps> = () => {
    return (
        <IonCard>
            <IonCardContent>
                <div className='row text-center'>
                    <IonDatetime></IonDatetime>
                </div>
            </IonCardContent>
        </IonCard>
    );
};

export default AbsoluteDatePicker;
