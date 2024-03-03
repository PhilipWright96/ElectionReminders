import RelativeDatePicker from '../RelativeDatePicker/RelativeDatePicker';
import './ReminderSetup.css';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
interface ContainerProps { }

const ReminderSetup: React.FC<ContainerProps> = () => {
    return (
        <IonCard>
            <IonCardHeader>
                <div className='row text-center'>
                    <IonCardTitle>Setup Reminder</IonCardTitle>
                </div>
            </IonCardHeader>
            <IonItem>
                <IonLabel>Reminder Type</IonLabel>
                <IonSelect
                >
                    <IonSelectOption>Relative Date</IonSelectOption>
                    <IonSelectOption>Absolute Date</IonSelectOption>
                </IonSelect>
            </IonItem>

            <IonCardContent>
                <RelativeDatePicker></RelativeDatePicker>
            </IonCardContent>
        </IonCard>
    );
};

export default ReminderSetup;
