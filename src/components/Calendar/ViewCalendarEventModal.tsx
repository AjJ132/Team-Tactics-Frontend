import React, { useEffect, useState } from 'react';
import { CalendarEvent, NewEvent } from '../../Interfaces/Events';
import ModalBody from '../Modal Body/ModalBody';
import { useCalendar } from '../../providers/CalendarProvider';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type ViewEventModalProps = {
    onClose: (event?: NewEvent) => void;
    selectedEvent: CalendarEvent;
};

const ViewEventModal: React.FC<ViewEventModalProps> = ({ onClose, selectedEvent }) => {


    const handleCancel = () => {
        onClose();
    }

    const handleDelete = async () => {
        //delete event
        const apiUrl = "http://localhost:7071"

        const response = await fetch(`${apiUrl}/calendar/delete-event?eventID=${selectedEvent.eventId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        if (!response.ok) {
            // Throw an error with the status code for non-2xx responses
            alert('Failed to delete event');
        }

        //refresh page
        window.location.reload();
    }

    return (
        // Add your JSX code here
        <ModalBody title='View' subtitle='' actionText='Close' hideCancel={true} onActionSuccessful={handleCancel} modalContent={
        <div className='flex flex-col items-start content-start gap-4'>
            <div className="flex flex-col content-center justify-start gap-0 w-full ">
                <p>Title<strong>*</strong></p>
                <input type="text" placeholder="Title" maxLength={30} value={selectedEvent?.title} disabled={true} />
            </div>
            <div className="flex flex-col content-center justify-start gap-0 w-full">
                <p>Description</p>
                <textarea placeholder="Description" className='sm' maxLength={100} value={selectedEvent?.description} disabled={true} />
            </div>
            <div className="flex flex-col content-center justify-start gap-0 w-full">
                <p>Start Date</p>
                <div className="flex flex-row">
                    <DatePicker 
                        value={selectedEvent?.startDate?.toString()} 
                        disabled={true}
                        showTimeSelect
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="MMM d, h:mm aa"
                        onChange={() => {}}
                    />
                </div>
            </div>
            <div className="flex flex-col content-center justify-start gap-0 w-full">
                <p>End Date</p>
                <div className="flex flex-row">
                <DatePicker 
                        value={selectedEvent?.endDate?.toString()} 
                        disabled={true}
                        showTimeSelect
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="MMM d, h:mm aa"
                        onChange={() => {}}
                    />
                </div>
            </div>
            <div className="flex flex-col content-center justify-start gap-0 w-full">
                <p>Color</p>
                <input type="color" value={selectedEvent?.color} disabled={true} />
            </div>
            <div className="w-full flex flex-col items-start justify-center mt-8 gap-2">
                <h3>Attendees</h3>

               <div className='flex flex-col gap-4 w-full'>
                     {selectedEvent.assignedUsers.map((user, index) => (
                          <div key={index} className='flex flex-row items-center gap-2'>
                            <li>{user}</li>
                          </div>
                     ))}
                </div>

            </div>

            {selectedEvent.canUpdate &&
            <div className="flex flex-col gap-2 items-center justify-center w-full pt-4">
                <button className='danger' style={{maxWidth: "150px", width: "150px", padding: "12px" }} onClick={handleDelete}>Delete</button>
            </div>

            }

        </div>
        
        }/>
    );
};

export default ViewEventModal;