import { IonContent, IonHeader, IonItem, IonLabel, IonPage, IonTitle, IonToolbar, IonSelect, IonSelectOption, IonSearchbar, IonList, IonBackButton, IonButtons } from '@ionic/react';
import React, { useState } from 'react';
import { FilterFields } from '../components/CountryElections/types';
import ReminderCard from '../components/ReminderCard/ReminderCard';
import dummyReminderData from "../dummyData/dummyReminderData.json";

const MyReminders: React.FC = () => {
    const filterFields: FilterFields = {
        NAME: "name",
        DATE: "date"
    },
        [filterTerm, setFilterTerm] = useState(""),
        [filterTypeTerm, setFilterTypeTerm] = useState("name"),
        [dummyReminderDataResults, setDummyReminderDataResults] = useState(dummyReminderData);


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
                placeholder='Filter reminders'>
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