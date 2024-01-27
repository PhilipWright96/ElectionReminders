import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, useIonViewWillEnter, IonSearchbar, IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { CountryInformation } from '../hooks/useDummyApi';
import ElectionCard from './ElectionCard';

interface CountryElectionPageProperties extends RouteComponentProps<{ countryName: string }> { }

const CountryElections: React.FC<CountryElectionPageProperties> = ({ match }) => {
    const [countryInformation, setCountryInformation] = useState<CountryInformation | null>(null),
        [filterTerm, setFilterTerm] = useState(""),
        [filterTypeTerm, setFilterTypeTerm] = useState("name"),
        dummyElectionData = [{ electionName: "a", electionDate: "2023", electionSummary: "Summary for A", isRepeating: true, repeatingEvery: "2 Years" },
        { electionName: "b", electionDate: "2024", electionSummary: "Summary for B", isRepeating: false, repeatingEvery: "3 Years" },
        { electionName: "c", electionDate: "2022", electionSummary: "Summary for C", isRepeating: true, repeatingEvery: "1 Year" }],
        debounceWaitTimeInMilliseconds = 300;

    useIonViewWillEnter(() => {
        const name = match.params.countryName
        setCountryInformation({ Name: name });
    })

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <div className='row text-center'>
                        <IonTitle>{countryInformation?.Name} Elections</IonTitle>
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonItem>
                <IonLabel>Filter By</IonLabel>
                <IonSelect
                    value={filterTypeTerm}
                    onIonChange={(e) => setFilterTypeTerm(e.detail.value!)}
                >
                    <IonSelectOption value="name">Name</IonSelectOption>
                    <IonSelectOption value="date">Date</IonSelectOption>
                </IonSelect>
            </IonItem>
            <IonSearchbar
                value={filterTerm}
                debounce={debounceWaitTimeInMilliseconds}
                onIonChange={(e) => {
                    console.log("Looking with " + filterTypeTerm)
                    setFilterTerm(e.detail.value!)
                }
                }
                placeholder='Filter results'>
            </IonSearchbar>
            <IonContent className="ion-padding">
                <IonList>
                    {dummyElectionData.map((dummyElection) => (
                        <ElectionCard electionProperties={dummyElection} />
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
};
export default CountryElections;