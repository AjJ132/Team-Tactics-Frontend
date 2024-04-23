import React, { useEffect, useState } from 'react';
import { NewEvent } from '../../Interfaces/Events';
import ModalBody from '../Modal Body/ModalBody';
import { useCalendar } from '../../providers/CalendarProvider';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { User_DTO } from '../../Interfaces/User';
import { useMessages } from '../../providers/MessagesProvider';
import { ConversationUser } from '../../Interfaces/Messages';

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
    const [selectedUsers, setSelectedUsers] = useState<User_DTO[]>([]);

    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
    const [foundUsers, setFoundUsers] = useState<User_DTO[]>([]);

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

    useEffect(() => {
        const getUsers = async () => {
            const users = await calendar.getUsers();
            setFoundUsers(users);
        };

        getUsers();

    }, []);

    const handleUserSelect = (user: User_DTO) => {
        //check if user is already selected
        if(selectedUsers.find(u => u.id === user.id)){
            return;
        }


        setSelectedUsers(prevUsers => [...prevUsers, user]);
    }

    const handleCancel = () => {
        onClose();
    }

    const handleOnActionSuccessful = async () => {

        console.log(selectedUsers)
       
        const newEvent: NewEvent = {
            title,
            description,
            startDate,
            endDate,
            color,
            assignMe,
            UserIds: []
        };

        //foreach user in selected users, add their id to the new event
        selectedUsers.forEach(user => {
            if (user.id !== undefined) {
                newEvent.UserIds.push(user.id);
            }
        });

        console.log(newEvent);

        const success = await calendar.createNewEvent(newEvent);
        if (success !== undefined && success !== null && success == true) {
            onClose(newEvent);
        } else {
            alert("Failed to create event");
        }
    };

    const handleFetchUsers = async (search: string) => {
        // Fetch users from the API
        // const users = await fetchUsers(search);
        // setUsers(users);
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
            <div className="flex flex-col gap-2 content-center justify-start w-full pt-4">
                <div className="flex flex-col content-center justify-start gap-0 w-full ">
                    <p>Assign Me</p>
                    <input type="checkbox" checked={assignMe} onChange={(e) => setAssignMe(e.target.checked)}/>   {/*disabling for now */}
                </div>
                <div className="w-full flex flex-col items-start justify-center gap-2" style={{maxHeight: "10vh"}}>
                
                    {/* Display found users as a dropdown */}
                    <div className='mt-4 w-full max-h-64 overflow-auto' style={{backgroundColor: "var(--accent-color)", borderRadius: "12px"}}>
                        {foundUsers.map((user, index) => (
                            <div 
                            key={index} 
                            className={`cursor-pointer p-2 ${selectedUsers.find(u => u.id === user.id) ? 'bg-gray-500' : 'hover:bg-gray-500'}`} 
                            onClick={() => handleUserSelect(user)}
                            >
                            {user.firstName + ' ' + user.lastName}
                            </div>
                        ))}
                        </div>
                </div>

            <div className="w-full flex flex-col items-start justify-center mt-8 gap-2">
                <p>Selected Users</p>

                <div className='flex flex-col gap-4 w-full'>
                    {selectedUsers.map((user, index) => (
                        <div key={index} className='flex flex-row justify-betweencursor-pointer w-full p-2 hover:bg-gray-500' >
                            {user.firstName + ' ' + user.lastName}

                            <button className='text-nowrap pr-4 pl-4 ml-auto' onClick={() => setSelectedUsers(prevUsers => prevUsers.filter(u => u.id !== user.id))}>
                                Remove
                            </button>
                        </div>
                    ))}
                </div>

            </div>
            </div>
        </div>
        
        }/>
    );
};

export default CreateEventModal;