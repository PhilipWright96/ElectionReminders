import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, useIonViewWillEnter, IonSearchbar, IonItem, IonLabel, IonSelect, IonSelectOption, IonBackButton, IonButtons } from '@ionic/react';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { CountryInformation } from '../../hooks/useDummyApi';
import ElectionCard from '../ElectionCard/ElectionCard';
import startingDummyElectionData from "../../dummyData/dummyElectionData.json"
import { FilterFields } from './types';

interface CountryElectionPageProperties extends RouteComponentProps<{ countryName: string }> { }

const CountryElections: React.FC<CountryElectionPageProperties> = ({ match }) => {
    const [countryInformation, setCountryInformation] = useState<CountryInformation | null>(null),
        [filterTerm, setFilterTerm] = useState(""),
        [filterTypeTerm, setFilterTypeTerm] = useState("name"),
        [dummyElectionDataResults, setDummyElectionDataResults] = useState(startingDummyElectionData),
        debounceWaitTimeInMilliseconds = 300,
        filterFields: FilterFields = {
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
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
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
                onIonClear={() => setDummyElectionDataResults(startingDummyElectionData)}
                onIonChange={({ detail: { value: userEnteredValue } }) => {
                    setFilterTerm(userEnteredValue!);
                    if (userEnteredValue! === '') {
                        setDummyElectionDataResults(startingDummyElectionData);
                        return;
                    }
                    if (filterTypeTerm === filterFields.NAME) {
                        const resultsFilteredByName = startingDummyElectionData.filter(({ electionName }) => electionName === userEnteredValue);
                        setDummyElectionDataResults(resultsFilteredByName);
                    }
                }
                }
                placeholder='Filter elections'>
            </IonSearchbar>
            <IonContent className="ion-padding">
                <IonList>
                    {dummyElectionDataResults.map((dummyElection: ElectionData) => (
                        <ElectionCard key={dummyElection.electionName} electionProperties={dummyElection} />
                    ))}
                </IonList>
            </IonContent>
        </IonPage >
    );
};
export default CountryElections;