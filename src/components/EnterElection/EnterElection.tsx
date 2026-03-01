import { setDate } from 'date-fns';
import './EnterElection.css';
import { IonCard, IonCardHeader, IonCardTitle, IonCol, IonContent, IonDatetime, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';

interface ContainerProps { }

const EnterElection: React.FC<ContainerProps> = () => {
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
                    <IonLabel position="stacked">Election Polls Open Date and Time</IonLabel>
                    <IonDatetime
                        onIonChange={(e) => console.log(e.detail.value as string)}
                    />
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Election Polls Close Date and Time</IonLabel>
                    <IonDatetime
                        onIonChange={(e) => console.log(e.detail.value as string)}
                    />
                </IonItem>
            </IonCard >
        </IonContent>
    )
};


export default EnterElection;
