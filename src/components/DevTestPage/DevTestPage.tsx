import { IonHeader, IonPage, IonTitle, IonToolbar, IonContent, IonBackButton, IonButtons, IonButton } from '@ionic/react';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import { getDataFromBackend, getElectionDataFromBackend, getReminderDataFromBackend, postDataToBackend } from '../../backendConnectors/backendConnector';

interface DevTestPageProperties extends RouteComponentProps<object> { }

const DevTestPage: React.FC<DevTestPageProperties> = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
                    <div className='row text-center'>
                        <IonTitle>Dev Test Page</IonTitle>
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonButton onClick={getDataFromBackend}>Fire get request</IonButton>
                <IonButton onClick={postDataToBackend}>Fire post request</IonButton>
                <IonButton onClick={getElectionDataFromBackend}>Fire election get request</IonButton>
                <IonButton onClick={getReminderDataFromBackend}>Fire reminder get request</IonButton>
            </IonContent>
        </IonPage >

    );
};
export default DevTestPage;