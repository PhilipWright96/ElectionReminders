import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { EditReminderData } from '../ReminderCard/types';
import { parse } from 'date-fns'
import { useTranslation } from 'react-i18next';


type EditReminderModalProps = {
    show: boolean;
    onHide: () => void;
    reminderProperties: EditReminderData;
    onSave: (editedReminderProperties: EditReminderData) => void;
};

const EditReminderModal: React.FC<EditReminderModalProps> = ({
    show,
    onHide,
    reminderProperties,
    onSave,
}) => {
    const [localReminderProperties, setLocalReminderProperties] = useState(reminderProperties),
        { t } = useTranslation(),
        editReminderText = t("Edit_Reminder"),
        editReminderNameText = t("Edit_Reminder_Name"),
        reminderNameText = t("Reminder_Name"),
        reminderDateText = t("Reminder_Date"),
        editReminderDateText = t("Edit_Reminder_Date"),
        reminderDetailsText = t("Reminder_Details"),
        editReminderDetailsText = t("Edit_Reminder_Details"),
        saveText = t("Save"),
        closeText = t("Close");

    useEffect(() => {
        setLocalReminderProperties(reminderProperties);
    }, [reminderProperties]);

    // The value the "datetime-local" form expects is in the form "YYYY-MM-DDTHH:MM"
    // This isn't timezone/other date format friendly at all
    const toDatetimeLocal = (date: string): string => {
        const parsedDate = parse(date, "dd/MM/yyyy, HH:mm:ss", new Date()),
            offset = parsedDate.getTimezoneOffset(),
            localDate = new Date(parsedDate.getTime() - offset * 60000);
        return localDate.toISOString().slice(0, 16);
    }
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{editReminderText}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="reminderName">
                        <Form.Label>{reminderNameText}</Form.Label>
                        <Form.Control
                            type="text"
                            name="reminderName"
                            value={localReminderProperties.reminderName}
                            onChange={(e) =>
                                setLocalReminderProperties((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value,
                                }))
                            }
                            placeholder={editReminderNameText}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="reminderDate">
                        <Form.Label>{reminderDateText}</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            name="reminderDate"
                            value={toDatetimeLocal(localReminderProperties.reminderDate)}
                            onChange={(e) =>
                                setLocalReminderProperties((prev) => ({
                                    ...prev,
                                    [e.target.name]: new Date(e.target.value).toLocaleString(),
                                }))
                            }
                            placeholder={editReminderDateText}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="reminderDetails">
                        <Form.Label>{reminderDetailsText}</Form.Label>
                        <Form.Control
                            type="text"
                            name="reminderDetails"
                            value={localReminderProperties.reminderDetails}
                            onChange={(e) =>
                                setLocalReminderProperties((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value,
                                }))
                            }
                            placeholder={editReminderDetailsText}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={() => {
                        onSave(localReminderProperties);
                        onHide();
                    }}
                >
                    {saveText}
                </Button>

                <Button variant="secondary" onClick={onHide}>
                    {closeText}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditReminderModal;