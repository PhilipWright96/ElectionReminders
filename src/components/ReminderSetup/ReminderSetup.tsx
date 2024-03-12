import RelativeDatePicker from '../RelativeDatePicker/RelativeDatePicker';
import './ReminderSetup.css';
import React, { useState } from 'react';
import { IonAlert, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonLabel, IonSelect, IonSelectOption, IonCheckbox, IonButtons, IonButton } from '@ionic/react';
import AbsoluteDatePicker from '../AbsoluteDatePicker/AbsoluteDatePicker';
import { DateSelectionTypes } from './types';
interface ContainerProps { }

const ReminderSetup: React.FC<ContainerProps> = () => {
    const [dateTypeTerm, setDateTypeTerm] = useState("Relative Date"),
        [createReminderConfirmationOpen, setCreateReminderConfirmationOpen] = useState(false),
        alertHeaderText = "Reminder created!",
        alertMessage = "Message will be sent on 10/03/2024 20:00.",
        usePhoneAlarm = "Use Phone Alarm",
        reminderType = "Reminder Type",
        createReminder = "Create Reminder",
        setupReminder = "Setup Reminder",
        dateSelectionTypes: DateSelectionTypes = {
            RELATIVE_DATE: "Relative Date",
            ABSOLUTE_DATE: "Absolute Date"
        };

    return (
        <IonCard>
            <IonCardHeader>
                <div className='row text-center'>
                    <IonCardTitle>{setupReminder}</IonCardTitle>
                </div>
            </IonCardHeader>
            <IonItem>
                <IonLabel>{reminderType}</IonLabel>
                <IonSelect
                    value={dateTypeTerm}
                    onIonChange={(e) => setDateTypeTerm(e.detail.value!)}
                >
                    <IonSelectOption>{dateSelectionTypes.RELATIVE_DATE}</IonSelectOption>
                    <IonSelectOption>{dateSelectionTypes.ABSOLUTE_DATE}</IonSelectOption>
                </IonSelect>
            </IonItem>

            <IonCardContent>
                {dateTypeTerm === dateSelectionTypes.RELATIVE_DATE && <RelativeDatePicker></RelativeDatePicker>}
                {dateTypeTerm === dateSelectionTypes.ABSOLUTE_DATE && <AbsoluteDatePicker></AbsoluteDatePicker>}
                <div className="row">
                    <div className="text-start">
                        <IonCheckbox>{usePhoneAlarm}</IonCheckbox>;
                    </div>
                    <div className="text-end">
                        <IonButton onClick={() => setCreateReminderConfirmationOpen(true)}>{createReminder}</IonButton>
                        <IonAlert
                            isOpen={createReminderConfirmationOpen}
                            header={alertHeaderText}
                            message={alertMessage}
                            buttons={['Close']}
                            onDidDismiss={() => setCreateReminderConfirmationOpen(false)}
                        ></IonAlert>

                    </div>
                </div>
            </IonCardContent>
        </IonCard>
    );
};

export default ReminderSetup;
