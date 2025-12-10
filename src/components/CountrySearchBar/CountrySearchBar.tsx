import './CountrySearchBar.css';
import { IonSearchbar, IonList, IonItem, IonLabel, IonIcon } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useDummyApi, SearchResult } from '../../hooks/useDummyApi';
import { checkboxOutline } from "ionicons/icons"
import { countryMatchesSearchTerm } from './utils';
import { useTranslation } from 'react-i18next';
interface ContainerProps { }

const CountrySearchBar: React.FC<ContainerProps> = () => {

    const initialData: SearchResult[] = [],
        debounceTimeInMilliseconds = 300,
        { t } = useTranslation(),
        searchBarPlaceholder = t("Enter_country_name_here"),
        [searchTerm, setSearchTerm] = useState(""),
        [results, setResults] = useState(initialData);

    useEffect(() => {
        if (searchTerm === "") {
            setResults([]);
            return;
        }
        const dummyCountryResults: SearchResult[] = useDummyApi(),
            dataMatchingUserSearchTerm =
                dummyCountryResults.filter(({ Name }) =>
                    countryMatchesSearchTerm(searchTerm, Name)
                );
        setResults(dataMatchingUserSearchTerm);
    }, [searchTerm]);

    return (
        <>
            <div className="country-search-container">
                <IonSearchbar
                    value={searchTerm}
                    onIonChange={(e) => setSearchTerm(e.detail.value!)}
                    showClearButton="always"
                    animated={true}
                    placeholder={searchBarPlaceholder}
                    debounce={debounceTimeInMilliseconds}
                ></IonSearchbar >

                {results.length > 0 && (
                    <IonList>
                        {results.map((result) => (
                            <IonItem key={result.Name} routerLink={`/countryElections/${result.Name}`}>
                                <IonLabel>{result.Name}</IonLabel>
                                <IonIcon slot="end" icon={checkboxOutline} />
                            </IonItem>
                        ))}
                    </IonList>
                )}
            </div>
        </>
    );
};

export default CountrySearchBar;
