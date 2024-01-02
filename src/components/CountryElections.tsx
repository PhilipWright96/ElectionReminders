import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

const CountryElections: React.FC = () => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Country Elections</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                Country Elections
            </IonContent>
        </IonPage>
    );
};

export default CountryElections;