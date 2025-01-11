import { IonHeader, IonPage, IonTitle, IonToolbar, IonContent, IonBackButton, IonButtons } from '@ionic/react';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import CountdownCard from '../CountdownCard/CountdownCard';
import ReminderSetup from '../ReminderSetup/ReminderSetup';
import { useLocation } from 'react-router-dom';

interface SetupReminderPageProperties extends RouteComponentProps<{ electionName: string }> { }

const SetupReminderPage: React.FC<SetupReminderPageProperties> = () => {
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search),
        electionName = queryParams.get('electionName'),
        electionId = queryParams.get('electionId');

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
                    <div className='row text-center'>
                        <IonTitle>Setup Reminder for Election {electionName}</IonTitle>
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <CountdownCard countdownCardProperties={{ countdownText: "Countdown for election on", countdownDate: new Date(2024, 2, 1) }}></CountdownCard>
                <ReminderSetup reminderSetupProperties={{ electionName, electionId }}></ReminderSetup>
            </IonContent>
        </IonPage >
    );
};
export default SetupReminderPage;