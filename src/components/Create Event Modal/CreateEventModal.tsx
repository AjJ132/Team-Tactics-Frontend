import React, { useState } from 'react';
import { NewEvent } from '../../Interfaces/NewEvent';
import ModalBody from '../Modal Body/ModalBody';

type CreateEventModalProps = {
    isOpen: boolean;
    onClose: (event?: NewEvent) => void;
};

const CreateEventModal: React.FC<CreateEventModalProps> = ({ isOpen, onClose }) => {
    const [newEvent, setNewEvent] = useState<NewEvent>({
        title: "",
        description: "",
        startDate: new Date(),
        endDate: new Date(new Date().getTime() + 60 * 60 * 1000),
        color: "#f57e5a",
        UserIds: []
    });

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [startDate, setStartDate] = useState<Date>(new Date(new Date().getTime() + 24 * 60 * 60 * 1000));
    
    const [endDate, setEndDate] = useState<Date>(new Date(new Date().getTime() + 2 * 60 * 60 * 1000));
    
    const [color, setColor] = useState<string>("#f57e5a");
    const [UserIds, setUserIds] = useState<string[]>([]);
    

    //if the modal is not open, return null
    if (!isOpen) {
        return null;
    }

    const handleCancel = () => {
        onClose();
    }

    const handleOnActionSuccessful = (newEvent: Event) => {
        //create the new event and then close the modal
    }

    return (
        // Add your JSX code here
        <ModalBody title='Create New Event' subtitle='Create a new event for yourself or your athletes' cancelText='Cancel' actionText='Create' onCancel={handleCancel} onActionSuccessful={handleOnActionSuccessful} modalContent={
        <div className='flex flex-col items-start content-start gap-4'>
            <div className="flex flex-col content-center justify-start gap-0 w-full ">
                <p>Title<strong>*</strong></p>
                <input type="text" placeholder="Title"  maxLength={30}/>
            </div>
            <div className="flex flex-col content-center justify-start gap-0 w-full">
                <p>Description</p>
                <textarea placeholder="Description" className='sm'  maxLength={100}/>
            </div>
            <div className="flex flex-col content-center justify-start gap-0 w-full">
                <p>Start Date</p>
                <input type="datetime-local" value={startDate.toISOString().slice(0, -8)} onChange={(e) => setStartDate(new Date(e.target.value))} />
            </div>
            <div className="flex flex-col content-center justify-start gap-0 w-full">
                <p>End Date</p>
                <input type="datetime-local" value={endDate.toISOString().slice(0, -8)} onChange={(e) => setEndDate(new Date(e.target.value))} />
            </div>
            <div className="flex flex-col content-center justify-start gap-0 w-full">
                <p>Color</p>
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
            </div>
            <p>User selection disabled for now</p>
            <div className="flex flex-row gap-2 content-center justify-start w-full pt-8">
                <div className="flex flex-col content-center justify-start gap-0 w-full ">
                    <p>Assign Me</p>
                    <input type="checkbox" value="true" disabled={true}/>   {/*disabling for now */}
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