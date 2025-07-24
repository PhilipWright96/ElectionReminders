import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, useIonViewWillEnter, IonSearchbar, IonItem, IonLabel, IonSelect, IonSelectOption, IonBackButton, IonButtons } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { CountryInformation } from '../../hooks/useDummyApi';
import ElectionCard from '../ElectionCard/ElectionCard';
import { getElectionDataFromBackend } from '../../backendConnectors/backendConnector';
import { ElectionData, FilterFields } from './types';

interface CountryElectionPageProperties extends RouteComponentProps<{ countryName: string }> { }

const CountryElections: React.FC<CountryElectionPageProperties> = ({ match }) => {
    const [countryInformation, setCountryInformation] = useState<CountryInformation | null>(null),
        [filterTerm, setFilterTerm] = useState(""),
        [filterTypeTerm, setFilterTypeTerm] = useState("name"),
        [loading, setLoading] = useState<boolean>(true),
        [error, setError] = useState<string | null>(null),
        emptyElectionDataArray: ElectionData[] = [],
        [dummyElectionDataResults, setDummyElectionDataResults] = useState(emptyElectionDataArray),
        [initialElectionDataResults, setInitialElectionDataResults] = useState(emptyElectionDataArray),
        debounceWaitTimeInMilliseconds = 300,
        filterFields: FilterFields = {
            NAME: "name",
            DATE: "date"
        }

    useIonViewWillEnter(() => {
        const name = match.params.countryName
        console.log(`Setting name ${name}`);
        setCountryInformation({ Name: name });
    })

    async function fetchData(countryName: string | undefined): Promise<void> {
        try {
            if (!countryName) {
                console.error("Error - no country name given for election information");
                return
            }
            // Data comes from the backend as a string and we expect a JSON object. 
            let backendElectionData = await getElectionDataFromBackend(countryName);

            if (typeof backendElectionData == "string") {
                backendElectionData = JSON.parse(backendElectionData);
            }
            setDummyElectionDataResults(backendElectionData);
            setInitialElectionDataResults(backendElectionData);
            // Not sure what kind of error can come out here so we will just stringify and show it
        } catch (err: unknown) {
            setError(String(err));
        } finally {
            setLoading(false);
        }
    };


    /*
    Use effect is a React hook triggered in various scenarios - initial render, dependency change, component
    unmount. We will re-render when the country information name data is available. 
    */
    useEffect(() => {
        if (countryInformation?.Name) {
            fetchData(countryInformation.Name);
        }
    }, [countryInformation]);

    if (loading) {
        return (
            <IonPage>
                Loading...
            </IonPage>
        )
    }

    if (error) {
        return (
            <IonPage>
                Component error with error {error}
            </IonPage>
        )
    }
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
                onIonClear={() => setDummyElectionDataResults(dummyElectionDataResults)}
                onIonChange={({ detail: { value: userEnteredValue } }) => {
                    setFilterTerm(userEnteredValue!);
                    if (userEnteredValue! === '') {
                        setDummyElectionDataResults(initialElectionDataResults);
                        return;
                    }
                    if (filterTypeTerm === filterFields.NAME) {
                        const resultsFilteredByName = initialElectionDataResults.filter(({ electionName }) => electionName === userEnteredValue);
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