import './CountrySearchBar.css';
import { IonSearchbar, IonList, IonItem } from '@ionic/react';
import React, { useState } from 'react';

interface ContainerProps { }

const CountrySearchBar: React.FC<ContainerProps> = () => {
    const data = [
        'Germany',
        'EU'
    ], [results, setResults] = useState([...data]);


    const handleInput = (ev: Event) => {
        let query = '';
        const target = ev.target as HTMLIonSearchbarElement;
        if (target) query = target.value!.toLowerCase();

        setResults(data.filter((d) => d.toLowerCase().indexOf(query) > -1));
    };

    return (
        <>
            <IonSearchbar showClearButton="always" animated={true} placeholder="Enter country name here" onIonInput={(ev) => handleInput(ev)}
            ></IonSearchbar>

            <IonList>
                {results.map((result) => (
                    <IonItem>{result}</IonItem>
                ))}
            </IonList>
        </>
    );
};

export default CountrySearchBar;
