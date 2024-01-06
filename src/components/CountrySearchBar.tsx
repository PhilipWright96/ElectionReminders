import './CountrySearchBar.css';
import { IonSearchbar, IonList, IonItem, IonLabel, IonIcon } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useDummyApi, SearchResult } from '../hooks/useDummyApi';
import { checkboxOutline } from "ionicons/icons"
interface ContainerProps { }

const CountrySearchBar: React.FC<ContainerProps> = () => {

    const initialData: SearchResult[] = [],
        debounceTimeInMilliseconds = 300,
        searchBarPlaceholder = "Enter country name here",
        [searchTerm, setSearchTerm] = useState(""),
        [results, setResults] = useState(initialData);

    useEffect(() => {
        if (searchTerm === "") {
            setResults([]);
            return;
        }
        const data: SearchResult[] = useDummyApi();
        setResults(data);
    }, [searchTerm]);

    return (
        <>
            <IonSearchbar
                value={searchTerm}
                onIonChange={(e) => setSearchTerm(e.detail.value!)}
                showClearButton="always"
                animated={true}
                placeholder={searchBarPlaceholder}
                debounce={debounceTimeInMilliseconds}
            ></IonSearchbar >

            <IonList>
                {results.map((result: SearchResult) => (
                    <IonItem key={result.Name} routerLink={`/countryElections/${result.Name}`}>
                        <IonLabel> {result.Name}</IonLabel>
                        <IonIcon slot="end" icon={checkboxOutline} />
                    </IonItem>
                ))}
            </IonList >
        </>
    );
};

export default CountrySearchBar;
