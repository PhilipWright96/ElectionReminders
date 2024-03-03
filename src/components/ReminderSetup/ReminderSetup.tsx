import RelativeDatePicker from '../RelativeDatePicker/RelativeDatePicker';
import './ReminderSetup.css';
import React, { useState } from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonLabel, IonSelect, IonSelectOption, IonCheckbox, IonButtons, IonButton } from '@ionic/react';
import AbsoluteDatePicker from '../AbsoluteDatePicker/AbsoluteDatePicker';
interface ContainerProps { }

const ReminderSetup: React.FC<ContainerProps> = () => {
    const [dateTypeTerm, setDateTypeTerm] = useState("Relative Date");
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
                    value={dateTypeTerm}
                    onIonChange={(e) => setDateTypeTerm(e.detail.value!)}
                >
                    <IonSelectOption>Relative Date</IonSelectOption>
                    <IonSelectOption>Absolute Date</IonSelectOption>
                </IonSelect>
            </IonItem>

            <IonCardContent>
                {dateTypeTerm === "Relative Date" && <RelativeDatePicker></RelativeDatePicker>}
                {dateTypeTerm === "Absolute Date" && <AbsoluteDatePicker></AbsoluteDatePicker>}
                <div className="row">
                    <div className="text-start">
                        <IonCheckbox>Use Phone Alarm</IonCheckbox>;
                    </div>
                    <div className="text-end">
                        <IonButton >Create Reminder</IonButton>
                    </div>
                </div>
            </IonCardContent>
        </IonCard>
    );
};

export default ReminderSetup;
