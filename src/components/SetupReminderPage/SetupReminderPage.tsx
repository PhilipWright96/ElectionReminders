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
        electionId = queryParams.get('electionId'),
        electionDateString = queryParams.get('electionDate');

    const electionDate = electionDateString != null ? new Date(electionDateString) : null;

    if (!electionDate) {
        console.error("Can't have a election without a date!")
        return;
    }

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
                <CountdownCard countdownCardProperties={{ countdownText: "Countdown for election on", countdownDate: electionDate }}></CountdownCard>
                <ReminderSetup reminderSetupProperties={{ electionName, electionId, electionDate }}></ReminderSetup>
            </IonContent>
        </IonPage >
    );
};
export default SetupReminderPage;