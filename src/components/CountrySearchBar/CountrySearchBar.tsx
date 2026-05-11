import './CountrySearchBar.css';
import { IonSearchbar, IonList, IonItem, IonLabel, IonIcon, IonSelect, IonSelectOption } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { checkboxOutline } from "ionicons/icons"
import { searchItemMatchesSearchTerm, retrieveDataFromBackend } from './utils';
import { useTranslation } from 'react-i18next';
import { ElectionData } from '../CountryElections/types';
interface ContainerProps { }

const CountrySearchBar: React.FC<ContainerProps> = () => {

    type FilterType = keyof typeof filterTypeToDataField;

    const initialData: ElectionData[] = [],
        debounceTimeInMilliseconds = 300,
        { t } = useTranslation(),
        //searchBarPlaceholder = t("Enter_country_name_here"),
        [filterType, setFilterType] = useState<FilterType>("country"),
        searchBarPlaceholder = `Enter ${filterType} name here`,
        [searchTerm, setSearchTerm] = useState(""),
        [results, setResults] = useState(initialData),
        filterTypeToDataField = {
            country: "countryName",
            region: "regionName",
            city: "cityName",
            organization: "organizationName"
        } as const;

    async function setSearchData(searchTerm: string, filterType: FilterType): Promise<void> {
        if (searchTerm === "") {
            setResults([]);
            return;
        }

        const backendElectionData = await retrieveDataFromBackend(searchTerm, filterType),
            fieldToFilterOn = filterTypeToDataField[filterType];

        console.log(`field to filter on is ${fieldToFilterOn}`)

        if (backendElectionData) {
            const dataMatchingUserSearchTerm =
                // Map then filter to avoid duplicates
                Array.from(
                    new Map(
                        backendElectionData
                            .filter(item => item[fieldToFilterOn] != null)
                            .filter(item =>
                                searchItemMatchesSearchTerm(searchTerm, item[fieldToFilterOn])
                            )
                            .map(item => [item[fieldToFilterOn], item])
                    ).values()
                );
            console.log("Returning results");
            console.log(dataMatchingUserSearchTerm);
            setResults(dataMatchingUserSearchTerm);
        }
    }

    useEffect(() => {
        setSearchData(searchTerm, filterType)
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
                            <IonItem key={result[filterTypeToDataField[filterType]]} routerLink={`/countryElections/${result.countryName}`}>
                                <IonLabel>{result[filterTypeToDataField[filterType]]}</IonLabel>
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
