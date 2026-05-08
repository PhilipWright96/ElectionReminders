import './CountrySearchBar.css';
import { IonSearchbar, IonList, IonItem, IonLabel, IonIcon, IonSelect, IonSelectOption } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useDummyApi, SearchResult } from '../../hooks/useDummyApi';
import { checkboxOutline } from "ionicons/icons"
import { countryMatchesSearchTerm, retrieveDataFromBackend } from './utils';
import { useTranslation } from 'react-i18next';
import { ElectionData } from '../CountryElections/types';
interface ContainerProps { }

const CountrySearchBar: React.FC<ContainerProps> = () => {

    const initialData: ElectionData[] = [],
        debounceTimeInMilliseconds = 300,
        { t } = useTranslation(),
        //searchBarPlaceholder = t("Enter_country_name_here"),
        [filterType, setFilterType] = useState("country"),
        searchBarPlaceholder = filterType != "all" ? `Enter ${filterType} name here` : `Enter name here`,
        [searchTerm, setSearchTerm] = useState(""),
        [results, setResults] = useState(initialData);

    useEffect(() => {
        if (searchTerm === "") {
            setResults([]);
            return;
        }
        const results: ElectionData[] = useDummyApi(),
            dataMatchingUserSearchTerm =
                results.filter(({ countryName }) =>
                    countryMatchesSearchTerm(searchTerm, countryName)
                );
        setResults(dataMatchingUserSearchTerm);
    }, [searchTerm]);

    return (
        <>
            <IonItem>
                <IonLabel>Search Election Based On...</IonLabel>
                <IonSelect
                    value={filterType}
                    onIonChange={(e) => setFilterType(e.detail.value!)}
                >
                    <IonSelectOption value="country">Country</IonSelectOption>
                    <IonSelectOption value="region">Region</IonSelectOption>
                    <IonSelectOption value="city">City</IonSelectOption>
                    <IonSelectOption value="organization">Organization</IonSelectOption>
                    <IonSelectOption value="all">All</IonSelectOption>
                </IonSelect>
            </IonItem >

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
                            <IonItem key={result.countryName} routerLink={`/countryElections/${result.countryName}`}>
                                <IonLabel>{result.countryName}</IonLabel>
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
