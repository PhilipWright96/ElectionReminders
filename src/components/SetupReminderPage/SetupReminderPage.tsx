import { IonHeader, IonPage, IonTitle, IonToolbar, IonContent, IonBackButton, IonButtons } from '@ionic/react';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import CountdownCard from '../CountdownCard/CountdownCard';
import ReminderSetup from '../ReminderSetup/ReminderSetup';

interface SetupReminderPageProperties extends RouteComponentProps<{ electionName: string }> { }

const SetupReminderPage: React.FC<SetupReminderPageProperties> = ({ match }) => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
                    <div className='row text-center'>
                        <IonTitle>Setup Reminder for Election {match.params.electionName}</IonTitle>
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <CountdownCard countdownCardProperties={{ countdownText: "Countdown for election on", countdownDate: new Date(2024, 2, 1) }}></CountdownCard>
                <ReminderSetup></ReminderSetup>
            </IonContent>
        </IonPage >
    );
};
export default SetupReminderPage;