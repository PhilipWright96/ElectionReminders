import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { EditReminderData } from '../ReminderCard/types';

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
    const [localReminderProperties, setLocalReminderProperties] = useState(reminderProperties);

    useEffect(() => {
        setLocalReminderProperties(reminderProperties);
    }, [reminderProperties]);

    const toDatetimeLocal = (date: Date | string): string => {
        const d = typeof date === 'string' ? new Date(date) : date;
        const offset = d.getTimezoneOffset();
        const localDate = new Date(d.getTime() - offset * 60000);
        return localDate.toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm
    }
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Reminder</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="reminderName">
                        <Form.Label>Reminder Name</Form.Label>
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
                            placeholder="Edit Reminder Name"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="reminderDate">
                        <Form.Label>Reminder Date</Form.Label>
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
                            placeholder="Edit Reminder Date"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="reminderDetails">
                        <Form.Label>Reminder Details</Form.Label>
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
                            placeholder="Edit Reminder Details"
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
                    Save
                </Button>

                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditReminderModal;