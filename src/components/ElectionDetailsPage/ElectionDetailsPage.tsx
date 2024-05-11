import { IonHeader, IonPage, IonTitle, IonToolbar, IonContent, IonBackButton, IonButtons } from '@ionic/react';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import CountdownCard from '../CountdownCard/CountdownCard';
import ReminderSetup from '../ReminderSetup/ReminderSetup';

interface ElectionDetailsPageProperties extends RouteComponentProps<{ electionName: string }> { }

const ElectionDetailsPage: React.FC<ElectionDetailsPageProperties> = ({ match }) => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
                    <div className='row text-center'>
                        <IonTitle>Details for Election {match.params.electionName}</IonTitle>
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent>
            </IonContent>
        </IonPage >
    );
};
export default ElectionDetailsPage;