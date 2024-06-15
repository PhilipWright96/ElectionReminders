import { IonContent, IonHeader, IonItem, IonLabel, IonPage, IonTitle, IonToolbar, IonSelect, IonSelectOption, IonSearchbar, IonList, IonBackButton, IonButtons } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { FilterFields } from '../components/CountryElections/types';
import ReminderCard from '../components/ReminderCard/ReminderCard';
import startingDummyReminderData from "../dummyData/dummyReminderData.json";
import { ReminderData } from '../components/ReminderCard/types';
import { getReminderDataFromBackend } from '../backendConnectors/backendConnector';

const MyReminders: React.FC = () => {
    const filterFields: FilterFields = {
        NAME: "name",
        DATE: "date"
    },
        [filterTerm, setFilterTerm] = useState(""),
        [filterTypeTerm, setFilterTypeTerm] = useState("name"),
        emptyReminderDataArray: ReminderData[] = [],
        [dummyReminderDataResults, setDummyReminderDataResults] = useState(emptyReminderDataArray),
        [loading, setLoading] = useState<boolean>(true),
        [error, setError] = useState<string | null>(null),
        debounceWaitTimeInMilliseconds = 300;

    async function fetchData(): Promise<void> {
        try {
            const backendReminderData = await getReminderDataFromBackend();
            setDummyReminderDataResults(backendReminderData);
            // Not sure what kind of error can come out here so we will just stringify and show it
        } catch (err: unknown) {
            setError(String(err));
        } finally {
            setLoading(false);
        }
    };


    /*
    Use effect is a React hook triggered in various scenarios - initial render, dependency change, component
    unmount. The empty array below shows that no dependencies are considered here and that we will only 
    trigger this hook once on initial render
    */
    useEffect(() => {
        fetchData();
    }, []);

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
                    <IonTitle>My Reminders</IonTitle>
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
                placeholder='Filter reminders'
                onIonClear={() => setDummyReminderDataResults(startingDummyReminderData)}
                onIonChange={({ detail: { value: userEnteredValue } }) => {
                    setFilterTerm(userEnteredValue!);
                    if (userEnteredValue! === '') {
                        setDummyReminderDataResults(startingDummyReminderData);
                        return;
                    }
                    if (filterTypeTerm === filterFields.NAME) {
                        const resultsFilteredByName = startingDummyReminderData.filter(({ reminderName }) => reminderName === userEnteredValue);
                        setDummyReminderDataResults(resultsFilteredByName);
                    }
                }
                }
            >
            </IonSearchbar>
            <IonContent className="ion-padding">
                <IonList>
                    {dummyReminderDataResults.map((dummyReminder) => (
                        <ReminderCard key={dummyReminder.reminderName} reminderProperties={dummyReminder} />
                    ))}
                </IonList>
            </IonContent>
        </IonPage >
    );
};

export default MyReminders;