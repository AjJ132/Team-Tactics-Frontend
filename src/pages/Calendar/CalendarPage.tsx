import clsx from "clsx";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    addDays,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isToday,
    startOfMonth,
    subDays, 
    isValid,
    } from "date-fns";
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './CalendarPage.css';
import CalendarHeader from "../../components/Calendar/CalendarHeader";

interface CalendarPageProps {
    // Add any props you need for the CalendarPage component
}

interface Event {
    Event_ID: string;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    color: string;
    canUpdate: boolean;
    assignedBy: string;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const CalendarPage: React.FC<CalendarPageProps> = (props) => {
    const location = useLocation();
    const addEvent = location.state?.addEvent || false;

    const [events, setEvents] = useState<Event[]>([]);
    const currentDate = new Date();
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const firstDayOfMonth = useMemo(() => startOfMonth(currentMonth), [currentMonth]);
    const lastDayOfMonth = useMemo(() => endOfMonth(currentMonth), [currentMonth]);

    const startingDayIndex = getDay(firstDayOfMonth);

    const daysInMonth = useMemo(() => eachDayOfInterval({
        start: firstDayOfMonth,
        end: lastDayOfMonth,
    }), [firstDayOfMonth, lastDayOfMonth]);

    const daysFromPrevMonth = Array.from({ length: startingDayIndex }).map((_, index) => {
        return subDays(firstDayOfMonth, index + 1);
        }).reverse();
        
        const daysFromNextMonth = Array.from({ length: 6 * 7 - (startingDayIndex + daysInMonth.length) }).map((_, index) => {
          return addDays(lastDayOfMonth, index + 1);
        });

    const toPreviousMonth = () => {
        setCurrentMonth(prevMonth => {
            const newMonth = new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1);
            return newMonth;
        });
    };

    function isColorLight(color: string) {
        var c = color.substring(1);      // strip #
        var rgb = parseInt(c, 16);   // convert rrggbb to decimal
        var r = (rgb >> 16) & 0xff;  // extract red
        var g = (rgb >>  8) & 0xff;  // extract green
        var b = (rgb >>  0) & 0xff;  // extract blue
    
        var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
    
        if (luma < 100) {
            return false;
        } else {
            return true;
        }
    }
    
    const toNextMonth = () => {
        setCurrentMonth(nextMonth => {
            const newMonth = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1);
            return newMonth;
        });
    };

    const toToday = () => {
        setCurrentMonth(currentDate);
    }

    const handleDayClick = (date: Date) => {
        //launch add event modal
    };
    
    const handleEventClick = (event: Event, e: React.MouseEvent) => {
        // Prevent the click event from bubbling up to the parent elements
        e.stopPropagation();
    };

    const eventsByDate = useMemo(() => {
        if (!Array.isArray(events)) {
            console.log('Events is not an array or is undefined');
            return {};
        }
    
        return events.reduce((acc: { [key: string]: Event[] }, event) => {
            if (event && isValid(event.startDate)) {
                const dateKey = format(event.startDate, "yyyy-MM-dd");
                if (!acc[dateKey]) {
                    acc[dateKey] = [];
                }
                acc[dateKey].push(event);
            } else if (!event) {
                console.error('Null event found');
            } else {
                console.error('Invalid date found in event:', event);
            }
            return acc;
        }, {});
    }, [events]);
    
    const updateEvent = (updatedEvent: Event) => {
        console.log('Updated event:', updatedEvent);
        if (Array.isArray(events)) {
            const updatedEvents = events.map(event => {
                if (event.Event_ID === updatedEvent.Event_ID) {
                    return updatedEvent;
                } else {
                    return event;
                }
            });
            setEvents(updatedEvents);
        } else {
            console.error('events2 is not an array');
            // Optionally, reset events2 to an empty array here
            setEvents([]);
        }
    };
    
    const handleEventDelete = (eventToDelete: Event) => {
        console.log('Event ID to delete:', eventToDelete);
        if (Array.isArray(events)) {
            const updatedEvents = events.filter(event => event.Event_ID !== eventToDelete.Event_ID);
            setEvents(updatedEvents);
        } else {
            console.error('events is not an array');
            // Optionally, reset events2 to an empty array here
            setEvents([]);
        }
    }
    
    
    const fetchEvents = async (date: Date) => {
        try {
            
        } catch (error) {
            console.error('Error fetching events:', error);
            setEvents([]); // Handle errors appropriately
        }
    };
    
    // Fetch events when the component mounts and the month changes
    useEffect(() => {
        fetchEvents(firstDayOfMonth);
    }, [currentMonth]);

    return (
        <div className='h-full w-4/5 flex flex-col'>
           <CalendarHeader 
                currentMonth={currentMonth}
                toNextMonth={toNextMonth}
                toPreviousMonth={toPreviousMonth}
                toToday={toToday}
            />
            <div className="card p-8 grid grid-cols-7 gap-0 calendar-text h-full" style={{ gridTemplateRows: '0.2fr 1fr 1fr 1fr 1fr 1fr 1fr'}}>
                    {WEEKDAYS.map((day) => (
                        <div key={day} className="border font-bold text-center uppercase calendar-header-text">
                        {day}
                        </div>
                    ))}
                    {daysFromPrevMonth.map((day, index) => (
                        <div
                        key={`prev-month-day-${index}`}
                        className="border p-2 text-center text-gray-500 calendar-previous-month"
                        >
                        {format(day, "d")}
                        </div>
                    ))}
                    {daysInMonth.map((day, index) => {
                    const dateKey = format(day, "yyyy-MM-dd");
                    const todaysEvents = eventsByDate[dateKey] || [];
                    return (
                        <div
                        key={index}
                        className={clsx("border p-2 text-center", {
                            "calendar-today": isToday(day),
                        })}
                        onClick={() => handleDayClick(day)}
                        >
                        {format(day, "d")}
                        {todaysEvents.map((event) => (
                        <div 
                            key={event.Event_ID}
                            onClick={(e) => handleEventClick(event, e)}
                            className="event-indicator-preview w-full cursor-pointer" 
                            style={{backgroundColor: event.color}}
                        >
                        <p 
                                className="w-2/5" 
                                style={{
                                    color: isColorLight(event.color) ? '#000000' : '#ffffff',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {event.startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                            <p 
                                className="ml-1 ellipsis" 
                                style={{color: isColorLight(event.color) ? '#000000' : '#ffffff' }}
                            >
                                {event.title}
                            </p>
                        </div>
                    ))}
                        </div>
                    );
                    })}
                    {daysFromNextMonth.map((day, index) => (
                        <div
                        key={`prev-month-day-${index}`}
                        className="border p-2 text-center text-gray-500 calendar-previous-month"
                        >
                        {format(day, "d")}
                        </div>
                    ))}
                </div>
        </div>
    );
};

export default CalendarPage;