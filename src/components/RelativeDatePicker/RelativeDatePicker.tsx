import { useContext, useEffect, useState } from 'react';
import './RelativeDatePicker.css';
import { IonCard, IonCardContent, IonItem, IonInput } from '@ionic/react';
import { SelectedReminderDateTimeContext } from '../ReminderSetup/ReminderSetup';

interface RelativeDatePicker {
    electionDate: Date
}

const RelativeDatePicker: React.FC<RelativeDatePicker> = ({ electionDate }) => {
    const { setSelectedReminderDateTime } = useContext(SelectedReminderDateTimeContext),
        [relativeDateData, setRelativeDateData] = useState({
            minutesBefore: "",
            hoursBefore: "",
            daysBefore: "",
            weeksBefore: "",
            monthsBefore: "",
            yearsBefore: "",
        }),
        handleInputChange = (key: string, value: string) => {
            setRelativeDateData((prevData) => ({
                ...prevData,
                [key]: value
            }));
        };

    useEffect(() => {
        const reminderDateTime = calculateReminderDateTime(electionDate, relativeDateData);
        setSelectedReminderDateTime(reminderDateTime);
    }, [relativeDateData]); // Runs when relativeDateData changes        

    return (
        <IonCard>
            <IonCardContent>
                <div className="row">
                    <div className="col">
                        <IonItem>
                            <IonInput label="Minutes before Election" type="number" placeholder="0" value={relativeDateData.minutesBefore}
                                onIonInput={(e) => handleInputChange("minutesBefore", e.detail.value!)}
                            ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput label="Hours before Election" type="number" placeholder="0" value={relativeDateData.hoursBefore}
                                onIonInput={(e) => handleInputChange("hoursBefore", e.detail.value!)}
                            ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput label="Days before Election" type="number" placeholder="0" value={relativeDateData.daysBefore}
                                onIonInput={(e) => handleInputChange("daysBefore", e.detail.value!)}
                            ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput label="Weeks before Election" type="number" placeholder="0" value={relativeDateData.weeksBefore}
                                onIonInput={(e) => handleInputChange("weeksBefore", e.detail.value!)}
                            ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput label="Months before Election" type="number" placeholder="0" value={relativeDateData.monthsBefore}
                                onIonInput={(e) => handleInputChange("monthsBefore", e.detail.value!)}
                            ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput label="Years before Election" type="number" placeholder="0" value={relativeDateData.yearsBefore}
                                onIonInput={(e) => handleInputChange("yearsBefore", e.detail.value!)}
                            ></IonInput>
                        </IonItem>
                    </div>
                </div>
            </IonCardContent>
        </IonCard>
    );
};

function calculateReminderDateTime(electionDate: Date, dateAdjustments: any) {
    const newReminderDateTime = new Date(electionDate);

    if (dateAdjustments.minutesBefore) newReminderDateTime.setMinutes(newReminderDateTime.getMinutes() - dateAdjustments.minutesBefore);
    if (dateAdjustments.hoursBefore) newReminderDateTime.setHours(newReminderDateTime.getHours() - dateAdjustments.hoursBefore);
    if (dateAdjustments.daysBefore) newReminderDateTime.setDate(newReminderDateTime.getDate() - dateAdjustments.daysBefore);
    if (dateAdjustments.weeksBefore) newReminderDateTime.setDate(newReminderDateTime.getDate() - dateAdjustments.weeksBefore * 7);
    if (dateAdjustments.monthsBefore) newReminderDateTime.setMonth(newReminderDateTime.getMonth() - dateAdjustments.monthsBefore);
    if (dateAdjustments.yearsBefore) newReminderDateTime.setFullYear(newReminderDateTime.getFullYear() - dateAdjustments.yearsBefore);
    return newReminderDateTime;
}

export default RelativeDatePicker;
