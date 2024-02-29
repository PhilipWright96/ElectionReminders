import { IonHeader, IonPage, IonTitle, IonToolbar, IonCardContent, IonCard, IonContent } from '@ionic/react';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import CountdownCard from '../CountdownCard/CountdownCard';

interface SetupReminderPageProperties extends RouteComponentProps<{ electionName: string }> { }

const SetupReminder: React.FC<SetupReminderPageProperties> = ({ match }) => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <div className='row text-center'>
                        <IonTitle>Setup Reminder for Election {match.params.electionName}</IonTitle>
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <CountdownCard countdownCardProperties={{ electionDate: new Date(2024, 2, 1) }}></CountdownCard>
            </IonContent>
        </IonPage >
    );
};
export default SetupReminder;