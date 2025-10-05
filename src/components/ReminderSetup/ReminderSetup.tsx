import RelativeDatePicker from '../RelativeDatePicker/RelativeDatePicker';
import './ReminderSetup.css';
import React, { createContext, useState } from 'react';
import { IonAlert, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonLabel, IonSelect, IonSelectOption, IonCheckbox, IonButton, IonInput } from '@ionic/react';
import AbsoluteDatePicker from '../AbsoluteDatePicker/AbsoluteDatePicker';
import { DateSelectionTypes } from './types';
import { createReminderInDatabase } from '../../databaseConnectors/databaseConnector';
import { setReminderAlertForPhone } from '../../notificationSetters/localNotificationSetter';


interface ReminderSetup {
    reminderSetupProperties: {
        electionName: string | null,
        electionId: string | null,
        electionPollsOpenDate: Date,
    }
}
export const SelectedReminderDateTimeContext = createContext<{
    selectedReminderDateTime: Date | null;
    setSelectedReminderDateTime: (value: Date) => void;
}>({
    selectedReminderDateTime: null,
    setSelectedReminderDateTime: () => { },
});

const ReminderSetup: React.FC<ReminderSetup> = ({ reminderSetupProperties }) => {
    const [dateTypeTerm, setDateTypeTerm] = useState("Relative Date"),
        [createReminderConfirmationOpen, setCreateReminderConfirmationOpen] = useState(false),
        [selectedReminderDateTime, setSelectedReminderDateTime] = useState<Date | null>(null),
        [usePhoneAlarm, setUsePhoneAlarm] = useState(false),
        [reminderName, setReminderName] = useState<string | undefined | null>(""),
        alertHeaderText = "Reminder created!",
        alertMessage = "Message will be sent on ",
        usePhoneAlarmMessage = "Use Phone Alarm",
        reminderType = "Reminder Type",
        createReminder = "Create Reminder",
        setupReminder = "Setup Reminder",
        enterReminderName = "Enter Reminder Name",
        dateSelectionTypes: DateSelectionTypes = {
            RELATIVE_DATE: "Relative Date",
            ABSOLUTE_DATE: "Absolute Date"
        };

    return (
        <SelectedReminderDateTimeContext.Provider value={{ selectedReminderDateTime, setSelectedReminderDateTime }}>
            <IonCard>
                <IonCardHeader>
                    <div className='row text-center'>
                        <IonCardTitle>{setupReminder}</IonCardTitle>
                    </div>
                </IonCardHeader>
                <IonItem>
                    <IonInput placeholder={enterReminderName} onIonChange={(e) => setReminderName(e?.detail?.value)}></IonInput>
                </IonItem>
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
                    {dateTypeTerm === dateSelectionTypes.RELATIVE_DATE && <RelativeDatePicker electionDatePollsOpen={reminderSetupProperties.electionPollsOpenDate}></RelativeDatePicker>}
                    {dateTypeTerm === dateSelectionTypes.ABSOLUTE_DATE && <AbsoluteDatePicker></AbsoluteDatePicker>}
                    <div className="row">
                        <div className="text-start">
                            <IonCheckbox
                                checked={usePhoneAlarm}
                                onIonChange={(e) => setUsePhoneAlarm(e.detail.checked)}
                            >{usePhoneAlarmMessage}</IonCheckbox>
                        </div>
                        <div className="text-end">
                            <IonButton onClick={() => {
                                if (!selectedReminderDateTime) {
                                    console.log("No date set for the reminder - therefore returning early");
                                    return;
                                }

                                if (!reminderSetupProperties.electionId) {
                                    console.log("No election id set for the reminder - therefore returning early");
                                    return;
                                }
                                console.log(`Creating reminder for the time ${selectedReminderDateTime} 
                                    for the election ${reminderSetupProperties.electionName} 
                                    with the id ${reminderSetupProperties.electionId} 
                                    and the name ${reminderName}`);

                                createReminderInDatabase(selectedReminderDateTime, reminderSetupProperties.electionId, reminderName);
                                if (usePhoneAlarm) {
                                    setReminderAlertForPhone(selectedReminderDateTime, reminderSetupProperties.electionName, reminderName);
                                }
                                setCreateReminderConfirmationOpen(true)
                            }}>{createReminder}</IonButton>
                            <IonAlert
                                isOpen={createReminderConfirmationOpen}
                                header={alertHeaderText}
                                message={selectedReminderDateTime != null ? alertMessage + selectedReminderDateTime.toLocaleString() : "No time selected"}
                                buttons={['Close']}
                                onDidDismiss={() => setCreateReminderConfirmationOpen(false)}
                            ></IonAlert>

                        </div>
                    </div>
                </IonCardContent>
            </IonCard>
        </SelectedReminderDateTimeContext.Provider>
    );
};

export default ReminderSetup;
