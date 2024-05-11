import { IonHeader, IonPage, IonTitle, IonToolbar, IonContent, IonBackButton, IonButtons, IonText, IonCard } from '@ionic/react';
import React from 'react';
import { RouteComponentProps } from 'react-router';

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
                <div className="m-5">
                    <IonCard>
                        <IonText>
                            <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                nisi ut aliquip ex ea commodo consequat.
                                <br />
                                <br />
                                Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                                deserunt mollit anim id est laborum." </p>
                        </IonText>
                    </IonCard>
                </div>
            </IonContent>
        </IonPage >
    );
};
export default ElectionDetailsPage;