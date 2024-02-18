import { IonHeader, IonPage, IonTitle, IonToolbar, IonCardContent, IonCard, IonContent } from '@ionic/react';
import React from 'react';
import { RouteComponentProps } from 'react-router';

interface SetupReminderPageProperties extends RouteComponentProps<{ electionName: string }> { }

const SetupReminder: React.FC<SetupReminderPageProperties> = ({ match }) => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <div className='row text-center'>
                        <IonTitle>Setup Reminder</IonTitle>
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard>
                    <IonCardContent>
                        Add Countdown Card here!!
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage >
    );
};
export default SetupReminder;