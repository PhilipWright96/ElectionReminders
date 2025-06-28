import CountdownCard from '../CountdownCard/CountdownCard';
import './ReminderCard.css';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';
import { deleteReminderFromDatabase, editReminderInDatabase } from '../../databaseConnectors/databaseConnector';
import { useState } from 'react';
import EditReminderModal from '../EditReminderModal/EditReminderModal';
import { EditReminderData } from './types';


interface ReminderCard {
    reminderProperties: {
        reminderId: string,
        reminderName: string,
        reminderDate: string,
        createdOn: string,
        reminderDetails: string
    },
    onDelete: (reminderId: string) => void
    onChange: (changedReminderProperties: EditReminderData) => void
}

const ReminderCard: React.FC<ReminderCard> = ({ reminderProperties, onDelete, onChange }) => {
    const [showEditModal, setShowEditModal] = useState(false);

    console.log(`showing reminder ${JSON.stringify(reminderProperties)}`)

    const handleDeleteClick = () => {
        console.log(`Deleting reminder with id ${reminderProperties.reminderId}!`);
        deleteReminderFromDatabase(reminderProperties.reminderId);
        onDelete(reminderProperties.reminderId);
    },
        handleEditClick = () => {
            console.log("showing modal");
            console.log("reminder date is " + reminderProperties.reminderDate);
            setShowEditModal(true);
        },
        setNewReminderProperties = (newReminderProperties: EditReminderData) => {
            console.log(`Editing reminder ${newReminderProperties.reminderId}: ${newReminderProperties.reminderName}`);
            editReminderInDatabase(newReminderProperties);
            onChange(newReminderProperties);
        }
    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>{reminderProperties.reminderName}</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <CountdownCard countdownCardProperties={{ countdownText: "Countdown to reminder which triggers on", countdownDate: parse(reminderProperties.reminderDate, "dd/MM/yyyy, HH:mm:ss", new Date()) }}></CountdownCard>
                <b>Reminder Date: </b> {reminderProperties.reminderDate} <br></br>
                <b>Created On: </b> {reminderProperties.createdOn} <br></br>
                <b>Reminder Details: </b>{reminderProperties.reminderDetails} <br></br>
            </IonCardContent>
            <div className="row">
                <div className="col">
                    <IonButton fill="outline" size="small" color="dark">Set as Favourite</IonButton>
                </div>
                <div className="col">
                    <IonButton fill="outline" size="small" color="dark">Election Details</IonButton>
                </div>
                <div className="col">
                    <IonButton fill="outline" size="small" color="dark" onClick={handleEditClick}>Edit</IonButton>
                </div>
                <div className="col">
                    <IonButton fill="outline" size="small" color="dark" onClick={handleDeleteClick}>Delete</IonButton>
                </div>
            </div>
            <EditReminderModal
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                reminderProperties={reminderProperties}
                onSave={(editedReminderProperties) => setNewReminderProperties(editedReminderProperties)}
            />
        </IonCard >
    );
};

export default ReminderCard;
