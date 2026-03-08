import './EnterElection.css';
import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonCol, IonContent, IonDatetime, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';

interface ContainerProps { }

const EnterElection: React.FC<ContainerProps> = () => {

    const [showSetElectionStartDateTime, setShowSetElectionStartDateTime] = useState(false),
        [showSetElectionEndDateTime, setShowSetElectionEndDateTime] = useState(false);

    return (
        <IonContent fullscreen>
            <IonCard>
                <IonCardHeader>
                    <div className='row text-center'>
                        <IonCardTitle>Enter New Election </IonCardTitle>
                    </div>
                </IonCardHeader>
                <IonItem>
                    <IonInput placeholder="Election Name" onIonChange={(e) => console.log(e?.detail?.value)}></IonInput>
                </IonItem>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ flex: 1 }}>

                        <IonSelect
                            placeholder="Select Election Type"
                            onIonChange={(e) => console.log(e.detail.value)}
                        >
                            <IonSelectOption value="city">City</IonSelectOption>
                            <IonSelectOption value="state">State</IonSelectOption>
                            <IonSelectOption value="local">Country</IonSelectOption>
                        </IonSelect>
                    </div>

                    <div style={{ flex: 1 }}>
                        <IonSelect
                            placeholder="Select Election Area"
                            onIonChange={(e) => console.log(e.detail.value)}
                        >
                            <IonSelectOption value="germany">Germany</IonSelectOption>
                            <IonSelectOption value="france">France</IonSelectOption>
                            <IonSelectOption value="Denmark">Denmark</IonSelectOption>
                        </IonSelect>
                    </div>
                </div>

                <IonItem>
                    <IonButton onClick={() => setShowSetElectionStartDateTime(!showSetElectionStartDateTime)}>
                        Set Election Polls Open Date and Time
                    </IonButton>

                    {showSetElectionStartDateTime && (
                        <IonDatetime
                            presentation="date-time"
                            onIonChange={(e) => {
                                console.log(e.detail.value);
                            }}
                        />
                    )}

                </IonItem>
                <IonItem>
                    <IonButton onClick={() => setShowSetElectionEndDateTime(!showSetElectionEndDateTime)}>
                        Set Election Polls Close Date and Time
                    </IonButton>
                    {showSetElectionEndDateTime && (
                        <IonDatetime
                            presentation="date-time"
                            onIonChange={(e) => {
                                console.log(e.detail.value);
                            }}
                        />
                    )}
                </IonItem>
                <IonItem>
                    <IonInput placeholder="Election Details" onIonChange={(e) => console.log(e?.detail?.value)}></IonInput>
                </IonItem>
                <IonButton expand="block" type="submit">
                    Submit Election
                </IonButton>
            </IonCard >
        </IonContent>
    )
};


export default EnterElection;
