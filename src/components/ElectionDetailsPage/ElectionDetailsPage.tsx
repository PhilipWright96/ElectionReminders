import { IonHeader, IonPage, IonTitle, IonToolbar, IonContent, IonBackButton, IonButtons, IonText } from '@ionic/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps, useLocation } from 'react-router';

interface ElectionDetailsPageProperties extends RouteComponentProps<{ electionName: string }> { }

const ElectionDetailsPage: React.FC<ElectionDetailsPageProperties> = ({ match }) => {
    const location = useLocation(),
        electionDetails = (location.state as { electionDetails?: string })?.electionDetails,
        { t } = useTranslation(),
        detailsForElectionText = t("Details_For_Election");

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
                    <div className='row text-center'>
                        <IonTitle>{detailsForElectionText} {match.params.electionName}</IonTitle>
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