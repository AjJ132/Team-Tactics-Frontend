import React, { useEffect, useState } from 'react';
import { NewEvent } from '../../Interfaces/Events';
import ModalBody from '../Modal Body/ModalBody';
import { useCalendar } from '../../providers/CalendarProvider';

type CreateEventModalProps = {
    onClose: (event?: NewEvent) => void;
};

const CreateEventModal: React.FC<CreateEventModalProps> = ({ onClose }) => {

    const calendar = useCalendar();
    
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());

    const startDateStr = startDate.toISOString().slice(0, 16);
    const endDateStr = endDate.toISOString().slice(0, 16);
    
    const [color, setColor] = useState<string>("#f57e5a");
    const [assignMe, setAssignMe] = useState<boolean>(true);
    const [UserIds, setUserIds] = useState<string[]>([]);

    useEffect(() => {
        const now = new Date();
        if (now.getMinutes() !== 0) {
            now.setHours(now.getHours() + 1);
        }
        now.setMinutes(0);
        now.setSeconds(0);
    
        const endDate = new Date(now.getTime());
        endDate.setHours(endDate.getHours() + 3);
    
        setStartDate(now);
        setEndDate(endDate);
    }, []);
    

    const handleCancel = () => {
        onClose();
    }

    const handleOnActionSuccessful = async () => {
        //create the new event and then close the modal
        const newEvent: NewEvent = {
            title,
            description,
            startDate,
            endDate,
            color,
            assignMe,
            UserIds
        };

        //send the new event to the server
        const success = await calendar.createNewEvent(newEvent);
        if (success !== undefined && success !== null && success == true) {
            onClose(newEvent);
        } else {
            alert("Failed to create event");
        }
    }

    return (
        // Add your JSX code here
        <ModalBody title='Create New Event' subtitle='Create a new event for yourself or your athletes' cancelText='Cancel' actionText='Create' onCancel={handleCancel} onActionSuccessful={handleOnActionSuccessful} modalContent={
        <div className='flex flex-col items-start content-start gap-4'>
            <div className="flex flex-col content-center justify-start gap-0 w-full ">
                <p>Title<strong>*</strong></p>
                <input type="text" placeholder="Title" maxLength={30} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="flex flex-col content-center justify-start gap-0 w-full">
                <p>Description</p>
                <textarea placeholder="Description" className='sm' maxLength={100} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="flex flex-col content-center justify-start gap-0 w-full">
                <p>Start Date</p>
                <input type="datetime-local" value={startDateStr} onChange={(e) => setStartDate(new Date(e.target.value))} />
            </div>
            <div className="flex flex-col content-center justify-start gap-0 w-full">
                <p>End Date</p>
                <input type="datetime-local" value={endDateStr} onChange={(e) => setEndDate(new Date(e.target.value))} />
            </div>
            <div className="flex flex-col content-center justify-start gap-0 w-full">
                <p>Color</p>
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
            </div>
            <p>User selection disabled for now</p>
            <div className="flex flex-row gap-2 content-center justify-start w-full pt-8">
                <div className="flex flex-col content-center justify-start gap-0 w-full ">
                    <p>Assign Me</p>
                    <input type="checkbox" checked={assignMe} onChange={(e) => setAssignMe(e.target.checked)}/>   {/*disabling for now */}
                </div>
                <div className="flex flex-col content-center justify-start gap-0 w-full ">
                    <p>Athletes<strong>*</strong></p>
                    <input type="text" placeholder="Search" disabled={true}/> {/*disabling for now */}
                </div>
            </div>
        </div>
        
        }/>
    );
};

export default CreateEventModal;