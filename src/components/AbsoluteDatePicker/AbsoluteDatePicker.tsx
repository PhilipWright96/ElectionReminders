import './AbsoluteDatePicker.css';
import { IonCard, IonCardContent } from '@ionic/react';
import { IonDatetime } from '@ionic/react';
import { useContext } from 'react';
import { SelectedReminderDateTimeContext } from '../ReminderSetup/ReminderSetup';

interface ContainerProps { }

const AbsoluteDatePicker: React.FC<ContainerProps> = () => {
    const { setSelectedReminderDateTime } = useContext(SelectedReminderDateTimeContext);

    const handleDateTimeChange = (event: CustomEvent) => {
        const dateObject = new Date(event.detail.value);
        setSelectedReminderDateTime(dateObject);
    };

    return (
        <IonCard>
            <IonCardContent>
                <div className='row text-center'>
                    <IonDatetime onIonChange={handleDateTimeChange}></IonDatetime>
                </div>
            </IonCardContent>
        </IonCard>
    );
};

export default AbsoluteDatePicker;
