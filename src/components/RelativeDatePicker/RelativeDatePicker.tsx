import { useContext, useEffect, useState } from 'react';
import './RelativeDatePicker.css';
import { IonCard, IonCardContent, IonItem, IonInput } from '@ionic/react';
import { SelectedReminderDateTimeContext } from '../ReminderSetup/ReminderSetup';
import { RelativeDateData } from './types';

interface RelativeDatePicker {
    electionDatePollsOpen: Date
}

const RelativeDatePicker: React.FC<RelativeDatePicker> = ({ electionDatePollsOpen }) => {
    const { setSelectedReminderDateTime } = useContext(SelectedReminderDateTimeContext),
        [relativeDateData, setRelativeDateData] = useState({
            minutesBefore: null,
            hoursBefore: null,
            daysBefore: null,
            weeksBefore: null,
            monthsBefore: null,
            yearsBefore: null,
        }),
        handleInputChange = (key: string, value: string) => {
            setRelativeDateData((prevData) => ({
                ...prevData,
                [key]: value
            }));
        };

    useEffect(() => {
        const reminderDateTime = calculateReminderDateTime(electionDatePollsOpen, relativeDateData);
        setSelectedReminderDateTime(reminderDateTime);
    }, [relativeDateData]); // Runs when relativeDateData changes        

    return (
        <IonCard>
            <IonCardContent>
                <div className="row">
                    <div className="col">
                        <IonItem>
                            <IonInput label="Minutes before Election Polls Open" type="number" placeholder="0" value={relativeDateData.minutesBefore}
                                onIonInput={(e) => handleInputChange("minutesBefore", e.detail.value!)}
                            ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput label="Hours before Election Polls Open" type="number" placeholder="0" value={relativeDateData.hoursBefore}
                                onIonInput={(e) => handleInputChange("hoursBefore", e.detail.value!)}
                            ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput label="Days before Election Polls Open" type="number" placeholder="0" value={relativeDateData.daysBefore}
                                onIonInput={(e) => handleInputChange("daysBefore", e.detail.value!)}
                            ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput label="Weeks before Election Polls Open" type="number" placeholder="0" value={relativeDateData.weeksBefore}
                                onIonInput={(e) => handleInputChange("weeksBefore", e.detail.value!)}
                            ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput label="Months before Election Polls Open" type="number" placeholder="0" value={relativeDateData.monthsBefore}
                                onIonInput={(e) => handleInputChange("monthsBefore", e.detail.value!)}
                            ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput label="Years before Election Polls Open" type="number" placeholder="0" value={relativeDateData.yearsBefore}
                                onIonInput={(e) => handleInputChange("yearsBefore", e.detail.value!)}
                            ></IonInput>
                        </IonItem>
                    </div>
                </div>
            </IonCardContent>
        </IonCard>
    );
};

function calculateReminderDateTime(electionDatePollsOpen: Date, dateAdjustments: RelativeDateData) {
    const newReminderDateTime = new Date(electionDatePollsOpen);

    if (dateAdjustments.minutesBefore) newReminderDateTime.setMinutes(newReminderDateTime.getMinutes() - dateAdjustments.minutesBefore);
    if (dateAdjustments.hoursBefore) newReminderDateTime.setHours(newReminderDateTime.getHours() - dateAdjustments.hoursBefore);
    if (dateAdjustments.daysBefore) newReminderDateTime.setDate(newReminderDateTime.getDate() - dateAdjustments.daysBefore);
    if (dateAdjustments.weeksBefore) newReminderDateTime.setDate(newReminderDateTime.getDate() - dateAdjustments.weeksBefore * 7);
    if (dateAdjustments.monthsBefore) newReminderDateTime.setMonth(newReminderDateTime.getMonth() - dateAdjustments.monthsBefore);
    if (dateAdjustments.yearsBefore) newReminderDateTime.setFullYear(newReminderDateTime.getFullYear() - dateAdjustments.yearsBefore);
    return newReminderDateTime;
}

export default RelativeDatePicker;
