import { IonHeader, IonPage, IonTitle, IonToolbar, IonContent, IonBackButton, IonButtons, IonText, IonCard } from '@ionic/react';
import React from 'react';
import { RouteComponentProps, useLocation } from 'react-router';

interface ElectionDetailsPageProperties extends RouteComponentProps<{ electionName: string }> { }

const ElectionDetailsPage: React.FC<ElectionDetailsPageProperties> = ({ match }) => {
    const location = useLocation();
    const electionDetails = (location.state as { electionDetails?: string })?.electionDetails;

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
                <div className="p-4">
                    <IonText className="fs-4">
                        <p> {electionDetails ?? "No additional details provided."} </p>
                    </IonText>
                </div>
            </IonContent>
        </IonPage >
    );
};
export default ElectionDetailsPage;