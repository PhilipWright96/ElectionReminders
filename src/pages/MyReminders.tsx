import { IonContent, IonHeader, IonItem, IonLabel, IonPage, IonTitle, IonToolbar, IonSelect, IonSelectOption, IonSearchbar, IonList, IonBackButton, IonButtons } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { FilterFields } from '../components/CountryElections/types';
import ReminderCard from '../components/ReminderCard/ReminderCard';
import { ReminderData } from '../components/ReminderCard/types';
import { getRemindersFromPhoneDatabase } from '../databaseConnectors/databaseConnector';
import { FrontEndReminder } from '../databaseConnectors/types';

const MyReminders: React.FC = () => {
    const filterFields: FilterFields = {
        NAME: "name",
        DATE: "date"
    },
        [filterTerm, setFilterTerm] = useState(""),
        [filterTypeTerm, setFilterTypeTerm] = useState("name"),
        emptyReminderDataArray: ReminderData[] = [],
        [reminderDataResults, setReminderDataResults] = useState(emptyReminderDataArray),
        [initialReminderDataResults, setInitialReminderDataResults] = useState(emptyReminderDataArray),
        [loading, setLoading] = useState<boolean>(true),
        [error, setError] = useState<string | null>(null),
        debounceWaitTimeInMilliseconds = 300;

    async function fetchData(): Promise<void> {
        try {
            // Data comes from the backend as a string and we expect a JSON object. 
            // Here we want to pull down results from the local database OR if thats not on, pull down test data.

            let reminderData: FrontEndReminder[] | undefined = await getRemindersFromPhoneDatabase();
            if (typeof reminderData == "string") {
                reminderData = JSON.parse(reminderData);
            }
            if (!reminderData) {
                console.error("No reminder data returned!");
            }
            // If reminder data is undefined, just add a empty list
            setReminderDataResults(reminderData || []);
            setInitialReminderDataResults(reminderData || []);
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
                onIonClear={() => setReminderDataResults(initialReminderDataResults)}
                onIonChange={({ detail: { value: userEnteredValue } }) => {
                    setFilterTerm(userEnteredValue!);
                    if (userEnteredValue! === '') {
                        setReminderDataResults(initialReminderDataResults);
                        return;
                    }
                    if (filterTypeTerm === filterFields.NAME) {
                        const resultsFilteredByName = reminderDataResults.filter(({ reminderName }) => reminderName === userEnteredValue);
                        setReminderDataResults(resultsFilteredByName);
                    }
                }
                }
            >
            </IonSearchbar>
            <IonContent className="ion-padding">
                <IonList>
                    {reminderDataResults.map((reminder) => (
                        <ReminderCard key={reminder.reminderName} reminderProperties={reminder} />
                    ))}
                </IonList>
            </IonContent>
        </IonPage >
    );
};

export default MyReminders;