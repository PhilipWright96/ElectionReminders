import './EnterElectionSuggestion.css';
import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonContent, IonDatetime, IonInput, IonItem, IonSelect, IonSelectOption } from '@ionic/react';
import { useState } from 'react';
import { sendElectionSuggestion } from '../../backendConnectors/backendConnector';

interface ContainerProps { }

const EnterElectionSuggestion: React.FC<ContainerProps> = () => {

    const [showSetElectionStartDateTime, setShowSetElectionStartDateTime] = useState(false),
        [showSetElectionEndDateTime, setShowSetElectionEndDateTime] = useState(false),
        [electionName, setElectionName] = useState<string | undefined | null>(""),
        [selectedElectionStartDateTime, setSelectedElectionStartDateTime] = useState<Date | null>(null),
        [selectedElectionEndDateTime, setSelectedElectionEndDateTime] = useState<Date | null>(null),
        [electionType, setElectionType] = useState<string | undefined | null>(""),
        [electionArea, setElectionArea] = useState<string | undefined | null>(""),
        [electionDetails, setElectionDetails] = useState<string | undefined | null>("");



    return (
        <IonContent fullscreen>
            <IonCard>
                <IonCardHeader>
                    <div className='row text-center'>
                        <IonCardTitle>Enter New Election </IonCardTitle>
                    </div>
                </IonCardHeader>
                <IonItem>
                    <IonInput placeholder="Election Name" onIonInput={(e) => setElectionName(e?.detail?.value)}></IonInput>
                </IonItem>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ flex: 1 }}>

                        <IonSelect
                            placeholder="Select Election Type"
                            onIonChange={(e) => setElectionType(e?.detail?.value)}
                        >
                            <IonSelectOption value="city">City</IonSelectOption>
                            <IonSelectOption value="state">State</IonSelectOption>
                            <IonSelectOption value="local">Country</IonSelectOption>
                        </IonSelect>
                    </div>

                    <div style={{ flex: 1 }}>
                        <IonSelect
                            placeholder="Select Election Area"
                            onIonChange={(e) => setElectionArea(e?.detail?.value)}
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
                                if (typeof e.detail.value == "string")
                                    setSelectedElectionStartDateTime(new Date(e.detail.value))
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
                                if (typeof e.detail.value == "string")
                                    setSelectedElectionEndDateTime(new Date(e.detail.value))
                            }}
                        />
                    )}
                </IonItem>
                <IonItem>
                    <IonInput placeholder="Election Details" onIonInput={(e) => {
                        setElectionDetails(e?.detail?.value)
                    }}></IonInput>
                </IonItem>
                <IonButton expand="block" type="submit" onClick={() => {
                    if (!electionName) {
                        console.error("Election suggestion must have name");
                        return;
                    }

                    if (!selectedElectionStartDateTime || !selectedElectionEndDateTime) {
                        console.error("Election suggestion must have start and end date");
                        return;
                    }

                    if (!electionType || !electionArea) {
                        console.error("Election suggestion must have type and area");
                        return;
                    }

                    const electionSuggestion = {
                        electionName,
                        electionDetails,
                        electionType,
                        electionArea,
                        electionPollsOpenDateTime: selectedElectionStartDateTime,
                        electionPollsCloseDateTime: selectedElectionEndDateTime
                    }
                    sendElectionSuggestion(electionSuggestion);

                }}>
                    Submit Election
                </IonButton>
            </IonCard >
        </IonContent>
    )
};


export default EnterElectionSuggestion;
