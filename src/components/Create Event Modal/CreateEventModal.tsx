import React, { useEffect, useState } from 'react';
import { NewEvent } from '../../Interfaces/Events';
import ModalBody from '../Modal Body/ModalBody';
import { useCalendar } from '../../providers/CalendarProvider';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type CreateEventModalProps = {
    onClose: (event?: NewEvent) => void;
    initialStartDate?: Date;
};

const CreateEventModal: React.FC<CreateEventModalProps> = ({ onClose, initialStartDate }) => {
    const calendar = useCalendar();
    
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [startDate, setStartDate] = useState<Date>(initialStartDate || new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    
    const [color, setColor] = useState<string>("#f57e5a");
    const [assignMe, setAssignMe] = useState<boolean>(true);
    const [UserIds, setUserIds] = useState<string[]>([]);

    // useEffect(() => {
    //     const today = new Date();
    //     const nextHour = new Date(today);
    //     nextHour.setHours(nextHour.getHours() + 1);
    //     const twoHoursLater = new Date(nextHour);
    //     twoHoursLater.setHours(twoHoursLater.getHours() + 1);

    //     const formatDate = (date: Date) => {
    //         const year = date.getFullYear();
    //         const month = (date.getMonth() + 1).toString().padStart(2, '0');
    //         const day = date.getDate().toString().padStart(2, '0');
    //         return `${year}-${month}-${day}`;
    //     };
    //     const formatTime = (date: Date) => {
    //         const hours = date.getHours().toString().padStart(2, '0');
    //         const minutes = date.getMinutes().toString().padStart(2, '0');
    //         return `${hours}:${minutes}`;
    //     };

    //     setStartDate(formatDate(today) + 'T' + formatTime(nextHour));
    //     setEndDate(formatDate(today) + 'T' + formatTime(twoHoursLater));
    // }, []);

    useEffect(() => {
        const today = initialStartDate || new Date();
        const nextHour = new Date(today);
        nextHour.setMinutes(0, 0, 0); // Reset minutes, seconds, and milliseconds
        nextHour.setHours(nextHour.getHours() + 1);
        const twoHoursLater = new Date(nextHour);
        twoHoursLater.setHours(twoHoursLater.getHours() + 1);

        setStartDate(nextHour);
        setEndDate(twoHoursLater);
    }, [initialStartDate]);

    const handleCancel = () => {
        onClose();
    }

    const handleOnActionSuccessful = async () => {
       
        const newEvent: NewEvent = {
            title,
            description,
            startDate,
            endDate,
            color,
            assignMe,
            UserIds,
        };

        console.log(newEvent);

        const success = calendar.createNewEvent(newEvent);
        if (success !== undefined && success !== null && success == true) {
            onClose(newEvent);
        } else {
            alert("Failed to create event");
        }
    };

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
                <div className="flex flex-row">
                    <DatePicker 
                        selected={startDate} 
                        onChange={(date) => date && setStartDate(date)} 
                        showTimeSelect
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="MMM d, h:mm aa"
                    />
                </div>
            </div>
            <div className="flex flex-col content-center justify-start gap-0 w-full">
                <p>End Date</p>
                <div className="flex flex-row">
                    <DatePicker 
                        selected={endDate} 
                        onChange={(date) => date && setEndDate(date)} 
                        showTimeSelect
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="MMM d, h:mm aa"
                    />
                </div>
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