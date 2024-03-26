import React, { useEffect, useState } from 'react';
import { CalendarEvent, NewEvent } from '../../Interfaces/Events';
import ModalBody from '../Modal Body/ModalBody';
import { useCalendar } from '../../providers/CalendarProvider';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type ViewEventModalProps = {
    onClose: (event?: NewEvent) => void;
    selectedEvent?: CalendarEvent;
};

const ViewEventModal: React.FC<ViewEventModalProps> = ({ onClose, selectedEvent }) => {
    const calendar = useCalendar();
    

    const handleCancel = () => {
        onClose();
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
            <p>User selection disabled for now</p>
            <div className="flex flex-row gap-2 content-center justify-start w-full pt-8">
                <div className="flex flex-col content-center justify-start gap-0 w-full ">
                    <p>Athletes<strong>*</strong></p>
                    <input type="text" placeholder="Search" disabled={true}/> {/*disabling for now */}
                </div>
            </div>
        </div>
        
        }/>
    );
};

export default ViewEventModal;