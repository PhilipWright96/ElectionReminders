import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, useIonViewWillEnter, IonSearchbar, IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { CountryInformation } from '../hooks/useDummyApi';
import ElectionCard from './ElectionCard';
import dummyElectionData from "../dummyData/dummyElectionData.json"

interface CountryElectionPageProperties extends RouteComponentProps<{ countryName: string }> { }

const CountryElections: React.FC<CountryElectionPageProperties> = ({ match }) => {
    const [countryInformation, setCountryInformation] = useState<CountryInformation | null>(null),
        [filterTerm, setFilterTerm] = useState(""),
        [filterTypeTerm, setFilterTypeTerm] = useState("name"),
        [dummyElectionDataResults, setDummyElectionDataResults] = useState(dummyElectionData),
        debounceWaitTimeInMilliseconds = 300,
        filterFields = {
            NAME: "name",
            DATE: "date"
        }

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
                    <IonSelectOption value={filterFields.NAME}>Name</IonSelectOption>
                    <IonSelectOption value={filterFields.DATE}>Date</IonSelectOption>
                </IonSelect>
            </IonItem>
            <IonSearchbar
                value={filterTerm}
                debounce={debounceWaitTimeInMilliseconds}
                onIonChange={(e) => {
                    setFilterTerm(e.detail.value!);
                    console.log("hi");
                    if (e.detail.value! === '') {
                        setDummyElectionDataResults(dummyElectionData);
                        return;
                    }
                    if (filterTypeTerm === filterFields.NAME) {
                        const resultsFilteredByName = dummyElectionDataResults.filter(({ electionName }) => electionName === e.detail.value);
                        setDummyElectionDataResults(resultsFilteredByName);
                    }
                }
                }
                placeholder='Filter results'>
            </IonSearchbar>
            <IonContent className="ion-padding">
                <IonList>
                    {dummyElectionDataResults.map((dummyElection) => (
                        <ElectionCard key={dummyElection.electionName} electionProperties={dummyElection} />
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
};
export default CountryElections;